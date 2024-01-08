import React, { useState, useEffect, useRef } from 'react'

// @mui material components
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Icon from '@mui/material/Icon'
import { CircularProgress, Pagination } from '@mui/material'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDButton from 'components/MDButton'
import MDSnackbar from 'components/MDSnackbar'
import AddEditProductModal from './components/AddEditProductModal'

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import ProductCard from 'examples/Cards/ProductCard'

import useAxiosPrivate from 'hooks/useAxiosPrivate'
import useAuth from 'hooks/useAuth'


function Sell() {
  const [page, setPage] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [categories, setCategories] = useState([]);
  const [mediaTypes, setMediaTypes] = useState([]);
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth();


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

  const refreshSellPage = () => {
    getMedia(filtersRef.current, 1);
  }

  const handleModalOpen = () => {
    setOpenModal(true)
  }

  const handleModalClose = () => {
    setOpenModal(false)
  }

  const handleChange = (event, value) => {
    getMedia(filtersRef.current, value)
    setPage(value)
  }

  const fetchCategories = async () => {
    try {
      const response = await axiosPrivate.get('/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMediaTypes = async () => {
    try {
      const response = await axiosPrivate.get('/types/');
      setMediaTypes(response.data);
    } catch (error) {
      console.error('Error fetching media types:', error);
    }
  };

  const getMedia = (filters = filtersRef.current, pageNo) => {
    setLoading(true)
    axiosPrivate
      .get(`/media`, {
        params: {
          page: pageNo,
          size: 10,
          owner_id: auth?.user_id,
          ...filters,
        },
      })
      .then((res) => {
        setLoading(false)
        setProducts(res.data.media)
        console.log(res.data.media)

        if (res.data.totalCount !== totalCount) {
          setTotalCount(res.data.totalCount)
        }
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
    fetchCategories();
    fetchMediaTypes();
    getMedia(filtersRef.current, 1);
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar
        filters
        reCallApi={(filtersRef) => {
          getMedia(filtersRef, 1)
          setPage(1)
        }}
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
            display="flex"
            justifyContent="space-between"
          >
            <MDTypography variant="h6" color="white">
              Your Products
            </MDTypography>
            <MDButton
              variant="gradient"
              size="small"
              color={'primary'}
              onClick={handleModalOpen}
            >
              <Icon>add</Icon>
              Add New
            </MDButton>
          </MDBox>
          <MDBox p={3}>
            {loading ? (
              <MDBox style={{ textAlign: 'center' }}>
                <CircularProgress />
              </MDBox>
            ) : (
              <Grid container spacing={6}>
                {products.length ? products.map((product, index) => {
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
                        product={product}
                        image={product.thumbnail}
                        label={product.title}
                        title={product.title}
                        status={product.status}
                        description={
                          product.description
                        }
                        action={{
                          type: 'internal',
                          route: '/sell',
                        }}
                        authors={[product.owner_id]}
                        categories={categories}
                        mediaTypes={mediaTypes}
                        comment={product.comment}
                        deleteBtn
                        discountCode
                        editBtn
                        refreshSellPage={refreshSellPage}
                      />
                    </Grid>
                  )
                }) :
                  <Grid
                    item
                    xs={12}
                    md={6}
                    xl={4}
                  >
                    No Products Available
                  </Grid>
                }
              </Grid>
            )}
          </MDBox>
          {products.length ? <Pagination
            sx={{
              padding: 2,
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            count={Math.ceil(totalCount / 10)}
            page={page}
            onChange={handleChange}
          /> : null}
        </Card>
      </MDBox>
      <Footer />
      <AddEditProductModal
        openModal={openModal}
        onClose={handleModalClose}
        setOpenModal={setOpenModal}
        categories={categories}
        mediaTypes={mediaTypes}
      />
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

export default Sell