import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const CameraRig = ({ children }) => {
    const group = useRef();

    useFrame((state, delta) => {
        const isMobile = window.innerWidth <= 600;

        // set the initial position of the model
        let targetPosition = [];
        if (isMobile) targetPosition = [0, 0, 2.5];
        else targetPosition = [0, 0, 2];

        // set model camera position
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);

        // set the model rotation smoothly
        easing.dampE(
            group.current.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25,
            delta
        );
    });

    return <group ref={group}>{children}</group>;
};

export default CameraRig;
