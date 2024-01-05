import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";
import React from "react";
import PDReviews from "./PDReviews";
import PDRatings from "./PDRatings";

const PDRatingsAndReviews = ({ productReviewDetails }) => {
  return (
    <MDBox
      sx={{
        border: "1px solid lightgrey",
        marginTop: 3,
        padding: 3,
      }}
      borderRadius={"xl"}
    >
      <MDTypography
        sx={{
          marginY: 2,
          fontSize: 18,
          fontWeight: 500,
        }}
      >
        Ratings & reviews
      </MDTypography>
      <PDRatings productReviewDetails={productReviewDetails} />
      <PDReviews productReviewDetails={productReviewDetails} />
      <br />
    </MDBox>
  );
};

export default PDRatingsAndReviews;
