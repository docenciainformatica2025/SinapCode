'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Linkedin } from 'lucide-react';

interface ChannelEfficiency {
    name: string;
    cac: number;
    roi: number;
    width: number;
    color: string;
    icon?: any;
}

export function AttributionEfficiencyBars() {
    const data: ChannelEfficiency[] = [
        { name: 'LinkedIn (AI Post)', cac: 32, roi: 520, width: 85, color: '#258cf4', icon: Linkedin },
        { name: 'Google Ads (Search)', cac: 58, roi: 310, width: 65, color: '#8b5cf6' },
        { name: 'WhatsApp (Community)', cac: 12, roi: 850, width: 95, color: '#06b6d4' },
        { name: 'Referidos / Directo', cac: 5, roi: 1200, width: 100, color: '#f59e0b' },
    ];

    return (
        <div className="glass-panel-nexus rounded-[2.5rem] border border-white/5 bg-white/5 p-8 backdrop-blur-xl h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h4 className="text-xl font-bold text-white tracking-tight">Eficiencia: ROI vs CAC</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Comparativa por canal de adquisición</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-1.5 text-[10px] font-bold rounded-full bg-primary/20 text-primary border border-primary/20 uppercase tracking-tighter">ROI View</button>
                    <button className="px-4 py-1.5 text-[10px] font-bold rounded-full bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 transition uppercase tracking-tighter">CAC View</button>
                </div>
            </div>

            <div className="flex-1 space-y-8">
                {data.map((item, i) => (
                    <div key={item.name} className="group cursor-default">
                        <div className="flex justify-between items-end mb-3">
                            <div className="flex items-center gap-3">
                                {item.icon ? <item.icon className="w-4 h-4 text-primary" /> : <div className="w-4 h-4 rounded-sm bg-white/10" />}
                                <span className="text-sm font-semibold text-slate-200">{item.name}</span>
                            </div>
                            <div className="flex gap-6 text-[11px] font-mono">
                                <span className="text-slate-500">CAC: <span className="text-white font-bold">${item.cac}</span></span>
                                <span className="text-[#f59e0b] font-bold">ROI: {item.roi}%</span>
                            </div>
                        </div>
                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.width}%` }}
                                transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                                className="h-full rounded-full relative"
                                style={{ backgroundColor: item.color }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer"></div>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-5 bg-primary/5 border border-primary/10 rounded-2xl flex gap-4 items-start">
                <TrendingUp className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h5 className="text-sm font-bold text-white tracking-tight">AI Insight: LinkedIn Performance</h5>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Las campañas originadas en posts de "Tendencias AI" tienen un <span className="text-primary font-bold">CAC 25% menor</span> que los posts técnicos genéricos.
                    </p>
                </div>
            </div>
        </div>
    );
}
