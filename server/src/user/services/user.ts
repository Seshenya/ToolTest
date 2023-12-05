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

export { getUser, getUsers, createUser }
