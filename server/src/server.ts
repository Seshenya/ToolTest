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
        optionsSuccessStatus: 204,
    },
})

interface User {
    id: string
    username: string
}

const onlineUsers = new Map<string, User>()

io.on('connection', (socket) => {
    console.log('User connected')
    const user = JSON.parse(socket.handshake.query.user as string) as User
    console.log(user)
    if (user && user.id) {
        onlineUsers.set(user.id, user)
        io.emit('onlineUsers', Array.from(onlineUsers.values()))

        socket.join(user.id!)

        socket.on('message', ({ targetUserId, message }) => {
            // Send the message to the target user only
            io.to(targetUserId).emit('message', { user, message })
            io.to(user.id).emit('message', { user, message })
        })

        // Listen for disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected')
            onlineUsers.delete(user.id)
            io.emit('onlineUsers', Array.from(onlineUsers))
        })
    }
})

// eslint-disable-next-line no-console
console.log('Running a API server at http://localhost:4000')
