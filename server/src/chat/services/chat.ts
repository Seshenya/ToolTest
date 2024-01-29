import { User } from '../../user/entities';
import { Message } from '../entities/message';

export const getChatHistory = async (senderId: string, receiverId: string) => {
    try {
        const messages = await Message
            .createQueryBuilder()
            .where('(sender_id = :senderId AND receiver_id = :receiverId) OR (sender_id = :receiverId AND receiver_id = :senderId)')
            .setParameters({ senderId, receiverId })
            .orderBy('timestamp', 'ASC')
            .getMany();

        return messages

    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching chat history:', error);
    }
};

export const saveMessage = async (senderId: string, receiverId: string, content: string) => {
    const message = new Message();
    message.sender_id = senderId;
    message.receiver_id = receiverId;
    message.content = content;

    try {
        const savedMessage = await message.save();
        return savedMessage
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error saving message:', error);
    }
};

export const getPastChats = async (userId: string) => {
    try {
        const distinctSenderIds = await Message
            .createQueryBuilder()
            .select('DISTINCT user.user_id as userId, CONCAT(user.firstname, " ", user.lastname) as name')
            .innerJoin(User, 'user', 'sender_id = user.user_id OR receiver_id = user.user_id')
            .where('receiver_id = :userId')
            .setParameters({ userId })
            .getRawMany();

        const distinctReceiverIds = await Message
            .createQueryBuilder()
            .select('DISTINCT user.user_id as userId, CONCAT(user.firstname, " ", user.lastname) as name')
            .innerJoin(User, 'user', 'sender_id = user.user_id OR receiver_id = user.user_id')
            .where('sender_id = :userId')
            .setParameters({ userId })
            .getRawMany();

        const userIdSet = new Set();
        const result = [];

        for (const item of distinctReceiverIds.concat(distinctSenderIds)) {
            if (!userIdSet.has(item.userId) && item.userId !== userId) {
                userIdSet.add(item.userId);
                result.push(item);
            }
        }

        return result;

    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching past chat users:', error);
    }
};
