"use client"

import { useState, useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Sky, Environment, OrbitControls, Stars } from "@react-three/drei"
import { Physics, RigidBody } from "@react-three/rapier"
import { Bloom, EffectComposer } from "@react-three/postprocessing"

import LoadingScreen from "./LoadingScreen"
import PlayerController from "./Player-controller"
import OtherPlayer from "./OtherPlayer"
import { Map } from "./element/map"
import { Player } from "@/type"
import { Avatar, AvatarType } from "./element/avatar-3d"

export default function Game() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const currentPlayer: Player = {
        id: 0,
        user_id: 0,
        x: 0,
        y: 0,
        z: 0,
        created_at: "",
        updated_at: ""
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    if (!isLoaded) {
        return <LoadingScreen />
    }
    return (
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 30 }} onPointerDown={(e) => (e.target as HTMLCanvasElement).requestPointerLock()}>
            <fog attach="fog" args={["#17171b", 30, 100]} />
            <color attach="background" args={["#17171b"]} />

            <Suspense fallback={null}>
                <Physics timeStep="vary">
                    <PlayerController />

                    {/* Autres joueurs avec leur propre contexte physique */}
                    <RigidBody type="fixed" colliders="cuboid">
                        <OtherPlayer />
                    </RigidBody>

                    {/* Objets du monde avec trimesh */}
                    <RigidBody type="fixed" colliders="trimesh">
                        <Map position={[0, 0.1, 0]} scale={0.6} />
                    </RigidBody>
                </Physics>

                <Sky sunPosition={[100, 20, 100]} />
                <Environment preset="city" />
                <Stars radius={100} depth={50} count={5000} factor={4} />

                <ambientLight intensity={0.3} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                    shadow-camera-far={50}
                    shadow-camera-left={-20}
                    shadow-camera-right={20}
                    shadow-camera-top={20}
                    shadow-camera-bottom={-20}
                />
                <pointLight position={[-10, 0, -20]} color="#2196f3" intensity={2} />
                <pointLight position={[0, 10, 0]} color="#ff9000" intensity={1.5} />
            </Suspense>

            <OrbitControls
                enablePan={false}
                maxPolarAngle={Math.PI / 2 - 0.1}
                minDistance={1}
                maxDistance={20}
            />

            <EffectComposer>
                <Bloom luminanceThreshold={1} intensity={0.1} levels={9} mipmapBlur />
            </EffectComposer>

        </Canvas>
    )
}

