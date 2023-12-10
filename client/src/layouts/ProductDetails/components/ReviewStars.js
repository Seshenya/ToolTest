import { StarRateRounded } from '@mui/icons-material';
import { Rating } from '@mui/material';
import MDBox from 'components/MDBox';
import React from 'react';

const ReviewStars = () => {
  return (
    <MDBox
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <MDBox>3.5</MDBox>
      <Rating value={3.5} precision={0.5} readOnly />
    </MDBox>
  );
};

export default ReviewStars;
