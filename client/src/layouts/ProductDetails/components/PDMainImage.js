import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import imageFallback from 'assets/images/fallback/image_fallback.jpg';
import videoFallback from 'assets/images/fallback/video_fallback.jpg';
import audioFallback from 'assets/images/fallback/audio_fallback.png';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { OrbitControls, Circle } from '@react-three/drei';
import { useState } from "react";
import { getExtensionFromUrl } from "helpers";
import { generateKey } from "helpers";

const PDMainImage = ({ productDetails }) => {

  const [curPreview, setCurPreview] = useState(0)


  const renderPreview = () => {
    if (productDetails?.previews?.[curPreview]) {
      return productDetails?.previews?.[curPreview];
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

  const handlePreviewError = (e) => {
    if (productDetails.media_type === 1) {
      e.target.src = imageFallback;
    } else if (productDetails.media_type === 2) {
      e.target.src = audioFallback;
    } else if (productDetails.media_type === 3) {
      e.target.src = videoFallback;
    } else {
      e.target.src = imageFallback;
    }
  }

  const GlTFModel = () => {
    const gltf = useLoader(GLTFLoader, productDetails?.previews?.[curPreview]);
    return gltf?.scene ? <primitive key={generateKey()} object={gltf.scene} /> : null;
  };

  const handleArrowClick = (direction) => {
    if (direction === 'prev') {
      setCurPreview((prev) => (prev > 0 ? prev - 1 : productDetails?.previews?.length - 1));
    } else if (direction === 'next') {
      setCurPreview((prev) => (prev < productDetails?.previews?.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <MDBox>
      <MDBox position={"relative"} display={"flex"} alignItems={"center"} justifyContent={"center"} style={{ width: '100%', height: 300 }}>
        {getExtensionFromUrl(productDetails?.previews?.[curPreview])?.toLowerCase() == 'glb' ? (
          <Canvas
            key={generateKey()}
            camera={{ position: [0, 1, 2], zoom: 0.5 }}
            shadows
          >
            <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={Math.PI * 2} />
            <GlTFModel />
            <Circle args={[10]} receiveShadow>
              <meshStandardMaterial />
            </Circle>
            <OrbitControls target={[0, 1, 0]} />
            <axesHelper args={[5]} />
          </Canvas>
        ) : (<MDBox
          component={"img"}
          src={renderPreview()}
          onError={handlePreviewError}
          borderRadius="xl"
          sx={{
            width: "100%",
            height: 300,
            objectFit: "cover",
          }}
          alt={""}
        />)}
        <MDBox
          position={"absolute"}
          width={"107%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <MDButton iconOnly circular onClick={() => handleArrowClick('prev')}>
            <ArrowBackIosNewRounded />
          </MDButton>
          <MDButton iconOnly circular onClick={() => handleArrowClick('next')}>
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
        {/* {
          productDetails?.previews?.map((preview, idx) => {
            return (<MDBox
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
            />)
          })} */}
      </MDBox>
    </MDBox>
  );
};

export default PDMainImage;
