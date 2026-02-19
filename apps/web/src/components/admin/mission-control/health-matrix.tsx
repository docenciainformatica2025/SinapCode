'use client';

import { motion } from 'framer-motion';
import {
    Gavel as GavelIcon,
    BookOpen,
    MessageSquare,
    ShieldCheck,
    Lock,
    CheckCircle2
} from 'lucide-react';

export function MissionHealthMatrix() {
    const modules = [
        { name: 'Legal & Compliance', desc: 'GDPR, Privacy, ToS Verified', icon: GavelIcon, score: '100%' },
        { name: 'Academy Engine', desc: 'Curriculum & CMS Live', icon: BookOpen, score: '100%' },
        { name: 'Community Hub', desc: 'Discord & Forum Sync', icon: MessageSquare, score: '100%' },
        { name: 'Admin Console', desc: 'Permission Levels Set', icon: ShieldCheck, score: '100%' },
        { name: 'Security Shield', desc: '2FA & DDoS Active', icon: Lock, score: 'OPERATIONAL' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {modules.map((mod, i) => (
                <motion.div
                    key={mod.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-panel-nexus p-5 rounded-2xl border-l-4 border-l-primary bg-white/5 backdrop-blur-xl group hover:bg-primary/5 transition-all cursor-default"
                >
                    <div className="flex justify-between items-start mb-4">
                        <mod.icon className="w-5 h-5 text-primary" />
                        <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-tighter">
                            {mod.score}
                        </span>
                    </div>
                    <h4 className="text-sm font-bold text-white tracking-tight">{mod.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">{mod.desc}</p>
                    <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5, delay: i * 0.2 }}
                                className="h-full bg-primary"
                            />
                        </div>
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
