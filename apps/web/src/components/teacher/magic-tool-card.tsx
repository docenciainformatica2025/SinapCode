'use client';

import { motion } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MagicToolProps {
    icon: string;
    title: string;
    desc: string;
    gradient: string;
    accentColor: string;
}

export function MagicToolCard({ icon, title, desc, gradient, accentColor }: MagicToolProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative h-full"
        >
            {/* Background Glow */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] blur-2xl -z-10",
                gradient
            )} />

            <div className="h-full glass-panel bg-surface/30 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 group-hover:border-white/20 transition-all duration-300 flex flex-col shadow-2xl relative overflow-hidden">
                {/* Internal Decorative Gradient */}
                <div className={cn(
                    "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full blur-3xl -z-10",
                    gradient
                )} />

                <div className="flex items-center justify-between mb-8">
                    <div className={cn(
                        "w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-inner border border-white/5",
                        "bg-white/5 group-hover:scale-110 transition-transform duration-500"
                    )}>
                        {icon}
                    </div>
                    <div className="p-2 bg-white/5 rounded-xl border border-white/5 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Sparkles className={cn("w-4 h-4", accentColor)} />
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-black text-white tracking-tighter italic uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">
                        {title}
                    </h3>
                    <p className="text-sm font-bold text-platinum-dim leading-relaxed">
                        {desc}
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                    <span className={cn("text-[10px] font-black uppercase tracking-[0.3em]", accentColor)}>
                        Procesamiento IA
                    </span>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-all">
                        Usar Herramienta
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
