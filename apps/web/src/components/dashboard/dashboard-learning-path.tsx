'use client';

import { motion } from 'framer-motion';
import { ProgressRing } from '@/components/dashboard/progress-ring';
import { TrendingUp, Award, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DashboardLearningPath() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden bg-surface/30 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 h-full flex flex-col group shadow-[0_0_80px_rgba(34,211,238,0.05)]"
        >
            <div className="flex items-center gap-3 mb-10">
                <Layers className="text-secondary w-6 h-6" />
                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Ruta Inteligente_</h3>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-around flex-1 gap-12">
                <div className="relative group/ring">
                    {/* Concentric Glow Effects */}
                    <div className="absolute inset-0 bg-secondary/10 blur-[60px] rounded-full group-hover/ring:bg-secondary/20 transition-all duration-700" />
                    <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full" />

                    <ProgressRing progress={75} size={220} strokeWidth={18} color="#22d3ee" />

                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-6xl font-black text-white italic tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">75%</span>
                        <span className="text-[10px] font-black text-platinum-dim uppercase tracking-[0.2em] mt-2">Progreso Total</span>
                    </div>
                </div>

                <div className="space-y-6 w-full md:w-auto">
                    {[
                        { label: 'Ciencia de Datos', progress: 90, color: 'bg-emerald-400', shadow: 'shadow-emerald-400/20' },
                        { label: 'Aprendizaje Automático', progress: 65, color: 'bg-cyan-400', shadow: 'shadow-cyan-400/20' },
                        { label: 'Redes Neuronales', progress: 40, color: 'bg-indigo-400', shadow: 'shadow-indigo-400/20' },
                    ].map((item, idx) => (
                        <div key={idx} className="space-y-2 group/item">
                            <div className="flex justify-between items-baseline px-1">
                                <span className="text-xs font-black text-platinum-dim uppercase tracking-widest group-hover/item:text-white transition-colors">
                                    {item.label}
                                </span>
                                <span className="text-sm font-black text-white italic">{item.progress}%</span>
                            </div>
                            <div className="h-2 w-48 sm:w-64 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.progress}%` }}
                                    transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className={cn("h-full rounded-full transition-all duration-500", item.color, item.shadow, "shadow-lg")}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Gradient Border */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        </motion.div>
    );
}
