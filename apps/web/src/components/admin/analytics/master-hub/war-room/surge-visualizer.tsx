'use client';

import { motion } from 'framer-motion';

export function WarRoomSurgeVisualizer() {
    return (
        <div className="bg-[#162a2a] border border-primary/20 rounded-2xl p-8 relative overflow-hidden h-full flex flex-col shadow-2xl shadow-primary/5">
            <div className="flex justify-between items-center mb-8 z-10">
                <div>
                    <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3">
                        <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                        Live Session Surge Visualizer
                    </h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Telemetría en tiempo real de todos los puntos de entrada</p>
                </div>
                <div className="flex gap-2">
                    {['1m', '5m', '1h'].map((t) => (
                        <span key={t} className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase cursor-pointer transition-all ${t === '5m' ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-white/5 text-slate-500 border border-white/5 hover:text-slate-300'
                            }`}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex-1 relative">
                {/* SVG Graph */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                    <defs>
                        <linearGradient id="cyanWarRoom" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#0df2f2" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#0df2f2" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Area */}
                    <motion.path
                        initial={{ d: "M0,250 L100,245 L200,248 L300,240 L400,245 L500,235 L600,230 L700,250 L800,250 L900,250 L1000,250 V300 H0 Z" }}
                        animate={{ d: "M0,250 L100,240 L200,245 L300,230 L400,240 L500,220 L600,210 L700,50 L800,45 L900,40 L1000,38 V300 H0 Z" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        fill="url(#cyanWarRoom)"
                    />
                    {/* Line */}
                    <motion.path
                        initial={{ d: "M0,250 L100,245 L200,248 L300,240 L400,245 L500,235 L600,230 L700,250 L800,250 L900,250 L1000,250" }}
                        animate={{ d: "M0,250 L100,240 L200,245 L300,230 L400,240 L500,220 L600,210 L700,50 L800,45 L900,40 L1000,38" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        fill="none"
                        stroke="#0df2f2"
                        strokeLinecap="round"
                        strokeWidth="3"
                    />
                    {/* Highlight Point */}
                    <motion.circle
                        animate={{ r: [5, 8, 5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        cx="700" cy="50" fill="#0df2f2" r="5"
                    />
                </svg>

                {/* Annotations */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                    className="absolute top-[30px] left-[710px] bg-primary/20 border border-primary/50 backdrop-blur-md p-3 rounded-xl z-10 shadow-xl"
                >
                    <span className="block font-black text-white uppercase italic text-[9px] tracking-widest">Pico de Tráfico Masivo</span>
                    <span className="text-primary font-black text-lg tracking-tighter leading-none">542,810 Active</span>
                </motion.div>

                {/* Vertical Grid Lines */}
                <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-px h-full bg-primary" />)}
                </div>
            </div>

            <div className="flex justify-between mt-6 text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
                <span>12:00</span>
                <span>12:05</span>
                <span>12:10</span>
                <span>12:15</span>
                <span className="text-primary font-black italic">LIVE: 12:20</span>
            </div>
        </div>
    );
}
