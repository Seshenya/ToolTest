import { Avatar, Rating } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";

const PDReviews = ({ productReviewDetails }) => {
  if (!productReviewDetails.productReviews || productReviewDetails.productReviews.length === 0) {
    return(
      <>
        <MDTypography
            sx={{
              marginY: 2,
              fontSize: 16,
              fontWeight: 100,
            }}
          >
            No reviews available.
          </MDTypography>
      </>
    );    
  }

  return (
    <>
      {productReviewDetails.productReviews.map(({ reviewedByUser, rating, description }, idx) => {
        return (
          <MDBox
            key={idx}
            sx={{
              display: "flex",
              gap: 2,
              marginY: 5,
            }}
          >
            {/* modify with profile picture */}
            <Avatar sx={{ width: 56, height: 56 }}>{Array.from(reviewedByUser.username)[0]}</Avatar> 
            <MDBox>
              <Rating value={rating} precision={0.5} readOnly />
              <MDTypography variant={"h5"} fontSize={15}>
                {reviewedByUser.username}
              </MDTypography>
              <MDTypography fontSize={15}>{description}</MDTypography>
            </MDBox>
          </MDBox>
        );
      })}
    </>
  );
};

export default PDReviews;
