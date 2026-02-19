'use client';

import { useState, useEffect } from 'react';
import {
    FileText,
    ShieldCheck,
    History,
    BarChart3,
    Download,
    AlertTriangle,
    Brain,
    Terminal,
    Code,
    Shield,
    ArrowUpRight,
    Search,
    Filter,
    Clock,
    CheckCircle2,
    XCircle,
    Zap,
    Scale,
    Database
} from 'lucide-react';

export default function PostMortemReport() {
    const [mounted, setMounted] = useState(false);
    const [score, setScore] = useState(78);

    useEffect(() => {
        setMounted(true);
        setTimeout(() => setScore(94), 500);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex h-screen bg-[#101622] text-slate-300 font-sans overflow-hidden italic-none">
            {/* Nav Superior */}
            <header className="absolute top-0 left-0 right-0 h-16 border-b border-white/5 bg-[#101622]/80 backdrop-blur-xl flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#135bec]">
                        <Brain className="w-8 h-8" />
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            SinapCODE <span className="text-slate-500 font-light text-sm">| REPORTE_POST-MORTEM_</span>
                        </span>
                    </div>
                    <div className="h-6 w-px bg-white/10 mx-2"></div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic">INCIDENTE-2024-X942</div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">AMENAZA NEUTRALIZADA</span>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-[#135bec] text-white text-xs font-black uppercase shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all italic group">
                        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        Exportar Reporte_
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex pt-16 overflow-hidden">
                {/* Panel Izquierdo: Resumen y Mapa */}
                <aside className="w-[450px] border-r border-white/5 bg-[#161d2b]/50 backdrop-blur-sm flex flex-col p-8 overflow-y-auto shrink-0">
                    {/* Resumen Ejecutivo */}
                    <div className="mb-10">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 italic">RESUMEN EJECUTIVO_</h3>
                        <div className="bg-[#101622] rounded-3xl border border-white/5 p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><AlertTriangle className="w-16 h-16 text-rose-500" /></div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-2 py-0.5 rounded text-[8px] bg-rose-500/20 text-rose-500 border border-rose-500/20 font-black uppercase italic italic-none">SEVERIDAD ALTA</span>
                                <span className="text-[8px] font-mono text-slate-600 italic italic-none">AI GEN: 24/11/2024</span>
                            </div>
                            <h4 className="text-sm font-black text-white italic mb-2 uppercase tracking-tighter">Ataque de Diccionario Distribuido</h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed italic font-medium mb-6">
                                A las 14:02:45, el detector de anomalías identificó un pico del 4000% en solicitudes de autenticación desde 24 subredes distintas. El patrón coincide con <code className="text-rose-500 font-mono bg-rose-500/5 px-1 rounded">SIG-BF-992</code>. La defensa automatizada se activó de forma inmediata.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-2xl bg-[#0b1219] border border-white/5">
                                    <div className="text-[8px] text-slate-600 font-black uppercase italic mb-1 uppercase italic-none">Endpoint Target</div>
                                    <div className="text-[9px] text-blue-400 font-mono italic italic-none">/api/v1/auth/login</div>
                                </div>
                                <div className="p-3 rounded-2xl bg-[#0b1219] border border-white/5">
                                    <div className="text-[8px] text-slate-600 font-black uppercase italic mb-1 uppercase italic-none">Data Leak</div>
                                    <div className="text-[9px] text-emerald-400 font-bold italic italic-none">0 BYTES (SECURE)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mapa de Vulnerabilidades (Miniatura visual) */}
                    <div className="flex-1">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 italic">MAPEO DE VULNERABILIDADES_</h3>
                        <div className="h-64 rounded-3xl bg-[#101622] border border-white/5 relative flex items-center justify-center overflow-hidden group">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#135bec_1px,transparent_1px)] bg-[size:15px_15px]"></div>

                            {/* Diagrama de Red Mockup */}
                            <div className="relative z-10 scale-90">
                                <div className="w-12 h-12 rounded-xl bg-[#161d2b] border border-slate-700 flex items-center justify-center text-slate-500 mb-12 mx-auto"><Shield className="w-6 h-6" /></div>
                                <div className="flex gap-16">
                                    <div className="w-12 h-12 rounded-xl bg-[#161d2b] border border-slate-700 flex items-center justify-center text-slate-500"><Database className="w-6 h-6" /></div>
                                    <div className="w-12 h-12 rounded-xl bg-[#161d2b] border border-rose-500 flex items-center justify-center text-rose-500 relative shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                                        <AlertTriangle className="w-6 h-6 animate-pulse" />
                                        <div className="absolute top-full mt-2 text-[8px] font-black text-rose-500 uppercase tracking-widest">GATEWAY_ERR</div>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-[#161d2b] border border-emerald-500 flex items-center justify-center text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"><Zap className="w-6 h-6" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Panel Central: Timeline y Diff */}
                <section className="flex-1 bg-[#101622] p-8 flex flex-col gap-8 overflow-y-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Línea de Tiempo de Eventos */}
                        <div className="bg-[#161d2b]/40 border border-white/5 rounded-[2.5rem] p-8 h-80 flex flex-col shadow-2xl">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 italic flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                CRONOLOGÍA EL INCIDENTE_
                            </h3>
                            <div className="flex-1 overflow-y-auto space-y-6 relative pr-2 custom-scrollbar">
                                <div className="absolute left-[7px] top-2 bottom-4 w-px bg-white/5"></div>
                                {[
                                    { time: '14:02:45.392', event: 'Pico de Tráfico Inicial', status: 'INFO', color: 'slate' },
                                    { time: '14:02:45.412', event: 'Umbral Excedido (50 req/s)', status: 'WARN', color: 'amber' },
                                    { time: '14:02:45.420', event: 'SinapAI Auto-Patch Desplegado', status: 'ACTION', color: 'blue' },
                                    { time: '14:02:45.445', event: 'Ataque Mitigado. 142 IPs Baneadas', status: 'RESOLVED', color: 'emerald' }
                                ].map((e, i) => (
                                    <div key={i} className="relative pl-6">
                                        <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-[#101622] z-10 ${e.color === 'emerald' ? 'border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : e.color === 'amber' ? 'border-amber-500' : e.color === 'blue' ? 'border-[#135bec] shadow-[0_0_8px_rgba(19,91,236,0.5)]' : 'border-slate-500'}`}></div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-[8px] font-mono text-slate-600 italic italic-none">{e.time}</div>
                                                <div className={`text-[11px] font-black italic uppercase italic-none ${e.color === 'emerald' ? 'text-white' : e.color === 'blue' ? 'text-[#135bec]' : 'text-slate-400'}`}>{e.event}</div>
                                            </div>
                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${e.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/10' : 'bg-slate-800 text-slate-500 border border-white/5'}`}>{e.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Puntuación de Seguridad Post-Incidente */}
                        <div className="bg-[#161d2b]/40 border border-white/5 rounded-[2.5rem] p-8 h-80 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform"><ShieldCheck className="w-32 h-32 text-[#135bec]" /></div>
                            <h3 className="absolute top-8 left-10 text-[10px] font-black text-slate-500 uppercase tracking-widest italic flex items-center gap-2">
                                <BarChart3 className="w-3 h-3" />
                                ROBUSTEZ DEL SISTEMA_
                            </h3>

                            <div className="flex flex-col items-center gap-4">
                                <div className="relative w-40 h-40 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="6" />
                                        <circle
                                            cx="50" cy="50" r="45" fill="none"
                                            stroke="#135bec"
                                            strokeWidth="6"
                                            strokeDasharray={`${score * 2.82} 282`}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-out"
                                            style={{ filter: "drop-shadow(0 0 15px rgba(19,91,236,0.5))" }}
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-4xl font-black text-white italic tracking-tighter">{score}%</span>
                                        <span className="text-[10px] text-emerald-500 font-black italic uppercase tracking-widest italic italic-none">▲ 16% Mejora</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[10px] font-black text-white uppercase tracking-widest italic mb-1 uppercase">Estado Post-Parche_</div>
                                    <div className="text-[9px] text-slate-600 font-bold italic italic-none">Vulnerabilidades Críticas: 0</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visor de Auto-Parche (Code Diff) */}
                    <div className="flex-1 bg-[#0b1219] border border-white/5 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-white/5 bg-[#161d2b]/30 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Code className="w-5 h-5 text-[#135bec]" />
                                <h3 className="text-sm font-black text-white italic uppercase tracking-widest italic">Patch_Log IA_</h3>
                                <div className="bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-lg text-[8px] font-black text-blue-400 uppercase tracking-widest italic">VISOR DIFF</div>
                            </div>
                            <div className="flex items-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-widest italic italic-none">
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-rose-500/50"></div> Vulnerable</span>
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-emerald-500/50"></div> Parcheado</span>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-2 font-mono text-[11px] overflow-hidden italic-none">
                            {/* Código Vulnerable */}
                            <div className="p-8 bg-[#0d1117]/80 border-r border-white/5 overflow-y-auto custom-scrollbar italic-none">
                                <div className="text-slate-600 mb-4 select-none">// middleware/auth.js (Original)</div>
                                <div className="space-y-1 opacity-40">
                                    <div>async function login(req, res) {"{"}</div>
                                    <div className="pl-4">const {"{ user, pass }"} = req.body;</div>
                                    <div className="bg-rose-500/10 border-l-2 border-rose-500 pl-4 py-1 -mx-8 w-[calc(100%+4rem)] text-rose-300">
                                        // VULNERABILIDAD: No rate limiting activo
                                    </div>
                                    <div className="bg-rose-500/10 border-l-2 border-rose-500 pl-4 py-1 -mx-8 w-[calc(100%+4rem)] text-rose-300">
                                        const isValid = await checkCredentials(user, pass);
                                    </div>
                                    <div className="pl-4">if (isValid) {"{"}</div>
                                    <div className="pl-8">return res.json({"{"} token: create(user) {"}"});</div>
                                    <div className="pl-4">{"}"}</div>
                                    <div>{"}"}</div>
                                </div>
                            </div>

                            {/* Código Parcheado */}
                            <div className="p-8 bg-[#0d1117] overflow-y-auto custom-scrollbar relative italic-none">
                                <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none"></div>
                                <div className="text-emerald-500/80 mb-4 select-none">// middleware/auth.js (IA Patched)</div>
                                <div className="space-y-1 text-slate-300">
                                    <div>async function login(req, res) {"{"}</div>
                                    <div className="pl-4">const {"{ user, pass }"} = req.body;</div>
                                    <div className="bg-emerald-500/10 border-l-2 border-emerald-500 pl-4 py-1 -mx-8 w-[calc(100%+4rem)] text-emerald-400">
                                        // PARCHE: Añadido backoff exponencial
                                    </div>
                                    <div className="bg-emerald-500/10 border-l-2 border-emerald-500 pl-4 py-1 -mx-8 w-[calc(100%+4rem)] text-emerald-400">
                                        await rateLimiter.consume(req.ip);
                                    </div>
                                    <div className="pl-4">const isValid = await checkCredentials(user, pass);</div>
                                    <div className="pl-4">if (isValid) {"{"}</div>
                                    <div className="pl-8">return res.json({"{"} token: create(user) {"}"});</div>
                                    <div className="pl-4">{"}"}</div>
                                    <div>{"}"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
