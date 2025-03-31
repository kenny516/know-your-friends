"use client"

import { useRef } from "react"
import { type Mesh, Object3D } from "three"

interface PersonProps {
    color?: string;
    scale?: number;
    position?: [number, number, number];
}

// Constantes pour les proportions du corps
const BODY_PROPORTIONS = {
    HEAD_RADIUS: 0.25,
    BODY_HEIGHT: 0.7,
    BODY_RADIUS: 0.3,
    LIMB_SEGMENTS: 8,
    JOINT_RADIUS: 0.08,
    ARM_LENGTH: 0.8,
    LEG_LENGTH: 1.0
}

export default function Person({
    color = "#2196f3",
    scale = 1,
    position = [0, 0, 0]
}: PersonProps) {
    const leftLegRef = useRef<Mesh>(null)
    const rightLegRef = useRef<Mesh>(null)
    const leftArmRef = useRef<Mesh>(null)
    const rightArmRef = useRef<Mesh>(null)
    const headRef = useRef<Mesh>(null)

    return (
        <group
            name="character-root"
            position={position}
            scale={scale}
            userData={{ isCharacter: true }}
        >
            {/* Corps principal avec torse plus détaillé */}
            <mesh
                name="torso"
                castShadow
                receiveShadow
                position={[0, BODY_PROPORTIONS.BODY_HEIGHT / 2 + 0.2, 0]}
            >
                <capsuleGeometry args={[
                    BODY_PROPORTIONS.BODY_RADIUS,
                    BODY_PROPORTIONS.BODY_HEIGHT,
                    8,
                    BODY_PROPORTIONS.LIMB_SEGMENTS
                ]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.2}
                    roughness={0.5}
                />
            </mesh>

            {/* Tête avec yeux */}
            <mesh
                name="head"
                ref={headRef}
                position={[0, BODY_PROPORTIONS.BODY_HEIGHT + 0.3, 0]}
                castShadow
                receiveShadow
            >
                <sphereGeometry args={[
                    BODY_PROPORTIONS.HEAD_RADIUS,
                    32,
                    32
                ]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.1}
                    roughness={0.4}
                />
                {/* Yeux */}
                <group name="eyes">
                    <mesh
                        position={[-0.1, 0.1, BODY_PROPORTIONS.HEAD_RADIUS * 0.9]}
                        scale={[0.5, 0.5, 0.5]}
                    >
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>
                    <mesh
                        position={[0.1, 0.1, BODY_PROPORTIONS.HEAD_RADIUS * 0.9]}
                        scale={[0.5, 0.5, 0.5]}
                    >
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>
                </group>
            </mesh>

            {/* Membres inférieurs */}
            <Leg
                ref={leftLegRef}
                name="left-leg"
                color={color}
                position={[-0.2, 0, 0]}
                length={BODY_PROPORTIONS.LEG_LENGTH}
            />
            <Leg
                ref={rightLegRef}
                name="right-leg"
                color={color}
                position={[0.2, 0, 0]}
                length={BODY_PROPORTIONS.LEG_LENGTH}
            />

            {/* Membres supérieurs */}
            <Arm
                ref={leftArmRef}
                name="left-arm"
                color={color}
                position={[-0.4, BODY_PROPORTIONS.BODY_HEIGHT - 0.2, 0]}
                length={BODY_PROPORTIONS.ARM_LENGTH}
            />
            <Arm
                ref={rightArmRef}
                name="right-arm"
                color={color}
                position={[0.4, BODY_PROPORTIONS.BODY_HEIGHT - 0.2, 0]}
                length={BODY_PROPORTIONS.ARM_LENGTH}
            />
        </group>
    )
}

// Composant réutilisable pour les jambes
const Leg = ({ color, position, length, ...props }: any) => (
    <group name={props.name} position={position}>
        <mesh castShadow receiveShadow position={[0, -length / 2, 0]}>
            <capsuleGeometry args={[
                BODY_PROPORTIONS.JOINT_RADIUS,
                length,
                8,
                BODY_PROPORTIONS.LIMB_SEGMENTS
            ]} />
            <meshStandardMaterial
                color={color}
                metalness={0.1}
                roughness={0.6}
            />
        </mesh>
        {/* Pied avec meilleure définition */}
        <mesh
            castShadow
            receiveShadow
            position={[0, -length - 0.1, 0.1]}
            rotation={[-0.1, 0, 0]}
        >
            <boxGeometry args={[0.15, 0.1, 0.3]} />
            <meshStandardMaterial
                color={color}
                metalness={0.2}
                roughness={0.7}
            />
        </mesh>
    </group>
)

// Composant réutilisable pour les bras
const Arm = ({ color, position, length, ...props }: any) => (
    <group name={props.name} position={position}>
        <mesh castShadow receiveShadow position={[0, -length / 2, 0]}>
            <capsuleGeometry args={[
                BODY_PROPORTIONS.JOINT_RADIUS,
                length,
                8,
                BODY_PROPORTIONS.LIMB_SEGMENTS
            ]} />
            <meshStandardMaterial
                color={color}
                metalness={0.1}
                roughness={0.6}
            />
        </mesh>
        {/* Main améliorée */}
        <mesh
            castShadow
            receiveShadow
            position={[0, -length - 0.05, 0]}
            rotation={[0, 0, 0]}
        >
            <sphereGeometry args={[
                BODY_PROPORTIONS.JOINT_RADIUS * 1.2,
                12,
                12
            ]} />
            <meshStandardMaterial
                color={color}
                metalness={0.15}
                roughness={0.65}
            />
        </mesh>
    </group>
)

// Fonction de récupération des références améliorée
export function getPersonRefs(personRef: React.RefObject<Object3D | null>) {
    if (!personRef.current) return null

    const traverse = (name: string) =>
        personRef.current!.getObjectByName(name) as Mesh

    return {
        headRef: traverse('head'),
        leftLegRef: traverse('left-leg'),
        rightLegRef: traverse('right-leg'),
        leftArmRef: traverse('left-arm'),
        rightArmRef: traverse('right-arm')
    }
}