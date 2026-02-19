'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export function WarRoomSurgeVisualizer() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-black/60 border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden h-full flex flex-col shadow-2xl backdrop-blur-3xl">
            <div className="flex justify-between items-center mb-8 z-10">
                <div>
                    <h3 className="text-white font-black uppercase tracking-[0.25em] text-[10px] flex items-center gap-3">
                        <span className="size-2 rounded-full bg-[#0df2f2] animate-pulse shadow-[0_0_12px_rgba(13,242,242,0.8)]"></span>
                        Live Session Surge Visualizer
                    </h3>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-2 opacity-40">Telemetría de Red Neuronal SinapCode</p>
                </div>
                <div className="flex gap-2">
                    {['1m', '5m', '1h'].map((t) => (
                        <span key={t} className={`px-4 py-1.5 rounded-xl text-[9px] font-black tracking-widest uppercase cursor-pointer transition-all duration-300 ${t === '5m' ? 'bg-[#0df2f2]/20 text-[#0df2f2] border border-[#0df2f2]/20 shadow-lg shadow-[#0df2f2]/10' : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10 hover:text-white/60'
                            }`}>
                            {t}_
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex-1 relative">
                {/* SVG Graph */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                    <defs>
                        <linearGradient id="nexusSurge" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#0df2f2" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#0df2f2" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Area */}
                    <motion.path
                        initial={{ d: "M0,250 L100,245 L200,248 L300,240 L400,245 L500,235 L600,230 L700,250 L800,250 L900,250 L1000,250 V300 H0 Z" }}
                        animate={{ d: "M0,250 L100,240 L200,245 L300,230 L400,240 L500,220 L600,210 L700,50 L800,45 L900,40 L1000,38 V300 H0 Z" }}
                        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
                        fill="url(#nexusSurge)"
                    />
                    {/* Line */}
                    <motion.path
                        initial={{ d: "M0,250 L100,245 L200,248 L300,240 L400,245 L500,235 L600,230 L700,250 L800,250 L900,250 L1000,250" }}
                        animate={{ d: "M0,250 L100,240 L200,245 L300,230 L400,240 L500,220 L600,210 L700,50 L800,45 L900,40 L1000,38" }}
                        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
                        fill="none"
                        stroke="#0df2f2"
                        strokeLinecap="round"
                        strokeWidth="2"
                        className="opacity-60"
                    />
                    {/* Highlight Point */}
                    <motion.circle
                        animate={{ r: [3, 6, 3], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        cx="700" cy="50" fill="#0df2f2" r="4"
                    />
                </svg>

                {/* Annotations */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute top-[30px] left-[710px] bg-black/60 border border-primary/30 backdrop-blur-2xl p-4 rounded-2xl z-10 shadow-2xl"
                >
                    <span className="block font-black text-white uppercase italic text-[8px] tracking-[0.3em] opacity-40 mb-1">Pico de Tráfico Detectado_</span>
                    <span className="text-white font-black text-xl tracking-tighter leading-none">
                        542.810 <span className="text-primary text-[10px]">Active</span>
                    </span>
                </motion.div>

                {/* Vertical Grid Lines */}
                <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.03]">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-[1px] h-full bg-white" />)}
                </div>
            </div>

            <div className="flex justify-between mt-8 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic">
                <span>12:00</span>
                <span>12:05</span>
                <span>12:10</span>
                <span>12:15</span>
                <div className="flex items-center gap-2 text-[#0df2f2]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0df2f2] animate-pulse" />
                    <span className="font-black">LIVE: 12:20_</span>
                </div>
            </div>
        </div>
    );
}
