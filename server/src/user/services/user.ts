import { hashPassword } from './index'
import { User } from '../entities'
import { UserType } from '../types'

async function getUser(user_id: number) {
    const user = await User.findOneBy({
        user_id,
    })
    return user
}

async function getUsers() {
    const allUsers = await User.find()
    return allUsers
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

async function alterUser(user_id: number, user: UserType) {
    const {firstname, lastname, description, skills} = user

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

        // Update the User entity
        await User.createQueryBuilder()
            .update(User)
            .set(updateObject)
            .where('user_id = :user_id', { user_id: user_id })
            .execute()

        const updatedUser = await User.findOneBy({ user_id })
        return updatedUser
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error updating user:', error)
        throw error
    }
}

export { getUser, getUsers, createUser, alterUser }
