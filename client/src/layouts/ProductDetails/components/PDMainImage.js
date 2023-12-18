import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import React from "react";

import imageFallback from 'assets/images/fallback/image_fallback.jpg'
import videoFallback from 'assets/images/fallback/video_fallback.jpg'
import audioFallback from 'assets/images/fallback/audio_fallback.png'

const PDMainImage = ({ productDetails }) => {

  const renderThumbnail = () => {
    if (productDetails.thumbnail) {
      return productDetails.thumbnail;
    } else {
      if (productDetails.media_type === 1) {
        return imageFallback;
      } else if (productDetails.media_type === 2) {
        return audioFallback;
      } else if (productDetails.media_type === 3) {
        return videoFallback;
      } else {
        return imageFallback;
      }
    }
  };

  const handleThumbnailError = (e) => {
    if(productDetails.media_type === 1) {
      e.target.src = imageFallback;
    } else if (productDetails.media_type === 2) {
      e.target.src = audioFallback;
    } else if (productDetails.media_type === 3) {
      e.target.src = videoFallback;
    } else {
      e.target.src = imageFallback;
    }
  }

  const handlePreviewError = (e) => {
    if(productDetails.media_type === 1) {
      e.target.src = imageFallback;
    } else if (productDetails.media_type === 2) {
      e.target.src = audioFallback;
    } else if (productDetails.media_type === 3) {
      e.target.src = videoFallback;
    } else {
      e.target.src = imageFallback;
    }
  }

  const getAllPreviews = () => {
    const previews = []
    const thumbnail = renderThumbnail();

    if(thumbnail) {
      previews.push(thumbnail);
    }

    if(productDetails.previews) {
      productDetails.previews.map(preview => previews.push(preview));
    }
    return previews;
  }

  return (
    <MDBox>
      <MDBox position={"relative"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <MDBox
          component={"img"}
          src={renderThumbnail()}
          onError={handleThumbnailError}
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
        {console.log(productDetails)}
        {
         getAllPreviews().map((preview, idx) => (
          <MDBox
            key={idx}
            component={"img"}
            src={preview}
            onError={handlePreviewError}
            sx={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "md",
            }}
          />
        ))}
      </MDBox>
    </MDBox>
  );
};

export default PDMainImage;
