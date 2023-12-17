import { StoreRounded, SwapHorizRounded } from '@mui/icons-material'
import MDBox from 'components/MDBox'
import MDButton from 'components/MDButton'
import { useNavigate } from 'react-router-dom'

const PDActionButtons = (productDetails) => {

    const navigate = useNavigate()


    return (
        <>
            <MDButton
                variant="gradient"
                color={'primary'}
                fullWidth
                sx={{ marginBottom: 1 }}
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
        </>
    )
}

export default PDActionButtons
