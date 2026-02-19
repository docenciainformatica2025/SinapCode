'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Video, FileText, Bell } from 'lucide-react';

const deadlines = [
    {
        title: 'Entrega de Proyecto - NLP Avanzado',
        type: 'Evaluación',
        status: 'Vence: 25 Oct',
        icon: FileText,
        color: 'text-emerald-400',
        dot: 'bg-emerald-500'
    },
    {
        title: 'Q&A con Experto en Ética de IA',
        type: 'Evento en Vivo',
        status: '27 Oct, 2:00 PM',
        icon: Video,
        color: 'text-secondary',
        dot: 'bg-secondary'
    },
    {
        title: 'Quiz - Fundamentos de Visión',
        type: 'Acción Requerida',
        status: 'Vence: 30 Oct',
        icon: Calendar,
        color: 'text-primary',
        dot: 'bg-primary'
    }
];

export function DashboardDeadlines() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-surface/30 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 flex flex-col h-full group shadow-[0_0_80px_rgba(16,185,129,0.03)]"
        >
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <Bell className="text-secondary w-5 h-5" />
                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Próximos Eventos_</h3>
                </div>
            </div>

            <div className="space-y-8 flex-1">
                {deadlines.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-5 group/item cursor-pointer"
                    >
                        <div className="relative pt-1.5">
                            <div className={`w-3 h-3 rounded-full ${item.dot} shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.3)] group-hover/item:scale-125 transition-transform duration-300`} />
                            {idx !== deadlines.length - 1 && (
                                <div className="absolute top-6 left-[6px] bottom-[-24px] w-[1px] bg-white/5 group-hover/item:bg-white/10 transition-colors" />
                            )}
                        </div>

                        <div className="space-y-2 pb-6 flex-1">
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${item.color}`}>
                                    {item.type}
                                </span>
                            </div>
                            <p className="text-base font-black text-white group-hover/item:text-secondary transition-colors leading-tight italic tracking-tigh">
                                {item.title}
                            </p>
                            <p className="text-xs text-platinum-dim flex items-center gap-2 font-bold uppercase tracking-widest bg-white/5 w-max px-3 py-1 rounded-lg border border-white/5">
                                <Clock className="w-3 h-3 text-secondary" />
                                {item.status}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="mt-6 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black text-platinum-dim hover:text-white transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-3 group/btn">
                Acceder al Calendario
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
        </motion.div>
    );
}
