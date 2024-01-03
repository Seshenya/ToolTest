import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import React from 'react';
import PDMainImage from './components/PDMainImage';
import PDSellerInfo from './components/PDSellerInfo';
import { CircularProgress, Grid } from '@mui/material';
import NewArrivalIcon from './components/NewArrivalIcon';
import PDInfoSection from './components/PDInfoSection';
import PDActionButtons from './components/PDActionButtons';
import { useParams } from 'react-router-dom';
import useProductDetails from './hooks/useProductDetails';
import useProductReviewDetails from './hooks/useProductReviewDetails';
import MDSnackbar from 'components/MDSnackbar';

const ProductDetails = () => {
  const { productId } = useParams();
  const { productDetails, sb, closeSb } = useProductDetails(productId);
  const { productReviewDetails, sbar, closeSbar } = useProductReviewDetails(productId);

  return (
    <DashboardLayout>
      {productDetails && productReviewDetails ? (
        <Grid
          container
          flexWrap={'nowrap'}
          columnGap={6}
          rowGap={6}
          flexDirection={{
            lg: 'row',
            md: 'row',
            sm: 'column',
            xs: 'column',
          }}
        >
          <Grid
            item
            /* minWidth={'500px'} */ maxWidth={{
              lg: '40%',
              md: '50%',
              sm: '100%',
              xs: '100%',
            }}
          >
            <MDBox sx={{ position: 'sticky', top: '24px' }}>
              <PDMainImage productDetails={productDetails} />
              <br />
              <PDActionButtons productDetails={productDetails} />
              <br />
              <br />
              <PDSellerInfo />
            </MDBox>
          </Grid>
          <Grid item width={'100%'}>
            <NewArrivalIcon />
            <PDInfoSection productReviewDetails={productReviewDetails} productDetails={productDetails} />
          </Grid>
        </Grid>
      ) : (
        <MDBox
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 'calc(100vh - 50px)',
          }}
        >
          <CircularProgress />
        </MDBox>
      )}
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
      <MDSnackbar
        color={sbar.color}
        icon={sbar.icon}
        title={sbar.title}
        content={sbar.message}
        open={sbar.open}
        onClose={closeSbar}
        close={closeSbar}
        bgWhite
      />
    </DashboardLayout>
  );
};

export default ProductDetails;
