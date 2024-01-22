import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useRef } from 'react';
import { useSnapshot } from 'valtio';

import { threeTeeState } from '../../../store/index';

const Shirt = () => {
    const snap = useSnapshot(threeTeeState);
    const { nodes, materials } = useGLTF('/shirt_baked.glb');

    const logoTexture = useTexture(snap.logoDecal);
    const orgTexture = useTexture(snap.orgDecal);
    const fullTexture = useTexture(snap.fullDecal);

    const shirtRef = useRef();
    useFrame((state, delta) => {
        easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
        if (snap.rotate) {
            easing.dampE(
                shirtRef.current.rotation,
                [0, Math.PI * 45, 0],
                0.25,
                delta
            );
        }
        if (!snap.rotate) {
            easing.dampE(shirtRef.current.rotation, [0, 0, 0], 0.25, delta);
        }
    });

    const stateString = JSON.stringify(snap);
    console.log(snap.orgTexture);

    return (
        <group key={stateString} ref={shirtRef}>
            <mesh
                castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            >
                {snap.isFullTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={snap.fullScale}
                        map={fullTexture}
                    />
                )}
                {snap.isOrgTexture && (
                    <Decal
                        position={[0, 0, 0.12]}
                        rotation={[0, 0, 0]}
                        scale={snap.orgScale}
                        map={orgTexture}
                    />
                )}

                {snap.isLogoTexture && (
                    <Decal
                        position={[0.08, 0.13, 0.12]}
                        rotation={[0, 0, 0]}
                        scale={snap.logoScale}
                        map={logoTexture}
                        // map-anisotropy={16}
                        depthTest={false}
                        // depthWrite={true}
                    />
                )}
            </mesh>
        </group>
    );
};

export default Shirt;
