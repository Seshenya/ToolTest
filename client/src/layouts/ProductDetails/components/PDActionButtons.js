import { StoreRounded, SwapHorizRounded } from '@mui/icons-material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import { useContext, useState } from 'react';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import AuthContext from 'context/AuthProvider';

const PDActionButtons = ({ productDetails }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const navigate = useNavigate();

    const handleBuyClick = () => {
        setShowConfirmationModal(true);
    };

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        // setShowConfirmationModal(false);
        // const link = document.createElement('a');
        // link.href = productDetails.media;
        // link.target = '_blank';
        // link.download = `downloaded_media.${productDetails.file_format}`;
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);

        setLoading(true);
        axiosPrivate
            .post(`/buy-media/${auth.user_id}/${productDetails.product_id}`)
            .then((resp) => {
                // console.log(resp);
                navigate('/order-history');
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const handleCloseModal = () => {
        setShowConfirmationModal(false);
    };

    const goOrderHistory = () => {
        // TODO not implemented change onClick to go to order history
        console.log('go to order history');
    };

    return (
        <>
            <MDButton
                variant="gradient"
                color={'primary'}
                fullWidth
                sx={{ marginBottom: 1 }}
                onClick={handleBuyClick}
            >
                Buy now &nbsp;
                <StoreRounded />
            </MDButton>
            <MDBox sx={{ display: 'flex', gap: 1 }}>
                <MDButton
                    color={'secondary'}
                    fullWidth
                    onClick={() => {
                        if (productDetails?.productDetails?.owner?.user_id) {
                            navigate(`/chat`, {
                                state: {
                                    user: {
                                        userId: productDetails?.productDetails
                                            ?.owner?.user_id,
                                        name: `${productDetails?.productDetails?.owner?.firstname} ${productDetails?.productDetails?.owner?.lastname}`,
                                    },
                                },
                            });
                        }
                    }}
                >
                    Contact Seller &nbsp;
                    <SwapHorizRounded />
                </MDButton>
                {/* <MDButton variant='gradient' color={'secondary'} fullWidth>
          Add to Cart &nbsp;
          <ShoppingCartRounded />
        </MDButton> */}
            </MDBox>
            <ConfirmationModal
                open={showConfirmationModal}
                onClose={handleCloseModal}
                onConfirm={handleDownload}
                confirmationText={`Are you sure you want to buy this media for €${parseFloat(
                    productDetails.price
                ).toFixed(2)}?`}
                loading={loading}
            />
        </>
    );
};

export default PDActionButtons;
