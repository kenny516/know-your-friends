import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

interface MapProps {
    scale?: number;
    position?: [number, number, number];
}

export const Map = ({
    scale = 0.01,
    position = [0, 0, 0]
}: MapProps = {}) => {
    const { scene } = useGLTF("/3d-model/map/scene.gltf");
    const texture = useTexture("/3d-model/map/textures/World_ap_baseColor.jpeg");

    useEffect(() => {
        if (!scene) return;

        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;

        scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh && obj.material) {
                obj.material.map = texture;
                obj.material.needsUpdate = true;
            }
        });
    }, [scene, texture]);

    return (
        <primitive
            object={scene}
            scale={scale}
            position={position}
        />
    );
};
