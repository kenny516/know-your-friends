import { createContext, useContext, ReactNode, useState } from 'react'

interface GameContextType {
    players: Player[]
    invitedPlayers: string[]
    addPlayer: (player: Player) => void
    removePlayer: (id: string) => void
    updatePlayerPosition: (id: string, position: Position) => void
    invitePlayer: (id: string) => void
    removeInvitation: (id: string) => void
    startGame: () => void
    currentPlayerId: string | null
}

interface Position {
    x: number
    y: number
    z: number
}

interface Player {
    id: string
    name: string
    position: Position
    color?: string
}

interface GameProviderProps {
    children: ReactNode
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: GameProviderProps) {
    const [players, setPlayers] = useState<Player[]>([])
    const [invitedPlayers, setInvitedPlayers] = useState<string[]>([])
    const [currentPlayerId, setCurrentPlayerId] = useState<string | null>("player-1") // Simulé pour l'exemple

    const addPlayer = (player: Player) => {
        setPlayers(prev => [...prev, player])
    }

    const removePlayer = (id: string) => {
        setPlayers(prev => prev.filter(player => player.id !== id))
    }

    const updatePlayerPosition = (id: string, position: Position) => {
        setPlayers(prev =>
            prev.map(player =>
                player.id === id ? { ...player, position } : player
            )
        )
    }

    const invitePlayer = (id: string) => {
        if (!invitedPlayers.includes(id) && id !== currentPlayerId) {
            setInvitedPlayers(prev => [...prev, id])
        }
    }

    const removeInvitation = (id: string) => {
        setInvitedPlayers(prev => prev.filter(playerId => playerId !== id))
    }

    const startGame = () => {
        // Implémentation future: envoyer les données à l'API pour démarrer le jeu
        console.log("Démarrage du jeu avec les joueurs invités:", invitedPlayers)
        // Ici, vous pourriez ajouter la logique pour téléporter les joueurs vers un emplacement spécifique
    }

    return (
        <GameContext.Provider value={{ 
            players, 
            invitedPlayers, 
            addPlayer, 
            removePlayer, 
            updatePlayerPosition, 
            invitePlayer, 
            removeInvitation, 
            startGame,
            currentPlayerId
        }}>
            {children}
        </GameContext.Provider>
    )
}

export function useGame(): GameContextType {
    const context = useContext(GameContext)
    if (!context) {
        throw new Error('useGame must be used within a GameProvider')
    }
    return context
}

