import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';
import { generateKey } from 'helpers';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import * as THREE from 'three';

const ImageIn3DScene = ({ img, selectedShape }) => {

    const texture = useLoader(TextureLoader, img);
    const gltf = useLoader(GLTFLoader, selectedShape);
    let mesh;

    // Traverse the hierarchy to find the first Mesh
    gltf?.scene?.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            mesh = child;
        }
    });

    if (!mesh) {
        console.error("No Mesh found in the loaded model's hierarchy.");
        return null;
    }

    const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.FrontSide });
    mesh.material = material;

    return (
        <Canvas key={generateKey()} camera={{ position: [40, 40, 40], zoom: 1 }} shadows>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={Math.PI * 1} />

            {selectedShape && gltf?.scene && <primitive object={gltf.scene} />}
            <OrbitControls target={[0, 0, 0]} />
            <axesHelper args={[5]} />
        </Canvas>
    );
};

export default ImageIn3DScene;
