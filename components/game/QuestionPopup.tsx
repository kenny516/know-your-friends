"use client"

import { useState } from 'react'
import { Input } from '../ui/input'
import { useGame } from './GameContext'
import { motion } from 'framer-motion'

interface QuestionAnswerData {
    answer: string
    confidence: 'certain' | 'probable' | 'passSur'
    explanation?: string
}

interface QuestionPopupProps {
    onClose: () => void
    targetMusicStyle: string
}

export default function QuestionPopup({ onClose, targetMusicStyle }: QuestionPopupProps) {
    const { players } = useGame()
    const [formData, setFormData] = useState<QuestionAnswerData>({
        answer: '',
        confidence: 'probable',
        explanation: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.answer) {
            // Ici, vous pouvez ajouter la logique pour traiter la réponse
            console.log('Réponse soumise:', formData)
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-slate-700/50 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-white mb-6">Question</h2>
                <div className="mb-6 p-4 bg-blue-600/20 rounded-lg">
                    <p className="text-white text-lg">
                        Qui aime le style de musique {targetMusicStyle} ?
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Votre réponse
                        </label>
                        <select
                            value={formData.answer}
                            onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                            className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white"
                            required
                        >
                            <option value="">Choisir un joueur</option>
                            {players.map(player => (
                                <option key={player.id} value={player.id}>
                                    {player.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Niveau de confiance
                        </label>
                        <select
                            value={formData.confidence}
                            onChange={(e) => setFormData(prev => ({ ...prev, confidence: e.target.value as 'certain' | 'probable' | 'passSur' }))}
                            className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white"
                        >
                            <option value="certain">Je suis certain(e)</option>
                            <option value="probable">Probablement</option>
                            <option value="passSur">Pas sûr(e)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Explication (optionnelle)
                        </label>
                        <Input
                            type="text"
                            value={formData.explanation || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, explanation: e.target.value }))}
                            placeholder="Pourquoi pensez-vous cela ?"
                            className="w-full px-4 py-3 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                        />
                    </div>

                    <div className="flex gap-4">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="button"
                            onClick={onClose}
                            className="w-full bg-slate-600 text-white py-3 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            Passer
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Répondre
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}