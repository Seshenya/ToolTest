

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

import { TextField } from "@mui/material";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/hs-fulda.jpeg";
import axios from "api/axios";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "hooks/useAuth";

import ReactGa from "react-ga4";

function Basic() {

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

  const { updateAuth } = useAuth();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post(`login`,
        {
          ...data
        }
      )
      .then((res) => {
        ReactGa.event({
          category: "User",
          action: "User logged in"
        })
        updateAuth({ ...res.data.user, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken })
        navigate('/shop')
      }).catch((error) => {
        ReactGa.send('exception', {
          exDescription: "User login failed",
          description: error?.response?.data?.message || error?.message || '',
          exFatal: false
        });
        setSb({
          open: true,
          color: 'error',
          icon: 'error',
          title: error?.response?.data?.message || error?.message || '',
          message: ""
        })
      })
  }

  const closeSb = () => {
    setSb({
      open: false,
      color: "",
      icon: "",
      title: "",
      message: "",
    })
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="primary"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <MDBox >
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
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="primary" type="submit" fullWidth>
                  sign in
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Don&apos;t have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-up"
                    variant="button"
                    color="primary"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign up
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </form>
        </MDBox>
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
    </BasicLayout>
  );
}

export default Basic;
