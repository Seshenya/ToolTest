
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

    const socket = io.connect(BASE_URL, {
        query: { userId: auth.user_id }
    });

    useEffect(() => {
        // Connect to the socket when the component mounts
        socket.connect();

        // Disconnect from the socket when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, [socket]);

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
                                <ChatList profiles={profilesListData} shadow={false} />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <ChatBox socket={socket} />
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
