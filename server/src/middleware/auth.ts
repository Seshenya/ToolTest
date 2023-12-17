import jwt from 'jsonwebtoken'
import config from '../config'
import { comparePasswords, getUserByEmail } from '../user/services'

let refreshTokens: string[] = []

function logoutUser(req: any, res: any) {
    const refreshToken = req.body.token
    if (!refreshToken) {
        return res.status(401).send({ message: 'Missing refresh token' })
    }

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
    return res.status(204).send()
}

async function loginUser(req: any, res: any) {
    if (req.body?.email && req.body?.password) {
        const { email, password } = req.body

        getUserByEmail(email)
            .then(async (user: any) => {
                if (user) {
                    const passwordMatch = await comparePasswords(
                        password,
                        user.password
                    )
                    if (passwordMatch) {
                        const accessToken = jwt.sign(
                            { userId: user.user_id, email: user.email },
                            process.env.ACCESS_TOKEN_SECRET as string,
                            {
                                expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
                            }
                        )
                        const refreshToken = jwt.sign(
                            { userId: user.user_id, email: user.email },
                            process.env.REFRESH_TOKEN_SECRET as string,
                            {
                                expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
                            }
                        )
                        refreshTokens.push(refreshToken)
                        delete user.password

                        return res
                            .status(200)
                            .send({ accessToken, refreshToken, user })
                    } else {
                        return res
                            .status(401)
                            .send({ message: 'Invalid credentials' })
                    }
                } else {
                    return res
                        .status(401)
                        .send({ message: 'Invalid credentials' })
                }
            })
            .catch((error) => {
                return res.status(500).send({ message: error })
            })
    } else {
        return res.status(403).send({ message: 'Missing credentials' })
    }
}

function refreshToken(req: any, res: any) {
    const refreshToken = req.body.token
    if (!refreshToken) {
        return res.status(401).send({ message: 'Missing token' })
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).send({ message: 'Token is invalid' })
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: any, user: any) => {
            if (err) {
                return res.status(401).send({ message: 'Token is invalid' })
            }
            const accessToken = jwt.sign(
                { userId: user.user_id, email: user.email },
                process.env.ACCESS_TOKEN_SECRET as string,
                {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
                }
            )
            return res.status(200).send({ accessToken })
        }
    )
}

export { refreshToken, logoutUser, loginUser }
