import { getUser, getUsers, createUser, alterUser } from '../services'

async function fetchUser(req: any, res: any) {
    const user = await getUser(req.params.id)
    res.send(user)
}

async function fetchUsers(req: any, res: any) {
    const users = await getUsers()
    res.send(users)
}

async function addUser(req: any, res: any) {
    createUser(req.body)
        .then((user) => {
            res.send(user)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

async function updateUser(req: any, res: any) {
    alterUser(req.params.id, req.body)
        .then((user) => {
            res.send(user)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

export { fetchUser, fetchUsers, addUser, updateUser }
