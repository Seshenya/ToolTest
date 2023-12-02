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
    const { password, ...otherUserData } = user

    const hashedPassword = await hashPassword(password)

    const newUser = new User({
        ...otherUserData,
        password: hashedPassword,
    })

    const createdUser = await newUser.save()
    return createdUser
}

export { getUser, getUsers, createUser }
