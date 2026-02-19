'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    TrendingUp,
    Search,
    Filter,
    Plus,
    ArrowRight,
    History,
    Sparkles,
    Edit3,
    Send,
    MessageSquare,
    Brain,
    Flame,
    LayoutList,
    MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';

// Mock Data
const KPI_CARDS = [
    { label: 'Tasa de Conversión', value: '24.8%', trend: '+12.5%', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Leads Calientes Activos', value: '18', status: 'Live', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'Puntaje de Compromiso IA', value: '8.4/10', icon: Brain, color: 'text-[#0df2f2]', bg: 'bg-[#0df2f2]/10' },
    { label: 'Top Fuente de Leads', value: 'LinkedIn Ads', icon: Search, color: 'text-blue-400', bg: 'bg-blue-400/10' },
];

const LEADS = [
    {
        id: '1',
        name: 'Sarah Jenkins',
        email: 'sarah.j@gmail.com',
        interest: 'Agentic AI',
        sentiment: 92,
        lastActive: 'hace 2m',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOHhCt31moGlUHO5GJCdeU6vHsLWnh6iTPrPo5VgQSpZJrWc2C77vZohldKmVvxi_ENfkTk_CZk9vV93icnsmuKp1VYGh59a9Gl5m5-5tnMZ-mCCn7Aun4mhyVXvRSV4R4kEw8r9rvU97jZz3sxXZg4uMPQBr0CS5sBLNYjA4td3d-D6T1mjdwaLoyIQuKLV0v77ugnhtTJSSSxExo5nrPZwobkY9QIXhFyXGX2EE8filyPksAYkc7bUQihysWvjeryB5PmsC0BBcr',
        online: true
    },
    {
        id: '2',
        name: 'Marcus Chen',
        email: 'm.chen@tech.io',
        interest: 'Full Stack',
        sentiment: 65,
        lastActive: 'hace 1h',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc2Ve_nW82jpExycg4abOx8kAkbfsuOPNBq9ln2OFPKqCJJcwj6KYbnhelQjmFwqRzpbICUHJH81Uo63nU-cupRCMwSqu3y-K_OtzREInOG4cVaEB1RZSQkiQEAbZ6VhEJ2LmTasMuLC4egkqGqnHH-1scoVkTK5S3Bi_8wTOe9J6noWhlUrZtOWxTvX34rC6Oc3DJhqTaxRfS3WpoyU-BKRXvo9ijgM0nSUwHNf_0sn1jSxiYufPJXNdjHvxvf24UcEqFSZ87FVOL',
        online: false
    },
    {
        id: '3',
        name: 'Elena Rodriguez',
        email: 'elena.r@design.net',
        interest: 'UX/UI Design',
        sentiment: 88,
        lastActive: 'hace 3h',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7LvyJIqrXQFPvmbXIgBxM7HVRJBdm9ku5vgr5z7TNNMb8pRn1dTfr6Tuy750guuuZc8zSuLkwVZRyIhUUIqzMxcU78FNSnckmplJ6rFOD6gvHnsNw2a3ELEt3FUjVQBO20C56v0fDiImZwKZO299rh8Tgj-P1mdsgXg24YTEKG_7e4s0umetpPEocHrb_1IvuJ8Vn4x03WulaeI9j9QDwJmaTj83pY3VO0Dql5PhmYfkh4GvJc2XH6sVuvCq-AmV1ZOVx9lEANPX1',
        online: false
    }
];

const JOURNEY = [
    { title: 'Chat Inicial con AI Concierge', time: 'Ayer, 10:42 AM', desc: 'Duración: 15 mins • Tema: Precios', completed: true },
    { title: 'WhatsApp enviado (Brochure)', time: 'Ayer, 11:30 AM', desc: 'Estado: Entregado', completed: true },
    { title: 'Email Abierto: "Tu Syllabus"', time: 'Hoy, 09:15 AM', desc: 'Insight IA: El usuario pasó 4 mins en la sección de Agentic AI. Señal de alta intención.', active: true },
];

export default function LeadManagementPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="space-y-8 pb-20 max-w-[1600px] mx-auto overflow-hidden">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#0df2f2]">
                        <Users className="text-sm" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Gestión Ejecutiva de Leads_</span>
                    </div>
                    <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
                        Control de <span className="text-[#0df2f2]">Conversión_</span>
                    </h1>
                    <p className="text-sm text-slate-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        AI Concierge Activo • Monitoreando 142 Leads
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-bold uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">
                        <Filter className="text-sm text-[#0df2f2]" />
                        Filtrar Vista
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0df2f2] text-[#102222] font-black uppercase text-[10px] tracking-widest shadow-[0_0_20px_rgba(13,242,242,0.3)] hover:scale-105 transition-all">
                        <Plus className="text-sm" />
                        Entrada Manual
                    </button>
                </div>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {KPI_CARDS.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/5 shadow-2xl group hover:border-[#0df2f2]/30 transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
                                <card.icon fontSize="medium" />
                            </div>
                            {card.trend && <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">{card.trend}</span>}
                            {card.status && <span className="text-[10px] font-black text-[#0df2f2] bg-[#0df2f2]/10 px-2 py-1 rounded-lg animate-pulse">{card.status}</span>}
                        </div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{card.label}</p>
                        <h3 className="text-2xl font-black text-white italic tracking-tighter mt-1">{card.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Hot Leads Queue */}
                <div className="xl:col-span-2 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/5 shadow-2xl flex flex-col overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <h2 className="text-xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
                            <LayoutList className="text-[#0df2f2]" />
                            Cola de Leads Calientes_
                        </h2>
                        <div className="flex gap-2">
                            <button className="p-2.5 rounded-xl hover:bg-white/5 text-slate-500 hover:text-[#0df2f2] transition-all">
                                <Search fontSize="small" />
                            </button>
                            <button className="p-2.5 rounded-xl hover:bg-white/5 text-slate-500 hover:text-[#0df2f2] transition-all">
                                <MoreHorizontal fontSize="small" />
                            </button>
                        </div>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-[10px] uppercase font-black tracking-widest text-slate-500 border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-4">Estudiante / Lead</th>
                                    <th className="px-6 py-4">Área de Interés</th>
                                    <th className="px-6 py-4">Sentimiento</th>
                                    <th className="px-6 py-4">Última Actividad</th>
                                    <th className="px-6 py-4 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {LEADS.map((lead) => (
                                    <tr key={lead.id} className="group hover:bg-white/5 transition-all cursor-pointer">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <img src={lead.avatar} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-[#0df2f2]/30 transition-all" alt={lead.name} />
                                                    {lead.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#102222]" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-white italic">{lead.name}</p>
                                                    <p className="text-[10px] text-slate-500 font-bold">{lead.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-[#0df2f2]">
                                                {lead.interest}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                    <div className={`h-full ${lead.sentiment > 80 ? 'bg-green-400' : lead.sentiment > 50 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${lead.sentiment}%` }} />
                                                </div>
                                                <span className={`text-[11px] font-black ${lead.sentiment > 80 ? 'text-green-400' : lead.sentiment > 50 ? 'text-amber-400' : 'text-rose-400'}`}>{lead.sentiment}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                            {lead.lastActive}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Link href={`/admin/leads/${lead.id}/outreach`} className="inline-flex p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-[#0df2f2] hover:text-[#102222] hover:shadow-[0_0_15px_rgba(13,242,242,0.4)] transition-all">
                                                <ArrowRight />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Lead Detail / AI Center */}
                <div className="space-y-8 flex flex-col">
                    {/* Journey Timeline */}
                    <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-[#0df2f2]">
                            <History size={120} />
                        </div>
                        <h3 className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                            <History className="text-sm text-[#0df2f2]" />
                            Recorrido del Lead: Sarah Jenkins
                        </h3>
                        <div className="relative space-y-8 pl-6 border-l-2 border-white/5 ml-2">
                            {JOURNEY.map((step, i) => (
                                <div key={i} className="relative">
                                    <div className={`absolute -left-[33px] top-0 w-4 h-4 rounded-full border-2 ${step.active ? 'bg-[#0df2f2] border-[#102222] shadow-[0_0_10px_rgba(13,242,242,1)]' : 'bg-[#102222] border-white/20'}`} />
                                    <div className="space-y-1">
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${step.active ? 'text-[#0df2f2]' : 'text-slate-500'}`}>{step.time}</p>
                                        <h4 className={`text-sm font-black italic ${step.active ? 'text-white' : 'text-slate-400'}`}>{step.title}</h4>
                                        <p className="text-[11px] text-slate-500 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5 mt-2 italic">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Action Center */}
                    <div className="flex-1 bg-gradient-to-b from-[#162e2e] to-[#0a1515] p-1 rounded-[3rem] border border-[#0df2f2]/20 shadow-2xl">
                        <div className="bg-black/40 backdrop-blur-xl h-full rounded-[2.9rem] p-8 flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-black text-white italic uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles className="text-[#0df2f2] animate-pulse w-4 h-4" />
                                    Sugerencia de Seguimiento IA
                                </h3>
                                <span className="text-[9px] font-black bg-[#0df2f2]/10 text-[#0df2f2] px-3 py-1 rounded-full border border-[#0df2f2]/20 uppercase italic">Confianza: 94%</span>
                            </div>

                            <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-4 mb-6 relative group">
                                <textarea
                                    className="w-full h-full bg-transparent border-none resize-none text-[13px] text-slate-300 leading-relaxed focus:ring-0 p-0 font-medium italic"
                                    defaultValue="¡Hola Sarah! 👋 Notamos que estuviste revisando el syllabus de Agentic AI en profundidad. Como parece que te interesan los módulos avanzados, puedo desbloquearte un descuento del 10% por pronto pago si te inscribes en las próximas 24h. ¿Te gustaría recibir el código?"
                                />
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 rounded-xl bg-white/5 text-[10px] uppercase font-black tracking-widest hover:text-[#0df2f2]">Editar_</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="py-4 rounded-2xl border border-white/10 text-slate-400 hover:bg-white/5 font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 italic">
                                    <Edit3 className="text-sm" />
                                    Personalizar
                                </button>
                                <button className="py-4 rounded-2xl bg-[#0df2f2] text-[#102222] font-black uppercase text-[10px] tracking-widest shadow-[0_0_20px_rgba(13,242,242,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-2 italic">
                                    <Send className="text-sm" />
                                    Enviar Ahora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
