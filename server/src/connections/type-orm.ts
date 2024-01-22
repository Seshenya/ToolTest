import { DataSource } from 'typeorm'
import 'reflect-metadata'
import { User } from '../user/entities'
import { Category, DigitalProduct, MediaType, ThreeDModel } from '../media/entities'
import config from '../config'
import { Message } from '../chat/entities/message'
import { Order } from '../orders/entities'
import { Review } from '../review/entities'

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
    entities: [
        User,
        DigitalProduct,
        Category,
        MediaType,
        Message,
        Order,
        Review,
        ThreeDModel
    ],
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
