"use client"

import { useState } from 'react'
import { Input } from '../ui/input'
import { useGame } from './GameContext'
import { AvatarType } from './element/avatar-3d'
import { motion } from 'framer-motion'

interface PlayerFormData {
    name: string
    avatarType: AvatarType
    favoriteColor: string
    personality: string
    hobby: string
    motto: string
    birthMonth: string
    musicStyle: string
    socialStyle: 'introvert' | 'extrovert' | 'ambivert'
}

interface PlayerPopupProps {
    onClose: () => void
}

export default function PlayerPopup({ onClose }: PlayerPopupProps) {
    const [formData, setFormData] = useState<PlayerFormData>({
        name: '',
        avatarType: AvatarType.DEFAULT,
        favoriteColor: '#2196f3',
        personality: '',
        hobby: '',
        motto: '',
        birthMonth: '',
        musicStyle: '',
        socialStyle: 'ambivert'
    })
    const { addPlayer } = useGame()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.name.trim()) {
            addPlayer({
                id: `player-${Date.now()}`,
                name: formData.name,
                position: { x: 0, y: 0, z: 0 },
                type: formData.avatarType,
                favoriteColor: formData.favoriteColor,
                personality: formData.personality,
                hobby: formData.hobby,
                motto: formData.motto,
                birthMonth: formData.birthMonth,
                musicStyle: formData.musicStyle,
                socialStyle: formData.socialStyle
            })
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-slate-700/50 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
                <h2 className="text-2xl font-bold text-white mb-6"> Information personnelle</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Couleur préférée
                        </label>
                        <div className="flex gap-4">
                            <Input
                                type="color"
                                value={formData.favoriteColor}
                                onChange={(e) => setFormData(prev => ({ ...prev, favoriteColor: e.target.value }))}
                                className="w-16 h-10 p-1 bg-slate-700/50 border-slate-600"
                            />
                            <span className="text-white self-center">{formData.favoriteColor}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Personnalité
                        </label>
                        <Input
                            type="text"
                            value={formData.personality}
                            onChange={(e) => setFormData(prev => ({ ...prev, personality: e.target.value }))}
                            placeholder="Décrivez votre personnalité"
                            className="w-full px-4 py-3 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Hobby
                        </label>
                        <Input
                            type="text"
                            value={formData.hobby}
                            onChange={(e) => setFormData(prev => ({ ...prev, hobby: e.target.value }))}
                            placeholder="Votre passe-temps favori"
                            className="w-full px-4 py-3 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Devise personnelle
                        </label>
                        <Input
                            type="text"
                            value={formData.motto}
                            onChange={(e) => setFormData(prev => ({ ...prev, motto: e.target.value }))}
                            placeholder="Votre phrase favorite"
                            className="w-full px-4 py-3 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Mois de naissance
                        </label>
                        <select
                            value={formData.birthMonth}
                            onChange={(e) => setFormData(prev => ({ ...prev, birthMonth: e.target.value }))}
                            className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white"
                        >
                            <option value="">Sélectionnez un mois</option>
                            <option value="Janvier">Janvier</option>
                            <option value="Février">Février</option>
                            <option value="Mars">Mars</option>
                            <option value="Avril">Avril</option>
                            <option value="Mai">Mai</option>
                            <option value="Juin">Juin</option>
                            <option value="Juillet">Juillet</option>
                            <option value="Août">Août</option>
                            <option value="Septembre">Septembre</option>
                            <option value="Octobre">Octobre</option>
                            <option value="Novembre">Novembre</option>
                            <option value="Décembre">Décembre</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Style de musique préféré
                        </label>
                        <Input
                            type="text"
                            value={formData.musicStyle}
                            onChange={(e) => setFormData(prev => ({ ...prev, musicStyle: e.target.value }))}
                            placeholder="Rock, Jazz, Hip-hop, etc."
                            className="w-full px-4 py-3 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Style social
                        </label>
                        <select
                            value={formData.socialStyle}
                            onChange={(e) => setFormData(prev => ({ ...prev, socialStyle: e.target.value as 'introvert' | 'extrovert' | 'ambivert' }))}
                            className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white"
                        >
                            <option value="introvert">Introverti</option>
                            <option value="extrovert">Extraverti</option>
                            <option value="ambivert">Ambivert</option>
                        </select>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Commencer l&apos;aventure
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}