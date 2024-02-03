
// @mui material components
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid'

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from "examples/Footer";
import ProductCard from 'examples/Cards/ProductCard'

// Data
import { useState } from "react";
import { useSnackbar } from "context/SnackbarContext";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SmartSearch() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const { showSnackbar } = useSnackbar();
  const smartsearch = true;

  const handleSmartSearch = (search_term) => {
    setLoading(true);

    axiosPrivate
        .post(`/similarity-search`, { search_term })
        .then(response => {
            setProducts(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            showSnackbar({
                color: 'error',
                icon: 'error',
                title: 'Error in smart search',
                message: error.message,
            });
        });
};


  return (
    <DashboardLayout>
      <DashboardNavbar
        smartsearch
        onSearch={handleSmartSearch}
      />
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
              Matching Products
            </MDTypography>
          </MDBox>
          <MDBox p={3}>
            {loading ? (
              <MDBox style={{ textAlign: 'center' }}>
                <CircularProgress />
              </MDBox>
            ) : (
              <Grid container spacing={6}>
                {products.length ? products.map((product, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      xl={4}
                      key={index}
                    >
                      <ProductCard
                        productId={
                            product.product_id
                        }
                        product={product}
                        image={product.thumbnail}
                        label={product.title}
                        title={product.title}
                        description={
                            product.description
                        }
                        action={{
                            type: 'internal',
                            route: `/shop/${product.product_id}`,
                            color: 'primary',
                            label: 'Explore',
                        }}
                        authors={[product.owner_id]}
                      />
                    </Grid>
                  )
                }) :
                  <Grid
                    item
                    xs={12}
                    md={6}
                    xl={4}
                  >
                    No Matches Available
                  </Grid>
                }
              </Grid>
            )}
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SmartSearch;
