import MDTypography from 'components/MDTypography';
import React from 'react';
import ReviewStars from './ReviewStars';
import HeadingNContent from './HeadingNContent';
import PDAdditionalInfo from './PDAdditionalInfo';
import PDRatingsAndReviews from './PDRatingsAndReviews';
import { bytesToMb } from 'common/commonUtils';

const PDInfoSection = ({ productReviewDetails, productDetails }) => {
  return (
    <>
      <MDTypography variant='h3' sx={{ fontWeight: '400', marginTop: 2 }}>
        {productDetails.title}
      </MDTypography>
      <ReviewStars productReviewDetails={productReviewDetails}/>
      <MDTypography variant='h1' marginY={2}>
        <span style={{ fontWeight: '400' }}>€</span>
        {parseFloat(productDetails.price).toFixed(2)}
      </MDTypography>
      <HeadingNContent title={'description'} description={productDetails.description} />
      <PDAdditionalInfo
        fileName={productDetails.media}
        fileType={productDetails.file_format}
        fileSize={bytesToMb(productDetails.size)}
        tags={productDetails.tags.split(',')}
      />
      <PDRatingsAndReviews productReviewDetails={productReviewDetails} />  
    </>
  );
};

export default PDInfoSection;
