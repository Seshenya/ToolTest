/* eslint-disable react/prop-types */
import MDBox from 'components/MDBox';
import MDProgress from 'components/MDProgress';
import MDTypography from 'components/MDTypography';
import React from 'react';

const ratings = [1,2,3,4,5];

const Progress = ({ color, star, value }) => (
  <MDBox display='flex' alignItems='center'>
    <MDTypography variant='caption' color='text' fontWeight='medium'>
      {star}★
    </MDTypography>
    <MDBox ml={0.5} width={{ md: '15rem', sm: '15rem', xs: '13rem', lg: '19rem' }}>
      <MDProgress variant='gradient' color={color} value={value} />
    </MDBox>
    <MDTypography variant='caption' color='text' fontWeight='medium'>
      {value}
    </MDTypography>
  </MDBox>
);

const PDRatings = ({ productReviewDetails }) => {
  return (
    <MDBox
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        flexWrap: 'wrap',
      }}
    >
      <MDBox>
        <MDTypography variant={'h2'}>{productReviewDetails.averageRating.toFixed(1)} ★</MDTypography>
        <MDTypography fontSize={15}>{productReviewDetails.totalRatings} ratings & {productReviewDetails.totalReviews} reviews</MDTypography>
      </MDBox>
      <MDBox>
        {ratings.map((rating, idx) => {
          const count = productReviewDetails.ratingCounts?.[rating] || 0;
          return (
            <Progress key={idx} color='success' value={count} star={rating} />
          );
        })}
      </MDBox>
    </MDBox>
  );
};

export default PDRatings;
