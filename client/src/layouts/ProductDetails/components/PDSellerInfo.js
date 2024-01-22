// import { StarRateRounded } from "@mui/icons-material";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";

const PDSellerInfo = ({ productDetails }) => {
  return (
    <MDBox
      sx={{
        border: "1px solid lightgrey",
        padding: 2,
      }}
      borderRadius={"xl"}
    >
      <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
        <MDBox
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <MDAvatar
            src={productDetails?.owner?.profile_picture}
            alt="JD"
            size="lg"
            shadow="sm"
          />
          <MDBox flex={1}>
            <MDTypography variant="h5" fontWeight="medium">
              {`${productDetails?.owner?.firstname} ${productDetails?.owner?.lastname}` || 'John Doe'}
            </MDTypography>
            <MDTypography fontWeight="lighter" fontSize={"12px"} color="lightgrey">
              {`${productDetails?.owner?.email}` || 'johndoe@example.com'}
            </MDTypography>
          </MDBox>
        </MDBox>
        {/* Seller ratings or reviews will not be implemented */}
        {/* <MDBox display={"flex"} alignItems={"center"}>
          <StarRateRounded color={"warning"} />
          <MDTypography variant="h6" fontWeight="medium">
            (4.5)
          </MDTypography>
          &nbsp;
          <MDTypography
            sx={{
              fontWeight: "500",
              color: "green",
              fontSize: "15px",
            }}
          >
            14.5k reviews
          </MDTypography>
        </MDBox> */}
      </MDBox>
    </MDBox>
  );
};

export default PDSellerInfo;
