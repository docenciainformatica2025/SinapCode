'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Gem,
    CircleDollarSign,
    ShieldCheck,
    PencilRuler,
    History,
    PlusCircle,
    ArrowUp,
    User,
    Cloud,
    BookOpen,
    Shirt,
    Trophy,
    ArrowRight
} from 'lucide-react';

// --- MOCK DATA ---
const REWARDS = [
    {
        id: 1,
        title: 'Mentoría 1-a-1',
        description: 'Sesión de 45 minutos con un Ingeniero de IA Senior. Revisión de código o asesoramiento profesional.',
        cost: 5000,
        category: 'Carrera',
        icon: User,
        color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        locked: true,
        recommended: true,
        progress: 49,
        missing: 2550,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbJjyQT9QB-qgXBK3g_XG3jlyqlaD4EwCfYFfy89FLg29zzTwLi89frN4iQLjdlIksg6qMEhYq2Pkcxa-mvS8sQMg0XpM1Hjr2ia_CWcqbLmyfbjN3GcEyONvRnWGvNF6vjICd6iuMibBM23kRhRa8wkr8lSCDF21d1eokUZYf8TU5L7Uwtg7xhiYpr_FRLADLz9viygZnH1kB88NVdaVBeGaZrLRs_VJiipxSFyqyteLooSn-hVaY-8us5br6z5I8iRwunBcDmnqT'
    },
    {
        id: 2,
        title: 'Créditos AWS Cloud',
        description: '$50 en créditos para desplegar tus modelos de ML o alojar tu portafolio.',
        cost: 1500,
        category: 'Infraestructura',
        icon: Cloud,
        color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        locked: false,
        premium: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiy5PLthw0uLyK-UlI9ssuRbu9TYUfm4Wa4f1iFHdMXpJIAXvPR07w3Puh9YbPiQebjc9P1-YTjjuMO0zBEhJm5wIOVjVANTo5hdHGaXEZTrSJx6KvovvuukzIJuwXrawIcImGXxGqdkkH2OmIaUc_VG3sv0SXoreYdiDMAKv4NWcN5zPjjWKLRvLQv6G4KpUkWjzcWgHDVZBAL00mehVTEg1AC0iVLfnAgPINszI56SwCX5YUdMH6ky81rdSMbnb8fl02depRyg5j'
    },
    {
        id: 3,
        title: 'Maestría en NLP',
        description: 'Desbloquea el módulo premium sobre Procesamiento de Lenguaje Natural y Transformers.',
        cost: 2000,
        category: 'Educación',
        icon: BookOpen,
        color: 'bg-green-500/20 text-green-300 border-green-500/30',
        locked: false,
        hot: true,
        premium: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCigOxtRFdJHGf0bLI9uq_FBhepD3RzAlQjw8JnFxmwStMHjEiEOLw04uxuup1u4jRnryWxdQuTckfT3FGSakLb0x3sa7A5ooMZsKwPEbPg-oonXUc4-zc4248LFrXDdYM19uV4b06icc7BTJsMois_-MOkGSOl1w2Lz7LoyzIqbRdFy_0e1Aii1FHoFqacph6XHqzICCWxOvl5QwLUmxHFRoWDMo1RQ_HHJoMNlJHdSkFx5-vW6Y01LsTNBbEC-60JOW3MQvWPeU92'
    },
    {
        id: 4,
        title: 'Sudadera SinapCODE',
        description: "Sudadera de desarrollador 'Blackout' de edición limitada. Logo bordado.",
        cost: 3000,
        category: 'Merchandising',
        icon: Shirt,
        color: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
        locked: true,
        progress: 81,
        missing: 550,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3fECRenvdpN_t9bAHEKN7TqyQ83W8w_yjMFDgEVXbjgphODaVnX14P_NPvXyOr4yeafF9_hkCUUrm9mbqyvSYNEnR9SMew6WivcxBCoQvf35HgTLVjtFcHZktseZ3wZuUScefIyiLCz4hsNWQBtHWvWA03gP0X2WMXSbXVNgp0VxIUPAS6xyIzUiitjML5oP8BDameNLB-DFzP85c4k9XzahfpMWiJ_MdentYHGQTb_lLkEXmhp3u5TutQS0L3n1FfFVA7aQuaZUI'
    }
];

