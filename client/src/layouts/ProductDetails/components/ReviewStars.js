import { StarRateRounded } from '@mui/icons-material';
import { Rating } from '@mui/material';
import MDBox from 'components/MDBox';
import React from 'react';

const ReviewStars = ({ productReviewDetails }) => {
  return (
    <MDBox
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <MDBox>{productReviewDetails.averageRating.toFixed(1)}</MDBox>
      <Rating value={productReviewDetails.averageRating} precision={0.5} readOnly />
    </MDBox>
  );
};

export default ReviewStars;
