'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function StudyCalendar() {
    const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const weeks = 4;

    const [activityData, setActivityData] = useState<number[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setActivityData(Array.from({ length: weeks * 7 }, () => Math.floor(Math.random() * 4)));
    }, []);

    if (!mounted) return null;

    const getColor = (intensity: number) => {
        if (intensity === 0) return 'bg-white/5 border border-white/5';
        if (intensity === 1) return 'bg-neural-blue/20 border border-neural-blue/30';
        if (intensity === 2) return 'bg-neural-blue/50 border border-neural-blue/60 shadow-[0_0_5px_rgba(59,130,246,0.3)]';
        return 'bg-neural-blue border border-neural-blue shadow-[0_0_10px_rgba(59,130,246,0.6)]';
    };

    return (
        <div className="bg-surface/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-lg h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Actividad de Estudio</h3>
                    <p className="text-xs text-platinum-dim font-medium uppercase tracking-wider">Últimas 4 semanas</p>
                </div>
                <div className="text-2xl opacity-80 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">📅</div>
            </div>

            <div className="space-y-3">
                {/* Day labels */}
                <div className="flex gap-2 mb-2 justify-center lg:justify-start">
                    <div className="w-6" /> {/* Offset for week labels */}
                    {days.map((day, i) => (
                        <div key={i} className="w-8 text-center text-[10px] text-platinum-dim font-bold">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Heatmap grid */}
                <div className="flex flex-col gap-2 items-center lg:items-start">
                    {Array.from({ length: weeks }).map((_, weekIndex) => (
                        <div key={weekIndex} className="flex gap-2 items-center">
                            <div className="w-6 text-[10px] text-platinum-dim/50 font-mono text-right">S{weeks - weekIndex}</div>
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                                const index = weekIndex * 7 + dayIndex;
                                const intensity = activityData[index];
                                return (
                                    <motion.div
                                        key={dayIndex}
                                        whileHover={{ scale: 1.3, zIndex: 10 }}
                                        className={`w-8 h-8 rounded-lg ${getColor(intensity)} cursor-pointer transition-all duration-300 relative group`}
                                        title={`${intensity} sesiones`}
                                    >
                                        {intensity > 2 && (
                                            <div className="absolute inset-0 bg-white/20 blur-[2px] rounded-lg animate-pulse" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start mt-8 pt-4 border-t border-white/5 gap-3">
                <div className="text-[10px] text-platinum-dim font-bold uppercase">Menos</div>
                <div className="flex gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className={`w-3 h-3 rounded ${getColor(i).split(' ')[0]}`} />
                    ))}
                </div>
                <div className="text-[10px] text-platinum-dim font-bold uppercase">Más</div>
            </div>
        </div>
    );
}
