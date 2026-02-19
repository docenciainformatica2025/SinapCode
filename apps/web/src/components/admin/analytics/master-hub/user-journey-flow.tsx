'use client';

import { motion } from 'framer-motion';
import { GitBranch, ArrowRight } from 'lucide-react';

export function UserJourneyFlow() {
    return (
        <div className="glass-panel-nexus rounded-3xl p-8 flex flex-col h-full border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-10 relative z-10">
                <h3 className="font-black text-xl text-white flex items-center gap-3 tracking-tighter">
                    <GitBranch className="text-purple-400 w-6 h-6" />
                    Flujo del Usuario_
                </h3>
                <button className="text-[10px] font-black text-neural-blue hover:text-white transition-all uppercase tracking-widest flex items-center gap-2 group">
                    Informe Completo
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="flex-1 flex items-center justify-between px-8 relative">
                {/* SVG Connector Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    {/* Flow 1: Blog -> Academy */}
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.2 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        d="M 120 120 C 220 120, 220 180, 320 180"
                        fill="none"
                        stroke="#0db9f2"
                        strokeWidth="16"
                    />
                    <motion.path
                        initial={{ pathOffset: 0 }}
                        animate={{ pathOffset: -1 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        d="M 120 120 C 220 120, 220 180, 320 180"
                        fill="none"
                        stroke="#0db9f2"
                        strokeDasharray="4,8"
                        strokeWidth="2"
                    />

                    {/* Flow 2: Drop off */}
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.1 }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        d="M 120 120 C 220 120, 220 60, 320 60"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="6"
                    />

                    {/* Flow 3: Academy -> Enrollment */}
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.15 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        d="M 440 180 C 540 180, 540 140, 640 140"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="10"
                    />
                </svg>

                {/* Node 1: Entry */}
                <div className="z-10 flex flex-col gap-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-deep-space/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 border-l-4 border-l-neural-blue w-40 shadow-2xl"
                    >
                        <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-1">Origen</p>
                        <p className="text-sm font-black text-white">Post del Blog</p>
                        <p className="text-xs font-bold text-neural-blue mt-2">12,500 usuarios</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-deep-space/40 backdrop-blur-xl p-4 rounded-2xl border border-white/5 border-l-4 border-l-white/20 w-40 opacity-50"
                    >
                        <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-1">Origen</p>
                        <p className="text-sm font-black text-white">Directo</p>
                    </motion.div>
                </div>

                {/* Node 2: Mid */}
                <div className="z-10 flex flex-col gap-12 mt-12">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-deep-space/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 border-l-4 border-l-red-500 w-40 opacity-80"
                    >
                        <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-1">Abandono</p>
                        <p className="text-sm font-black text-white">Rebote</p>
                        <p className="text-xs font-bold text-red-500 mt-2">20% tasa</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-deep-space/90 backdrop-blur-2xl p-6 rounded-3xl border-2 border-emerald-500/30 border-l-4 border-l-emerald-500 w-48 shadow-[0_0_40px_rgba(16,185,129,0.1)] relative"
                    >
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full animate-ping opacity-20" />
                        <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-1">Página</p>
                        <p className="text-sm font-black text-white">Academia</p>
                        <p className="text-xs font-bold text-emerald-400 mt-2">8,200 usuarios</p>
                    </motion.div>
                </div>

                {/* Node 3: End */}
                <div className="z-10 flex flex-col gap-6">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: [0.9, 1, 0.9] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="bg-deep-space/90 backdrop-blur-xl p-5 rounded-2xl border-2 border-purple-500/50 border-l-4 border-l-purple-500 w-40 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                    >
                        <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-1">Objetivo</p>
                        <p className="text-sm font-black text-white">Inscripción</p>
                        <p className="text-xs font-bold text-purple-400 mt-2">1,400 usuarios</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
