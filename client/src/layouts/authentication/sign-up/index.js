
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/hs-fulda.jpeg";

import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import axios from "api/axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Cover() {

  const navigate = useNavigate();

  const [sb, setSb] = useState({
    open: false,
    color: "",
    icon: "",
    title: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const closeSb = () => {
    setSb({
      open: false,
      color: "",
      icon: "",
      title: "",
      message: "",
    })
  }

  const onSubmit = (data) => {
    const userData = data;

    delete userData['passwordRepeat']

    axios.post(`/users`, {
      ...userData,
      type: 1,
      active_status: 1
    }).then((res) => {
      if (res.data) {
        navigate('/authentication/sign-in')
      }
    }).catch((error) => {
      console.log(error.response.data.message)
      setSb({
        open: true,
        color: 'error',
        icon: 'error',
        title: error?.response?.data?.message || error?.message,
        message: ""
      })
    })
  }


  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="primary"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox>
              <MDBox mb={2}>
                <TextField
                  {...register("firstname", { required: 'First Name is Required' })}
                  type="text"
                  name="firstname"
                  label="First Name"
                  color="primary"
                  variant="standard"
                  fullWidth
                  error={!!errors.firstname}
                  helperText={errors.firstname?.message}
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  {...register("lastname", { required: 'Last Name is Required' })}
                  type="text"
                  name="lastname"
                  label="Last Name"
                  color="primary"
                  variant="standard"
                  fullWidth
                  error={!!errors.lastname}
                  helperText={errors.lastname?.message}
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  {...register("username", { required: 'Username is Required' })}
                  type="text"
                  name="username"
                  label="Username"
                  variant="standard"
                  fullWidth
                  required
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  {...register("email", {
                    required: 'Email is Required', pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?hs-fulda\.de$/,
                      message: 'Invalid email format',
                    },
                  })}
                  type="email"
                  name="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  required
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  {...register("password", {
                    required: 'Password is Required',
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters"
                    }
                  })}
                  type="password"
                  name="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  required
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  {...register("passwordRepeat", {
                    required: 'Password is Required',
                    validate: value =>
                      watch('password') == value || "The passwords do not match"
                  })}
                  type="password"
                  name="passwordRepeat"
                  label="Verify Password"
                  variant="standard"
                  fullWidth
                  required
                  error={!!errors.passwordRepeat}
                  helperText={errors.passwordRepeat?.message}
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="primary" type="submit" fullWidth>
                  sign up
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="primary"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </form>
      </Card>
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
    </CoverLayout >
  );
}

export default Cover;
