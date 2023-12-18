import express from 'express'
import router from './route'
import connectDb from './connections/type-orm'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config'
import dotenv from 'dotenv'

dotenv.config()
import { Server } from 'socket.io'
import http from 'http'
import { setupSocketEvents } from './chat/socketEvents'

const app = express()
const corsOptions = {
    origin: config.clientUrl,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json({ limit: '50mb' }))

connectDb()
app.use(bodyParser.json())

app.use('/', router)

const server = http.createServer(app)

server.listen(4000)

const io = new Server(server, {
    cors: {
        origin: config.clientUrl,
        methods: ['GET', 'POST'],
        credentials: true,
        optionsSuccessStatus: 200,
    },
})

setupSocketEvents(io);

// eslint-disable-next-line no-console
console.log('Running a API server at http://localhost:4000')
