import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export enum AvatarType {
    DEFAULT = "/3d-model/bear.gltf",
    DOG = "/3d-model/dog.gltf",
    DUCK = "/3d-model/duck.gltf",
}

interface AvatarProps {
    type: AvatarType;
    castShadow?: boolean;
    receiveShadow?: boolean;
    scale?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
}

export const Avatar = ({
    type = AvatarType.DEFAULT,
    castShadow = false,
    receiveShadow = false,
    scale = 0.315,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
}: AvatarProps) => {
    const { scene } = useGLTF(type);
    const avatarRef = useRef<THREE.Object3D>(null);
    const raycaster = new THREE.Raycaster();
    const downVector = new THREE.Vector3(0, -1, 0);


    return (
        <primitive
            ref={avatarRef}
            object={scene}
            castShadow={castShadow}
            receiveShadow={receiveShadow}
            scale={scale}
            position={position}
            rotation={rotation}
        />
    );
};
