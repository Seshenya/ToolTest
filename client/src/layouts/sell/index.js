import React, { useState, useEffect } from 'react'

// @mui material components
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Icon from '@mui/material/Icon'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDButton from 'components/MDButton'

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'

import ProductCard from 'examples/Cards/ProductCard'

import { products } from 'constants/DummyProducts'
import AddEditProductModal from './components/AddEditProductModal'
import useAxiosPrivate from 'hooks/useAxiosPrivate'


function Sell() {
  const [openModal, setOpenModal] = useState(false)
  const [categories, setCategories] = useState([]);
  const [mediaTypes, setMediaTypes] = useState([]);
  const axiosPrivate = useAxiosPrivate()


  const handleModalOpen = () => {
    setOpenModal(true)
  }

  const handleModalClose = () => {
    setOpenModal(false)
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

  useEffect(() => {
    fetchCategories();
    fetchMediaTypes();
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar filters />
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
            <Grid container spacing={6}>
              {products.map((product) => {
                return (
                  <Grid item xs={12} md={6} xl={4}>
                    {console.log(product)}
                    <ProductCard
                      productId={product.id}
                      {...product}
                      deleteBtn
                      discountCode
                      editBtn
                    />
                  </Grid>
                )
              })}
            </Grid>
          </MDBox>
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
    </DashboardLayout>
  )
}

export default Sell