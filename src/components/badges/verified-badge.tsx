'use client';

import { motion } from 'framer-motion';

interface BadgeProps {
    type: 'cisco' | 'oracle' | 'security';
    title: string;
    date: string;
}

export function VerifiedBadge({ type, title, date }: BadgeProps) {
    const gradients = {
        cisco: 'from-blue-600 to-cyan-400',
        oracle: 'from-red-600 to-orange-400',
        security: 'from-emerald-600 to-teal-400'
    };

    const icons = {
        cisco: '📡',
        oracle: '☕',
        security: '🛡️'
    };

    return (
        <div className="relative group cursor-pointer inline-block">
            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${gradients[type]} blur-lg opacity-20 group-hover:opacity-60 transition duration-500 rounded-full`} />

            {/* Badge Content */}
            <div className="relative bg-black/50 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 hover:border-white/30 transition">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradients[type]} flex items-center justify-center text-sm shadow-lg`}>
                    {icons[type]}
                </div>

                <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-platinum-dim font-bold tracking-wider">Verified Credential</span>
                    <span className="text-xs font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-platinum transition-all">
                        {title}
                    </span>
                </div>

                {/* Checkmark */}
                <div className="ml-2 w-4 h-4 rounded-full bg-neural-blue flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>

            {/* Tooltip / Chain Data */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 glass-panel p-3 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all pointer-events-none translate-y-2 group-hover:translate-y-0 z-50">
                <div className="text-[10px] text-platinum space-y-1 font-mono">
                    <div className="flex justify-between">
                        <span>Issuer:</span>
                        <span className="text-white">SinapCode Global</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="text-white">{date}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>ID:</span>
                        <span className="text-accent-gold truncated">0x8F...3A2</span>
                    </div>
                    <div className="mt-2 text-center text-emerald-400 font-bold text-xs uppercase border-t border-white/10 pt-2">
                        Blockchain Verified
                    </div>
                </div>
            </div>
        </div>
    );
}
