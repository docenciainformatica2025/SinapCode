'use client';

import { motion } from 'framer-motion';
import { BarChart2, Clock, MousePointer2 } from 'lucide-react';

export function InteractionMetrics() {
    return (
        <div className="glass-panel-nexus rounded-3xl p-8 flex flex-col h-full border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden group">
            <div className="flex justify-between items-center mb-10">
                <h3 className="font-black text-xl text-white flex items-center gap-3 tracking-tighter">
                    <BarChart2 className="text-amber-400 w-6 h-6" />
                    Métricas de Interacción_
                </h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-neural-blue shadow-[0_0_8px_rgba(13,185,242,0.5)]" />
                        <span className="text-[10px] font-black text-platinum-dim uppercase tracking-widest">Clics</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                        <span className="text-[10px] font-black text-platinum-dim uppercase tracking-widest">Duración</span>
                    </div>
                </div>
            </div>

            {/* Hybrid Chart Area */}
            <div className="flex-1 w-full relative min-h-[250px] border-b border-l border-white/10 rounded-bl-2xl bg-white/[0.02]">
                {/* Grid Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                        backgroundSize: '16.66% 25%'
                    }}
                />

                {/* Bars Area (Clicks) */}
                <div className="absolute inset-0 flex items-end justify-around px-8 pb-1">
                    {[40, 65, 45, 80, 70, 90].map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="w-8 bg-neural-blue/20 hover:bg-neural-blue/40 transition-all rounded-t-lg border-t border-x border-neural-blue/30 relative group/bar"
                        >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neural-blue text-white px-2 py-1 rounded text-[8px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-50">
                                {h * 15} Clics
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Line Graph Overlay (Duration) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none px-12" preserveAspectRatio="none">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d="M 0 200 L 100 180 L 250 100 L 400 120 L 550 40 L 700 60 L 850 20"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        className="opacity-80"
                    />
                </svg>

                {/* Tooltip Overlay */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.5 }}
                    className="absolute top-[20%] left-[55%] bg-deep-space/90 backdrop-blur-2xl px-5 py-4 rounded-3xl border border-white/10 shadow-3xl z-40 group-hover:scale-110 transition-transform"
                >
                    <div className="flex flex-col gap-2">
                        <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest">Módulo: Curso 101 AI</p>
                        <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <span className="text-xl font-black text-white">45s <span className="text-xs font-bold text-platinum-dim uppercase tracking-widest">Promedio</span></span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MousePointer2 className="w-4 h-4 text-neural-blue" />
                            <span className="text-xs font-bold text-platinum-dim uppercase tracking-widest">Compromiso <span className="text-emerald-400">Muy Alto</span></span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between mt-6 text-[10px] font-black text-platinum-dim uppercase tracking-widest px-10">
                <span>Intro</span>
                <span>Cap. 1</span>
                <span>Cap. 2</span>
                <span>Quiz</span>
                <span>Cap. 3</span>
                <span>Final_</span>
            </div>
        </div>
    );
}
