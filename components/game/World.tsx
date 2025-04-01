'use client'

import { useTexture } from "@react-three/drei"
import { DoubleSide, RepeatWrapping } from "three"
import { House3D, HouseType } from "./element/house-3d"
import { Terrain3D, TerrainType } from "./element/terrain-3d"
import { Table } from "./element/table"

export type Position = [number, number, number]

interface TreeProps {
    position: Position;
}

interface BenchProps {
    position: Position;
    rotation?: number;
}

interface LampPostProps {
    position: Position;
}

// ====================== POSITION CONSTANTS ======================
const TREE_POSITIONS: Position[] = [
    [15, 0, 15], [-15, 0, -15], [15, 0, -15], [-15, 0, 15],
    [8, 0, 8], [-8, 0, -8], [0, 0, 12], [0, 0, -12],
    [12, 0, 0], [-12, 0, 0]
]

const BENCH_POSITIONS: [Position, number][] = [
    [[5, 0, 0], Math.PI / 2], [[-5, 0, 0], -Math.PI / 2],
    [[0, 0, 5], 0], [[0, 0, -5], Math.PI]
]

const LAMP_POST_POSITIONS: Position[] = [
    [10, 0, 10], [-10, 0, -10], [10, 0, -10], [-10, 0, 10], [0, 0, 0]
]

const HOUSE_POSITIONS: Position[] = [
    [20, 0, 20], [-20, 0, -20], [20, 0, -20], [-20, 0, 20],
    [12, 0, 12], [-12, 0, -12], [12, 0, -12], [-12, 0, 12]
]

const TERRAIN_POSITIONS: Position[] = [
    [8, 0, 0], [-18, 0, 0], [0, 0, 28], [0, 0, -28]
]

// ====================== MAIN COMPONENT ======================
export default function World() {

    return (
        <group>
            <group >
                <Terrain />
            </group>
            <Houses />
            <SportsTerrains />
            <Table />
            <Trees />
            <Benches />
            <LampPosts />
        </group>
    )
}

// ====================== ENVIRONMENT COMPONENTS ======================
function Terrain() {
    const groundTexture = useTexture("/pelouse.jpg")
    groundTexture.repeat.set(8, 8)
    groundTexture.wrapS = RepeatWrapping
    groundTexture.wrapT = RepeatWrapping

    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.01, 0]}
        >
            <planeGeometry args={[100, 100, 32, 32]} />
            <meshStandardMaterial
                map={groundTexture}
                metalness={0.0}
                roughness={1.0}
                side={DoubleSide}
            />
        </mesh>
    )
}

function Trees() {
    return (
        <group>
            {TREE_POSITIONS.map((position, index) => (
                <Tree key={`tree-${index}`} position={position} />
            ))}
        </group>
    )
}

function Tree({ position }: TreeProps) {
    return (
        <group position={position}>
            <mesh castShadow position={[0, 1, 0]}>
                <cylinderGeometry args={[0.2, 0.4, 2, 8]} />
                <meshStandardMaterial color="#5d4037" />
            </mesh>
            <mesh castShadow position={[0, 3, 0]}>
                <coneGeometry args={[1.5, 3, 8]} />
                <meshStandardMaterial color="#388e3c" />
            </mesh>
        </group>
    )
}

// ====================== FURNITURE COMPONENTS ======================
function Benches() {
    return (
        <group>
            {BENCH_POSITIONS.map(([position, rotation], index) => (
                <Bench key={`bench-${index}`} position={position} rotation={rotation} />
            ))}
        </group>
    )
}

function Bench({ position, rotation = 0 }: BenchProps) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh castShadow position={[0, 0.4, 0]}>
                <boxGeometry args={[1.5, 0.1, 0.4]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh castShadow position={[0, 0.8, -0.15]}>
                <boxGeometry args={[1.5, 0.4, 0.1]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh castShadow position={[-0.6, 0.2, 0]}>
                <boxGeometry args={[0.1, 0.4, 0.4]} />
                <meshStandardMaterial color="#4A2511" />
            </mesh>
            <mesh castShadow position={[0.6, 0.2, 0]}>
                <boxGeometry args={[0.1, 0.4, 0.4]} />
                <meshStandardMaterial color="#4A2511" />
            </mesh>
        </group>
    )
}

function LampPosts() {
    return (
        <group>
            {LAMP_POST_POSITIONS.map((position, index) => (
                <LampPost key={`lamp-${index}`} position={position} />
            ))}
        </group>
    )
}

function LampPost({ position }: LampPostProps) {
    return (
        <group position={position}>
            <mesh castShadow position={[0, 2, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 4, 8]} />
                <meshStandardMaterial color="#2c3e50" />
            </mesh>
            <mesh castShadow position={[0, 4, 0]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#f1c40f" emissive="#f1c40f" emissiveIntensity={0.5} />
            </mesh>
        </group>
    )
}

// ====================== BUILDING COMPONENTS ======================
function Houses() {
    return (
        <>
            {HOUSE_POSITIONS.map((position, index) => (
                <House3D
                    key={`house-${index}`}
                    position={position}
                    type={index % 3 === 0 ? HouseType.HOUSE3 :
                        index % 3 === 1 ? HouseType.HOUSE2 :
                            HouseType.HOUSE3}
                />
            ))}
        </>
    )
}

function SportsTerrains() {
    return (
        <>
            {TERRAIN_POSITIONS.map((position, index) => (
                <Terrain3D
                    key={`terrain-${index}`}
                    position={position}
                    type={index % 3 === 0 ? TerrainType.BASKET :
                        index % 3 === 1 ? TerrainType.TENNIS :
                            TerrainType.DEFAULT}
                    scale={0.5}
                />
            ))}
        </>
    )
}