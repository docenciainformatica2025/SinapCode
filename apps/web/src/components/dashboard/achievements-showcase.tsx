'use client';

import { motion } from 'framer-motion';

export function AchievementsShowcase() {
    const achievements = [
        { id: 1, icon: '🏆', name: 'Primera Victoria', description: 'Completa tu primer curso', unlocked: true, rarity: 'common' },
        { id: 2, icon: '🔥', name: 'Racha de Fuego', description: '7 días consecutivos', unlocked: true, rarity: 'rare' },
        { id: 3, icon: '⚡', name: 'Velocista', description: 'Completa 5 lecciones en un día', unlocked: true, rarity: 'rare' },
        { id: 4, icon: '🎯', name: 'Perfeccionista', description: '100% en 3 quizzes', unlocked: false, rarity: 'epic' },
        { id: 5, icon: '👑', name: 'Maestro', description: 'Completa 10 cursos', unlocked: false, rarity: 'legendary' },
        { id: 6, icon: '🌟', name: 'Estrella', description: 'Alcanza nivel 50', unlocked: false, rarity: 'legendary' },
    ];

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'from-gray-400 to-gray-600';
            case 'rare': return 'from-blue-400 to-blue-600';
            case 'epic': return 'from-purple-400 to-purple-600';
            case 'legendary': return 'from-amber-400 to-amber-600';
            default: return 'from-gray-400 to-gray-600';
        }
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white">Logros</h3>
                    <p className="text-sm text-platinum-dim">3 de 6 desbloqueados</p>
                </div>
                <div className="text-2xl">🎖️</div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {achievements.map((achievement, i) => (
                    <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: achievement.unlocked ? 1.1 : 1 }}
                        className={`relative p-4 rounded-xl border ${achievement.unlocked
                                ? 'border-white/20 bg-white/5'
                                : 'border-white/5 bg-white/[0.02] opacity-50'
                            } group cursor-pointer`}
                    >
                        {/* Rarity glow */}
                        {achievement.unlocked && (
                            <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(achievement.rarity)} opacity-10 rounded-xl`} />
                        )}

                        <div className="relative z-10 text-center">
                            <div className={`text-4xl mb-2 ${!achievement.unlocked && 'grayscale'}`}>
                                {achievement.icon}
                            </div>
                            <div className="text-xs font-bold text-white mb-1">{achievement.name}</div>
                            <div className="text-[10px] text-platinum-dim">{achievement.description}</div>

                            {!achievement.unlocked && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-4xl opacity-30">🔒</div>
                                </div>
                            )}
                        </div>

                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
