import { useEffect, useState, useRef } from 'react';
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
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { format } from 'date-fns';


const ChatBoxContainer = styled(Paper)(({ theme }) => ({
    height: '95%',
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
    height: 'calc(100vh - 542px)',
    overflowY: 'auto',
    padding: '10px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
}));

const MessageItem = styled(ListItem)(
    ({ theme, isSender, nextSenderEqualsCurrentSender }) => ({
        alignSelf: isSender ? 'flex-end' : 'flex-start', // Align items to the start by default
        maxWidth: '80%',
        // backgroundColor: isSender ? '#DCF8C6' : '#E0E0E0',
        borderRadius: '8px',
        // padding: '8px',
        marginBottom: nextSenderEqualsCurrentSender ? 10 : '8px',
        fontSize: '14px',
        // marginLeft: isSender ? 'auto' : 0, // Push sent messages to the right
        display: 'flex',
        justifyContent: isSender ? 'flex-end' : 'flex-start',
    })
);

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

const ChatBox = ({ socket, receiver, messages, setMessages }) => {
    const { auth } = useAuth();

    const [newMessage, setNewMessage] = useState('');
    const messagesContainerRef = useRef(null);

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setNewMessage('');
            socket.emit('message', { receiver_id: receiver.userId, content: newMessage });
        }
    };
    useEffect(() => {
        // Listen for incoming chat messages
        socket.on('message', (res) => {
            setMessages((prevMessages) => [...prevMessages, { ...res }]);
        });

        // Clean up socket connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        // Get chat history
        socket.emit('getChatHistory', { targetUserId: receiver.userId })
        socket.on('chatHistory', (res) => {
            console.log(res.chatHistory, 'HISTORY')
            setMessages(res?.chatHistory?.length ? res.chatHistory : []);
        })
    }, [receiver])

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const formattedDate = format(date, 'MMM d, yyyy');
        const formattedTime = format(date, 'h:mm a');

        return `${formattedDate} ${formattedTime}`;
    }


    return (
        <ChatBoxContainer elevation={3}>
            <HeaderContainer>
                <Avatar>{receiver?.name?.charAt(0)}</Avatar>
                <UserInfoContainer>
                    <Typography variant="h6">{receiver.name}</Typography>
                </UserInfoContainer>
            </HeaderContainer>
            <MessagesContainer ref={messagesContainerRef}>
                {messages.map((message, index) => {
                    const isSender = message.sender_id === auth.user_id;
                    const nextSenderEqualsCurrentSender =
                        messages[index + 1]?.sender_id === message.sender_id;
                    return (
                        <MessageItem
                            key={index}
                            isSender={isSender}
                            variant={'MDBox'}
                            nextSenderEqualsCurrentSender={
                                nextSenderEqualsCurrentSender
                            }
                        >
                            <MDBox
                                variant="gradient"
                                bgColor={isSender ? 'info' : ''}
                                // width={'100%'}
                                height={'100%'}
                                overflow={'hidden'}
                                borderRadius={
                                    isSender
                                        ? '12px 12px 0px 12px'
                                        : '12px 12px 12px 0'
                                }
                                padding={1}
                                sx={{
                                    color: isSender
                                        ? 'white !important'
                                        : 'black',
                                    bgcolor: '#f2f6ff !important',
                                }}
                            >
                                {message.content}
                                <MDBox
                                    sx={{
                                        display: 'flex',
                                        justifyContent: isSender
                                            ? 'flex-end'
                                            : 'flex-start',
                                    }}
                                >
                                    <MDTypography
                                        color={isSender ? 'white' : ''}
                                        sx={{ opacity: '0.8' }}
                                        fontSize={12}
                                    >
                                        {/* store and send correct date */}
                                        {formatTimestamp(message?.timestamp) || ''}
                                    </MDTypography>
                                </MDBox>
                            </MDBox>
                        </MessageItem>
                    );
                })}
            </MessagesContainer>
            <InputContainerWrapper>
                <InputContainer>
                    <StyledTextField
                        label="Type your message"
                        variant="outlined"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                handleSendMessage()
                            }
                        }}
                    />
                    <IconButton
                        variant="gradient"
                        color="secondary"
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