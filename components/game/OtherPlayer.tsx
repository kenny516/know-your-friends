// plusieur avatar avec user_id
import React from 'react'
import { Avatar, AvatarType } from './element/avatar-3d'
import { Html } from '@react-three/drei'
import { Position } from './World'

export default function OtherPlayer() {

    // Données par défaut avec des positions différentes pour chaque joueur
    const defaultPlayers = [
        {
            id: 'default1',
            name: 'jean',
            position: { x: 1, y: 0, z: 0 },  // Position modifiée
            type: AvatarType.DOG,
            rotation: [0, Math.PI * 1.5, 0] as [number, number, number]
        },
        {
            id: 'charle',
            name: 'charle',
            position: { x: -1, y: 0, z: 0 }, // Position modifiée
            type: AvatarType.DUCK,
            rotation: [0, Math.PI / 2, 0] as [number, number, number]
        }
    ]


    return (
        <>
            {defaultPlayers.map((player) => {
                const playerPosition: Position = [
                    player.position.x || 0,
                    player.position.y || 0,
                    player.position.z || 0
                ]

                return (
                    <group key={player.id} position={playerPosition}>
                        {/* Avatar 3D visible */}
                        <Avatar
                            type={player.type || AvatarType.DEFAULT}
                            rotation={player.rotation || [0, 0, 0]}
                        />

                        <Html position={[0, 1.5, 0]} center>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                {/* Nom du joueur */}
                                <div style={{
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    textShadow: '0px 0px 3px rgba(0,0,0,0.7)',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    backgroundColor: 'rgba(0,0,0,0.5)'
                                }}>
                                    {player.name || player.id}
                                </div>


                            </div>
                        </Html>
                    </group>
                )
            })}
        </>
    )
}
