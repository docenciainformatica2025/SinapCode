'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Monitor, Smartphone } from 'lucide-react';

export function HeatmapHub() {
    const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

    return (
        <div className="glass-panel-nexus rounded-3xl p-6 flex flex-col h-full border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-xl text-white flex items-center gap-3 tracking-tighter">
                    <Flame className="text-emerald-400 w-6 h-6" />
                    Heatmap Hub_
                </h3>

                <div className="bg-white/5 p-1 rounded-2xl flex text-[10px] font-black uppercase tracking-widest border border-white/5">
                    <button
                        onClick={() => setDevice('desktop')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${device === 'desktop' ? 'bg-neural-blue text-white shadow-lg' : 'text-platinum-dim hover:text-white'}`}
                    >
                        <Monitor className="w-3 h-3" />
                        Desktop
                    </button>
                    <button
                        onClick={() => setDevice('mobile')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${device === 'mobile' ? 'bg-neural-blue text-white shadow-lg' : 'text-platinum-dim hover:text-white'}`}
                    >
                        <Smartphone className="w-3 h-3" />
                        Mobile
                    </button>
                </div>
            </div>

            <div className={`flex-1 relative bg-deep-space rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 ${device === 'mobile' ? 'max-w-[320px] mx-auto' : 'w-full'}`}>
                {/* Website Preview Mockup */}
                <div className="absolute inset-0 bg-slate-900 overflow-hidden opacity-30">
                    <div className="h-8 bg-slate-800 border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="h-32 bg-slate-800 rounded-xl w-full border border-white/5" />
                        <div className="flex gap-4">
                            <div className="h-48 bg-slate-800 rounded-xl w-1/3 border border-white/5" />
                            <div className="h-48 bg-slate-800 rounded-xl w-2/3 border border-white/5" />
                        </div>
                        <div className="h-16 bg-slate-800 rounded-xl w-full border border-white/5" />
                    </div>
                </div>

                {/* Heatmap Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-60"
                    style={{
                        background: `
                            radial-gradient(circle at 75% 35%, rgba(2ef, 68, 68, 0.6) 0%, transparent 25%), 
                            radial-gradient(circle at 25% 65%, rgba(245, 158, 11, 0.4) 0%, transparent 30%),
                            radial-gradient(circle at 50% 85%, rgba(13, 185, 242, 0.4) 0%, transparent 35%)
                        `
                    }}
                />

                {/* Pulsing Hotspots */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-[35%] right-[25%] w-12 h-12 bg-red-500 rounded-full blur-xl z-20"
                />

                {/* Tooltip Simulation */}
                <div className="absolute top-[32%] right-[22%] bg-deep-space/90 backdrop-blur-xl px-3 py-2 rounded-xl border border-red-500 shadow-2xl text-[10px] text-white z-30">
                    <span className="font-black text-red-500">1.2k Clics</span>
                    <p className="opacity-60">Botón CTA Principal</p>
                </div>
            </div>

            <div className="mt-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-platinum-dim">
                <span className="opacity-60">Página: /pricing</span>
                <div className="flex items-center gap-3">
                    <div className="w-24 h-2 rounded-full bg-gradient-to-r from-neural-blue via-amber-400 to-red-500 shadow-inner" />
                    <span className="opacity-60">Intensidad_</span>
                </div>
            </div>
        </div>
    );
}
