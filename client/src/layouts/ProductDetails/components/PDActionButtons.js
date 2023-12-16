import { StoreRounded, SwapHorizRounded } from '@mui/icons-material'
import MDBox from 'components/MDBox'
import MDButton from 'components/MDButton'
import { useMaterialUIController } from 'context'

const PDActionButtons = ({ productDetails }) => {
    const [controller] = useMaterialUIController()
    const { sidenavColor } = controller

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = productDetails.media;
        link.target = '_blank';
        link.download = `downloaded_media.${productDetails.file_format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
            <MDButton
                variant="gradient"
                color={sidenavColor}
                fullWidth
                sx={{ marginBottom: 1 }}
                onClick={handleDownload}
            >
                Buy now &nbsp;
                <StoreRounded />
            </MDButton>
            <MDBox sx={{ display: 'flex', gap: 1 }}>
                <MDButton
                    color={'warning'}
                    fullWidth
                    onClick={handleDownload}>
                    Negotiate &nbsp;
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
