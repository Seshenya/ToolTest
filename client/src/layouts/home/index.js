
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

import Carousel from 'react-material-ui-carousel';
import ProductCard from "examples/Cards/ProductCard";

import product1 from "assets/images/trending/product1.png";
import product2 from "assets/images/trending/product2.png";
import product3 from "assets/images/trending/product3.png";
import Annoucements from "./components/Annoucements";

import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";


function Home() {
  const { sales, tasks } = reportsLineChartData;

  const bannersEvents = [banner1, banner2]

  const [trendingProducts, setTrendingProducts] = useState([
    {
      image: product1,
      title: "Product 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus dolor, vehicula placerat tincidunt vitae, porttitor eget lectus. ",
      creator: {
        image: team1,
        name: "Creator 1"
      }
    },
    {
      image: product2,
      title: "Product 2",
      description: "Aenean ut ante sit amet eros faucibus euismod vel non ante. Nullam dignissim elementum laoreet, porttitor eget lectus. ",
      creator: {
        image: team2,
        name: "Creator 2"
      }
    },
    {
      image: product3,
      title: "Product 3",
      description: "Curabitur convallis eros lectus, in lobortis dui mattis non. Nulla mi lacus, luctus id dui ac, ullamcorper accumsan nisl. ",
      creator: {
        image: team3,
        name: "Creator 3"
      }
    }
  ])


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Carousel
          indicators={false}
        >
          {
            bannersEvents.map((banner) => (
              <MDBox
                display="flex"
                alignItems="center"
                position="relative"
                minHeight="18.75rem"
                borderRadius="xl"
                sx={{
                  backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
                    `${linearGradient(
                      rgba(gradients.info.main, 0.2),
                      rgba(gradients.info.state, 0.2)
                    )}, url(${banner})`,
                  backgroundSize: "cover",
                  backgroundPosition: "100%",
                  overflow: "hidden",
                }}
              />
            ))
          }
        </Carousel>
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
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
                  Trending
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={6}>
                  {trendingProducts.map((product) => {
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
                            color: "info",
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
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Annoucements />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Home;
