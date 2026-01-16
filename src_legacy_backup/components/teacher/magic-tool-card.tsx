'use client';

import { motion } from 'framer-motion';

interface MagicToolProps {
    icon: string;
    title: string;
    desc: string;
    gradient: string;
}

export function MagicToolCard({ icon, title, desc, gradient }: MagicToolProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-panel p-6 rounded-2xl border border-white/10 cursor-pointer group hover:border-white/30 transition-colors relative overflow-hidden"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-2xl bg-gradient-to-br ${gradient} bg-opacity-20 text-white shadow-neon-purple`}>
                    {icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-platinum-dim leading-relaxed">{desc}</p>

                <div className="mt-4 flex justify-end">
                    <span className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Generar ✨
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
