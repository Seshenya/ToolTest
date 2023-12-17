import { Server, Socket } from 'socket.io';
import { getChatHistory, getPastChats, saveMessage } from './services/chat';

interface MessageEvent {
    receiver_id: string;
    content: string;
}

interface User {
    id: string;
    username: string;
}

export const setupSocketEvents = (io: Server) => {

    io.on('connection', (socket: Socket) => {
        console.log('User connected');

        const user = JSON.parse(socket.handshake.query.user as string) as User;

        if (user && user.id) {
            socket.join(user.id!);

            // Fetch and send the past chat users
            socket.on('getPastChats', async () => {
                const pastUsers = await getPastChats(user.id)
                console.log(pastUsers)
                io.to(user.id).emit('pastChats', { pastUsers })
            })

            // Fetch and send chat history to the newly connected user
            socket.on('getChatHistory', async ({ targetUserId }) => {
                const chatHistory = await getChatHistory(user.id, targetUserId);
                io.to(user.id).emit('chatHistory', { targetUserId, chatHistory });
            });

            socket.on('message', async ({ receiver_id, content }: MessageEvent) => {
                // Save the message to the database
                await saveMessage(user.id, receiver_id, content);

                // Send the message to the target user only
                io.to(receiver_id).emit('message', { sender_id: user.id, content, receiver_id: receiver_id });
                io.to(user.id).emit('message', { sender_id: user.id, content, receiver_id: receiver_id });
            });

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        }
    });
};
