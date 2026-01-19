'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatCardProps {
    icon: ReactNode;
    value: string | number;
    label: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    color?: string;
}

export function StatCard({ icon, value, label, trend, color = 'neural-blue' }: StatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="glass-panel p-6 rounded-xl border border-white/10 relative overflow-hidden group"
        >
            <div className={`absolute top-0 left-0 w-full h-1 bg-${color}`} />

            <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{icon}</div>
                {trend && (
                    <div className={`text-sm font-bold ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {trend.isPositive ? '↗' : '↘'} {trend.value}
                    </div>
                )}
            </div>

            <div className="text-4xl font-bold text-white mb-2">{value}</div>
            <div className="text-sm text-platinum-dim">{label}</div>
        </motion.div>
    );
}
