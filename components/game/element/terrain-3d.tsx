import { useGLTF } from "@react-three/drei";

export enum TerrainType {
    DEFAULT = "/3d-model/field/Ballpark.glb",
    BASKET = "/3d-model/field/Basketball.glb",
    TENNIS = "/3d-model/field/Tennis.glb",
};
export const Terrain3D = ({
    type = TerrainType.DEFAULT,
    position = [0, 0, 0],
    scale = 0.315,
}: {
    type?: TerrainType,
    position?: [number, number, number];
    scale: number;
}) => {
    const { scene } = useGLTF(type);
    return <primitive object={scene} position={position} scale={scale} />;
}