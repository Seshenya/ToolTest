// @mui material components
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 React example components
import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

// Data

// Dashboard components

import { useState } from 'react';

import ProductCard from 'examples/Cards/ProductCard';

import { useEffect, useRef } from 'react';

import { CircularProgress, Pagination } from '@mui/material';
import MDSnackbar from 'components/MDSnackbar';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import useAuth from 'hooks/useAuth'

function Shop() {
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const handleChange = (event, value) => {
        getMedia(filtersRef.current, value);
        setPage(value);
    };

    const filtersRef = useRef({
        category: '',
        mediatype: '',
        query: '',
    });

    const [sb, setSb] = useState({
        open: false,
        color: '',
        icon: '',
        title: '',
        message: '',
    });

    const getMedia = (filters = filtersRef.current, pageNo) => {
        setLoading(true);
        axiosPrivate
            .get(`/media`, {
                params: {
                    page: pageNo,
                    size: 10,
                    status: 3,
                    user_id: auth?.user_id,
                    ...filters,
                },
            })
            .then((res) => {
                setLoading(false);
                setProducts(res.data.media);
                console.log(res.data.media);

                if (res.data.totalCount !== totalCount) {
                    setTotalCount(res.data.totalCount);
                }
            })
            .catch((error) => {
                setLoading(false);
                setSb({
                    open: true,
                    color: 'error',
                    icon: 'error',
                    title: error.message,
                    message: '',
                });
            });
    };

    const closeSb = () => {
        setSb({
            open: false,
            color: '',
            icon: '',
            title: '',
            message: '',
        });
    };

    useEffect(() => {
        getMedia(filtersRef.current, 1);
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar
                filters
                reCallApi={(filtersRef) => {
                    getMedia(filtersRef, 1);
                    setPage(1);
                }}
                filtersRef={filtersRef}
                shop={true}
            />
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
                            Explore
                        </MDTypography>
                    </MDBox>
                    <MDBox p={3}>
                        {loading ? (
                            <MDBox style={{ textAlign: 'center' }}>
                                <CircularProgress />
                            </MDBox>
                        ) : (
                            <Grid container spacing={6}>
                                {products.length ? (
                                    products.map((product, index) => {
                                        return (
                                            <Grid
                                                item
                                                xs={12}
                                                md={6}
                                                xl={4}
                                                key={index}
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
                                        );
                                    })
                                ) : (
                                    <Grid item xs={12} md={6} xl={4}>
                                        No Products Available
                                    </Grid>
                                )}
                            </Grid>
                        )}
                    </MDBox>
                    {products.length ? (
                        <Pagination
                            sx={{
                                padding: 2,
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                            count={Math.ceil(totalCount / 10)}
                            page={page}
                            onChange={handleChange}
                        />
                    ) : null}
                </Card>
            </MDBox>
            <Footer />
            <MDSnackbar
                color={sb.color}
                icon={sb.icon}
                title={sb.title}
                content={sb.message}
                open={sb.open}
                onClose={closeSb}
                close={closeSb}
                bgWhite
            />
        </DashboardLayout>
    );
}

export default Shop;
