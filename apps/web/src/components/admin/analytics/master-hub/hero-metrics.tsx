'use client';

import { motion } from 'framer-motion';
import { Users, DownloadCloud as CloudDownload, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string;
    trend: string;
    trendType: 'up' | 'down';
    icon: any;
    subtitle: string;
    color: string;
    sparklineData: number[];
}

const MetricCard = ({ title, value, trend, trendType, icon: Icon, subtitle, color, sparklineData }: MetricCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel-nexus rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition-all border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl"
        >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className={`w-16 h-16 ${color}`} />
            </div>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-sm font-bold text-platinum-dim uppercase tracking-widest">{title}</p>
                    <h3 className="text-4xl font-black text-white mt-2 tracking-tighter">{value}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 border ${trendType === 'up' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                    {trendType === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {trend}
                </div>
            </div>

            {/* Sparkline */}
            <div className="h-16 w-full mt-4">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 25">
                    <defs>
                        <linearGradient id={`grad-${title.replace(/\s+/g, '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: trendType === 'up' ? '#10b981' : '#ef4444', stopOpacity: 0.3 }} />
                            <stop offset="100%" style={{ stopColor: trendType === 'up' ? '#10b981' : '#ef4444', stopOpacity: 0 }} />
                        </linearGradient>
                    </defs>
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d={`M 0 ${25 - sparklineData[0]} ${sparklineData.map((d, i) => `L ${i * (100 / (sparklineData.length - 1))} ${25 - d}`).join(' ')}`}
                        fill="none"
                        stroke={trendType === 'up' ? '#10b981' : '#ef4444'}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <motion.path
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        d={`M 0 ${25 - sparklineData[0]} ${sparklineData.map((d, i) => `L ${i * (100 / (sparklineData.length - 1))} ${25 - d}`).join(' ')} V 25 H 0 Z`}
                        fill={`url(#grad-${title.replace(/\s+/g, '')})`}
                    />
                </svg>
            </div>

            <p className="text-xs text-platinum-dim mt-4 font-medium italic opacity-60">
                {subtitle}
            </p>
        </motion.div>
    );
};

export function HeroMetrics() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
                title="Usuarios Activos"
                value="3,402"
                trend="+12%"
                trendType="up"
                icon={Users}
                subtitle="En Blog, Academia y Portal de Empleo"
                color="text-neural-blue"
                sparklineData={[10, 15, 12, 18, 14, 20, 18, 22, 15, 18]}
            />
            <MetricCard
                title="Descargas Totales"
                value="12.5k"
                trend="+5.2%"
                trendType="up"
                icon={CloudDownload}
                subtitle="PWA y App Móvil combinadas"
                color="text-purple-400"
                sparklineData={[5, 8, 15, 12, 18, 14, 20, 18, 22, 25]}
            />
            <MetricCard
                title="Tasa de Conversión"
                value="4.2%"
                trend="-0.8%"
                trendType="down"
                icon={DollarSign}
                subtitle="Objetivo: 5.0% para el Q4"
                color="text-amber-400"
                sparklineData={[20, 18, 15, 16, 14, 12, 15, 13, 11, 10]}
            />
        </div>
    );
}
