'use client';

import { motion } from 'framer-motion';
import { Award, Star, Zap, Code, Github, Trophy } from 'lucide-react';

const achievements = [
    { name: 'Python Básico', tier: 'Oro', icon: Code, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
    { name: 'Visualización', tier: 'Plata', icon: Award, color: 'text-platinum', bg: 'bg-white/10', border: 'border-white/20' },
    { name: 'Intro a la IA', tier: 'Bronce', icon: Zap, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
    { name: 'Ingeniería Prompt', tier: 'Plata', icon: Star, color: 'text-platinum', bg: 'bg-white/10', border: 'border-white/20' },
    { name: 'Contributor Elite', tier: 'Oro', icon: Github, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
];

export function DashboardAchievements() {
    return (
        <div className="bg-surface/30 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 space-y-10 shadow-[0_0_80px_rgba(255,255,255,0.02)]">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Trophy className="text-primary w-6 h-6" />
                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Logros Recientes_</h3>
                </div>
                <button className="text-[10px] font-black text-platinum-dim hover:text-white uppercase tracking-[0.2em] transition-all bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    Historial Bóveda
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {achievements.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-black/20 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 group cursor-pointer relative overflow-hidden"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity`} />

                        <div className={`w-16 h-16 rounded-[1.2rem] flex items-center justify-center ${item.bg} ${item.border} border group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-2xl shadow-black`}>
                            <item.icon className={`w-8 h-8 ${item.color} drop-shadow-[0_0_8px_rgba(25,127,230,0.5)]`} />
                        </div>

                        <div className="text-center relative z-10">
                            <p className="text-xs font-black text-white italic tracking-tight mb-1">{item.name}</p>
                            <p className="text-[9px] font-black text-platinum-dim uppercase tracking-[0.2em] opacity-60">Dominio {item.tier}_</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
