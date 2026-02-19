'use client';

import { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Server,
    AlertTriangle,
    Settings,
    Gauge,
    Activity,
    CheckCircle2,
    Globe,
    RefreshCw,
    Lock,
    ArrowDown,
    ArrowUp,
    Network as HubIcon,
    Search
} from 'lucide-react';

export default function GlobalNetworkHealth() {
    const [mounted, setMounted] = useState(false);
    const [syncProgress, setSyncProgress] = useState(90);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setSyncProgress(prev => (prev < 99 ? prev + 1 : 90));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col min-h-screen bg-[#101e22] text-slate-200 font-sans italic-none">
            {/* Header Superior */}
            <header className="h-16 border-b border-[#0db9f2]/20 bg-[#15262b]/50 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between transition-all">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Globe className="text-[#0db9f2] w-8 h-8 animate-pulse" />
                        <span className="text-xl font-bold tracking-tight text-white uppercase italic italic-none">
                            Sinap<span className="text-[#0db9f2]">CODE</span> <span className="text-slate-500 font-light text-sm ml-2">NETWORK_MONITOR</span>
                        </span>
                    </div>
                    <div className="hidden md:flex h-6 w-px bg-slate-700 mx-2"></div>
                    <nav className="hidden md:flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic italic-none">
                        <a className="text-[#0db9f2] flex items-center gap-2" href="#">
                            <LayoutDashboard className="w-4 h-4" /> MONITOR_
                        </a>
                        <a className="hover:text-white transition-colors flex items-center gap-2" href="#">
                            <Server className="w-4 h-4" /> NODOS_
                        </a>
                        <a className="hover:text-white transition-colors flex items-center gap-2" href="#">
                            <AlertTriangle className="w-4 h-4" /> ALERTAS <span className="bg-amber-500/20 text-amber-500 text-[8px] px-1.5 py-0.5 rounded ml-1 border border-amber-500/20">2</span>
                        </a>
                        <a className="hover:text-white transition-colors flex items-center gap-2" href="#">
                            <Settings className="w-4 h-4" /> CONFIG_
                        </a>
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-3 text-[9px] font-black text-[#0db9f2] bg-[#0db9f2]/10 px-4 py-2 rounded-xl border border-[#0db9f2]/20 uppercase italic italic-none">
                        <span className="w-2 h-2 rounded-full bg-[#0db9f2] animate-ping"></span>
                        SISTEMA NOMINAL_
                    </div>
                    <div className="flex items-center gap-4 border-l border-slate-700/50 pl-6">
                        <div className="text-right hidden sm:block">
                            <div className="text-[10px] font-black text-white uppercase italic italic-none">Admin_Lead</div>
                            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Acceso Nivel 5</div>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-slate-700 bg-[#0d181b] flex items-center justify-center text-[#0db9f2] font-black shadow-lg italic italic-none">
                            AL
                        </div>
                    </div>
                </div>
            </header>

            {/* Area de Contenido Principal */}
            <main className="flex-1 p-6 lg:p-8 flex flex-col gap-8">

                {/* Fila de KPIs */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Metrica 1: Latencia */}
                    <div className="bg-[#15262b] border border-[#0db9f2]/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#0db9f2]/30 transition-all shadow-xl">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#0db9f2]/5 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-[#0db9f2]/10"></div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic italic-none">Latencia Promedio_</h3>
                            <Gauge className="text-[#0db9f2] w-5 h-5" />
                        </div>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-3xl font-black text-white italic italic-none tracking-tighter">24<span className="text-sm text-slate-500 ml-1">ms</span></span>
                            <span className="text-[10px] font-black text-emerald-400 flex items-center gap-1 italic italic-none">
                                <ArrowDown className="w-3 h-3" /> 12%
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-[#0d181b] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#0db9f2] to-emerald-400 w-[65%] rounded-full shadow-[0_0_10px_rgba(13,185,242,0.4)]"></div>
                        </div>
                    </div>

                    {/* Metrica 2: Pérdida de Paquetes */}
                    <div className="bg-[#15262b] border border-[#0db9f2]/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#0db9f2]/30 transition-all shadow-xl">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-amber-500/10"></div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic italic-none">Pérdida de Paquetes_</h3>
                            <Activity className="text-amber-500 w-5 h-5" />
                        </div>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-3xl font-black text-white italic italic-none tracking-tighter">0.02<span className="text-sm text-slate-500 ml-1">%</span></span>
                            <span className="text-[10px] font-black text-slate-500 uppercase italic italic-none">ESTABLE_</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#0d181b] rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[2%] rounded-full shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>
                        </div>
                    </div>

                    {/* Metrica 3: Tiempo de Actividad */}
                    <div className="bg-[#15262b] border border-[#0db9f2]/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#0db9f2]/30 transition-all shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic italic-none">Uptime del Servidor_</h3>
                            <CheckCircle2 className="text-emerald-400 w-5 h-5" />
                        </div>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-3xl font-black text-white italic italic-none tracking-tighter">99.99<span className="text-sm text-slate-500 ml-1">%</span></span>
                        </div>
                        <div className="flex gap-1.5 h-1.5">
                            <div className="flex-1 bg-emerald-400 rounded-full"></div>
                            <div className="flex-1 bg-emerald-400 rounded-full"></div>
                            <div className="flex-1 bg-emerald-400 rounded-full"></div>
                            <div className="flex-1 bg-emerald-400 rounded-full"></div>
                            <div className="flex-1 bg-emerald-400/20 rounded-full border border-emerald-400/20"></div>
                        </div>
                    </div>

                    {/* Metrica 4: CDN Performance */}
                    <div className="bg-[#15262b] border border-[#0db9f2]/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#0db9f2]/30 transition-all shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic italic-none">Impactos CDN_</h3>
                            <Globe className="text-[#0db9f2] w-5 h-5" />
                        </div>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-3xl font-black text-white italic italic-none tracking-tighter">8.4<span className="text-sm text-slate-500 ml-1">M/s</span></span>
                            <span className="text-[10px] font-black text-emerald-400 flex items-center gap-1 italic italic-none">
                                <ArrowUp className="w-3 h-3" /> 5%
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 uppercase italic-none">
                            <span className="bg-[#0d181b] px-2 py-1 rounded-lg border border-white/5 text-[#0db9f2]">US: 45%</span>
                            <span className="bg-[#0d181b] px-2 py-1 rounded-lg border border-white/5">EU: 30%</span>
                            <span className="bg-[#0d181b] px-2 py-1 rounded-lg border border-white/5">AS: 25%</span>
                        </div>
                    </div>
                </section>

                {/* Dashboard Principal Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-[500px]">

                    {/* Mapa y Gráfico (2/3 de espacio) */}
                    <div className="lg:col-span-2 flex flex-col gap-8">

                        {/* Contenedor del Mapa */}
                        <div className="bg-[#15262b] border border-[#0db9f2]/10 rounded-[3rem] p-1 flex-1 relative min-h-[450px] flex flex-col overflow-hidden shadow-2xl group">
                            <div className="absolute top-8 left-8 z-20">
                                <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase italic tracking-tighter italic-none">
                                    <span className="w-1.5 h-6 bg-[#0db9f2] rounded-full shadow-[0_0_10px_#0db9f2]"></span>
                                    Mapa de Tráfico en Vivo_
                                </h2>
                                <div className="flex gap-2 mt-4">
                                    <span className="text-[9px] uppercase font-black text-[#0db9f2] bg-[#0db9f2]/10 border border-[#0db9f2]/20 px-3 py-1 rounded-full italic italic-none shadow-lg">TIEMPO REAL</span>
                                    <span className="text-[9px] uppercase font-black text-slate-500 bg-[#0d181b] border border-slate-700 px-3 py-1 rounded-full italic italic-none">LAYER 4_</span>
                                </div>
                            </div>

                            {/* El Mapa (Representación Visual) */}
                            <div className="relative w-full h-full bg-[#0d181b] flex items-center justify-center">
                                {/* Simulación de Mapa con Imagen o Gradientes */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#15262b_1px,transparent_1px)] bg-[size:30px_30px]"></div>

                                <img
                                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
                                    className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-screen scale-110 group-hover:scale-100 transition-transform duration-[20s]"
                                    alt="Global Map"
                                />

                                {/* Nodos Interactivos (Simulación) */}
                                {/* US Node */}
                                <div className="absolute top-[35%] left-[25%] group/node cursor-pointer z-30">
                                    <div className="relative flex items-center justify-center w-6 h-6">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#0db9f2] opacity-40 animate-ping"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white shadow-[0_0_15px_white]"></span>
                                    </div>
                                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#15262b] border border-[#0db9f2]/30 p-3 rounded-2xl shadow-2xl opacity-0 group-hover/node:opacity-100 transition-all w-40 pointer-events-none scale-90 group-hover/node:scale-100">
                                        <div className="text-[9px] text-slate-500 font-mono italic uppercase italic-none">US-EAST-1 (N. Virginia)</div>
                                        <div className="text-sm font-black text-[#0db9f2] italic italic-none mt-1">12ms <span className="text-slate-600 text-[9px] lowercase">promedio</span></div>
                                    </div>
                                </div>

                                {/* EU Node */}
                                <div className="absolute top-[32%] left-[48%] group/node cursor-pointer z-30">
                                    <div className="relative flex items-center justify-center w-6 h-6">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#0db9f2] opacity-20 animate-pulse"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0db9f2] shadow-[0_0_15px_#0db9f2]"></span>
                                    </div>
                                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#15262b] border border-[#0db9f2]/30 p-3 rounded-2xl shadow-2xl opacity-0 group-hover/node:opacity-100 transition-all w-40 pointer-events-none scale-90 group-hover/node:scale-100">
                                        <div className="text-[9px] text-slate-500 font-mono italic uppercase italic-none">EU-WEST-2 (London)</div>
                                        <div className="text-sm font-black text-[#0db9f2] italic italic-none mt-1">24ms <span className="text-slate-600 text-[9px] lowercase">promedio</span></div>
                                    </div>
                                </div>

                                {/* Asia Node (Spike) */}
                                <div className="absolute top-[40%] left-[75%] group/node cursor-pointer z-30">
                                    <div className="relative flex items-center justify-center w-6 h-6">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-40 animate-ping"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 shadow-[0_0_15px_#f59e0b]"></span>
                                    </div>
                                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#15262b] border border-amber-500/40 p-3 rounded-2xl shadow-2xl opacity-0 group-hover/node:opacity-100 transition-all w-40 pointer-events-none scale-90 group-hover/node:scale-100">
                                        <div className="text-[9px] text-slate-500 font-mono italic uppercase italic-none">AP-SOUTH-1 (Mumbai)</div>
                                        <div className="text-sm font-black text-amber-500 italic italic-none mt-1">89ms <span className="text-slate-600 text-[9px] lowercase">pico_alto</span></div>
                                    </div>
                                </div>

                                {/* Conexiones SVG */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" style={{ filter: 'drop-shadow(0 0 4px #0db9f2)' }}>
                                    <path d="M 25% 35% Q 36% 25% 48% 32%" fill="none" stroke="#0db9f2" strokeDasharray="6,6" strokeWidth="1" className="animate-[dash_10s_linear_infinite]" />
                                    <path d="M 48% 32% Q 61% 28% 75% 40%" fill="none" stroke="#0db9f2" strokeWidth="1" />
                                </svg>
                            </div>

                            {/* Leyenda del Mapa */}
                            <div className="absolute bottom-8 left-8 z-20 bg-[#0d181b]/90 backdrop-blur-xl border border-white/5 p-5 rounded-[2rem] shadow-3xl">
                                <div className="text-[9px] font-black text-slate-500 uppercase mb-4 tracking-widest italic italic-none">MAPA DE CALOR DE LATENCIA_</div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-300 italic-none uppercase italic">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span> &lt; 50ms (Óptimo)
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-300 italic-none uppercase italic">
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"></span> 50-150ms (Alerta)
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-300 italic-none uppercase italic">
                                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span> &gt; 150ms (Crítico)
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tendencia de Latencia */}
                        <div className="bg-[#15262b] border border-[#0db9f2]/10 rounded-3xl p-8 flex flex-col shadow-xl">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-sm font-black text-slate-300 uppercase italic tracking-widest italic-none">Tendencia de Latencia Global (24h)_</h3>
                                <div className="flex gap-2">
                                    <button className="text-[9px] font-black uppercase bg-[#0db9f2]/20 text-[#0db9f2] px-4 py-1.5 rounded-xl border border-[#0db9f2]/20 italic-none">Global</button>
                                    <button className="text-[9px] font-black uppercase bg-[#0d181b] text-slate-500 px-4 py-1.5 rounded-xl border border-white/5 hover:text-white transition-all italic-none">US_</button>
                                    <button className="text-[9px] font-black uppercase bg-[#0d181b] text-slate-500 px-4 py-1.5 rounded-xl border border-white/5 hover:text-white transition-all italic-none">EU_</button>
                                </div>
                            </div>
                            <div className="flex-1 flex items-end gap-2 relative border-l border-b border-slate-700/50 pb-4 pl-4 min-h-[120px]">
                                {[30, 35, 32, 28, 45, 50, 42, 75, 30, 25, 28, 29].map((h, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 rounded-t-xl transition-all duration-300 relative group/bar ${h > 70 ? 'bg-amber-500/30 hover:bg-amber-500/50' : 'bg-[#0db9f2]/20 hover:bg-[#0db9f2]/40'}`}
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-[#0d181b] text-[9px] font-black text-white px-3 py-1.5 rounded-xl border border-white/10 opacity-0 group-hover/bar:opacity-100 whitespace-nowrap z-40 transition-all scale-75 group-hover/bar:scale-100 shadow-3xl italic-none uppercase italic">
                                            {h}ms {h > 70 && '• Spike detectado'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Panel Lateral (Columna 3) */}
                    <div className="flex flex-col gap-8">

                        {/* Widget de Sincronización Post-Rollback */}
                        <div className="bg-[#15262b] border border-[#0db9f2]/20 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0db9f2]/5 to-transparent pointer-events-none"></div>
                            <div className="flex items-center justify-between mb-10 relative z-10">
                                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic italic-none">Sincronización Post-Rollback_</h3>
                                <RefreshCw className="text-[#0db9f2] w-4 h-4 animate-spin" />
                            </div>

                            <div className="relative w-48 h-48 mx-auto mb-10 flex items-center justify-center">
                                <svg className="transform -rotate-90 w-full h-full">
                                    <circle cx="96" cy="96" r="80" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="12" />
                                    <circle
                                        className="transition-all duration-1000 ease-in-out"
                                        cx="96" cy="96" r="80" fill="none"
                                        stroke="#0db9f2"
                                        strokeDasharray="502"
                                        strokeDashoffset={502 - (syncProgress * 5.02)}
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        style={{ filter: 'drop-shadow(0 0 10px rgba(13,185,242,0.5))' }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                                    <span className="text-4xl font-black text-white italic tracking-tighter italic-none">{syncProgress}%</span>
                                    <span className="text-[9px] text-slate-500 font-black uppercase italic italic-none tracking-widest mt-1">SINCRONIZADO_</span>
                                </div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                {[
                                    { name: 'Región US (N. Virginia)', status: 'COMPLETO', color: 'emerald', value: 100 },
                                    { name: 'Región EU (London)', status: 'COMPLETO', color: 'emerald', value: 100 },
                                    { name: 'Región Asia Pacífico', status: 'SINCRONIZANDO...', color: '#0db9f2', value: 75, active: true },
                                    { name: 'Región LATAM', status: 'PENDIENTE', color: 'slate', value: 0, opacity: true }
                                ].map((reg, i) => (
                                    <div key={i} className={`flex justify-between items-center text-[10px] font-bold ${reg.opacity ? 'opacity-40' : ''} italic-none uppercase italic`}>
                                        <div className="flex items-center gap-3">
                                            <span className={`w-2 h-2 rounded-full ${reg.active ? 'animate-pulse' : ''}`} style={{ backgroundColor: reg.color === 'emerald' ? '#34d399' : reg.color === 'slate' ? '#475569' : reg.color }}></span>
                                            <span className="text-slate-300 font-bold">{reg.name}</span>
                                        </div>
                                        <span className={`font-black tracking-widest ${reg.status.includes('COMPLETO') ? 'text-emerald-400' : reg.active ? 'text-[#0db9f2]' : 'text-slate-500'}`}>{reg.status}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-10 bg-[#0d181b] hover:bg-black text-[9px] font-black text-slate-500 hover:text-white py-3 rounded-2xl border border-white/5 transition-all uppercase tracking-[0.2em] italic italic-none shadow-lg">
                                Ver Logs de Consistencia_
                            </button>
                        </div>

                        {/* Feed de Eventos en Vivo */}
                        <div className="bg-[#15262b] border border-[#0db9f2]/10 rounded-[3rem] p-8 flex-1 flex flex-col shadow-2xl">
                            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center justify-between italic italic-none">
                                FEED DE EVENTOS_
                                <span className="text-[8px] bg-[#0d181b] text-[#0db9f2] px-3 py-1 rounded-full border border-[#0db9f2]/20 animate-pulse italic-none">LIVE</span>
                            </h3>
                            <div className="flex-1 overflow-y-auto space-y-6 max-h-[350px] pr-4 custom-scrollbar italic-none">
                                {[
                                    { time: '10:42:05 UTC', title: 'Auto-scaling activado', desc: 'Capacidad de pods incrementada un 20% en eu-west-2 por pico de carga.', color: '#0db9f2' },
                                    { time: '10:38:12 UTC', title: 'Backup completado', desc: 'Snapshot incremental guardado con éxito. Tamaño: 4.2TB.', color: '#475569' },
                                    { time: '10:15:00 UTC', title: 'Alerta de Latencia Alta', desc: 'Detectado >150ms en nodo ap-south-1. Reencaminando tráfico.', color: '#f59e0b', highlight: true },
                                    { time: '09:55:23 UTC', title: 'Rollback Iniciado', desc: 'Admin autorizó rollback a versión v2.4.5 estable.', color: '#34d399' }
                                ].map((ev, i) => (
                                    <div key={i} className={`flex gap-4 items-start border-l-2 pl-4 py-1 transition-all group ${ev.highlight ? 'bg-amber-500/5 -mx-4 px-8 rounded-r-3xl border-amber-500' : 'border-slate-800 hover:border-[#0db9f2]'}`}>
                                        <div className="flex-1">
                                            <div className="text-[9px] text-slate-600 font-mono mb-1 italic-none">{ev.time}</div>
                                            <div className={`text-xs font-black uppercase tracking-tight italic italic-none ${ev.highlight ? 'text-amber-500' : 'text-white'}`}>{ev.title}_</div>
                                            <div className="text-[10px] text-slate-500 mt-2 leading-relaxed italic italic-none line-clamp-2 group-hover:line-clamp-none transition-all">{ev.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Status Bar Inferior */}
            <footer className="bg-[#0d181b] border-t border-white/5 py-3 px-8 flex flex-col md:flex-row justify-between items-center text-[9px] text-slate-600 font-mono uppercase tracking-[0.2em] italic-none">
                <div className="flex items-center gap-6">
                    <span className="font-black">v.3.4.1-STABLE</span>
                    <span className="hidden md:inline text-slate-800">|</span>
                    <span className="hidden md:inline">BUILD: 20231024.1845</span>
                    <span className="flex items-center gap-2 text-emerald-500/60"><Lock className="w-3 h-3" /> CONEXIÓN CIFRADA</span>
                </div>
                <div className="flex items-center gap-6 mt-3 md:mt-0 font-black">
                    <span>TIEMPO SERVIDOR: <span className="text-slate-400">14:22 UTC</span></span>
                    <span className="hidden md:inline text-slate-800">|</span>
                    <span>PRÓX. MANTENIMIENTO: <span className="text-slate-400">24H 12M</span></span>
                </div>
            </footer>

            <style jsx>{`
                @keyframes dash {
                    to {
                        stroke-dashoffset: -100;
                    }
                }
            `}</style>
        </div>
    );
}
