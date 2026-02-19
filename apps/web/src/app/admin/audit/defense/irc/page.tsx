'use client';

import { useState, useEffect } from 'react';
import {
    Search as LucideSearch,
    Bell as LucideBell,
    Cpu as LucideCpu,
    ShieldAlert as LucideShield,
    Activity as LucideActivity,
    Terminal as LucideTerminal,
    Bot as BotIcon,
    History as LucideHistory,
    RefreshCw,
    ShieldOff,
    Send as LucideSend,
    MessageSquare,
    Zap,
    LayoutDashboard,
    ArrowRight,
    RotateCcw,
    Zap as CircuitBreaker,
    Brain,
    Filter
} from 'lucide-react';

export default function IncidentResponseCenter() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex h-screen bg-[#101922] text-slate-300 font-sans overflow-hidden italic-none">
            {/* Nav Superior Táctica */}
            <header className="absolute top-0 left-0 right-0 h-16 border-b border-white/5 bg-[#16202a]/80 backdrop-blur-xl flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#0d7ff2]">
                        <LayoutDashboard className="w-8 h-8" />
                        <h1 className="text-xl font-black tracking-tighter text-white uppercase italic italic-none">
                            SinapCODE <span className="text-[#0d7ff2] font-light">IRC_</span>
                        </h1>
                    </div>
                    <div className="h-6 w-px bg-white/5 mx-2"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic italic-none">Salud Sistema: 98.4%</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-hover:text-[#0d7ff2] transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar incidentes, IPs o logs..."
                            className="bg-[#0b1219] border border-white/5 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#0d7ff2]/50 w-64 transition-all italic-none"
                        />
                    </div>
                    <div className="flex items-center gap-4 border-l border-white/5 pl-6">
                        <div className="relative">
                            <LucideBell className="w-5 h-5 text-slate-500" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                        </div>
                        <div className="text-right">
                            <div className="text-[9px] font-black text-white uppercase italic italic-none tracking-tighter">Ops Lead</div>
                            <div className="text-[8px] text-slate-600 uppercase tracking-widest italic italic-none">Acceso Nivel 4</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <main className="flex-1 flex pt-16 overflow-hidden">
                {/* Panel Izquierdo: Feed de Incidentes */}
                <aside className="w-96 border-r border-white/5 bg-[#16202a]/50 backdrop-blur-sm flex flex-col shrink-0">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0b1219]/20">
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic italic-none">INCIDENTES ACTIVOS (4)_</h2>
                        <div className="flex gap-2 text-slate-600">
                            <Filter className="w-4 h-4 cursor-pointer hover:text-white" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {/* Incidente Crítico (Seleccionado) */}
                        <div className="relative group cursor-pointer">
                            <div className="absolute inset-0 bg-[#0d7ff2]/5 border-l-4 border-[#0d7ff2] rounded-r-2xl transition-all"></div>
                            <div className="relative p-5 bg-[#0b1219]/40 rounded-r-2xl border border-white/5 border-l-0 shadow-lg">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="px-2 py-0.5 rounded text-[8px] font-black bg-rose-500/10 text-rose-500 border border-rose-500/20 uppercase italic italic-none">CRÍTICO</span>
                                    <span className="text-[9px] text-slate-600 italic italic-none">hace 2m</span>
                                </div>
                                <h3 className="text-sm font-black text-white italic uppercase tracking-tighter italic-none mb-1">Pico de Latencia API</h3>
                                <p className="text-[10px] text-slate-500 font-mono italic italic-none mb-4">/v1/auth/token endpoint_</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 bg-[#16202a] px-2 py-1 rounded-lg border border-white/5">
                                        <BotIcon className="w-3 h-3 text-[#0d7ff2]" />
                                        <span className="text-[9px] font-black text-[#0d7ff2] uppercase italic italic-none">Sentinel-AI_</span>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Otros Incidentes */}
                        {[
                            { title: 'Acceso no Autorizado', desc: 'IP: 192.168.45.12 bloqueada', severity: 'MAYOR', color: 'amber', assigned: 'Sarah K.' },
                            { title: 'Uso de Memoria Alto', desc: 'Nodo Cluster #4', severity: 'MENOR', color: 'blue', assigned: 'Bot de Escala' },
                            { title: 'Timeout Conexión DB', desc: 'Fragmento Primario 02', severity: 'RESUELTO', color: 'emerald', assigned: 'Reiniciado' }
                        ].map((inc, i) => (
                            <div key={i} className={`p-5 rounded-2xl bg-[#0b1219]/20 border border-white/5 hover:border-white/10 transition-all opacity-70 hover:opacity-100`}>
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase italic italic-none ${inc.color === 'amber' ? 'bg-amber-500/10 text-amber-500' : inc.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                        {inc.severity}
                                    </span>
                                    <span className="text-[9px] text-slate-700 italic italic-none">hace {14 * (i + 1)}m</span>
                                </div>
                                <h3 className="text-sm font-black text-slate-300 italic uppercase tracking-tighter italic-none mb-1">{inc.title}</h3>
                                <p className="text-[10px] text-slate-600 font-mono italic italic-none mb-4">{inc.desc}</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-slate-800 border border-white/5"></div>
                                    <span className="text-[9px] font-black text-slate-600 uppercase italic italic-none tracking-widest">{inc.assigned}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Panel Central: Misión de Control */}
                <section className="flex-1 flex flex-col min-w-0 bg-[#101922] relative">
                    {/* Grid de Fondo */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#0d7ff2_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    <div className="z-10 flex-1 overflow-y-auto p-8 flex flex-col gap-8 backdrop-blur-md">
                        <div className="bg-[#16202a]/40 border border-white/5 rounded-[3rem] p-10 shadow-2xl">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter italic-none">Pico de Latencia API_</h2>
                                        <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-500 border border-rose-500/20 italic animate-pulse">INCIDENTE EN VIVO</span>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed italic max-w-2xl">
                                        Tiempos de respuesta anormales detectados (&gt;2500ms) en <code className="text-[#0d7ff2] bg-[#0d7ff2]/10 px-1.5 rounded-lg border border-[#0d7ff2]/20 font-mono">/v1/auth/token</code>. Afectando login en US-East-1.
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2 text-right">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-[#16202a] border border-white/10 flex items-center justify-center text-[#0d7ff2] shadow-lg"><BotIcon className="w-4 h-4" /></div>
                                        <div className="w-8 h-8 rounded-full bg-[#16202a] border border-white/10 flex items-center justify-center text-slate-500"><LucideSearch className="w-4 h-4" /></div>
                                    </div>
                                    <span className="text-[9px] font-mono text-slate-700 italic italic-none">ID: #INC-9942</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                                {/* Columna Izquierda: Telemetría y Logs */}
                                <div className="xl:col-span-8 space-y-8">
                                    {/* Telemetría de Latencia */}
                                    <div className="bg-[#0b1219]/40 border border-white/5 rounded-3xl p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic italic-none flex items-center gap-2">
                                                <LucideActivity className="w-3 h-3 text-[#0d7ff2]" />
                                                TELEMETRÍA DE LATENCIA (MS)_
                                            </h3>
                                            <div className="flex gap-2">
                                                <span className="px-2 py-0.5 rounded text-[8px] font-black bg-[#16202a] text-slate-600 border border-white/5 uppercase italic italic-none">1H</span>
                                                <span className="px-2 py-0.5 rounded text-[8px] font-black bg-[#0d7ff2] text-white border border-[#0d7ff2]/20 uppercase italic italic-none">VIVO_</span>
                                            </div>
                                        </div>
                                        <div className="h-40 w-full flex items-end gap-1.5 overflow-hidden p-2 bg-[#0b1219]/60 rounded-2xl border border-white/5">
                                            {[10, 15, 12, 18, 14, 45, 82, 94, 98, 85, 55, 30].map((h, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex-1 rounded-t-lg transition-all duration-1000 ${i > 5 && i < 10 ? 'bg-rose-500/80 animate-pulse' : 'bg-[#0d7ff2]/30'}`}
                                                    style={{ height: `${h}%` }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Terminal de Logs en Vivo */}
                                    <div className="bg-[#0b1219] rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl h-[350px]">
                                        <div className="px-4 py-2 bg-[#16202a] border-b border-white/10 flex justify-between items-center">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-500/50"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                                            </div>
                                            <span className="text-[9px] font-mono text-slate-600 italic italic-none uppercase tracking-widest">system_monitoring... tail -f</span>
                                        </div>
                                        <div className="p-6 font-mono text-[10px] space-y-2 text-slate-400 overflow-y-auto custom-scrollbar italic-none">
                                            <div className="flex gap-4 opacity-30"><span>14:02:11</span><span>[INFO] Health check passed for service: auth-service-01</span></div>
                                            <div className="flex gap-4 opacity-50"><span>14:02:22</span><span className="text-amber-500">[WARN] DB connection pool saturation &gt; 85%</span></div>
                                            <div className="flex gap-4 text-rose-500 bg-rose-500/10 -mx-6 px-6 py-1 border-l-2 border-rose-500">
                                                <span>14:02:30</span><span className="font-bold uppercase">[CRÍTICO] Unhandled Exception: ConnectionTimeoutError in AuthController</span>
                                            </div>
                                            <div className="flex gap-4 text-rose-700"><span>14:02:30</span><span>  at /app/src/controllers/auth.ts:42:15</span></div>
                                            <div className="flex gap-4 text-[#0d7ff2]"><span>14:02:31</span><span className="italic italic-none">[SISTEMA] Sentinel-AI iniciando rastreo de errores...</span></div>
                                            <div className="flex gap-4 animate-pulse"><span>14:02:32</span><span className="text-white">_</span></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Columna Derecha: Análisis IA y Herramientas */}
                                <div className="xl:col-span-4 space-y-8">
                                    {/* Análisis IA */}
                                    <div className="bg-[#16202a] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Brain className="w-16 h-16 text-[#0d7ff2]" /></div>
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic italic-none mb-6">ANÁLISIS DE IA_</h3>
                                        <div className="flex items-start gap-3 mb-6">
                                            <div className="p-2.5 rounded-xl bg-[#0d7ff2]/10 text-[#0d7ff2] border border-[#0d7ff2]/20"><BotIcon className="w-5 h-5" /></div>
                                            <p className="text-[10px] text-slate-300 leading-relaxed italic italic-none">
                                                Alta probabilidad de agotamiento del pool de conexiones. El despliegue <span className="text-[#0d7ff2] font-mono font-bold">v4.2.1</span> introdujo una posible fuga en la lógica de cierre.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase italic italic-none">
                                                <span>Confianza IA_</span>
                                                <span className="text-[#0d7ff2]">94%</span>
                                            </div>
                                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#0d7ff2] w-[94%]" style={{ filter: 'drop-shadow(0 0 8px rgba(13,127,242,0.5))' }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Toolkit de Resolución */}
                                    <div className="bg-[#16202a] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic italic-none mb-2">HERRAMIENTAS DE RESOLUCIÓN_</h3>
                                        {[
                                            { title: 'Ejecutar Rollback', sub: 'Revertir a v4.2.0 (Estable)', icon: <LucideHistory className="w-4 h-4" />, color: '#0d7ff2', href: '/admin/audit/defense/rollback' },
                                            { title: 'Reiniciar Servicio', sub: 'Ciclar contenedores auth-service', icon: <RefreshCw className="w-4 h-4" />, color: '#f59e0b', href: '#' },
                                            { title: 'Corte de Emergencia', sub: 'Bloquear tráfico no-admin', icon: <ShieldOff className="w-4 h-4" />, color: '#f43f5e', href: '#' }
                                        ].map((tool, i) => (
                                            <a href={tool.href} key={i} className={`w-full group flex items-center justify-between p-4 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-all cursor-pointer`}>
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2.5 rounded-xl bg-white/5 text-slate-500 transition-colors" style={{ color: tool.color + '80' }}>
                                                        {tool.icon}
                                                    </div>
                                                    <div>
                                                        <div className="text-[11px] font-black text-white italic italic-none mb-0.5">{tool.title}</div>
                                                        <div className="text-[9px] text-slate-600 italic italic-none font-medium">{tool.sub}</div>
                                                    </div>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-slate-800 group-hover:text-white transition-all group-hover:translate-x-1" />
                                            </a>
                                        ))}
                                    </div>

                                    {/* Chat de Sala de Guerra (Mini) */}
                                    <div className="bg-[#0b1219] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col h-48">
                                        <h3 className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic italic-none mb-4">SALA DE GUERRA (Chat)_</h3>
                                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar italic-none">
                                            <div className="text-[10px] italic">
                                                <span className="font-black text-[#0d7ff2] uppercase italic italic-none">Sentinel-AI:</span> <span className="text-slate-500 italic">Anomalía coincide con incidente de semana pasada.</span>
                                            </div>
                                            <div className="text-[10px] italic">
                                                <span className="font-black text-white uppercase italic italic-none">Sarah K.:</span> <span className="text-slate-400 italic">Revisando pool de conexiones ahora mismo.</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 relative">
                                            <input
                                                type="text"
                                                placeholder="Mensaje..."
                                                className="w-full bg-[#16202a] border border-white/5 rounded-xl px-4 py-2 text-[10px] text-white placeholder-slate-700 italic-none pr-10"
                                            />
                                            <LucideSend className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0d7ff2] cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
