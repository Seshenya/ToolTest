import { Message } from '../entities/message';

export const getChatHistory = async (senderId: string, receiverId: string) => {
    try {
        const messages = await Message
            .createQueryBuilder()
            .where('(message.sender_id = :senderId AND message.receiver_id = :receiverId) OR (message.sender_id = :receiverId AND message.receiver_id = :senderId)')
            .setParameters({ senderId, receiverId })
            .orderBy('message.timestamp', 'ASC')
            .getMany();

        return messages

    } catch (error) {
        console.error('Error fetching chat history:', error);
    }
};

export const saveMessage = async (senderId: string, receiverId: string, content: string) => {
    const message = new Message();
    message.sender_id = senderId;
    message.receiver_id = receiverId;
    message.content = content;

    try {
        await message.save();
    } catch (error) {
        console.error('Error saving message:', error);
    }
};
