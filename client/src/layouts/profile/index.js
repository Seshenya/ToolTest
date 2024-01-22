import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import useAuth from "hooks/useAuth";
import useUserDetails from './hooks/useUserDetails';

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDSnackbar from 'components/MDSnackbar';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Images
import backgroundImage from "assets/images/bg-profile.jpeg";

const initSb = {
  open: false,
  color: '',
  icon: '',
  title: '',
  message: '',
}

const UserDetails = () => {
  const { auth } = useAuth();
  const { userDetails, sbGetUser, closeSb } = useUserDetails(auth.user_id);
  const [uploadedMedia, setUploadedMedia] = useState([])
  const [userData, setUserData] = useState(null);
  const [sb, setSb] = useState({ ...initSb })
  const [isDragging, setIsDragging] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    setUserData(userDetails);
  }, [userDetails]);

  useEffect(() => {
    setSb(sbGetUser);
  }, [sbGetUser]);

  console.log("userDetails", userDetails)
  console.log("userData", userData)

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
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
    const files = e.dataTransfer.files
    console.log('Dropped files:', files)
    setUploadedMedia([...files])
    setValue('profile_picture', files);
  }

  const handleFileInputChange = (e) => {
    console.log('File Input Change:', e.target.files)
    const files = Array.from(e.target.files);
    setUploadedMedia([...files]);
    setValue('profile_picture', files);
  }

  //user profile update
  const handleUserUpdate = async (formData) => {
    axiosPrivate
      .put(`/users/${auth.user_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          setTimeout(() => {
            setUserData(data);
          }, 200)
          setSb({
            open: true,
            color: 'success',
            icon: 'success',
            title: 'User Updated',
            message: '',
          })
          setOpenModal(false);
          reset();
        } else {
          console.error('Failed to update user');
        }
      })
      .catch((error) => {
        setSb({
          open: true,
          color: 'error',
          icon: 'error',
          title: error.message,
          message: '',
        })
      })
  };

  const onSubmit = (data) => {
    console.log("On Submit data:", data);

    const formData = new FormData()
    formData.append('firstname', data?.firstname || '')
    formData.append('lastname', data?.lastname || '')
    formData.append('description', data?.description || '')
    formData.append('skills', data?.skills || '')
    if (data?.profile_picture?.[0]) {
      formData.append('profile_picture', data?.profile_picture[0]);
    }


    handleUserUpdate(formData);

    setOpenModal(false);
    setUploadedMedia([])
    reset();
  };

  const handleFormReset = () => {
    setUploadedMedia([])
    reset();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox position="relative" mb={5}>
        <MDBox
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="18.75rem"
          borderRadius="xl"
          sx={{
            backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.info.main, 0.6),
                rgba(gradients.info.state, 0.6)
              )}, url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            overflow: "hidden",
          }}
        />
        <Card
          sx={{
            position: "relative",
            mt: -8,
            mx: 3,
            py: 2,
            px: 2,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <MDAvatar src={userData?.profile_picture} alt="profile-image" size="xl" shadow="sm" />
            </Grid>
            <Grid item>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  {userData?.firstname} {userData?.lastname}
                </MDTypography>
              </MDBox>
            </Grid>
          </Grid>
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <MDButton
                variant="gradient"
                size="small"
                color={'primary'}
                onClick={handleModalOpen}
              >
                <Icon>edit</Icon>
                Edit
              </MDButton>
              <Grid item xs={12} md={12} xl={12} sx={{ display: "flex" }}>

                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="profile"
                  description={userData?.description}
                  info={{
                    fullName: `${userData?.firstname} ${userData?.lastname}`,
                    email: userData?.email,
                    username: userData?.username,
                    skills: userData?.skills
                  }}
                  shadow={false}
                />
                <Divider orientation="vertical" sx={{ mx: 0 }} />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
      <Dialog open={openModal} onClose={handleModalClose} fullScreen>
        <DialogTitle id="update-status-title">Update User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('firstname')}
              label="First Name"
              defaultValue={userData?.firstname}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              {...register('lastname')}
              label="Last Name"
              defaultValue={userData?.lastname}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
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
              {
                <MDTypography variant="h3" color="primary" gutterBottom>
                  Upload Profile Picture
                </MDTypography>
              }
              <MDTypography variant="body1" color="secondary" gutterBottom>
                {isDragging ? 'Drop your file here' : 'Drag and drop your file here'}
              </MDTypography>
              <MDTypography variant="body1" color="secondary" gutterBottom>
                OR
              </MDTypography>
              <MDButton variant="outlined" component="label" color="primary">
                Upload File
                <input
                  type="file"
                  onChange={handleFileInputChange}
                  hidden
                />
              </MDButton>
              {uploadedMedia.map((file, index) => (
                <MDBox key={index} marginTop="10px" padding="5px" border="1px solid #ccc">
                  <MDTypography variant="body1" color="secondary">
                    {file.name}
                  </MDTypography>
                </MDBox>
              ))}
            </MDBox>
            <TextField
              {...register('description')}
              label="Description"
              defaultValue={userData?.description}
              multiline
              fullWidth
              rows={6}
              margin="normal"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              {...register('skills')}
              label="Skills"
              defaultValue={userData?.skills}
              multiline
              fullWidth
              rows={6}
              margin="normal"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <DialogActions>
              <MDButton type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
                Save
              </MDButton>
              <MDButton onClick={handleFormReset} color="secondary">Reset</MDButton>
              <MDButton onClick={handleModalClose}>Cancel</MDButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <MDSnackbar
        color={sb?.color}
        icon={sb?.icon}
        title={sb?.title}
        content={sb?.message}
        open={sb?.open}
        onClose={closeSb}
        close={closeSb}
        bgWhite
      />
    </DashboardLayout>
  );
}

export default UserDetails;
