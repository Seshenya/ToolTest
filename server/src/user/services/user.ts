import { User } from '../entities'
import { UserType } from '../types'

async function getUser(id: number) {
    const user = await User.findOneBy({
        id,
    })
    return user
}

async function getUsers() {
    const allUsers = await User.find()
    return allUsers
}

async function createUser(user: UserType) {
    const newUser = new User(user)
    const createdUser = await newUser.save()
    return createdUser
}

export { getUser, getUsers, createUser }
