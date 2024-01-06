import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import MDTypography from 'components/MDTypography';

const ConfirmationModal = ({
    open,
    onClose,
    onConfirm,
    confirmationText,
    loading,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <MDTypography variant="body1" fontSize={'1rem'}>
                    {confirmationText}
                </MDTypography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary" disabled={loading}>
                    {loading ? (
                        <CircularProgress
                            size={'small'}
                            color="info"
                            sx={{
                                width: '20px !important',
                                height: '20px !important',
                            }}
                        />
                    ) : (
                        'Confirm'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
