'use client';

import { motion } from 'framer-motion';

export function StudyCalendar() {
    const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const weeks = 4;

    // Mock activity data (0-3 intensity)
    const activityData = Array.from({ length: weeks * 7 }, () => Math.floor(Math.random() * 4));

    const getColor = (intensity: number) => {
        if (intensity === 0) return 'bg-white/5';
        if (intensity === 1) return 'bg-neural-blue/30';
        if (intensity === 2) return 'bg-neural-blue/60';
        return 'bg-neural-blue';
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white">Actividad de Estudio</h3>
                    <p className="text-sm text-platinum-dim">Últimas 4 semanas</p>
                </div>
                <div className="text-2xl">📅</div>
            </div>

            <div className="space-y-2">
                {/* Day labels */}
                <div className="flex gap-2 mb-2">
                    <div className="w-8" />
                    {days.map((day, i) => (
                        <div key={i} className="w-8 text-center text-xs text-platinum-dim font-medium">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Heatmap grid */}
                {Array.from({ length: weeks }).map((_, weekIndex) => (
                    <div key={weekIndex} className="flex gap-2 items-center">
                        <div className="w-8 text-xs text-platinum-dim">S{weeks - weekIndex}</div>
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                            const index = weekIndex * 7 + dayIndex;
                            const intensity = activityData[index];
                            return (
                                <motion.div
                                    key={dayIndex}
                                    whileHover={{ scale: 1.2 }}
                                    className={`w-8 h-8 rounded ${getColor(intensity)} cursor-pointer transition-all`}
                                    title={`${intensity} sesiones`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <div className="text-xs text-platinum-dim">Menos</div>
                <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className={`w-4 h-4 rounded ${getColor(i)}`} />
                    ))}
                </div>
                <div className="text-xs text-platinum-dim">Más</div>
            </div>
        </div>
    );
}
