import { User } from '../entities'

async function getUserByEmail(email: string) {
    try {
        const user = await User.findOneBy({
            email,
        })
        if (!user) {
            throw `User with email '${email}' not found`
        }
        return user
    } catch (err: any) {
        // eslint-disable-next-line no-console
        console.log('Error :', err)
        throw err
    }
}

export { getUserByEmail }
