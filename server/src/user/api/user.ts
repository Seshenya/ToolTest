import jwt from 'jsonwebtoken'
import {
    getUser,
    getUsers,
    createUser,
    comparePasswords,
    getUserByEmail,
} from '../services'
import config from '../../config'

async function fetchUser(req: any, res: any) {
    const user = await getUser(req.id)
    res.send(user)
}

async function fetchUsers(req: any, res: any) {
    const users = await getUsers()
    res.send(users)
}

async function loginUser(req: any, res: any) {
    if (req.body && req.body.email && req.body.password) {
        const { email, password } = req.body

        getUserByEmail(email)
            .then(async (user: any) => {
                if (user) {
                    const passwordMatch = await comparePasswords(
                        password,
                        user.password
                    )
                    if (passwordMatch) {
                        const token = jwt.sign(
                            { userId: user.user_id, email: user.email },
                            config.ACCESS_TOKEN_SECRET,
                            {
                                expiresIn: config.ACCESS_TOKEN_EXPIRE,
                            }
                        )

                        res.status(200).send({ token })
                    } else {
                        res.status(401).send({ reason: 'Invalid credentials' })
                    }
                } else {
                    res.status(401).send({ reason: 'Invalid credentials' })
                }
            })
            .catch((error) => {
                res.status(500).send({ message: error })
            })
    } else {
        res.status(403).send({ reason: 'Missing credentials' })
    }
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

export { fetchUser, fetchUsers, addUser, loginUser }
