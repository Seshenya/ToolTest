import { SaveRounded } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { Center, Environment, Html } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import Backdrop from './components/Backdrop';
import CameraRig from './components/CameraRig';
import Shirt from './components/Shirt';

const SnapshotComponent = () => {
    const { gl } = useThree();

    const takeSnapshot = () => {
        const link = document.createElement('a');
        link.setAttribute('download', 'canvas.png');
        link.setAttribute(
            'href',
            gl.domElement
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream')
        );
        link.click();
    };

    return (
        <Html
            style={{
                position: 'absolute',
                top: '23vh',
                right: '-31vw',
            }}
        >
            {/* <MDBox
                sx={
                    {
                        position: 'absolute',
                        right: '40px',
                        bottom: '40px',
                    }
                }
            >
                <Fab color={'success'} onClick={takeSnapshot}>
                    <SaveRounded fontSize="medium" />
                </Fab>
            </MDBox> */}

            <div
                style={{
                    position: 'absolute',
                    // bottom: '-550px',
                    // right: '-980px',
                }}
            >
                <Fab color={'success'} onClick={takeSnapshot}>
                    <SaveRounded fontSize="medium" />
                </Fab>
            </div>
        </Html>
    );
};

const ThreeTeeCanvas = () => {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 0], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <ambientLight intensity={0.5} />
            <Environment preset="city" />

            <CameraRig>
                <Backdrop />
                <Center>
                    <Shirt />
                </Center>
            </CameraRig>
            <SnapshotComponent />
        </Canvas>
    );
};

export default ThreeTeeCanvas;
