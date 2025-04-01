import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

interface MapProps {
    scale?: number;
    position?: [number, number, number];
}

export const Map = ({ scale = 1, position = [0, 0, 0] }: MapProps = {}) => {
    const { scene } = useGLTF("/3d-model/map/scene.gltf");

    // Chargement des textures associées aux matériaux
    const texturePaths = {
        "CARTELLO": "/3d-model/map/textures/CARTELLO_baseColor.png",
        "Material.001": "/3d-model/map/textures/Material.001_baseColor.png",
        "terriccio": "/3d-model/map/textures/terriccio_baseColor.jpeg"
    };

    const textures = useTexture(Object.values(texturePaths));

    useEffect(() => {
        if (!scene) return;

        // Configurer les textures
        Object.values(textures).forEach((texture) => {
            texture.flipY = false;
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = 16;
        });

        scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh && obj.material) {
                const material = obj.material as THREE.MeshStandardMaterial;

                // Vérifie si le nom du matériau correspond à une texture
                const textureKey = Object.keys(texturePaths).find((key) =>
                    material.name.includes(key)
                );

                if (textureKey) {
                    const textureIndex = Object.values(texturePaths).indexOf(texturePaths[textureKey]);
                    material.map = textures[textureIndex];
                    material.roughness = 0.8;
                    material.metalness = 0.2;
                    material.envMapIntensity = 1.5;
                    material.color.set(0xffffff);
                    material.needsUpdate = true;
                }
            }
        });
    }, [scene, textures]);

    return <primitive object={scene} scale={scale} position={position} receiveShadow castShadow />;
};
