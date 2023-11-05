import { getUser, getUsers, createUser } from '../services'

async function fetchUser(req: any, res: any) {
    const user = await getUser(req.id)
    res.send(user)
}

async function fetchUsers(req: any, res: any) {
    const users = await getUsers()
    res.send(users)
}

async function addUser(req: any, res: any) {
    const user = await createUser(req.body)
    res.send(user)
}

export { fetchUser, fetchUsers, addUser }
