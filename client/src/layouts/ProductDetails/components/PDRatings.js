import { Avatar, Rating } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";

const ratingsInfo = [
  {
    username: "lxthetic",
    rating: 3.5,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor ut leo eget interdum. Nullam a velit eget massa finibus scelerisque a sed purus. Etiam viverra sollicitudin gravida. Quisque a suscipit nibh. Aliquam consectetur ipsum id tellus dictum dapibus nec sed felis. Morbi malesuada nibh nec iaculis vestibulum. Vestibulum justo quam, imperdiet quis maximus nec, pulvinar at leo. Fusce lorem sem, pretium nec posuere porta, laoreet in sapien.",
  },
  {
    username: "johndoe",
    rating: 4.5,
    review:
      "Morbi vulputate vestibulum gravida. Sed dictum diam tristique magna finibus, nec mattis arcu auctor.",
  },
  {
    username: "devdipesh",
    rating: 1.5,
    review:
      "Mauris sollicitudin malesuada gravida. Maecenas tristique posuere leo, vitae feugiat felis tempor a. Aliquam bibendum, dui et ultrices aliquam, odio nulla porta nibh, quis vulputate lectus eros non neque. Duis luctus nisi ut tempus sodales.",
  },
  {
    username: "jonastec",
    rating: 3.5,
    review:
      "Fusce posuere convallis lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer non ligula nec enim venenatis cursus vehicula in nulla.",
  },
];

const PDRatings = () => {
  return (
    <>
      {ratingsInfo.map(({ username, rating, review }, idx) => {
        return (
          <MDBox
            key={idx}
            sx={{
              display: "flex",
              gap: 2,
              marginY: 5,
            }}
          >
            <Avatar sx={{ width: 56, height: 56 }}>{Array.from(username)[0]}</Avatar>
            <MDBox>
              <Rating value={rating} precision={0.5} readOnly />
              <MDTypography variant={"h5"} fontSize={15}>
                {username}
              </MDTypography>
              <MDTypography fontSize={15}>{review}</MDTypography>
            </MDBox>
          </MDBox>
        );
      })}
    </>
  );
};

export default PDRatings;
