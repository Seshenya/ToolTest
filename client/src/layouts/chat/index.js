
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import ChatList from "examples/Lists/ChatList";
import profilesListData from "./data/profilesListData";
import ChatBox from "./components/ChatBox";
import { BASE_URL } from "api/axios";
import io from 'socket.io-client';
import useAuth from "hooks/useAuth";


function Chat() {

    const { auth } = useAuth();
    const [onlineUsers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(null);
    const [receiver, setReceiver] = useState(null);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        if (!socket) {
            const newSocket = io.connect(BASE_URL, {
                query: { user: JSON.stringify({ id: auth.user_id, name: `${auth.firstname} ${auth.lastname}` }) },
            });

            const handleOnlineUsers = (updatedOnlineUsers) => {
                setOnlineUsers(updatedOnlineUsers);
                console.log(updatedOnlineUsers);
            };

            newSocket.on('onlineUsers', handleOnlineUsers);

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
                <Card>
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
                    <MDBox pt={3}>
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={4}>
                                <ChatList setReceiver={(user) => {
                                    if (user?.id != receiver?.id) {
                                        setReceiver(user)
                                    }
                                }} users={onlineUsers.filter((user) => user.id != auth.user_id)} shadow={false} />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                {socket && receiver && <ChatBox setMessages={setMessages} messages={messages} receiver={receiver} socket={socket} />}
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
