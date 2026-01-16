'use client';

import { motion } from 'framer-motion';

export function HeatmapWidget() {
    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 w-full h-[400px] relative overflow-hidden bg-deep-space">
            <div className="absolute top-6 left-6 z-10">
                <h3 className="text-xl font-bold text-white mb-1">Live User Activity</h3>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse-fast"></span>
                    <span className="text-sm text-platinum-dim">847 Users Online now</span>
                </div>
            </div>

            {/* Simulated World Map Background (Abstract) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg viewBox="0 0 800 400" className="w-full h-full text-white/30 fill-current">
                    <path d="M150,150 Q200,100 250,150 T350,150 T450,150 T550,150" stroke="currentColor" strokeWidth="2" fill="none" />
                    {/* Simplified landmasses just for visual anchor - in real app, use geojson */}
                    <rect x="100" y="80" width="200" height="150" rx="100" /> {/* Americas */}
                    <rect x="350" y="50" width="250" height="180" rx="100" /> {/* Eurasia/Africa */}
                </svg>
            </div>

            {/* Heatmap Points - Latam Focus */}
            <div className="absolute inset-0">
                <HeatPoint x={22} y={55} intensity="high" /> {/* Colombia/Mexico */}
                <HeatPoint x={25} y={65} intensity="medium" /> {/* Peru */}
                <HeatPoint x={28} y={75} intensity="high" /> {/* Argentina/Chile */}
                <HeatPoint x={55} y={45} intensity="medium" /> {/* Spain */}
                <HeatPoint x={18} y={35} intensity="low" /> {/* US */}
            </div>

            <div className="absolute bottom-6 right-6 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs text-platinum-dim border border-white/10">
                Scanning latency: 24ms
            </div>
        </div>
    );
}

function HeatPoint({ x, y, intensity }: { x: number, y: number, intensity: 'low' | 'medium' | 'high' }) {
    const size = intensity === 'high' ? 80 : intensity === 'medium' ? 60 : 40;
    const color = intensity === 'high' ? 'rgba(236, 72, 153, 0.5)' : intensity === 'medium' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.3)';

    return (
        <motion.div
            className="absolute rounded-full blur-2xl filter"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                background: color,
            }}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2
            }}
        />
    )
}
