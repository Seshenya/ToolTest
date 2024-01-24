import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

// @mui material components
import Card from '@mui/material/Card';
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DataTable from "examples/Tables/DataTable";
import MDButton from 'components/MDButton';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

// Data
import categoriesTableData from "./data/categoriesData";

import ReactGa from 'react-ga4';


function Categories() {
    const [categories, setCategories] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm();
    const axiosPrivate = useAxiosPrivate()

    const [updateCategoryOpen, setUpdateCategoryOpen] = useState(false);
    const { columns: categoryCols } = categoriesTableData();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axiosPrivate.get('/categories/');
            setCategories(response.data); 
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleModalOpen = () => {
        setOpenModal(true);
    };
    
    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleUpdateModalClose = () => {
      setUpdateCategoryOpen(false);
      setSelectedCategory(null); 
    };

    const handleCategoryCreation = async (formData) => {
        try {
            const formDataObject = {};
            formData.forEach((value, key) => {
              formDataObject[key] = value;
            });
            const response = await axiosPrivate.post('/categories/', JSON.stringify(formDataObject), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status === 200) {
            ReactGa.event({
              category: 'Category',
              action: 'Category Created'
            })
            const data = response.data;
            console.log('New category created:', data);

            fetchData();  // Refetch categories after successfully creating a new category

            setOpenModal(false);
            reset();
          } else {
            console.error('Failed to create category');
          }
        } catch (error) {
          console.error('Error creating category:', error);
        }
      };

    const onSubmit = async(data) => {
        console.log("On Submit:", data);
    
        const formData = new FormData();
        formData.append('type', data.type);
        
        handleCategoryCreation(formData);
        
        setOpenModal(false);
        reset();
    };

    const handleEditCategory = (category) => {
      setSelectedCategory(category);
      setUpdateCategoryOpen(true);
      setValue('type', category.type); // Set the value of the 'type' field in the Update Modal
    }; 

    const handleCategoryUpdate = async (formData) => {
      try {
        if (!selectedCategory) {
          console.error('No category selected for update');
          return;
        }
  
        const formDataObject = {};
        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });
  
        const response = await axiosPrivate.put(`/categories/${selectedCategory.id}`, JSON.stringify(formDataObject), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          ReactGa.event({
            category: 'Category',
            action: 'Category Updated'
          })
          const updatedCategory = response.data;
          console.log('Category updated:', updatedCategory);
  
          // Refetch categories after successfully updating a category
          fetchData();
  
          setUpdateCategoryOpen(false);
          reset();
        } else {
          console.error('Failed to update category');
        }
      } catch (error) {
        ReactGa.exception({
          description: `Error updating category ${selectedCategory.id}:`,
          fatal: false,
        })
        console.error('Error updating category:', error);
      }
    };

    const onUpdateSubmit = async(data) => {
      console.log("On Update Submit:", data);
  
      const formData = new FormData();
      formData.append('type', data.type);
      
      handleCategoryUpdate(formData);
      
      setUpdateCategoryOpen(false);
      reset();
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card sx={{ margin: 3 }}>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant='gradient'
            bgColor='info'
            borderRadius='lg'
            coloredShadow='info'
            display='flex'
            justifyContent='space-between'
          >
            <MDTypography variant='h6' color='white'>
              Categories
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
            <DataTable
              table={{ columns: categoryCols, rows: categories.map(category => {
                return {
                  type: category.type,
                  action: (
                      <MDBox>
                          <Icon fontSize='small' onClick={() => handleEditCategory(category)}>
                          edit
                          </Icon>
                      </MDBox>
                  ),
                };
              }), }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle id="add-new-category">Add New Category</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('type')}
              label="Type"
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <DialogActions>
              <MDButton type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
                Add category
              </MDButton>
              <MDButton onClick={handleModalClose}>Cancel</MDButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={updateCategoryOpen} onClose={() => setUpdateCategoryOpen(false)}>
        <DialogTitle id="update-category-type">Update Category</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onUpdateSubmit)}>
            <TextField
              {...register('type')}
              label="Type"
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <DialogActions>
              <MDButton type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
                Update category
              </MDButton>
              <MDButton onClick={handleUpdateModalClose}>Cancel</MDButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

export default Categories;
