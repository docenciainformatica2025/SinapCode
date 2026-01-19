'use client';

import { motion } from 'framer-motion';

interface MetricCardProps {
    title: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon: string;
    status?: 'healthy' | 'warning' | 'critical';
}

export function MetricCard({ title, value, change, trend, icon, status = 'healthy' }: MetricCardProps) {
    const statusColors = {
        healthy: 'border-emerald-500/30 bg-emerald-500/5',
        warning: 'border-amber-500/30 bg-amber-500/5',
        critical: 'border-rose-500/30 bg-rose-500/5',
    };

    const trendColors = {
        up: 'text-emerald-400',
        down: 'text-rose-400',
        neutral: 'text-platinum-dim',
    };

    return (
        <motion.div
            whileHover={{ y: -2 }}
            className={`glass-panel p-6 rounded-xl border ${statusColors[status]} transition-all`}
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-platinum-dim text-sm font-medium">{title}</span>
                <span className="text-2xl">{icon}</span>
            </div>

            <div className="text-3xl font-bold text-white mb-2">{value}</div>

            {change && (
                <div className={`text-sm font-medium ${trend ? trendColors[trend] : 'text-platinum-dim'}`}>
                    {trend === 'up' && '↗ '}
                    {trend === 'down' && '↘ '}
                    {change}
                </div>
            )}
        </motion.div>
    );
}
