import { useGame } from './GameContext'

interface UIProps {
    // Ajoutez des props si nécessaire
}

interface PlayerStats {
    health: number
    score: number
}

export default function UI(props: UIProps) {
    const { players } = useGame()
    const stats: PlayerStats = {
        health: 100,
        score: 0
    }

    return (
        <div className="fixed inset-0 pointer-events-none">
            {/* HUD */}
            <div className="absolute top-4 left-4 bg-black/50 p-4 rounded text-white">
                <div>Santé: {stats.health}</div>
                <div>Score: {stats.score}</div>
            </div>

            {/* Liste des joueurs */}
            <div className="absolute top-4 right-4 bg-black/50 p-4 rounded text-white">
                <h3 className="text-lg font-bold mb-2">Joueurs ({players.length})</h3>
                <ul>
                    {players.map(player => (
                        <li key={player.id}>
                            {player.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

