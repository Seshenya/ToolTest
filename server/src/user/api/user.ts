import { getUser, getUsers, createUser, alterUser } from '../services'
import formidable from 'express-formidable';

async function fetchUser(req: any, res: any) {
    getUser(req.params.id)
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

async function updateUser(req: any, res: any) {
    formidable({ multiples: true })(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed.' })
        }

        const userData = {
            fields: req.fields,
            fileProfilePicture: req.files.profile_picture,
        }

        await alterUser(req.params.id, userData)
            .then((user) => {
                res.send(user)
            })
            .catch((error) => {
                res.status(500).send({ message: 'Error updating user' })
            })
    })
}

export { fetchUser, fetchUsers, addUser, updateUser }
