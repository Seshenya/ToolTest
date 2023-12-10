import MDBox from "components/MDBox";
import React from "react";

const NewArrivalIcon = () => {
  return (
    <MDBox
      sx={{
        backgroundColor: "#76a188",
        padding: "2px 8px",
        textTransform: "uppercase",
        color: "#f0f2f5",
        fontSize: 12,
        width: "fit-content",
      }}
      borderRadius={"md"}
    >
      New Arrival
    </MDBox>
  );
};

export default NewArrivalIcon;
