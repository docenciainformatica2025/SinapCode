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
            className="relative overflow-hidden bg-white border border-[#1E1E1E]/5 p-10 rounded-[3rem] h-full flex flex-col group transition-all duration-700 shadow-[0_20px_50px_rgba(30,30,30,0.02)]"
        >
            <div className="flex items-center gap-3 mb-10">
                <Layers className="text-[#C9A78A] w-6 h-6" />
                <h3 className="text-xl font-black text-[#1E1E1E] italic tracking-tighter uppercase">Ruta Inteligente_</h3>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-around flex-1 gap-12">
                <div className="relative group/ring">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-[#C9A78A]/10 blur-[40px] rounded-full" />

                    <ProgressRing progress={75} size={220} strokeWidth={18} color="#C9A78A" />

                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-6xl font-black text-[#1E1E1E] italic tracking-tighter drop-shadow-[0_4px_10px_rgba(201,167,138,0.2)]">75%</span>
                        <span className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.2em] mt-2">Progreso Total</span>
                    </div>
                </div>

                <div className="space-y-6 w-full md:w-auto">
                    {[
                        { label: 'Ciencia de Datos', progress: 90, color: 'bg-[#C9A78A]', shadow: 'shadow-[#C9A78A]/20' },
                        { label: 'Aprendizaje Automático', progress: 65, color: 'bg-[#1E1E1E]', shadow: 'shadow-[#1E1E1E]/10' },
                        { label: 'Redes Neuronales', progress: 40, color: 'bg-[#C9A78A]', shadow: 'shadow-[#C9A78A]/20' },
                    ].map((item, idx) => (
                        <div key={idx} className="space-y-2 group/item">
                            <div className="flex justify-between items-baseline px-1">
                                <span className="text-xs font-black text-[#1E1E1E]/40 uppercase tracking-widest group-hover/item:text-[#1E1E1E] transition-colors">
                                    {item.label}
                                </span>
                                <span className="text-sm font-black text-[#1E1E1E] italic">{item.progress}%</span>
                            </div>
                            <div className="h-2 w-48 sm:w-64 bg-[#1E1E1E]/5 rounded-full overflow-hidden border border-[#1E1E1E]/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.progress}%` }}
                                    transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className={cn("h-full rounded-full transition-all duration-500", item.color, item.shadow, "shadow-sm")}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Decor */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A78A]/30 to-transparent" />
        </motion.div>
    );
}
