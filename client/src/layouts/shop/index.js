
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data

// Dashboard components

import { useState } from "react";

import ProductCard from "examples/Cards/ProductCard";
import { products } from "constants/DummyProducts";


import { useRef, useEffect } from "react";

import axios from "axios";

import { baseUrl } from "baseUrl";

import MDSnackbar from "components/MDSnackbar";
import { Pagination } from "@mui/material";

function Shop() {

  const [page, setPage] = useState(2);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filtersRef = useRef({
    categoty: '',
    mediatype: '',
    query: ''
  })

  const [sb, setSb] = useState({
    open: false,
    color: "",
    icon: "",
    title: "",
    message: "",
  });

  const getMedia = (filters = filtersRef.current) => {
    axios.get(`${baseUrl}/media`, {
      params: {
        page: 1,
        size: 10,
        ...filters
      }
    }).then((res) => {
      console.log(res)
    }).catch((error) => {
      setSb({
        open: true,
        color: 'error',
        icon: 'error',
        title: error.message,
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

  useEffect(() => {
    getMedia()
  })

  return (
    <DashboardLayout>
      <DashboardNavbar filters reCallApi={getMedia} filtersRef={filtersRef} />
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
            <Grid container spacing={6}>
              {products.map((product) => {
                return (
                  <Grid item xs={12} md={6} xl={4}>
                    <ProductCard
                      image={product.image}
                      label={product.title}
                      title={product.title}
                      description={product.description}
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "primary",
                        label: "Explore",
                      }}
                      authors={[product.creator]}
                    />
                  </Grid>
                )
              })}
            </Grid>
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
  );
}

export default Shop;
