"use client"

import { useState, useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Sky, Environment, OrbitControls, Stars, KeyboardControls } from "@react-three/drei"
import { Physics, RigidBody } from "@react-three/rapier"
import { Bloom, EffectComposer } from "@react-three/postprocessing"

import World from "./World"
import LoadingScreen from "./LoadingScreen"
import { GameProvider } from "./GameContext"
import Player from "./Player"
import OtherPlayer from "./OtherPlayer"

export default function Game() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

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
        <GameProvider>
            <Canvas shadows camera={{ position: [0, 5, 10], fov: 30 }} onPointerDown={(e) => (e.target as HTMLCanvasElement).requestPointerLock()}>
                <fog attach="fog" args={["#17171b", 30, 100]} />
                <color attach="background" args={["#17171b"]} />


                <Suspense fallback={null}>
                    <Physics timeStep="vary">
                        <Player />


                        {/* Autres joueurs avec leur propre contexte physique */}
                        <RigidBody type="fixed" colliders="cuboid">
                            <OtherPlayer />
                        </RigidBody>

                        {/* Sol avec un collider cuboid */}
                        <RigidBody type="fixed" colliders="cuboid">
                            <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                                <planeGeometry args={[100, 100]} />
                                <meshStandardMaterial color="#1a1a1a" />
                            </mesh>
                        </RigidBody>

                        {/* Objets du monde avec trimesh */}
                        <RigidBody type="fixed" colliders="trimesh">
                            <World />
                        </RigidBody>
                    </Physics>

                    <Sky sunPosition={[100, 20, 100]} />
                    <Environment preset="sunset" />
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
                    <Bloom luminanceThreshold={1} intensity={0.5} levels={9} mipmapBlur />
                </EffectComposer>

            </Canvas>
        </GameProvider>
    )
}

