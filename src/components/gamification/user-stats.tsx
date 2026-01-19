'use client';

import { motion } from 'framer-motion';

export function UserGamificatonStats() {
    // Mock data - in real app would come from GamificationContext
    const stats = {
        streak: 5,
        xp: 1250,
        level: 3,
        nextLevelXp: 2000
    };

    const progressPercent = (stats.xp / stats.nextLevelXp) * 100;

    return (
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">

            {/* Streak */}
            <div className="flex items-center gap-1 group cursor-help relative">
                <span className="text-xl animate-pulse">🔥</span>
                <span className="font-bold text-accent-gold">{stats.streak}</span>

                {/* Tooltip */}
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black/90 text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                    Días en Racha
                </div>
            </div>

            <div className="w-px h-4 bg-white/20"></div>

            {/* Level & XP */}
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-neural-blue uppercase tracking-wider">Nivel {stats.level}</span>
                    <div className="w-24 h-1.5 bg-deep-space rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            className="h-full bg-brain-spark"
                        />
                    </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neural-blue to-synapse-purple flex items-center justify-center border border-white/20 shadow-neon-blue">
                    <span className="text-xs font-bold text-white">👾</span>
                </div>
            </div>

        </div>
    );
}
