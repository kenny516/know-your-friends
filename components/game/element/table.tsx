import { useGLTF } from "@react-three/drei";

export const Table = ({
    scale = 0.06,
    position = [0, 0, 0]
}) => {
    const { scene } = useGLTF("/3d-model/field/table.glb");
    return <primitive
        object={scene}
        scale={scale}
        position={position}
    />;
}