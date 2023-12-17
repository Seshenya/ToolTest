import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


import ProductCard from "examples/Cards/ProductCard";

import { products } from "constants/DummyProducts";


function Sell() {

  const [openModal, setOpenModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const axiosPrivate = useAxiosPrivate()

  const [categories, setCategories] = useState([]);
  const [mediaTypes, setMediaTypes] = useState([]);

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

  const handleModalOpen = () => {
    setOpenModal(true);
    fetchCategories();
    fetchMediaTypes();
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleMediaCreation = async (formData) => {
    try {
      const response = await axiosPrivate.post('/media/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log('New media created:', data);
        setOpenModal(false);
        reset();
      } else {
        console.error('Failed to create media');
      }
    } catch (error) {
      console.error('Error creating media:', error);
    }
  };

  const onSubmit = (data) => {
    console.log("On Submit:", data);

    const formData = new FormData();
    formData.append('media_type', data.media_type);
    formData.append('owner', '1'); // TODO: Change this to the logged in user's ID
    formData.append('price', data.price);
    formData.append('status', '1');
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('tags', data.tags);
    formData.append('file_format', data.file.name.split('.').pop().toLowerCase());
    formData.append('previews', '/media/previews/'); // TODO: Add previews
    formData.append('thumbnail', '/media/thumbnail.jpg'); // TODO: Add thumbnail
    formData.append('category', data.category);
    formData.append('media', data.file);

    console.log("Form Data:", formData);

    handleMediaCreation(formData);
    
    setOpenModal(false);
    reset();
  };

  const handleFormReset = () => {
    reset();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    console.log('Dropped files:', files);
  };

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
            display='flex'
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
                    <ProductCard
                      image={product.image}
                      label={product.title}
                      title={product.title}
                      description={product.description}
                      deleteBtn
                      discountCode
                      editBtn
                      status={product.status}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
      <Dialog open={openModal} onClose={handleModalClose} fullScreen>
        <DialogTitle id="update-status-title">Add New Item</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('title')}
              label="Title"
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              {...register('price')}
              label="Price"
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              {...register('description')}
              label="Description"
              multiline
              fullWidth
              rows={6}
              margin="normal"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              {...register('media_type')}
              select
              label="Media Type"
              fullWidth
              margin="normal"
              variant="outlined"
              SelectProps={{
                native: true,
              }}
              sx={{ marginBottom: 2 }}
            >
              {mediaTypes.map((mediaType) => (
                <option value={mediaType.id}>
                 {mediaType.type}
                </option>
              ))}
            </TextField>
            {/* Drag and Drop for Files */}
            <MDBox
              border={isDragging ? '2px dashed #aaa' : '2px dashed #ccc'}
              borderRadius="5px"
              padding="20px"
              marginBottom="20px"
              textAlign="center"
              onDragOver={(e) => handleDragEnter(e)}
              onDragEnter={(e) => handleDragEnter(e)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDrop={(e) => handleDrop(e)}
            >
              <MDTypography variant="body1" color="textSecondary" gutterBottom>
                {isDragging ? 'Drop your file here' : 'Drag and drop your file here'}
              </MDTypography>
              <MDTypography variant="body1" color="textSecondary" gutterBottom>
                OR
              </MDTypography>
              <MDButton variant="outlined" component="label" color="primary">
                Upload File
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setValue('file', file);
                  }}
                  hidden
                />
              </MDButton>
            </MDBox>
            <TextField
              {...register('tags')}
              label="Tags"
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              {...register('category')}
              select
              label="Category"
              fullWidth
              margin="normal"
              variant="outlined"
              SelectProps={{
                native: true,
              }}
              sx={{ marginBottom: 2 }}
            >
             {categories.map((category) => (
                <option value={category.type}>
                 {category.type}
                </option>
              ))}
            </TextField>
            <DialogActions>
              <MDButton type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
                Send for Approval
              </MDButton>
              <MDButton onClick={handleFormReset} color="secondary">Reset</MDButton>
              <MDButton onClick={handleModalClose}>Cancel</MDButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

export default Sell;
