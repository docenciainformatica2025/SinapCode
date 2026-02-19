'use client';

import { useState, useEffect } from 'react';
import {
    Shield,
    Globe,
    Search as SearchIcon,
    Bell,
    TrendingUp as TrendingUpIcon,
    AlertTriangle,
    Cpu,
    LayoutDashboard,
    Scale,
    History as HistoryIcon,
    BarChart3,
    Layers,
    Wand2,
    RefreshCw,
    Map as MapIcon,
    AppWindow,
    Mail,
    MessagesSquare
} from 'lucide-react';

const RISKS = [
    { id: 'eu', region: 'Unión Europea', tier: 'Crítico', title: 'Ley de IA UE: Artículo 12', desc: 'Nuevos requisitos de transparencia para modelos de IA generativa. Se requiere actualización inmediata de módulos orientados al usuario.', modules: ['Core-LLM', 'User-Auth'], time: 'Hace 2m', color: 'rose' },
    { id: 'us', region: 'USA (California)', tier: 'Moderado', title: 'CCPA: Mecanismo de Opt-Out', desc: 'Directrices revisadas para la prominencia del botón "No Vender" en dispositivos móviles.', modules: ['Marketing-UI'], time: 'Hace 4h', color: 'amber' },
    { id: 'iso', region: 'Global', tier: 'Bajo Riesgo', title: 'Revisión Anual ISO 27001', desc: 'Recordatorio rutinario para la preparación de la auditoría interna programada.', modules: ['Infra'], time: 'Hace 1d', color: 'slate' }
];

