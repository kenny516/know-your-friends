import { useGLTF } from "@react-three/drei";

export enum HouseType {
    DEFAULT = "/3d-model/house/house.glb",
    HOUSE2 = "/3d-model/house/house2.glb",
    HOUSE3 = "/3d-model/house/house3.glb",
};
export const House3D = ({
    type = HouseType.DEFAULT,
    position = [0, 0, 0]
}: {
    type?: HouseType,
    position?: [number, number, number]
}) => {
    const { scene } = useGLTF(type);
    return <primitive object={scene} position={position} scale={0.315} />;
}