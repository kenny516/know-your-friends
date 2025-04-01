// plusieur avatar avec user_id
import React from 'react'
import { Avatar, AvatarType } from './element/avatar-3d'
import { useGame } from './GameContext'
import { Text, Html } from '@react-three/drei'
import { Position } from './World'

export default function OtherPlayer() {
    const { players, currentPlayerId, invitePlayer, invitedPlayers } = useGame()

    // Filtrer pour ne montrer que les autres joueurs (pas le joueur actuel)
    const otherPlayers = players.filter(player => player.id !== currentPlayerId)

    // Données par défaut avec des positions différentes pour chaque joueur
    const defaultPlayers = [
        {
            id: 'default1',
            name: 'jean',
            position: { x: 2, y: 0, z: 2 },  // Position modifiée
            type: AvatarType.DOG
        },
        {
            id: 'charle',
            name: 'Bot 2',
            position: { x: -2, y: 0, z: -2 }, // Position modifiée
            type: AvatarType.DUCK
        }
    ]

    const handleInvite = (playerId: string, e: React.MouseEvent) => {
        e.stopPropagation()
        invitePlayer(playerId)
    }

    // Utiliser otherPlayers s'il y en a, sinon utiliser defaultPlayers
    const playersToRender = otherPlayers.length > 0 ? otherPlayers : defaultPlayers

    return (
        <>
            {defaultPlayers.map((player) => {
                const isInvited = invitedPlayers.includes(player.id)
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

                                {/* Bouton d'invitation */}
                                <button
                                    onClick={(e) => handleInvite(player.id, e)}
                                    disabled={isInvited}
                                    style={{
                                        backgroundColor: isInvited ? '#4CAF50' : '#2196F3',
                                        color: 'white',
                                        border: 'none',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        cursor: isInvited ? 'default' : 'pointer',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        opacity: isInvited ? 0.7 : 1,
                                        pointerEvents: 'auto'
                                    }}
                                >
                                    {isInvited ? 'Invité' : 'Inviter'}
                                </button>
                            </div>
                        </Html>
                    </group>
                )
            })}
        </>
    )
}
