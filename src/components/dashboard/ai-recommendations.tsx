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
            title: 'DevOps Fundamentals',
            reason: 'Siguiente paso en tu carrera',
            difficulty: 'Intermedio',
            duration: '20h',
            match: 85,
        },
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">🤖</div>
                <div>
                    <h3 className="text-xl font-bold text-white">Recomendaciones IA</h3>
                    <p className="text-sm text-platinum-dim">Personalizadas para ti</p>
                </div>
            </div>

            <div className="space-y-3">
                {recommendations.map((rec, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 rounded-lg p-4 border border-white/5 hover:border-neural-blue/50 transition group"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                                <h4 className="text-white font-bold group-hover:text-neural-blue transition">
                                    {rec.title}
                                </h4>
                                <p className="text-xs text-platinum-dim mt-1">{rec.reason}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-emerald-400">{rec.match}% match</div>
                                <div className="text-xs text-platinum-dim">{rec.duration}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                            <span className="text-xs px-2 py-1 bg-white/10 rounded text-platinum-dim">
                                {rec.difficulty}
                            </span>
                            <Link
                                href="/courses"
                                className="ml-auto text-xs text-neural-blue hover:text-white transition font-medium"
                            >
                                Ver curso →
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
