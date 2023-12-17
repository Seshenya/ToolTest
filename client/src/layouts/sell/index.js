import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import useAxiosPrivate from 'hooks/useAxiosPrivate'

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

function Sell() {
    const [openModal, setOpenModal] = useState(false)
    const { register, handleSubmit, reset, setValue } = useForm()
    const axiosPrivate = useAxiosPrivate()

    const handleModalOpen = () => {
        setOpenModal(true)
    }

    const handleModalClose = () => {
        setOpenModal(false)
    }

    const handleMediaCreation = async (formData) => {
        try {
            const response = await axiosPrivate.post('/media/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.status === 200) {
                const data = response.data
                console.log('New media created:', data)
                setOpenModal(false)
                reset()
            } else {
                console.error('Failed to create media')
            }
        } catch (error) {
            console.error('Error creating media:', error)
        }
    }

    const onSubmit = (data) => {
        console.log('On Submit:', data)

        const formData = new FormData()
        formData.append('media_type', data.media_type)
        formData.append('owner', '1') // TODO: Change this to the logged in user's ID
        formData.append('price', data.price)
        formData.append('status', '1')
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('tags', data.tags)
        formData.append(
            'file_format',
            data.file.name.split('.').pop().toLowerCase()
        )
        formData.append('previews', '/media/previews/') // TODO: Add previews
        formData.append('thumbnail', '/media/thumbnail.jpg') // TODO: Add thumbnail
        formData.append('category', data.category)
        formData.append('media', data.file)

        console.log('Form Data:', formData)

        handleMediaCreation(formData)

        setOpenModal(false)
        reset()
    }

    const handleFormReset = () => {
        reset()
    }

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
                onReset={handleFormReset}
                onSubmit={handleSubmit(onSubmit)}
                setValue={setValue}
                register={register}
            />
        </DashboardLayout>
    )
}

export default Sell
