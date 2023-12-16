import { Server, Socket } from 'socket.io';
import { getChatHistory, saveMessage } from './services/chat';

interface MessageEvent {
    receiver_id: string;
    content: string;
}

interface User {
    id: string;
    username: string;
}

export const setupSocketEvents = (io: Server) => {
    const onlineUsers = new Map<string, User>();

    io.on('connection', (socket: Socket) => {
        console.log('User connected');

        const user = JSON.parse(socket.handshake.query.user as string) as User;

        if (user && user.id) {

            onlineUsers.set(user.id, user);
            io.emit('onlineUsers', Array.from(onlineUsers.values()));

            socket.join(user.id!);

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
                onlineUsers.delete(user.id);
                io.emit('onlineUsers', Array.from(onlineUsers));
            });
        }
    });
};
