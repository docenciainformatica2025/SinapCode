'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Video, FileText, Bell } from 'lucide-react';

const deadlines = [
    {
        title: 'Entrega de Proyecto - NLP Avanzado',
        type: 'Evaluación',
        status: 'Vence: 25 Oct',
        icon: FileText,
        color: 'text-[#C9A78A]',
        dot: 'bg-[#C9A78A]'
    },
    {
        title: 'Q&A con Experto en Ética de IA',
        type: 'Evento en Vivo',
        status: '27 Oct, 2:00 PM',
        icon: Video,
        color: 'text-[#1E1E1E]',
        dot: 'bg-[#1E1E1E]'
    },
    {
        title: 'Quiz - Fundamentos de Visión',
        type: 'Acción Requerida',
        status: 'Vence: 30 Oct',
        icon: Calendar,
        color: 'text-[#C9A78A]',
        dot: 'bg-[#C9A78A]'
    }
];

export function DashboardDeadlines() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-10 rounded-[2.5rem] border border-[#1E1E1E]/5 flex flex-col h-full group shadow-[0_20px_50px_rgba(30,30,30,0.02)]"
        >
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <Bell className="text-[#C9A78A] w-5 h-5" />
                    <h3 className="text-xl font-black text-[#1E1E1E] italic tracking-tighter uppercase">Próximos Eventos_</h3>
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
                            <div className={`w-3 h-3 rounded-full ${item.dot} shrink-0 shadow-sm group-hover/item:scale-125 transition-transform duration-300`} />
                            {idx !== deadlines.length - 1 && (
                                <div className="absolute top-6 left-[6px] bottom-[-24px] w-[1px] bg-[#1E1E1E]/5 group-hover/item:bg-[#1E1E1E]/10 transition-colors" />
                            )}
                        </div>

                        <div className="space-y-2 pb-6 flex-1">
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${item.color}`}>
                                    {item.type}
                                </span>
                            </div>
                            <p className="text-base font-black text-[#1E1E1E] group-hover/item:text-[#C9A78A] transition-colors leading-tight italic tracking-tigh">
                                {item.title}
                            </p>
                            <p className="text-xs text-[#1E1E1E]/40 flex items-center gap-2 font-bold uppercase tracking-widest bg-[#F1F0E8] w-max px-3 py-1 rounded-lg border border-[#1E1E1E]/5 shadow-sm">
                                <Clock className="w-3 h-3 text-[#C9A78A]" />
                                {item.status}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="mt-6 w-full py-5 bg-[#1E1E1E] hover:bg-[#1E1E1E]/90 border border-[#1E1E1E]/5 rounded-2xl text-[10px] font-black text-[#F1F0E8] transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-3 group/btn shadow-xl shadow-[#1E1E1E]/10 active:scale-95">
                Acceder al Calendario
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
        </motion.div>
    );
}
