import { getUser, getUsers, createUser } from '../services'

async function fetchUser(req: any, res: any) {
    getUser(req.id)
    .then((user) => {
        res.send(user)
    })
    .catch((error) => {
        res.status(400).send({ message: error })
    })
}

async function fetchUsers(req: any, res: any) {
    getUsers()
    .then((users) => {
        res.send(users)
    })
    .catch((error) => {
        res.status(400).send({ message: error })
    })
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

export { fetchUser, fetchUsers, addUser }
