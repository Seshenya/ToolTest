import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import React, { useEffect, useState } from 'react';
import PDMainImage from './components/PDMainImage';
import PDSellerInfo from './components/PDSellerInfo';
import { CircularProgress, Grid } from '@mui/material';
import NewArrivalIcon from './components/NewArrivalIcon';
import PDInfoSection from './components/PDInfoSection';
import PDActionButtons from './components/PDActionButtons';
import { useNavigate, useParams } from 'react-router-dom';
import useProductDetails from './hooks/useProductDetails';
import useProductReviewDetails from './hooks/useProductReviewDetails';
import MDSnackbar from 'components/MDSnackbar';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import useAuth from 'hooks/useAuth';
import MDTypography from '@mui/material/Typography';

const ProductDetails = () => {
    const { productId } = useParams();
    const { productDetails, sb, closeSb } = useProductDetails(productId);
    const { productReviewDetails, sbar, closeSbar } =
        useProductReviewDetails(productId);
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [projectOn3D, setProjectOn3D] = useState(false)
    const [isPattern, setIsPattern] = useState(false)
    const [patternLoading, setPatternLoading] = useState(false)

    useEffect(() => {
        if (
            productDetails &&
            (productDetails?.isDeleted ||
                (auth.type === 1 && productDetails?.status !== 3))
        ) {
            navigate(`/shop`);
        }
    }, [productDetails, productId]);

    return (
        <DashboardLayout>
            <DashboardNavbar hideBreadCrumbs />
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
                            <PDMainImage projectOn3D={projectOn3D} productDetails={productDetails} setIsPattern={setIsPattern} setPatternLoading={setPatternLoading} setProjectOn3D={setProjectOn3D} />
                            <br />
                            {auth?.user_id ? <PDActionButtons productDetails={productDetails} projectOn3D={projectOn3D} setProjectOn3D={setProjectOn3D} isPattern={isPattern} patternLoading={patternLoading} /> : 'You need to sign in to access all functionalities'}
                            <br />
                            <br />
                            <PDSellerInfo productDetails={productDetails} />
                            <MDBox style={{ textAlign: 'center' }}>
                                <MDTypography variant="h6" fontWeight="medium">
                                    {productDetails?.selling_count === 0 ? (
                                        "No units sold yet"
                                    ) : productDetails?.selling_count === 1 ? (
                                        `This item was sold once`
                                    ) : (
                                        `This item was sold ${productDetails?.selling_count} times`
                                    )}
                                </MDTypography>
                            </MDBox>

                        </MDBox>
                    </Grid>
                    <Grid item width={'100%'}>
                        <NewArrivalIcon />
                        <PDInfoSection
                            productReviewDetails={productReviewDetails}
                            productDetails={productDetails}
                        />
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