export default function GlobalLegalMonitor() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex h-screen bg-[#101622] text-slate-300 font-sans overflow-hidden">
            {/* Header de Comando Global */}
            <header className="absolute top-0 left-0 right-0 h-16 border-b border-white/5 bg-[#101622] flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#135bec]">
                        <Globe className="w-8 h-8" />
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            SinapCODE <span className="text-slate-500 font-light text-sm">| MONITOR GLOBAL_</span>
                        </span>
                    </div>
                </div>

                <div className="flex-1 max-w-2xl mx-12 hidden lg:block">
                    <div className="relative group">
                        <SearchIcon className="absolute left-3 top-2.5 text-slate-500 group-focus-within:text-[#135bec] transition-colors w-4 h-4" />
                        <input
                            className="w-full bg-[#1a2233] border border-white/5 text-sm text-white rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] transition-all placeholder-slate-500 italic"
                            placeholder="Buscar regulaciones, jurisdicciones o códigos de riesgo..."
                            type="text"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-4 text-[10px] font-black italic text-slate-500">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span>Sistema Operativo</span>
                        </div>
                        <div className="h-4 w-px bg-white/10"></div>
                        <span>v4.2.0-beta</span>
                    </div>

                    <button className="relative p-2 text-slate-400 hover:text-white transition-colors group">
                        <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#101622]"></span>
                    </button>

                    <div className="flex items-center gap-3 pl-4 border-l border-white/5">
                        <div className="text-right hidden md:block leading-none">
                            <div className="text-xs font-black text-white italic">Sarah Jenkins</div>
                            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Directora de Cumplimiento</div>
                        </div>
                        <img
                            className="w-9 h-9 rounded-2xl bg-[#1a2233] border border-white/5 object-cover shadow-lg"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_TrNxMLem-jdj5dzJnryl7cWraXsPGKhQa2Pi-gKrAuZcKzMQLnstgdZ-4pyg-IrkH7Cqe_Im2zHw7iJdN0BSR0nIGC88qBYnVEOLGoaTLe2Po3vjWDYKDVNKkj5pLkuawaVNdLx4RQ8JuzBnillc4AMli-B1WPDEh3rLyujZL2zCGG-Cub-LdjFg63-9soSiye7nAQIlF4-mgIpNsniOwJFFHGAXUdVhNzlTLl54RTbhcO8f5Uw_N3U2QyHxRkStg-QQ-k_aZiNT"
                            alt="Admin"
                        />
                    </div>
                </div>
            </header>

            {/* Layout Principal */}
            <main className="flex-1 flex pt-16 overflow-hidden relative">

                {/* Sidebar Izquierda: Métricas en Vivo */}
                <aside className="w-64 bg-[#1a2233]/70 backdrop-blur-xl border-r border-white/5 flex flex-col shrink-0 z-20">
                    <div className="p-4 border-b border-white/5">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 italic">Centro de Mandos_</h3>
                        <nav className="space-y-1">
                            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-[#135bec]/10 text-[#135bec] border-l-4 border-[#135bec] text-xs font-black uppercase italic tracking-tighter transition-all">
                                <LayoutDashboard className="w-4 h-4" />
                                Resumen_
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 text-xs font-black uppercase italic tracking-tighter transition-all">
                                <Scale className="w-4 h-4" />
                                Regulaciones_
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 text-xs font-black uppercase italic tracking-tighter transition-all">
                                <HistoryIcon className="w-4 h-4" />
                                Auditorías_
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 text-xs font-black uppercase italic tracking-tighter transition-all">
                                <BarChart3 className="w-4 h-4" />
                                Analíticas_
                            </button>
                        </nav>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto space-y-8">
                        <div>
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 italic">Métricas Globales_</h3>
                            <div className="space-y-4">
                                <div className="bg-[#101622] p-4 rounded-2xl border border-white/5 shadow-inner group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest italic">Nivel Cumplimiento</span>
                                        <TrendingUpIcon className="w-3 h-3 text-emerald-500" />
                                    </div>
                                    <div className="text-3xl font-black text-white italic tracking-tighter">98.4%</div>
                                    <div className="w-full bg-white/5 h-1.5 mt-3 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 h-full w-[98.4%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                    </div>
                                </div>

                                <div className="bg-[#101622] p-4 rounded-2xl border border-white/5 shadow-inner">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest italic">Riesgos Activos</span>
                                        <AlertTriangle className="w-3 h-3 text-rose-500" />
                                    </div>
                                    <div className="text-3xl font-black text-white italic tracking-tighter">12</div>
                                    <div className="text-[9px] text-rose-400 mt-2 font-black uppercase tracking-widest">+3 desde ayer</div>
                                </div>

                                <div className="bg-[#101622] p-4 rounded-2xl border border-white/5 shadow-inner">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest italic">Revisiones IA</span>
                                        <Cpu className="w-3 h-3 text-[#135bec]" />
                                    </div>
                                    <div className="text-3xl font-black text-white italic tracking-tighter">5</div>
                                    <div className="text-[9px] text-slate-500 mt-2 font-black uppercase tracking-widest">Requiere verificación_</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/5 bg-[#101622]/50">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 italic">Canales Alerta_</h3>
                        <div className="space-y-4">
                            {[
                                { icon: MessagesSquare, label: 'Slack', active: true },
                                { icon: Mail, label: 'Email', active: true },
                                { icon: AppWindow, label: 'Push', active: false }
                            ].map(channel => (
                                <div key={channel.label} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3 text-[11px] font-black text-slate-400 group-hover:text-white transition-colors italic uppercase tracking-tighter">
                                        <channel.icon className="w-4 h-4 text-slate-500 group-hover:text-[#135bec]" />
                                        {channel.label}
                                    </div>
                                    <div className={`w-8 h-4 rounded-full relative transition-colors ${channel.active ? 'bg-[#135bec]' : 'bg-white/10'}`}>
                                        <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${channel.active ? 'right-1' : 'left-1'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Centro: Mapa de Calor Regulatorio */}
                <section className="flex-1 bg-[#101622] relative overflow-hidden group">
                    {/* Fondo de Mapa */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale contrast-125 mix-blend-screen transition-transform duration-[20s] group-hover:scale-110"></div>

                    {/* Overlay de Rejilla */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(19,91,236,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(19,91,236,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

                    {/* Viñeta y degradados */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#101622] via-transparent to-[#101622]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#101622] via-transparent to-transparent"></div>

                    <div className="absolute top-8 left-8 z-10">
                        <h1 className="text-3xl font-black text-white tracking-widest uppercase italic shadow-2xl">Visualizador de Calor_</h1>
                        <p className="text-[#135bec] text-xs font-black uppercase tracking-widest mt-1 italic">Índice de volatilidad global en tiempo real</p>
                    </div>

                    {/* Marcadores Interactivos */}
                    <div className="absolute top-[35%] left-[52%] flex flex-col items-center group/marker cursor-pointer z-30">
                        <div className="relative w-6 h-6">
                            <div className="absolute w-full h-full bg-rose-500 rounded-full animate-ping opacity-75"></div>
                            <div className="relative w-6 h-6 bg-rose-600 rounded-full border-4 border-[#101622] shadow-[0_0_20px_rgba(244,63,94,0.8)]"></div>
                        </div>
                        <div className="mt-4 opacity-0 group-hover/marker:opacity-100 transition-all duration-500 scale-95 group-hover/marker:scale-100 bg-[#161d2b]/90 backdrop-blur-2xl border border-rose-500/30 p-5 rounded-[2rem] shadow-2xl w-64 pointer-events-none translate-y-2 group-hover/marker:translate-y-0 text-left">
                            <div className="text-[10px] font-black text-white italic uppercase tracking-widest mb-1">Unión Europea_</div>
                            <div className="text-[9px] text-rose-400 uppercase font-black tracking-[0.2em] mb-3">Volatilidad CRÍTICA</div>
                            <p className="text-[11px] text-slate-400 font-medium italic leading-relaxed">Implementación inminente de la Ley de IA. Afectación alta en procesamiento de datos.</p>
                        </div>
                    </div>

                    <div className="absolute top-[38%] left-[25%] flex flex-col items-center group/marker cursor-pointer z-30">
                        <div className="relative w-5 h-5">
                            <div className="absolute w-full h-full bg-amber-500 rounded-full animate-ping opacity-75"></div>
                            <div className="relative w-5 h-5 bg-amber-500 rounded-full border-4 border-[#101622] shadow-[0_0_20px_rgba(245,158,11,0.6)]"></div>
                        </div>
                        <div className="mt-4 opacity-0 group-hover/marker:opacity-100 transition-all duration-500 scale-95 group-hover/marker:scale-100 bg-[#161d2b]/90 backdrop-blur-2xl border border-amber-500/30 p-5 rounded-[2rem] shadow-2xl w-64 pointer-events-none translate-y-2 group-hover/marker:translate-y-0 text-left">
                            <div className="text-[10px] font-black text-white italic uppercase tracking-widest mb-1">USA (California)_</div>
                            <div className="text-[9px] text-amber-400 uppercase font-black tracking-[0.2em] mb-3">Riesgo Moderado</div>
                            <p className="text-[11px] text-slate-400 font-medium italic leading-relaxed">Revisiones de la CCPA detectadas en borradores legislativos.</p>
                        </div>
                    </div>

                    <div className="absolute top-[55%] left-[78%] flex flex-col items-center group/marker cursor-pointer z-30">
                        <div className="relative w-4 h-4">
                            <div className="relative w-4 h-4 bg-[#135bec] rounded-full border-4 border-[#101622] shadow-[0_0_20px_rgba(19,91,236,0.6)]"></div>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40">
                        <div className="bg-[#161d2b]/80 backdrop-blur-2xl px-8 py-3 rounded-full border border-white/5 flex items-center gap-10 shadow-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,1)]"></div>
                                <span className="text-[9px] text-white font-black uppercase tracking-widest italic">Riesgo Alto</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,1)]"></div>
                                <span className="text-[9px] text-white font-black uppercase tracking-widest italic">Moderado</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#135bec] shadow-[0_0_8px_rgba(19,91,236,1)]"></div>
                                <span className="text-[9px] text-white font-black uppercase tracking-widest italic">Estable</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sidebar Derecha: Feed de Inteligencia IA */}
                <aside className="w-96 bg-[#1a2233] border-l border-white/5 flex flex-col shrink-0 z-20">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#1a2233]/95 backdrop-blur-md sticky top-0 z-10">
                        <div>
                            <h2 className="text-sm font-black text-white uppercase italic tracking-widest">Inteligencia Legal_</h2>
                            <p className="text-[10px] text-[#135bec] mt-1 flex items-center gap-2 font-black italic uppercase">
                                <RefreshCw className="w-3 h-3 animate-spin" />
                                Escaneando con Agente IA...
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {RISKS.map(risk => (
                            <div key={risk.id} className={`bg-[#101622] rounded-3xl border border-white/5 hover:border-${risk.color}-500/30 transition-all p-5 group relative overflow-hidden cursor-pointer active:scale-95 shadow-2xl`}>
                                <div className={`absolute top-0 left-0 w-1.5 h-full bg-${risk.color === 'rose' ? 'rose-500' : risk.color === 'amber' ? 'amber-500' : 'slate-500'}`} />

                                <div className="flex justify-between items-start mb-3 pl-2">
                                    <div className="flex gap-2">
                                        <span className={`bg-${risk.color === 'rose' ? 'rose-500' : risk.color === 'amber' ? 'amber-500' : 'slate-500'}/10 text-${risk.color === 'rose' ? 'rose-400' : risk.color === 'amber' ? 'amber-400' : 'slate-400'} text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-[0.2em] border border-${risk.color === 'rose' ? 'rose-500' : risk.color === 'amber' ? 'amber-500' : 'slate-500'}/20`}>
                                            {risk.tier}_
                                        </span>
                                        <span className="bg-white/5 text-slate-500 text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest italic">{risk.region}</span>
                                    </div>
                                    <span className="text-[8px] text-slate-600 font-black italic">{risk.time}</span>
                                </div>

                                <h3 className="text-white font-black text-sm mb-2 pl-2 italic tracking-tight uppercase">"{risk.title}"</h3>
                                <p className="text-[11px] text-slate-500 mb-6 pl-2 leading-relaxed font-medium italic">
                                    {risk.desc}
                                </p>

                                <div className="bg-[#1a2233] rounded-2xl p-4 mb-5 ml-2 border border-white/5 shadow-inner">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Layers className="w-3.5 h-3.5 text-[#135bec]" />
                                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">Módulos Afectados_</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {risk.modules.map(mod => (
                                            <span key={mod} className="text-[8px] bg-white/5 text-[#135bec] px-2.5 py-1 rounded-lg border border-[#135bec]/20 font-black italic uppercase">{mod}</span>
                                        ))}
                                    </div>
                                </div>

                                <button className={`w-full flex items-center justify-center gap-3 bg-[#135bec] hover:bg-blue-600 text-white text-[10px] font-black uppercase italic tracking-widest py-3 rounded-2xl transition-all shadow-xl shadow-blue-900/10 group-hover:scale-[1.02] active:scale-95`}>
                                    <Wand2 className="w-4 h-4" />
                                    Sugerencia IA: Actualizar_
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 border-t border-white/5 bg-[#1a2233]">
                        <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-black uppercase italic tracking-widest py-4 rounded-2xl transition-all shadow-lg group">
                            Generar Reporte Ejecutivo PDF_
                        </button>
                    </div>
                </aside>
            </main>
        </div>
    );
}
