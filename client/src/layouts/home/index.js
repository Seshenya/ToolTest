// @mui material components
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'

// Dashboard components

import banner1 from 'assets/images/banners/banner1.png'
import banner2 from 'assets/images/banners/banner2.png'
import { useEffect, useState } from 'react'

import Carousel from 'react-material-ui-carousel'
import ProductCard from 'examples/Cards/ProductCard'

import useAxiosPrivate from 'hooks/useAxiosPrivate'

function Home() {
    const bannersEvents = [banner1, banner2]

    const [trendingProducts, setTrendingProducts] = useState([])
    const axiosPrivate = useAxiosPrivate();

    const [sb, setSb] = useState({
        open: false,
        color: '',
        icon: '',
        title: '',
        message: '',
    });

    const getTrendingMedia = () => {
        axiosPrivate
            .get(`/media`, {
                params: {
                    page: 1,
                    size: 3,
                    status: 3,
                },
            })
            .then((res) => {
                setTrendingProducts(res.data.media);
                console.log(res.data.media);
            })
            .catch((error) => {
                setSb({
                    open: true,
                    color: 'error',
                    icon: 'error',
                    title: error.message,
                    message: '',
                });
            });
    };

    useEffect(() => {
        getTrendingMedia();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Carousel indicators={false}>
                    {bannersEvents.map((banner, idx) => (
                        <MDBox
                            key={idx}
                            display="flex"
                            alignItems="center"
                            position="relative"
                            minHeight="18.75rem"
                            borderRadius="xl"
                            sx={{
                                backgroundImage: ({
                                    functions: { rgba, linearGradient },
                                    palette: { gradients },
                                }) =>
                                    `${linearGradient(
                                        rgba(gradients.info.main, 0.2),
                                        rgba(gradients.info.state, 0.2)
                                    )}, url(${banner})`,
                                backgroundSize: 'cover',
                                backgroundPosition: '100%',
                                overflow: 'hidden',
                            }}
                        />
                    ))}
                </Carousel>
            </MDBox>
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
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
                                    Trending
                                </MDTypography>
                            </MDBox>
                            <MDBox p={3}>
                                <Grid container spacing={6}>
                                    {trendingProducts.map((product, idx) => {
                                        return (
                                            <Grid
                                                key={idx}
                                                item
                                                xs={12}
                                                md={6}
                                                xl={4}
                                            >
                                                <ProductCard
                                                    productId={
                                                        product.product_id
                                                    }
                                                    product={product}
                                                    image={product.thumbnail}
                                                    label={product.title}
                                                    title={product.title}
                                                    description={
                                                        product.description
                                                    }
                                                    action={{
                                                        type: 'internal',
                                                        route: `/shop/${product.product_id}`,
                                                        color: 'primary',
                                                        label: 'Explore',
                                                    }}
                                                    authors={[product.owner_id]}
                                                />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    )
}

export default Home
