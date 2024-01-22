import { Box, Card, IconButton } from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import FilterTabItem from './components/FilterTabItem';
import { EditorTabs, FilterTabs } from './config/constants';
import ThreeTeeCanvas from './containers/threeTeeCanvascanvas';
import { ThreeSixtyRounded } from '@mui/icons-material';
import { threeTeeState } from './store';
import { useSnapshot } from 'valtio';

const ThreeTee = () => {
    const { rotate } = useSnapshot(threeTeeState);
    return (
        <DashboardLayout>
            <DashboardNavbar hideBreadCrumbs />
            <MDBox py={3}>
                <Card sx={{ margin: 3 }}>
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
                            Create custom t-shirt
                        </MDTypography>
                    </MDBox>
                    <MDBox
                        p={3}
                        sx={{
                            height: 'calc(100vh - 300px)',
                            position: 'relative',
                        }}
                    >
                        <ThreeTeeCanvas />
                        <Card
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                borderRadius: '0 0.75rem 0.75rem 0',
                                padding: 1,
                                gap: 1,
                            }}
                        >
                            {EditorTabs.map((tab, idx) => {
                                return (
                                    <Box
                                        key={idx}
                                        sx={{
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {tab.component}
                                    </Box>
                                );
                            })}
                        </Card>

                        <MDBox
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderRadius: '0.75rem 0.75rem 0 0',
                                padding: 1,
                                gap: 2,
                                marginBottom: 3,
                            }}
                        >
                            {FilterTabs.map((tab, idx) => {
                                return <FilterTabItem tab={tab} key={idx} />;
                            })}
                        </MDBox>

                        <MDBox
                            sx={{
                                position: 'absolute',
                                left: '50%',
                                bottom: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <IconButton
                                size={'large'}
                                sx={{
                                    opacity: 0.5,
                                    '&:hover': {
                                        opacity: 1,
                                    },
                                    transition: '0.2s all ease-in',
                                }}
                                onClick={() => (threeTeeState.rotate = !rotate)}
                            >
                                <ThreeSixtyRounded />
                            </IconButton>
                        </MDBox>
                    </MDBox>
                </Card>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
};

export default ThreeTee;
