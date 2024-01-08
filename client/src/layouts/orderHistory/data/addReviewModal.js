import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Rating } from '@mui/material';
import MDButton from 'components/MDButton';
import { useState, useEffect } from 'react';

const ReviewModal = ({ isOpen, handleClose, productId, handleSubmit, onSubmit, register, reset }) => {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const submitWithRating = (data) => {
        data.rating = rating;
        onSubmit(data);
    };

    useEffect(() => {
        if (isOpen) {
          reset();
          setRating(0); 
        }
      }, [isOpen, reset]);

    return (
        <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle id="review-product">Review for Product {productId}</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit(submitWithRating)}>
            <TextField
                {...register('review')}
                label="Review"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ marginBottom: 2 }}
            />
            <Rating
                name="rating"
                value={rating}
                onChange={handleRatingChange}
                precision={0.5} 
                sx={{ marginBottom: 2 }}
            />
            <DialogActions>
                <MDButton type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
                Submit Review
                </MDButton>
                <MDButton onClick={handleClose}>Cancel</MDButton>
            </DialogActions>
            </form>
        </DialogContent>
        </Dialog>
    );
};

export default ReviewModal;
