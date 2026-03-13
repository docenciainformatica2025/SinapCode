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
            whileHover={{ scale: 1.02, translateY: -2 }}
            className="group relative bg-[#0B0B0F]/60 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl hover:shadow-[#C9A78A]/5 transition-all duration-500"
        >
            {/* Gradient Glow */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-${color}/20 rounded-full blur-[50px] group-hover:bg-${color}/30 transition-all duration-500`} />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/5 text-${color} text-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                        {icon}
                    </div>
                    {trend && (
                        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full border ${trend.isPositive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                            <span>{trend.isPositive ? '↗' : '↘'}</span>
                            {trend.value}
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <div className="text-3xl md:text-4xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-colors">
                        {value}
                    </div>
                    <div className="text-sm text-platinum-dim font-medium tracking-wide uppercase opacity-80">
                        {label}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
