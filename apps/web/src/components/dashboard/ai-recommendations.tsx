'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function AIRecommendations() {
    const recommendations = [
        {
            title: 'JavaScript Avanzado',
            reason: 'Basado en tu progreso en Python',
            difficulty: 'Intermedio',
            duration: '15h',
            match: 92,
        },
        {
            title: 'Bases de Datos SQL',
            reason: 'Complementa tus habilidades backend',
            difficulty: 'Principiante',
            duration: '8h',
            match: 88,
        },
        {
            title: 'Fundamentos DevOps',
            reason: 'Siguiente paso en tu carrera',
            difficulty: 'Intermedio',
            duration: '20h',
            match: 85,
        },
    ];

    return (
        <div className="bg-deep-space/80 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neural-blue/10 rounded-full blur-[80px] group-hover:bg-neural-blue/20 transition-all duration-700 pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-2xl shadow-inner">
                        🤖
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Recomendaciones IA</h3>
                        <p className="text-sm text-platinum-dim font-medium">Personalizadas para tu perfil</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {recommendations.map((rec, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-neural-blue/50 hover:bg-white/10 transition-all duration-300 group/item relative overflow-hidden"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neural-blue to-purple-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />

                            <div className="flex items-start justify-between mb-2 pl-2">
                                <div className="flex-1">
                                    <h4 className="text-white font-bold group-hover/item:text-neural-blue transition-colors text-sm md:text-base">
                                        {rec.title}
                                    </h4>
                                    <p className="text-xs text-platinum-dim mt-1">{rec.reason}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 inline-block mb-1">
                                        {rec.match}% match
                                    </div>
                                    <div className="text-[10px] text-platinum-dim font-medium">{rec.duration} est.</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-3 pl-2">
                                <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded text-platinum font-medium uppercase tracking-wider">
                                    {rec.difficulty}
                                </span>
                                <Link
                                    href="/courses"
                                    className="ml-auto text-xs text-neural-blue hover:text-white transition-colors font-bold flex items-center gap-1 group/link"
                                >
                                    Ver curso
                                    <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
