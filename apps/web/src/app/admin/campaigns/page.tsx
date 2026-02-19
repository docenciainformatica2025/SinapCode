'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Brain as Psychology,
    Users as PeopleAlt,
    Timer,
    ChevronRight,
    Bell as Notifications,
    Edit,
    BarChart3 as Analytics,
    PauseCircle as PauseCircleOutline,
    Headphones,
    MoreHorizontal as MoreHoriz,
    ArrowRight as ArrowForward,
    Play as PlayArrow,
    History as Timeline
} from 'lucide-react';

const SEQUENCE_STEPS = [
    {
        id: '1',
        day: 'Día 0',
        title: 'El Gancho de Curiosidad',
        desc: '"¿Viste lo que acaba de hacer la IA Agente?" — Aprovecha una visión exclusiva de la industria para romper el patrón de ignorar correos.',
        icon: Psychology,
        asset: { name: 'Reporte_Insights_v4.pdf', size: '2.4 MB', time: '3m', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjGfOCOm5AliAop1ANwVEfMWc39dcColLGzyuSVX7h_t7qTfZIlYQXai9ttYD7FJBUj8zwDJLhyJ5yPpJVCn6ckG8zBPRqaP8QpI-XklDIO04lyvFKbWOXayi_g6QPENszDCWn6v8-gZYr2V-Slxwaa3NpbOy-Xd4NhgzIdjF2zJuvLlgEErsGAQEk7Gxm23A5fM_I15HTwINGyNGZB08XFrQnidid_qCJ5C5EzW9A03G5Y9J58HlunObuoGcxup6TZC63iUfxBDUv' },
        stats: { label: 'Tasa de Apertura', value: '48.2%' },
        color: 'text-[#0df2f2]',
        bg: 'bg-[#0df2f2]/10'
    },
    {
        id: '2',
        day: 'Día 2',
        title: 'La Prueba Social',
        desc: '"De barista a Senior Dev en 8 meses." — Una historia de transformación tangible que valida el resultado deseado del estudiante.',
        icon: PeopleAlt,
        asset: { name: 'Video_Exito_Elena.mp4', time: '02:14', video: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBisXhRDfRUOoWCXkjjs_6eejTNwMzQBaXbn9cCoEZLhBR7pTsxU4NfRvMaRvxIUUDbEujIJ1D31Yy1GTda_CxDMJ-_OYderz1W8ce9e-yVM8DHiT9Y0r-uFEFY_g9_FL6gJJH9i_HI716S6mI6jaZsM8R3tou8mIAw8d1d1bo98wbeCVcTemcFfAL8j4YRUteubISrBhf6BK-vFkbAPqtmDxMkXR6VtTyQPSCDG9BAOjH5rGxmgw8ONIO6tXvDIvPSez6m56wbdeX' },
        stats: { label: 'Tasa de Clics', value: '18.5%' },
        color: 'text-white',
        bg: 'bg-white/10'
    },
    {
        id: '3',
        day: 'Día 4',
        title: 'El Gancho FOMO',
        desc: '"La beca expira en 24h." — Crea urgencia al eliminar la red de seguridad. El empujón final para la conversión.',
        icon: Timer,
        fomo: true,
        stats: { label: 'Tasa de Ventas', value: '8.2%' },
        color: 'text-white',
        bg: 'bg-white/10'
    }
];

export default function NurturingSequencePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="space-y-16 pb-20 max-w-[1600px] mx-auto overflow-hidden relative">
            {/* Ambient Background */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#0df2f2]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#0df2f2]/5 rounded-full blur-[100px]" />
            </div>

            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="max-w-3xl space-y-4">
                    <div className="flex items-center gap-6 text-sm text-slate-500 font-black uppercase tracking-widest">
                        <span>Campañas</span>
                        <ChevronRight className="text-xs" />
                        <span className="text-white">Secuencia de Re-Engagement: Batch 04</span>
                        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] border border-green-500/20 flex items-center gap-2 italic">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Activa
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter leading-none uppercase">
                        Flujo de <span className="text-[#0df2f2]">Nutrición IA_</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium max-w-2xl leading-relaxed italic">
                        Marco psicológico automatizado de 3 pasos diseñado para convertir leads fríos en estudiantes activos mediante curiosidad, prueba social y escasez.
                    </p>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1 font-black">Audiencia Objetivo</span>
                        <span className="text-white font-black italic uppercase text-lg">Inactivos &gt; 30 Días_</span>
                    </div>
                    <div className="w-px h-12 bg-white/10" />
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1 font-black">Conversión Proyectada</span>
                        <span className="text-[#0df2f2] font-black text-3xl italic">12.4%_</span>
                    </div>
                </div>
            </header>

            {/* Sequence Visualization */}
            <div className="relative w-full">
                {/* Connecting Line (Desktop) */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0 hidden lg:block" />
                <div className="absolute top-1/2 left-0 w-2/3 h-0.5 bg-gradient-to-r from-[#0df2f2]/0 via-[#0df2f2]/50 to-[#0df2f2]/0 -translate-y-1/2 z-0 hidden lg:block blur-[1px]" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
                    {SEQUENCE_STEPS.map((step, i) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="group relative"
                        >
                            {/* Connector Dot */}
                            <div className={`hidden lg:flex absolute top-1/2 -left-3 w-6 h-6 bg-[#102222] border-2 rounded-full items-center justify-center z-20 -translate-y-1/2 transition-all ${step.id === '1' ? 'border-[#0df2f2] shadow-[0_0_15px_rgba(13,242,242,0.5)]' : 'border-slate-700 group-hover:border-[#0df2f2]'}`}>
                                <div className={`w-2 h-2 rounded-full ${step.id === '1' ? 'bg-[#0df2f2]' : 'bg-slate-700 group-hover:bg-[#0df2f2]'}`} />
                            </div>

                            <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-1 transition-all duration-500 hover:-translate-y-2 border border-white/5 hover:border-[#0df2f2]/30 group-hover:shadow-[0_20px_60px_-15px_rgba(13,242,242,0.1)]">
                                <div className="bg-black/40 rounded-[2.4rem] p-8 h-full flex flex-col relative overflow-hidden">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="bg-[#0df2f2]/10 text-[#0df2f2] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#0df2f2]/20 italic">
                                            Paso 0{step.id} • {step.day}_
                                        </div>
                                        <button className="text-slate-500 hover:text-white transition-colors">
                                            <MoreHoriz />
                                        </button>
                                    </div>

                                    <div className="mb-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#162e2e] to-black border border-white/10 flex items-center justify-center group-hover:border-[#0df2f2]/50 transition-all relative">
                                        <div className="absolute inset-0 bg-[#0df2f2]/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <step.icon className={`${step.color} relative z-10 w-8 h-8`} />
                                    </div>

                                    <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-4 group-hover:text-[#0df2f2] transition-colors">{step.title}_</h3>
                                    <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed italic">
                                        {step.desc}
                                    </p>

                                    {/* Asset Preview */}
                                    {step.asset && (
                                        <div className="mt-auto mb-8 bg-black/40 rounded-[1.5rem] border border-white/5 p-4 flex items-center gap-4 group/asset transition-all hover:bg-black/60">
                                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden border border-white/10">
                                                <img src={step.asset.img} className="w-full h-full object-cover opacity-80" alt="Asset" />
                                                {step.asset.video && <div className="absolute inset-0 flex items-center justify-center bg-black/20"><PlayArrow className="text-[#0df2f2] text-xs" /></div>}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[11px] text-white font-black italic">{step.asset.name}</p>
                                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{step.asset.size || step.asset.time} • Lectura: {step.asset.time}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* FOMO Counter */}
                                    {step.fomo && (
                                        <div className="mt-auto mb-8 bg-[#162e2e] rounded-[1.5rem] border border-[#0df2f2]/10 p-6 flex flex-col items-center justify-center relative overflow-hidden group/fomo">
                                            <div className="absolute inset-0 bg-[#0df2f2]/5 animate-pulse" />
                                            <p className="text-[9px] uppercase tracking-[0.3em] text-[#0df2f2] font-black mb-2 relative z-10 italic">La oferta expira en_</p>
                                            <div className="text-3xl font-black text-white tracking-[0.2em] relative z-10 italic">
                                                23:59:59
                                            </div>
                                            <div className="w-full h-1 bg-white/5 mt-4 rounded-full overflow-hidden relative z-10">
                                                <motion.div
                                                    initial={{ width: '100%' }}
                                                    animate={{ width: '25%' }}
                                                    transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
                                                    className="h-full bg-[#0df2f2] shadow-[0_0_10px_rgba(13,242,242,1)]"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black mb-1">{step.stats.label}</p>
                                            <p className="text-xl font-black text-white italic">{step.stats.value}</p>
                                        </div>
                                        <button className="text-[10px] font-black text-[#0df2f2] hover:text-white flex items-center gap-2 uppercase tracking-widest transition-all italic underline-offset-4 hover:underline">
                                            Previsualizar
                                            <ArrowForward className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Impact Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-end">
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-10 relative z-10">
                        <div>
                            <h4 className="text-white font-black text-2xl italic tracking-tighter uppercase">Impacto en el Viaje del Alumno_</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Contribución del Re-Engagement al RLTV</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#0df2f2] shadow-[0_0_10px_rgba(13,242,242,0.8)]"></span>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Con Campaña_</span>
                        </div>
                    </div>

                    {/* Abstract Graph */}
                    <div className="h-40 w-full flex items-end gap-2 relative z-10">
                        {[20, 25, 22, 35, 45, 55, 70, 80, 85, 92, 95, 100].map((height, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ delay: 1 + idx * 0.05, duration: 1 }}
                                className={`flex-1 rounded-t-xl transition-all duration-500 relative group/bar ${idx >= 3 ? 'bg-gradient-to-t from-[#0df2f2]/60 to-[#0df2f2]' : 'bg-white/10'}`}
                            >
                                {idx >= 3 && idx % 3 === 0 && (
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 pointer-events-none">
                                        <div className="bg-[#102222] border border-[#0df2f2]/30 px-3 py-1.5 rounded-xl text-[9px] text-white font-black whitespace-nowrap shadow-2xl">
                                            Hook {Math.floor(idx / 3)} Enviado_
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button className="w-full py-5 bg-[#0df2f2] text-[#102222] font-black italic rounded-2xl hover:bg-cyan-300 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(13,242,242,0.3)] uppercase tracking-widest text-[11px]">
                        <Edit className="w-5 h-5" />
                        Editar Secuencia_
                    </button>
                    <button className="w-full py-5 bg-white/5 text-white font-bold italic rounded-2xl hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[11px]">
                        <Analytics className="w-5 h-5 text-[#0df2f2]" />
                        Análisis Detallado_
                    </button>
                    <button className="w-full py-4 text-slate-500 font-black text-[10px] rounded-2xl hover:text-rose-400 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest italic">
                        <PauseCircleOutline className="w-5 h-5" />
                        Pausar Campaña_
                    </button>
                </div>
            </div>

            {/* Floating Decoration */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                className="fixed bottom-10 right-10 w-16 h-16 rounded-[2rem] border border-[#0df2f2]/30 bg-[#102222]/80 backdrop-blur-3xl text-[#0df2f2] flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(13,242,242,0.2)] z-50 group transition-all"
            >
                <Headphones className="group-hover:rotate-12 transition-transform w-8 h-8" />
            </motion.div>
        </div>
    );
}
