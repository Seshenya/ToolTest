import jwt from 'jsonwebtoken'

function hasToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({ message: 'Missing access token' })
    }

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err: any, decodedPayload: any) => {
            if (err) {
                return res.status(401).send({ reason: 'Token is invalid' })
            }

            req.userId = decodedPayload.userId
            next()
        }
    )
}

export default hasToken
