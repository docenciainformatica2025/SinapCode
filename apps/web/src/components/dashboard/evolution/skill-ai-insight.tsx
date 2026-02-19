'use client';

import { motion } from 'framer-motion';
import { Sparkles, Split, Brain, Zap, Target, Award } from 'lucide-react';

export function SkillAIInsight() {
    return (
        <div className="space-y-6">
            <div className="p-6 border-b border-white/5">
                <h2 className="text-xl font-black italic text-white flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                    AI_ <span className="text-primary underline decoration-2 underline-offset-4">INSIGHT</span>
                </h2>
                <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mt-2">Analysis of your learning patterns_</p>
            </div>

            <div className="p-6 space-y-8">
                {/* Recommendation Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 rounded-[2rem] bg-primary/10 border border-primary/20 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-[4rem] -mr-6 -mt-6" />

                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                            <Split className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xs font-black text-white uppercase tracking-widest">Why this path?</h3>
                            <p className="text-[8px] font-black text-primary uppercase tracking-widest">Adaptive adjustment</p>
                        </div>
                    </div>

                    <p className="text-xs text-platinum-dim leading-relaxed font-medium">
                        "Detectamos que dominas la teoría de <span className="text-white">Redes Neuronales</span> pero tus tiempos en laboratorio son 2x superiores a la media."
                    </p>

                    <div className="mt-4 p-4 bg-black/40 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-black text-platinum-dim uppercase tracking-widest mb-1">Recommendation:</p>
                        <p className="text-xs font-bold text-white leading-snug">
                            He insertado el módulo <span className="text-primary italic">Python Optimization</span> para mejorar tu velocidad antes de avanzar a Transformers.
                        </p>
                    </div>
                </motion.div>

                {/* Skill Radar Simulation */}
                <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Skill Radar_</h3>
                        <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-400 text-[8px] font-black uppercase tracking-widest">Live</span>
                    </div>

                    <div className="relative w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-white/5 flex items-center justify-center">
                            <div className="w-3/4 h-3/4 rounded-full border border-white/5 flex items-center justify-center">
                                <div className="w-1/2 h-1/2 rounded-full border border-white/5" />
                            </div>
                        </div>

                        {/* Fake Radar Polygon */}
                        <div
                            className="w-2/3 h-2/3 bg-primary/30 border border-primary/60 relative"
                            style={{ clipPath: 'polygon(50% 10%, 90% 40%, 75% 90%, 25% 90%, 10% 40%)' }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-glow" />
                            <div className="absolute top-1/4 left-0 -translate-x-1 w-2 h-2 bg-primary rounded-full shadow-glow" />
                        </div>

                        {/* Labels */}
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-black text-platinum-dim uppercase">Logic</span>
                        <span className="absolute top-1/2 -right-4 -translate-y-1/2 text-[8px] font-black text-platinum-dim uppercase">Math</span>
                        <span className="absolute -bottom-2 right-4 text-[8px] font-black text-platinum-dim uppercase">Code</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="p-3 rounded-2xl bg-black/30 border border-white/5 text-center">
                            <p className="text-[8px] font-black text-platinum-dim uppercase tracking-widest">Logic</p>
                            <p className="text-lg font-black italic text-primary">92%</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-black/30 border border-white/5 text-center">
                            <p className="text-[8px] font-black text-platinum-dim uppercase tracking-widest">Speed</p>
                            <p className="text-lg font-black italic text-primary-dim">64%</p>
                        </div>
                    </div>
                </div>

                <button className="w-full py-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-neon-blue hover:scale-105 transition-all flex items-center justify-center gap-3">
                    <Target className="w-4 h-4" />
                    Resume: Optimization
                </button>
            </div>
        </div>
    );
}
