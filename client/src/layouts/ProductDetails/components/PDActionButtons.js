import { StoreRounded, SwapHorizRounded } from '@mui/icons-material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import { useContext, useState } from 'react';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import AuthContext from 'context/AuthProvider';
import ReactGa from 'react-ga4';

const PDActionButtons = ({ productDetails, projectOn3D, setProjectOn3D }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const navigate = useNavigate();

    const handleBuyClick = () => {
        setShowConfirmationModal(true);
    };

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleConfirm = () => {
        setLoading(true);
        axiosPrivate
            .post(`/buy-media/${auth.user_id}/${productDetails.product_id}`)
            .then((resp) => {
                ReactGa.event({
                    category: 'User',
                    action: 'Bought media',
                })
                // console.log(resp);
                navigate('/order-history');
            })
            .catch((err) => {
                ReactGa.send('exception', {
                    exDescription: "Error buying media",
                    description: err?.response?.data?.message || err?.message,
                    exFatal: false
                });
                setLoading(false);
                console.log(err);
            });
    };

    const handleCloseModal = () => {
        setShowConfirmationModal(false);
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
                        if (productDetails?.owner?.user_id) {
                            navigate(`/chat`, {
                                state: {
                                    user: {
                                        userId: productDetails?.owner?.user_id,
                                        name: `${productDetails?.owner?.firstname} ${productDetails?.owner?.lastname}`,
                                    },
                                },
                            });
                        }
                    }}
                >
                    Contact Seller &nbsp;
                    <SwapHorizRounded />
                </MDButton>
            </MDBox>
            <MDButton
                variant="gradient"
                color={'secondary'}
                fullWidth
                sx={{ marginTop: 1 }}
                onClick={() => {
                    setProjectOn3D(!projectOn3D)
                }}
            >
                {projectOn3D ? `Original Image` : `Project On 3D`}
            </MDButton>
            <ConfirmationModal
                open={showConfirmationModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                confirmationText={`Are you sure you want to buy this media for €${parseFloat(
                    productDetails.price
                ).toFixed(2)}?`}
                loading={loading}
            />
        </>
    );
};

export default PDActionButtons;
