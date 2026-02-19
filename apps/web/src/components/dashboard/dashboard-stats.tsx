'use client';

import { motion } from 'framer-motion';
import { Clock, Brain, BarChart3, Bot } from 'lucide-react';

interface DashboardStatsProps {
    stats?: {
        totalXP: number;
        activeCourses: number;
        certificates: number;
        streakDays: number;
    };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
    const defaultStats = [
        {
            label: 'Horas de Estudio',
            value: '124',
            sub: 'Horas',
            icon: Clock,
            color: 'text-emerald-400',
            bg: 'bg-emerald-400/10',
            border: 'border-emerald-400/20',
            trend: '+12h esta semana'
        },
        {
            label: 'Proyectos Activos',
            value: stats?.activeCourses?.toString() || '0',
            sub: 'Cursos',
            icon: Brain,
            color: 'text-cyan-400',
            bg: 'bg-cyan-400/10',
            border: 'border-cyan-400/20',
            trend: 'En Desarrollo'
        },
        {
            label: 'Certificaciones',
            value: stats?.certificates?.toString() || '0',
            sub: 'Docs',
            icon: BarChart3,
            color: 'text-lime-400',
            bg: 'bg-lime-400/10',
            border: 'border-lime-400/20',
            trend: 'Validadas'
        },
        {
            label: 'Racha Actual',
            value: stats?.streakDays?.toString() || '0',
            sub: 'Días',
            icon: Bot,
            color: 'text-indigo-400',
            bg: 'bg-indigo-400/10',
            border: 'border-indigo-400/20',
            trend: 'Usuario Constante'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {defaultStats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`p-6 rounded-[2rem] bg-surface/30 backdrop-blur-2xl border border-white/5 hover:border-white/10 transition-all group relative flex flex-col justify-between overflow-hidden shadow-2xl`}
                >
                    {/* Background glow for each card */}
                    <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-3xl opacity-20 ${stat.bg} group-hover:opacity-40 transition-opacity`} />

                    <div className="flex justify-between items-start relative z-10">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.border} border shadow-lg`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                    </div>

                    <div className="mt-4 relative z-10">
                        <p className="text-[10px] text-platinum-dim font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <div className="flex items-baseline gap-2">
                            <span className={`text-3xl font-black text-white tracking-tighter`}>{stat.value}</span>
                            <span className={`text-xs font-bold ${stat.color} opacity-80 uppercase tracking-widest`}>{stat.sub}</span>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-black text-platinum-dim/50 uppercase tracking-widest relative z-10">
                        <div className={`w-1 h-1 rounded-full ${stat.bg.replace('/10', '/100')}`} />
                        {stat.trend}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
