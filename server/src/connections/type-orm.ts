import { DataSource } from 'typeorm'
import 'reflect-metadata'
import { User } from '../user/entities'
import { Category, DigitalProduct } from '../media/entities'
import config from '../config'

const { host, port, username, password, database } = config

export const AppDataSource = new DataSource({
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    synchronize: false, // will not create/update the db schema to match the defined entities
    logging: false,
    entities: [User, DigitalProduct, Category],
    subscribers: [],
    migrations: [],
})

async function connectDb() {
    try {
        await AppDataSource.initialize()
        // eslint-disable-next-line no-console
        console.log('Connection has been established successfully.')
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Unable to connect to the database:', error)
    }
}

export default connectDb
