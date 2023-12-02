import bcrypt from 'bcrypt'

const saltRounds = 10

async function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(
            password,
            saltRounds,
            (err: Error | undefined, hash: string) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(hash)
                }
            }
        )
    })
}

async function comparePasswords(
    inputPassword: string,
    hashedPassword: string
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(
            inputPassword,
            hashedPassword,
            (err: Error | undefined, result: boolean) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            }
        )
    })
}

export { hashPassword, comparePasswords }
