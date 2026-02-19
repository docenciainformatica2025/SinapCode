'use client';

import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';

interface PulsePointProps {
    x: string;
    y: string;
    label: string;
    percentage: string;
    color: string;
}

const PulsePoint = ({ x, y, label, percentage, color }: PulsePointProps) => (
    <div className="absolute group z-10" style={{ top: y, left: x }}>
        <div className="relative flex items-center justify-center">
            <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className={`absolute w-8 h-8 rounded-full border-2 ${color}/50`}
            />
            <div className={`w-3 h-3 rounded-full shadow-lg ${color}`} />

            {/* Tooltip */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: -45 }}
                className="absolute left-1/2 -translate-x-1/2 bg-deep-space/90 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-xl text-[10px] whitespace-nowrap shadow-2xl pointer-events-none"
            >
                <div className="flex items-center gap-2 font-black text-white">
                    <MapPin className={`w-3 h-3 ${color.replace('bg-', 'text-')}`} />
                    {label}: {percentage}
                </div>
            </motion.div>
        </div>
    </div>
);

export function GeoDistributionMap() {
    return (
        <div className="glass-panel-nexus rounded-3xl p-8 relative overflow-hidden h-full border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl">
            <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="font-black text-xl text-white flex items-center gap-3 tracking-tighter">
                    <Globe className="text-neural-blue w-6 h-6" />
                    Distribución Global_
                </h3>
                <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Pulso en Vivo
                </div>
            </div>

            {/* Map Canvas */}
            <div className="relative w-full h-80 mt-10 rounded-3xl overflow-hidden bg-deep-space">
                {/* Stylized World Map Background */}
                <div className="absolute inset-0 opacity-20 filter grayscale contrast-125">
                    <img
                        src="https://images.unsplash.com/photo-1521295121812-706566e94474?auto=format&fit=crop&q=80&w=2070"
                        alt="Stylized dark world map"
                        className="w-full h-full object-cover mix-blend-screen"
                    />
                </div>

                {/* Pulse Locations */}
                <PulsePoint x="20%" y="25%" label="USA" percentage="45%" color="bg-neural-blue" />
                <PulsePoint x="48%" y="22%" label="Europa" percentage="28%" color="bg-purple-500" />
                <PulsePoint x="68%" y="40%" label="India" percentage="22%" color="bg-amber-400" />
                <PulsePoint x="15%" y="65%" label="LATAM" percentage="15%" color="bg-emerald-400" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                {/* Bottom Legend */}
                <div className="absolute bottom-6 right-6 bg-deep-space/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 z-20">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white">
                            <span className="w-2.5 h-2.5 rounded-full bg-neural-blue shadow-[0_0_10px_rgba(13,185,242,0.5)]" />
                            Tráfico Alto
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-platinum-dim">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 opacity-60" />
                            Emergente
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
