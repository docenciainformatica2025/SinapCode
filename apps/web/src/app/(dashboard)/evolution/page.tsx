'use client';

import { Activity, Trophy, Target, Award, Zap, TrendingUp, ChevronRight } from 'lucide-react';
import { ProgressRing } from '@/components/dashboard/progress-ring';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SkillTreeRoadmap } from '@/components/dashboard/evolution/skill-tree-roadmap';
import { SkillAIInsight } from '@/components/dashboard/evolution/skill-ai-insight';

export default function EvolutionPage() {
    return (
        <div className="min-h-screen bg-deep-space text-white pb-20">
            <main className="max-w-7xl mx-auto p-4 md:p-8 pt-24 lg:pt-10">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter">Mi Evolución</h1>
                    </motion.div>
                    <p className="text-platinum-dim text-lg max-w-2xl font-medium">Analiza tu progreso técnico, domina nuevas habilidades y escala en el ranking de SinapCODE.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-surface/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-emerald-500/30 transition-all"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-emerald-400 mb-6 font-bold text-xs uppercase tracking-widest">
                                <Activity className="w-4 h-4" />
                                Nivel Actual
                            </div>
                            <div className="text-5xl font-black mb-2 text-white group-hover:scale-105 transition-transform origin-left">Junior</div>
                            <div className="text-sm font-bold text-platinum-dim bg-white/5 inline-block px-3 py-1 rounded-full uppercase tracking-tighter">Tech Builder II</div>
                        </div>
                        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-emerald-500 group-hover:rotate-12 transition-transform duration-700">
                            <Activity className="w-48 h-48" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-surface/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-xl group hover:border-cyan-500/30 transition-all"
                    >
                        <div className="flex items-center gap-2 text-cyan-400 mb-6 font-bold text-xs uppercase tracking-widest">
                            <Trophy className="w-4 h-4" />
                            Logros
                        </div>
                        <div className="text-4xl font-black mb-4 text-white">12 <span className="text-xl text-platinum-dim font-bold">/ 50</span></div>
                        <div className="space-y-4">
                            <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '24%' }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                />
                            </div>
                            <p className="text-[10px] font-bold text-platinum-dim uppercase tracking-wider text-right">24% Completado</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-surface/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-xl group hover:border-purple-500/30 transition-all"
                    >
                        <div className="flex items-center gap-2 text-purple-400 mb-6 font-bold text-xs uppercase tracking-widest">
                            <Target className="w-4 h-4" />
                            Meta Semanal
                        </div>
                        <div className="text-4xl font-black mb-4 text-white">85%</div>
                        <div className="flex items-center gap-2 text-xs font-bold text-platinum-dim">
                            <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                            ¡Mantén el ritmo, vas por buen camino!
                        </div>
                        <div className="mt-4 flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-surface bg-platinum/10 flex items-center justify-center text-[10px] font-bold text-white backdrop-blur-sm">
                                    {i}d
                                </div>
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-surface bg-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-purple-500/20">
                                +
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">

                    {/* Visual Roadmap Canvas */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden h-[700px]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                    <Award className="w-7 h-7 text-emerald-400" />
                                    Mapa de Maestría Técnica
                                </h2>
                                <div className="flex gap-2">
                                    {['Focus', 'Reset', 'Z-'].map(btn => (
                                        <button key={btn} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black text-white uppercase hover:bg-primary transition-all">
                                            {btn}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <SkillTreeRoadmap />
                        </div>
                    </div>

                    {/* AI Intelligence Panel */}
                    <div className="lg:col-span-4">
                        <div className="glass-panel rounded-[2.5rem] border border-white/5 h-full bg-surface/20">
                            <SkillAIInsight />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
