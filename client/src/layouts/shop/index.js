// @mui material components
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

// Material Dashboard 2 React example components
import Footer from 'examples/Footer'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

// Data

// Dashboard components

import { useState } from 'react'

import ProductCard from 'examples/Cards/ProductCard'

import { useEffect, useRef } from 'react'

import { CircularProgress } from '@mui/material'
import MDSnackbar from 'components/MDSnackbar'
import useAxiosPrivate from 'hooks/useAxiosPrivate'

import product1 from 'assets/images/trending/product1.png'
import product2 from 'assets/images/trending/product2.png'
import product3 from 'assets/images/trending/product3.png'
import product4 from 'assets/images/trending/product4.png'
import product5 from 'assets/images/trending/product5.png'
import product6 from 'assets/images/trending/product6.png'

function Shop() {
    const [page, setPage] = useState(2)
    const [products, setProducts] = useState([])
    const dummyImages = [
        product1,
        product2,
        product3,
        product4,
        product5,
        product6,
    ]
    const [loading, setLoading] = useState(false)
    const axiosPrivate = useAxiosPrivate()

    const handleChange = (event, value) => {
        setPage(value)
    }

    const filtersRef = useRef({
        category: '',
        mediatype: '',
        query: '',
    })

    const [sb, setSb] = useState({
        open: false,
        color: '',
        icon: '',
        title: '',
        message: '',
    })

    const getMedia = (filters = filtersRef.current) => {
        setLoading(true)
        axiosPrivate
            .get(`/media`, {
                params: {
                    page: 1,
                    size: 10,
                    ...filters,
                },
            })
            .then((res) => {
                setLoading(false)
                setProducts(res.data.media)
                console.log(res.data.media)
            })
            .catch((error) => {
                setLoading(false)
                setSb({
                    open: true,
                    color: 'error',
                    icon: 'error',
                    title: error.message,
                    message: '',
                })
            })
    }

    const closeSb = () => {
        setSb({
            open: false,
            color: '',
            icon: '',
            title: '',
            message: '',
        })
    }

    useEffect(() => {
        getMedia()
    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar
                filters
                reCallApi={getMedia}
                filtersRef={filtersRef}
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
                                {products.map((product, index) => {
                                    return (
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            xl={4}
                                            key={index}
                                        >
                                            <ProductCard
                                                productId={product.product_id}
                                                image={
                                                    dummyImages[
                                                        product.product_id - 1
                                                    ]
                                                }
                                                label={product.title}
                                                title={product.title}
                                                description={
                                                    product.description
                                                }
                                                action={{
                                                    type: 'internal',
                                                    route: '/shop',
                                                    color: 'primary',
                                                    label: 'Explore',
                                                }}
                                                authors={[product.owner_id]}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )}
                    </MDBox>
                    {/* <Pagination sx={{ padding: 2, width: '100%' }} count={10} page={page} onChange={handleChange} /> */}
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
    )
}

export default Shop
