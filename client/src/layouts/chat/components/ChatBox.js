import { useEffect, useState } from 'react';
import {
    Paper,
    List,
    ListItem,
    TextField,
    Typography,
    styled,
    Avatar,
    IconButton,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import useAuth from 'hooks/useAuth';

const ChatBoxContainer = styled(Paper)(({ theme }) => ({
    height: '400px',
    margin: '10px',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
}));

const HeaderContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    zIndex: '1',
});

const UserInfoContainer = styled('div')({
    marginLeft: '10px',
});

const AvatarImage = styled(Avatar)({
    width: '40px',
    height: '40px',
});

const MessagesContainer = styled(List)(({ theme, isSender }) => ({
    flex: '1',
    overflowY: 'auto',
    padding: '10px',
    position: 'relative',
    justifyContent: isSender ? 'flex-end' : 'flex-start',
}));

const MessageItem = styled(ListItem)(({ theme, isSender }) => ({
    alignSelf: 'flex-start', // Align items to the start by default
    maxWidth: '80%',
    backgroundColor: isSender ? '#DCF8C6' : '#E0E0E0',
    borderRadius: '8px',
    padding: '8px',
    margin: '8px',
    fontSize: '14px',
    marginLeft: isSender ? 'auto' : 0, // Push sent messages to the right
}));

const InputContainerWrapper = styled('div')({
    marginTop: 'auto',
});

const InputContainer = styled('div')({
    display: 'flex',
    backgroundColor: '#fff',
    padding: '10px',
    borderTop: '1px solid #ccc',
});

const StyledTextField = styled(TextField)({
    flex: '1',
});

const ChatBox = ({ socket }) => {
    const { auth } = useAuth();

    const [user, setUser] = useState({
        name: 'John Doe',
        avatar: 'https://placekitten.com/40/40',
    });

    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setNewMessage('');
            socket.emit('chat message', newMessage);
        }
    };
    useEffect(() => {
        // Listen for incoming chat messages
        socket.on('chat message', (res) => {
            console.log(res, auth)
            setMessages((prevMessages) => [...prevMessages, { text: res.message, isSender: res.userId == auth.user_id }]);
        });

        // Clean up socket connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    console.log(messages)

    return (
        <ChatBoxContainer elevation={3}>
            <HeaderContainer>
                <AvatarImage src={user.avatar} alt="User Avatar" />
                <UserInfoContainer>
                    <Typography variant="h6">{user.name}</Typography>
                </UserInfoContainer>
            </HeaderContainer>
            <MessagesContainer>
                {messages.map((message, index) => (
                    <MessageItem key={index} isSender={message.isSender}>
                        {message.text}
                    </MessageItem>
                ))}
            </MessagesContainer>
            <InputContainerWrapper>
                <InputContainer>
                    <StyledTextField
                        label="Type your message"
                        variant="outlined"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <IconButton
                        variant="gradient"
                        color="primary"
                        style={{ marginLeft: 4 }}
                        onClick={handleSendMessage}

                    >
                        <Send />
                    </IconButton>
                </InputContainer>
            </InputContainerWrapper>
        </ChatBoxContainer>
    );
};

export default ChatBox;
