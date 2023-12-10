/* eslint-disable react/prop-types */
import MDBox from 'components/MDBox';
import MDProgress from 'components/MDProgress';
import MDTypography from 'components/MDTypography';
import React from 'react';

const ratingsData = [
  {
    star: 1,
    reviewers: 1,
    value: 1,
  },
  {
    star: 1,
    reviewers: 2,
    value: 20,
  },
  {
    star: 2,
    reviewers: 4,
    value: 50,
  },
  {
    star: 3,
    reviewers: 10,
    value: 80,
  },
  {
    star: 4,
    reviewers: 6,
    value: 8,
  },
  {
    star: 5,
    reviewers: 3,
    value: 3,
  },
];

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

const PDReviews = () => {
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
        <MDTypography variant={'h2'}>3,5★</MDTypography>
        <MDTypography fontSize={15}>12 ratings & 5 reviews</MDTypography>
      </MDBox>
      <MDBox>
        {ratingsData.map(({ reviewers, star, value }, idx) => (
          <Progress key={idx} color='success' value={value} star={star} reviewers={reviewers} />
        ))}
      </MDBox>
    </MDBox>
  );
};

export default PDReviews;
