'use client';

import { motion } from 'framer-motion';
import { Award, Star, Zap, Code, Github, Trophy } from 'lucide-react';

const achievements = [
    { name: 'Python Básico', tier: 'Oro', icon: Code, color: 'text-[#C9A78A]', bg: 'bg-[#C9A78A]/10', border: 'border-[#C9A78A]/20' },
    { name: 'Visualización', tier: 'Plata', icon: Award, color: 'text-[#1E1E1E]', bg: 'bg-[#1E1E1E]/5', border: 'border-[#1E1E1E]/10' },
    { name: 'Intro a la IA', tier: 'Bronce', icon: Zap, color: 'text-[#C9A78A]', bg: 'bg-[#C9A78A]/10', border: 'border-[#C9A78A]/20' },
    { name: 'Ingeniería Prompt', tier: 'Plata', icon: Star, color: 'text-[#1E1E1E]', bg: 'bg-[#1E1E1E]/5', border: 'border-[#1E1E1E]/10' },
    { name: 'Contributor Elite', tier: 'Oro', icon: Github, color: 'text-[#C9A78A]', bg: 'bg-[#C9A78A]/10', border: 'border-[#C9A78A]/20' },
];

export function DashboardAchievements() {
    return (
        <div className="bg-white p-10 rounded-[2.5rem] border border-[#1E1E1E]/5 space-y-10 shadow-[0_20px_50px_rgba(30,30,30,0.02)]">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Trophy className="text-[#C9A78A] w-6 h-6" />
                    <h3 className="text-xl font-black text-[#1E1E1E] italic tracking-tighter uppercase">Logros Recientes_</h3>
                </div>
                <button className="text-[10px] font-black text-[#1E1E1E]/40 hover:text-[#1E1E1E] uppercase tracking-[0.2em] transition-all bg-[#F1F0E8] px-4 py-2 rounded-xl border border-[#1E1E1E]/5 hover:border-[#C9A78A] shadow-sm">
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
                        className="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-[#F1F0E8]/50 border border-[#1E1E1E]/5 hover:border-[#C9A78A]/30 hover:bg-white transition-all duration-500 group cursor-pointer relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-[#C9A78A]/5 opacity-0 group-hover:opacity-100 transition-opacity`} />

                        <div className={`w-16 h-16 rounded-[1.2rem] flex items-center justify-center ${item.bg} ${item.border} border group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-sm`}>
                            <item.icon className={`w-8 h-8 ${item.color} drop-shadow-[0_4px_8px_rgba(201,167,138,0.2)]`} />
                        </div>

                        <div className="text-center relative z-10">
                            <p className="text-xs font-black text-[#1E1E1E] italic tracking-tight mb-1">{item.name}</p>
                            <p className="text-[9px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.2em]">Dominio {item.tier}_</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