export default function VaultPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#102222] text-slate-100 font-sans p-6 lg:p-10 scrollbar-hide">
            <div className="max-w-7xl mx-auto space-y-12 pb-20">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tighter italic">Bóveda del Constructor <span className="text-[#0df2f2] animate-pulse">_</span></h1>
                        <p className="text-slate-500 max-w-xl font-medium leading-relaxed italic uppercase tracking-wider text-xs">Canjea tus Tokens CODE ganados con esfuerzo por equipo exclusivo, créditos en la nube y oportunidades profesionales de élite.</p>
                    </motion.div>
                    <div className="flex gap-4">
                        <button className="bg-white/5 border border-white/10 hover:border-[#0df2f2] text-white px-6 py-3 rounded-2xl flex items-center gap-3 transition-all font-black uppercase tracking-widest text-[10px] italic">
                            <History size={16} /> Historial
                        </button>
                        <button className="bg-[#0df2f2] hover:bg-[#0acaca] text-[#102222] font-black px-6 py-3 rounded-2xl flex items-center gap-3 shadow-[0_10px_20px_rgba(13,242,242,0.3)] transition-all uppercase tracking-widest text-[10px] italic">
                            <PlusCircle size={16} /> Ganar Tokens
                        </button>
                    </div>
                </div>

                {/* Stats Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Balance Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-[#162e2e]/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-[#0df2f2]/20 relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#0df2f2]/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-[#0df2f2]/20 transition-all"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] italic">Balance de Tokens_</div>
                            <CircleDollarSign className="text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                        </div>
                        <div className="flex items-baseline gap-3 mb-3 italic">
                            <span className="text-6xl font-black text-white tracking-tighter">2,450</span>
                            <span className="text-[#0df2f2] font-black text-xl tracking-widest">CT</span>
                        </div>
                        <p className="text-xs text-green-400 flex items-center gap-2 font-black italic">
                            <ArrowUp size={12} /> 120 ganados esta semana
                        </p>
                    </motion.div>

                    {/* Rank Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-[#162e2e]/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-[#0df2f2]/10 relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-purple-500/10 transition-all"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] italic">Rango Actual_</div>
                            <ShieldCheck className="text-[#0df2f2]" />
                        </div>
                        <div className="flex items-center gap-5 mb-5">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#102222] to-[#0df2f2]/30 border border-[#0df2f2]/40 flex items-center justify-center text-[#0df2f2] shadow-[0_0_20px_rgba(13,242,242,0.2)]">
                                <PencilRuler size={32} />
                            </div>
                            <div>
                                <span className="text-2xl font-black text-white block tracking-tight italic uppercase">Arquitecto Líder</span>
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Nivel 14_</span>
                            </div>
                        </div>
                        {/* XP Bar */}
                        <div className="space-y-3">
                            <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '75%' }}
                                    className="h-full bg-gradient-to-r from-[#0df2f2] to-[#8b5cf6] rounded-full shadow-[0_0_15px_rgba(13,242,242,0.5)]"
                                ></motion.div>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest italic">
                                <span className="text-[#0df2f2]">3,750 XP</span>
                                <span className="text-slate-600">5,000 XP (Siguiente: Director de Sistemas)</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Activity Feed Card */}
                    <div className="bg-[#162e2e]/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden flex flex-col justify-between shadow-2xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] italic">Actividad Reciente_</div>
                            <History className="text-slate-600" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Compartió "Opt. Red Neural"', value: '+50 CT', color: 'bg-green-400' },
                                { label: 'Asistencia Rev. Código', value: '+20 CT', color: 'bg-[#FFD700]' },
                                { label: 'Racha Diaria (7 días)', value: '+10 CT', color: 'bg-[#0df2f2]' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-[11px] group cursor-pointer hover:translate-x-1 transition-transform">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${item.color} shadow-lg`}></div>
                                        <span className="text-slate-400 group-hover:text-white transition-colors font-bold uppercase italic">{item.label}</span>
                                    </div>
                                    <span className="text-[#0df2f2] font-black italic">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-8 overflow-x-auto pb-4 border-b border-white/5 scrollbar-hide">
                    {['Todas las Recompensas', 'Impulsos de Carrera', 'Infraestructura', 'Merchandising', 'Activos Digitales'].map((tab, idx) => (
                        <button key={tab} className={`pb-4 font-black uppercase tracking-[0.2em] text-[10px] whitespace-nowrap transition-all italic ${idx === 0 ? 'text-[#0df2f2] border-b-2 border-[#0df2f2]' : 'text-slate-500 hover:text-white'}`}>
                            {tab}_
                        </button>
                    ))}
                </div>

                {/* Rewards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {REWARDS.map((reward) => (
                        <motion.div
                            key={reward.id}
                            whileHover={{ scale: 1.02 }}
                            className={`bg-[#162e2e]/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-300 hover:border-[#0df2f2]/30 flex flex-col shadow-2xl relative group ${reward.premium ? 'border-t-2 border-t-[#0df2f2]/50' : ''} ${reward.recommended ? 'ring-2 ring-[#0df2f2] shadow-[0_0_30px_rgba(13,242,242,0.3)]' : ''}`}
                        >
                            {/* Recommendation Glow */}
                            {reward.recommended && (
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0df2f2] via-[#8b5cf6] to-[#0df2f2] rounded-[2.5rem] opacity-75 blur-md animate-pulse -z-10"></div>
                            )}

                            <div className="h-44 bg-black relative p-6 flex items-center justify-center overflow-hidden">
                                <img src={reward.image} alt={reward.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#162e2e]"></div>
                                {reward.recommended && (
                                    <div className="absolute top-6 right-6 bg-[#0df2f2] text-[#102222] text-[9px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-widest italic z-20">Recomendado_</div>
                                )}
                                <div className="w-16 h-16 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center z-10 shadow-2xl">
                                    <reward.icon className="text-[#0df2f2] w-8 h-8" />
                                </div>
                                {reward.hot && !reward.recommended && <div className="absolute top-6 right-6 bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg animate-pulse uppercase tracking-widest italic z-20">Destacado_</div>}
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border italic ${reward.color}`}>
                                        {reward.category}_
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#0df2f2] transition-colors italic tracking-tight uppercase leading-none">{reward.title}</h3>
                                <p className="text-xs text-slate-500 mb-8 flex-1 font-medium leading-relaxed italic">{reward.description}</p>

                                <div className="space-y-4 mt-auto">
                                    <div className="flex items-center justify-between">
                                        <span className={`font-black text-xl italic tracking-tighter ${reward.locked ? 'text-slate-600' : 'text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]'}`}>
                                            {reward.cost.toLocaleString()} CT
                                        </span>
                                        {reward.locked ? (
                                            <button className="bg-white/5 text-slate-600 cursor-not-allowed px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic border border-white/5">
                                                Bloqueado
                                            </button>
                                        ) : (
                                            <button className="bg-[#0df2f2] hover:bg-[#0acaca] text-[#102222] px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-[0_5px_15px_rgba(13,242,242,0.2)] transition-all hover:translate-y-[-2px] italic">
                                                Canjear_
                                            </button>
                                        )}
                                    </div>

                                    {reward.locked && (
                                        <div className="space-y-2">
                                            <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                                                <div className="bg-red-500/50 h-full" style={{ width: `${reward.progress}%` }}></div>
                                            </div>
                                            <p className="text-[9px] text-red-400 font-black uppercase tracking-widest italic text-right">Necesitas {reward.missing} CT más_</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contributors Teaser */}
                <div className="bg-gradient-to-r from-[#162e2e] to-[#0a1515] p-10 rounded-[3rem] border border-white/5 shadow-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#0df2f2]/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
                        <div className="flex items-center gap-8">
                            <div className="bg-[#0df2f2]/20 p-5 rounded-2xl border border-[#0df2f2]/40 shadow-glow flex items-center justify-center">
                                <Trophy className="text-[#0df2f2] w-10 h-10" />
                            </div>
                            <div className="max-w-md">
                                <h3 className="text-2xl font-black text-white italic tracking-tight uppercase mb-2">Colaboradores Principales_</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed italic">Los constructores más activos de este mes en SinapCODE. Mira quién lidera el tablero de élite.</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-6">
                            <div className="flex -space-x-5">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <img
                                        key={i}
                                        className="w-12 h-12 rounded-2xl border-4 border-[#102222] object-cover hover:translate-y-[-5px] transition-transform cursor-pointer"
                                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                        alt="Avatar"
                                    />
                                ))}
                                <div className="w-12 h-12 rounded-2xl border-4 border-[#102222] bg-[#162e2e] flex items-center justify-center text-[11px] text-[#0df2f2] font-black uppercase italic shadow-2xl">
                                    +12
                                </div>
                            </div>
                            <button className="text-[#0df2f2] hover:text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 group transition-colors italic">
                                Ver Tabla de Clasificación <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
