import { hashPassword } from './index'
import { User } from '../entities'
import { UserType } from '../types'
import { promises as fsPromises } from 'fs'
import { generateSASUrl } from '../../middleware/fetch-media-blob-storage'
import { storeBlobToBlobStorage } from '../../middleware/store-media-blob-storage'
import { error } from 'console'

interface UserData {
    fields: any
    fileProfilePicture: any
}

async function getUser(user_id: number) {
    const user = await User.findOneBy({
        user_id,
    })

    if (!user) {
        throw new Error('User not found')
    }

    const containerName = 'gdsdt4'
    const blobNameUserProfile = user.profile_picture

    try {
        const blobUrlWithSAS = await generateSASUrl(
            containerName,
            blobNameUserProfile
        )
        user.profile_picture = blobUrlWithSAS
    } catch (error) {
        throw new Error(`Error generating SAS URL for ${blobNameUserProfile}`)
    }
    
    user.password = ""
    return user
}  

async function getUsers() {
    try {
        const allUsers = await User.find()
        return allUsers
    } catch (err: any) {
        // eslint-disable-next-line no-console
        console.log('Error :', err)
        throw err
    }   
}

async function createUser(user: UserType) {
    try {
        const { password, email, ...otherUserData } = user
        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?hs-fulda\.de$/
        if (!emailPattern.test(email)) {
            throw 'Invalid email format.'
        }

        const hashedPassword = await hashPassword(password)

        const newUser = new User({
            ...otherUserData,
            password: hashedPassword,
            email,
        })
        const createdUser: any = await newUser.save()
        delete createdUser.password
        return createdUser
    } catch (err: any) {
        if (err.code == 'ER_DUP_ENTRY') {
            // eslint-disable-next-line no-console
            console.log('Error :', err)
            throw 'Duplicate email'
        } else if (err.code == 'ER_NO_DEFAULT_FOR_FIELD') {
            // eslint-disable-next-line no-console
            console.log('Error :', err)
            throw 'Required field missing'
        }
        // eslint-disable-next-line no-console
        console.log('Error :', err)
        throw err
    }
}

async function alterUser(user_id: number, user: UserData) {
    const {firstname, lastname, description, skills} = user.fields

    try {
        const existingUser = await User.findOneBy({ user_id })

        if (!existingUser) {
            throw "User Not Found"
        }

        // Build the update object by excluding undefined values
        const updateObject: Record<string, any> = {}
        if (firstname !== undefined) {
            updateObject.firstname = firstname
        }

        if (lastname !== undefined) {
            updateObject.lastname = lastname
        }

        if (description !== undefined) {
            updateObject.description = description
        }

        if (skills !== undefined) {
            updateObject.skills = skills
        }

        if (user.fileProfilePicture !== undefined) {
            const containerName = 'gdsdt4'

            // Add Media to Azure Blob Storage
            const blobNameProfilePic = `user_${firstname}_${lastname}_${Date.now()}_${Math.random()}_${user.fileProfilePicture.name}`
            const dataMedia = await fsPromises.readFile(user.fileProfilePicture.path)

            storeBlobToBlobStorage(containerName, blobNameProfilePic, dataMedia)

            updateObject.profile_picture = blobNameProfilePic
        }

        // Update the User entity
        await User.createQueryBuilder()
            .update(User)
            .set(updateObject)
            .where('user_id = :user_id', { user_id: user_id })
            .execute()

        const updatedUsers = await getUser(user_id)
        return updatedUsers

    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error updating user:', error)
        throw error
    }
}

export { getUser, getUsers, createUser, alterUser }
