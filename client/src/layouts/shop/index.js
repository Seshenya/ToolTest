
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
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components

import banner1 from "assets/images/banners/banner1.png";
import banner2 from "assets/images/banners/banner2.png";
import { useState } from "react";

import ProductCard from "examples/Cards/ProductCard";
import { products } from "constants/DummyProducts";





function Shop() {

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
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Shop;
