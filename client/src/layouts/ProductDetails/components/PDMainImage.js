import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import React from "react";

const dummyImages = [
  {
    img: "http://localhost:3000/static/media/home-decor-1.05e218fd495ccc65c99d.jpg",
    isSelected: true,
  },
  {
    img: "http://localhost:3000/static/media/home-decor-2.b4e5397c9846645ba275.jpg",
    isSelected: true,
  },
  {
    img: "http://localhost:3000/static/media/home-decor-3.74d13fcbd3c631fc7908.jpg",
    isSelected: true,
  },
  {
    img: "http://localhost:3000/static/media/home-decor-4.5b448fd339a14695f6aa.jpeg",
    isSelected: true,
  },
  {
    img: "http://localhost:3000/static/media/home-decor-1.05e218fd495ccc65c99d.jpg",
    isSelected: true,
  },
  {
    img: "http://localhost:3000/static/media/home-decor-2.b4e5397c9846645ba275.jpg",
    isSelected: true,
  },
  {
    img: "http://localhost:3000/static/media/home-decor-3.74d13fcbd3c631fc7908.jpg",
    isSelected: true,
  },
  {
    img: "http://localhost:3000/static/media/home-decor-4.5b448fd339a14695f6aa.jpeg",
    isSelected: true,
  },
];

const PDMainImage = () => {
  return (
    <MDBox>
      <MDBox position={"relative"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <MDBox
          component={"img"}
          src={"http://localhost:3000/static/media/home-decor-1.05e218fd495ccc65c99d.jpg"}
          borderRadius="xl"
          sx={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
          }}
          alt={""}
        />
        <MDBox
          position={"absolute"}
          width={"107%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <MDButton iconOnly circular>
            <ArrowBackIosNewRounded />
          </MDButton>
          <MDButton iconOnly circular>
            <ArrowForwardIosRounded />
          </MDButton>
        </MDBox>
      </MDBox>
      <br />
      <MDBox
        sx={{
          width: "100%",
          overflowX: "scroll",
          display: "flex",
          gap: 2,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {dummyImages.map(({ img, isSelected }, idx) => (
          <MDBox
            key={idx}
            component={"img"}
            src={img}
            sx={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
            }}
            borderRadius="md"
          />
        ))}
      </MDBox>
    </MDBox>
  );
};

export default PDMainImage;
