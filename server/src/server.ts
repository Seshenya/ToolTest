import express from 'express'
import router from './route'
import connectDb from './connections/type-orm'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
const corsOptions = {
    origin: config.clientUrl,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

connectDb()
app.use(bodyParser.json())

app.use('/', router)

const server = http.createServer(app);

server.listen(4000)

const io = new Server(server, {
    cors: {
        origin: config.clientUrl,
        methods: ['GET', 'POST'],
        credentials: true,
        optionsSuccessStatus: 204,
    },
});
io.on('connection', (socket) => {
    console.log('User connected');
    const { userId } = socket.handshake.query;

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', { userId, message: msg }); // Broadcast the message to all connected clients
    });

    // Listen for disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
// eslint-disable-next-line no-console
console.log('Running a API server at http://localhost:4000')
