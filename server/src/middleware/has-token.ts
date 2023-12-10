import jwt from 'jsonwebtoken'
import config from '../config'

function hasToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({ message: 'Missing access token' })
    }

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err: any) => {
        if (err) {
            return res.status(401).send({ message: 'Token is invalid' })
        }
        next()
    })
}

export default hasToken
