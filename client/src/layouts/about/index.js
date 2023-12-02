import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { aboutData } from 'constants/AboutData';
import DeveloperCard from 'examples/Cards/DeveloperCards';



const TeamMember = (props) => {
    const navigate = useNavigate();

    return (
        <Grid item xs={12} md={6} xl={3}>
            <DeveloperCard
                image={props.developer.image}
                label={props.developer.name}
                title={props.developer.name}
                description={props.developer.role}
                action={{
                    type: "internal",
                    route: `/about/${props.member}`,
                    color: "info",
                    label: "view profile",
                }}
            />
        </Grid>
    );
}

const Team = () => {

    return (
        <DashboardLayout>
            <MDBox mb={2} />
            <Card sx={{ padding: 2 }}>
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
                    <MDTypography variant="h5" color="white">
                        GDSD Winter 2023 Team 4
                    </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                    <Grid container spacing={6}>
                        {Object.keys(aboutData).map((member, index) => (
                            member !== "John" ? (
                                <TeamMember key={index} developer={aboutData[member]} member={member} />
                            ) : null
                        ))}
                    </Grid>
                </MDBox>
            </Card>
            <Footer />
        </DashboardLayout>
    );
}

export default Team;
