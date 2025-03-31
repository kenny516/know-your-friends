import { useGLTF } from "@react-three/drei";

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
}

export const Avatar = ({
    type = AvatarType.DEFAULT,
    castShadow = false,
    receiveShadow = false,
    scale = 0.315,
    position = [0, 0, 0]
}: AvatarProps) => {
    const { scene } = useGLTF(type);
    return <primitive
        object={scene}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        scale={scale}
        position={position}
    />;
}