import { StoreRounded, SwapHorizRounded } from '@mui/icons-material'
import MDBox from 'components/MDBox'
import MDButton from 'components/MDButton'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from './ConfirmationModal'
import { useState } from "react"

const PDActionButtons = (productDetails) => {



    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const navigate = useNavigate()

    const handleBuyClick = () => {
        setShowConfirmationModal(true)
    }

    const handleCloseModal = () => {
        setShowConfirmationModal(false)
    }

    const handleConfirm = () => {
        navigate('/order-history');
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
                <MDButton color={'secondary'} fullWidth onClick={() => {
                    if (productDetails?.productDetails?.owner?.user_id) {
                        navigate(`/chat`, {
                            state: {
                                user: {
                                    userId: productDetails?.productDetails?.owner?.user_id,
                                    name: `${productDetails?.productDetails?.owner?.firstname} ${productDetails?.productDetails?.owner?.lastname}`
                                }
                            }
                        })
                    }
                }}>
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
                onConfirm={handleConfirm}
                confirmationText={`Are you sure you want to buy this media for $${Number(productDetails?.productDetails?.price).toFixed(2)}?`}
            ></ConfirmationModal>
        </>
    )
}

export default PDActionButtons
