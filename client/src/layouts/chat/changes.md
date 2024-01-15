# Hey Dipesh, while going through our project, I noticed that there was room for improvements in the chat UI

# I've mentioned the changed code below for your referance

# client\src\layouts\chat\index.js

<!--  -->

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import { useEffect, useState } from 'react';
import ChatList from 'examples/Lists/ChatList';
import profilesListData from './data/profilesListData';
import ChatBox from './components/ChatBox';
import { BASE_URL } from 'api/axios';
import io from 'socket.io-client';
import useAuth from 'hooks/useAuth';
import { useLocation } from 'react-router-dom';

function Chat() {
const { state } = useLocation();
const { auth } = useAuth();
const [pastChatUsers, setPastChatUsers] = useState([]);
const [socket, setSocket] = useState(null);
const [receiver, setReceiver] = useState(
state?.user?.userId ? state.user : null
);
const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!socket) {
            const newSocket = io.connect(BASE_URL, {
                query: {
                    user: JSON.stringify({
                        id: auth.user_id,
                        name: `${auth.firstname} ${auth.lastname}`,
                    }),
                },
            });

            newSocket.emit('getPastChats');
            newSocket.on('pastChats', (res) => {
                setPastChatUsers(res?.pastUsers || []);
            });

            setSocket(newSocket);
        }

        // Disconnect from the socket when the component unmounts
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Card sx={{ height: 'calc(100vh - 230px)' }}>
                    <MDBox
                        mx={2}
                        mt={-3}
                        py={3}
                        px={2}
                        variant="gradient"
                        bgColor="info"
                        borderRadius="lg"
                        coloredShadow="info"
                    >
                        <MDTypography variant="h6" color="white">
                            Conversations
                        </MDTypography>
                    </MDBox>
                    <MDBox pt={3} sx={{ height: '100%' }}>
                        <Grid
                            container
                            spacing={6}
                            pt={3}
                            sx={{ height: '100%' }}
                        >
                            <Grid item xs={12} md={4}>
                                <ChatList
                                    setReceiver={(user) => {
                                        if (user?.userId != receiver?.userId) {
                                            setReceiver(user);
                                        }
                                    }}
                                    users={pastChatUsers.filter(
                                        (user) => user.userId != auth.user_id
                                    )}
                                    shadow={false}
                                />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                {socket && receiver && (
                                    <ChatBox
                                        setMessages={setMessages}
                                        messages={messages}
                                        receiver={receiver}
                                        socket={socket}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </MDBox>
                </Card>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );

}

export default Chat;

<!--  -->

# client\src\layouts\chat\components\ChatBox.js

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

const ChatBoxContainer = styled(Paper)(({ theme }) => ({
// height: '400px',
height: '100%',
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
// flex: '1',
height: 'calc(100vh - 542px)',
overflowY: 'auto',
padding: '10px',
position: 'relative',
display: 'flex',
flexDirection: 'column',
// justifyContent: isSender ? 'flex-end' : 'flex-start',
}));

const MessageItem = styled(ListItem)(
({ theme, isSender, nextSenderEqualsCurrentSender }) => ({
alignSelf: isSender ? 'flex-end' : 'flex-start', // Align items to the start by default
maxWidth: '80%',
// backgroundColor: isSender ? '#DCF8C6' : '#E0E0E0',
borderRadius: '8px',
// padding: '8px',
marginBottom: nextSenderEqualsCurrentSender ? 1 : '8px',
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
            socket.emit('message', {
                receiver_id: receiver.userId,
                content: newMessage,
            });
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
        socket.emit('getChatHistory', { targetUserId: receiver.userId });
        socket.on('chatHistory', (res) => {
            setMessages(res?.chatHistory?.length ? res.chatHistory : []);
        });
    }, [receiver]);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

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
                                        3:15pm
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
                            console.log(e.key);
                            if (e.key == 'Enter') {
                                handleSendMessage();
                            }
                        }}
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
