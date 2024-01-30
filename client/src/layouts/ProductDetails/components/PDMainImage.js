import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import imageFallback from 'assets/images/fallback/image_fallback.jpg';
import videoFallback from 'assets/images/fallback/video_fallback.jpg';
import audioFallback from 'assets/images/fallback/audio_fallback.png';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { OrbitControls, Circle } from '@react-three/drei';
import { Suspense, useEffect, useState } from "react";
import { getExtensionFromUrl } from "helpers";
import { generateKey } from "helpers";
import ImageIn3DScene from "./ImageIn3DScene";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useSnackbar } from "context/SnackbarContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const PDMainImage = ({ productDetails, projectOn3D, setIsPattern, setPatternLoading, setProjectOn3D }) => {

  const [curPreview, setCurPreview] = useState(0)
  const [models, setModels] = useState([])
  const [selectedShape, setSelectedShape] = useState(null);
  const axiosPrivate = useAxiosPrivate()
  const { showSnackbar } = useSnackbar();



  const handleShapeChange = (event) => {
    console.log(event.target.value)
    const newShape = event.target.value;
    setSelectedShape(newShape);
  };

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
    setProjectOn3D(false)
    if (direction === 'prev') {
      setCurPreview((prev) => (prev > 0 ? prev - 1 : productDetails?.previews?.length - 1));
    } else if (direction === 'next') {
      setCurPreview((prev) => (prev < productDetails?.previews?.length - 1 ? prev + 1 : 0));
    }
  };

  const get3DModels = () => {
    axiosPrivate
      .get(`/3d-models`)
      .then((res) => {
        setModels(res.data.models)
        if (res?.data?.models?.length) {
          setSelectedShape(res.data.models[0]?.url || '')
        }
      })
      .catch((error) => {
        showSnackbar({
          color: 'error',
          title: error.message,
          message: '',
          icon: 'error',
        });
      })
  }

  useEffect(() => {
    get3DModels()
  }, [])

  const checkPattern = () => {
    setPatternLoading(true)
    axiosPrivate
      .get(`/check-pattern`, {
        params: {
          url: productDetails?.previews?.[curPreview]
        }
      })
      .then((res) => {
        setPatternLoading(false)
        setIsPattern(res?.data?.isPattern)
      })
      .catch((error) => {
        setPatternLoading(false)
        showSnackbar({
          color: 'error',
          title: error.message,
          message: '',
          icon: 'error',
        });
      })
  }

  useEffect(() => {
    if (getExtensionFromUrl(productDetails?.previews?.[curPreview])?.toLowerCase() != 'glb') {
      setIsPattern(0)
      checkPattern()
    }
  }, [curPreview])

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
        ) : (
          projectOn3D ? selectedShape ?
            <Suspense fallback={'Loading...'}>
              <ImageIn3DScene img={renderPreview()} selectedShape={selectedShape} />
            </Suspense> : null :
            <MDBox
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
            />
        )}
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
      {projectOn3D &&
        <>
          <FormControl fullWidth>
            <InputLabel id="3d_object">Select 3D Object:</InputLabel>
            <Select
              sx={{ padding: 1.5 }}
              variant="outlined"
              labelId="3d_object"
              id="3d_object"
              label="Select 3D Object"
              value={selectedShape}
              onChange={handleShapeChange}
            >
              {models?.map((shape) => (
                <MenuItem
                  value={shape.url}
                  key={shape.url}
                >
                  {shape.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </>}
    </MDBox>
  );
};

export default PDMainImage;
