'use client';

import { motion } from 'framer-motion';

export function AttributionChannelChart() {
    const channels = [
        { label: 'LinkedIn Ads', value: 35, color: '#258cf4' },
        { label: 'Google Search', value: 25, color: '#8b5cf6' },
        { label: 'Direct / Email', value: 20, color: '#06b6d4' },
        { label: 'WhatsApp', value: 12, color: '#f59e0b' },
        { label: 'Referrals', value: 8, color: '#64748b' },
    ];

    // Calculate conic gradient
    let cumulative = 0;
    const gradient = channels.map(c => {
        const start = cumulative;
        cumulative += c.value;
        return `${c.color} ${start}% ${cumulative}%`;
    }).join(', ');

    return (
        <div className="glass-panel-nexus rounded-[2.5rem] border border-white/5 bg-white/5 p-8 backdrop-blur-xl flex flex-col h-full">
            <h4 className="text-xl font-bold text-white mb-8 tracking-tight">Distribución de Canales</h4>

            <div className="flex-1 flex flex-col items-center justify-center py-6">
                <div className="relative w-56 h-56 rounded-full group" style={{ background: `conic-gradient(${gradient})` }}>
                    <div className="absolute inset-6 bg-[#0a1212] rounded-full flex flex-col items-center justify-center z-10 border border-white/5">
                        <span className="text-xs text-slate-500 uppercase tracking-widest">Canal Top</span>
                        <span className="text-2xl font-bold text-[#258cf4]">LinkedIn</span>
                        <span className="text-sm font-mono text-slate-400">35%</span>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full blur-2xl bg-primary/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>

            <div className="mt-8 space-y-4">
                {channels.map((channel, i) => (
                    <motion.div
                        key={channel.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between text-sm"
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }}></span>
                            <span className="text-slate-300 font-medium">{channel.label}</span>
                        </div>
                        <span className="font-mono font-bold text-white">{channel.value}%</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
