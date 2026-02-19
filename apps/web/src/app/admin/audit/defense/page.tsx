'use client';

import { useState, useEffect } from 'react';
import {
    ShieldAlert,
    ShieldCheck,
    Activity,
    Zap,
    Lock,
    Globe,
    Terminal,
    Bug,
    Cpu,
    BarChart3,
    LayoutDashboard,
    Shield,
    Radio,
    AlertTriangle,
    Eye,
    Download,
    Filter,
    ArrowRight,
    Bot,
    History,
    RefreshCw,
    Flame,
    LayoutDashboard as MissionControl,
    Database,
    FileText,
    Search
} from 'lucide-react';

const EVENTS = [
    { time: '14:22:01', severity: 'Info', source: 'Firewall-01', event: 'Inspección Rutinaria', status: 'Completado' },
    { time: '14:21:58', severity: 'Critical', source: 'Auth-Server-03', event: 'Intento de Brute Force Detectado', status: 'Activo' },
    { time: '14:20:15', severity: 'Warning', source: 'Admin-Dashboard', event: 'Cambio de Configuración Sin Ticket', status: 'Pendiente' },
    { time: '14:18:42', severity: 'Info', source: 'Load-Balancer', event: 'Pico de Tráfico Mitigado', status: 'Resuelto' }
];

export default function CyberDefenseCenter() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex h-screen bg-[#101622] text-slate-300 font-sans overflow-hidden">
            {/* Nav Principal Superior */}
            <header className="absolute top-0 left-0 right-0 h-16 border-b border-white/5 bg-[#101622] flex items-center justify-between px-6 z-50 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#135bec]">
                        <ShieldAlert className="w-8 h-8 animate-pulse" />
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            SinapCODE <span className="text-slate-500 font-light text-sm">| CIBERDEFENSA_</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black text-emerald-500 uppercase italic tracking-widest">SISTEMA SEGURO</span>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600">
                        <span>LATENCY: <span className="text-emerald-500">14ms</span></span>
                        <div className="h-3 w-px bg-white/10"></div>
                        <span>NODE: <span className="text-white">US-EAST-1</span></span>
                    </div>

                    <div className="h-8 w-px bg-white/10"></div>

                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#1a2233] border border-white/10 flex items-center justify-center text-[#135bec] font-black italic shadow-lg">
                            AO
                        </div>
                    </div>
                </div>
            </header>

            {/* Sidebar de Acceso Rápido */}
            <aside className="w-16 border-r border-white/5 bg-[#101622]/50 flex flex-col items-center py-20 gap-8 shrink-0 relative z-20">
                <button className="p-3 rounded-2xl bg-[#135bec]/10 text-[#135bec] border border-[#135bec]/20"><LayoutDashboard className="w-5 h-5" /></button>
                <button className="p-3 rounded-2xl text-slate-600 hover:text-white transition-all"><Radio className="w-5 h-5" /></button>
                <button className="p-3 rounded-2xl text-slate-600 hover:text-white transition-all"><Bug className="w-5 h-5" /></button>
                <button className="p-3 rounded-2xl text-slate-600 hover:text-white transition-all"><Terminal className="w-5 h-5" /></button>
                <div className="flex-1"></div>
                <button className="p-3 rounded-2xl text-rose-500/50 hover:text-rose-500 transition-all mb-4"><Lock className="w-5 h-5" /></button>
            </aside>

            {/* Panel Principal */}
            <main className="flex-1 flex flex-col pt-16 overflow-y-auto bg-[linear-gradient(rgba(19,91,236,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(19,91,236,0.02)_1px,transparent_1px)] bg-[size:40px_40px]">
                <div className="p-8 max-w-[1600px] mx-auto w-full space-y-6">

                    {/* Fila superior: KPIs de Salud */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-[#161d2b]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 group hover:border-[#135bec]/30 transition-all shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><AlertTriangle className="w-12 h-12 text-[#135bec]" /></div>
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Nivel de Amenaza_</h3>
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-black text-white italic tracking-tighter uppercase">BAJO_</span>
                                <span className="text-[10px] text-emerald-500 font-bold italic mb-1 uppercase tracking-widest">▼ 12%</span>
                            </div>
                            <div className="w-full bg-white/5 h-1.5 rounded-full mt-6 overflow-hidden">
                                <div className="bg-gradient-to-r from-[#135bec] to-emerald-500 h-full w-[15%]"></div>
                            </div>
                        </div>

                        <div className="bg-[#161d2b]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 group hover:border-[#135bec]/30 transition-all shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Activity className="w-12 h-12 text-[#135bec]" /></div>
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Status Firewall_</h3>
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-black text-white italic tracking-tighter uppercase">ACTIVO_</span>
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-lg border border-emerald-500/20 font-black italic mb-1 uppercase tracking-widest">99.9% UPTIME</span>
                            </div>
                            <div className="flex gap-1 mt-6">
                                {[0.8, 0.6, 0.4, 0.2].map((op, i) => (
                                    <div key={i} className={`h-1.5 flex-1 bg-emerald-500 rounded-full`} style={{ opacity: op }}></div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#161d2b]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 group hover:border-[#135bec]/30 transition-all shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><RefreshCw className="w-12 h-12 text-[#135bec]" /></div>
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Mitigación DDoS_</h3>
                            <div className="flex items-end gap-1">
                                <span className="text-4xl font-black text-white italic tracking-tighter uppercase">0.4</span>
                                <span className="text-lg font-black text-slate-500 italic mb-1 uppercase tracking-widest tracking-tighter">TB/s</span>
                            </div>
                            <div className="flex gap-1 mt-6 h-8 items-end">
                                {[30, 50, 40, 70, 45, 80, 55, 35, 20, 25].map((h, i) => (
                                    <div key={i} className="flex-1 bg-[#135bec]/50 rounded-full group-hover:bg-[#135bec] transition-all" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#161d2b]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 group hover:border-[#135bec]/30 transition-all shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Lock className="w-12 h-12 text-[#135bec]" /></div>
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Salud Cifrado_</h3>
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-black text-white italic tracking-tighter uppercase">100%_</span>
                                <span className="text-[10px] text-[#135bec] font-bold italic mb-1 uppercase tracking-widest">AES-256</span>
                            </div>
                            <div className="mt-6 flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-600 border-t border-white/5 pt-3 italic">
                                <span>LLAVES: OK</span>
                                <span>CERTS: VÁLIDOS</span>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Visual Central */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Monitor Tráfico Global */}
                        <div className="lg:col-span-2 bg-[#161d2b]/40 border border-white/5 rounded-[3rem] h-[550px] relative overflow-hidden group shadow-2xl">
                            {/* SVG Globe Animation Mockup */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale contrast-125 mix-blend-screen group-hover:scale-110 transition-transform duration-[20s]"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#101622] via-transparent to-transparent"></div>

                            <div className="absolute top-10 left-10 z-10">
                                <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase shadow-2xl">Vectores de Tráfico Global_</h1>
                                <p className="text-[10px] text-[#135bec] font-black italic uppercase tracking-widest mt-1">Escaneando superficie de ataque en tiempo real</p>
                            </div>

                            <div className="absolute top-10 right-10 z-10 flex gap-2">
                                <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase italic tracking-widest hover:text-[#135bec] transition-all">Vista 2D</button>
                                <button className="px-4 py-2 rounded-xl bg-[#135bec] text-white text-[9px] font-black uppercase italic tracking-widest shadow-lg shadow-blue-500/30">Globo 3D</button>
                            </div>

                            {/* Arte de Red (Simulación) */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-40">
                                <div className="w-[400px] h-[400px] border border-[#135bec]/20 rounded-full animate-[spin_30s_linear_infinite] flex items-center justify-center">
                                    <div className="w-[300px] h-[300px] border border-dashed border-[#135bec]/40 rounded-full"></div>
                                </div>
                            </div>

                            {/* Alerta Localizada */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                <div className="p-4 rounded-3xl bg-[#101622]/90 backdrop-blur-xl border border-rose-500/50 shadow-2xl max-w-[280px]">
                                    <div className="flex items-center gap-3 mb-3">
                                        <ShieldAlert className="w-5 h-5 text-rose-500 animate-bounce" />
                                        <div className="text-[10px] font-black text-rose-500 uppercase italic tracking-widest">Anomalía Detectada</div>
                                    </div>
                                    <div className="text-xs font-black text-white italic mb-1">Nodo: Asia Oriental (Hong Kong)</div>
                                    <div className="text-[10px] text-slate-500 font-medium italic underline">Intento de Inyección SQL Masiva</div>
                                </div>
                            </div>
                        </div>

                        {/* Inteligencia de Intrusión IA */}
                        <div className="bg-[#161d2b]/40 border border-white/5 rounded-[3rem] p-8 flex flex-col shadow-2xl">
                            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                                <div>
                                    <h3 className="text-sm font-black text-white italic uppercase tracking-widest flex items-center gap-2">
                                        <Cpu className="w-4 h-4 text-[#135bec]" />
                                        Registro IA_
                                    </h3>
                                    <p className="text-[10px] text-slate-500 mt-1 italic tracking-widest uppercase">Detección Heurística v5.0</p>
                                </div>
                                <span className="bg-emerald-500/20 text-emerald-500 text-[8px] px-2 py-0.5 rounded-lg border border-emerald-500/20 font-black italic uppercase animate-pulse">LIVE</span>
                            </div>

                            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                                {[
                                    { time: '10:42 PM', level: 'HIGH', label: 'Patrón de Login Inusual', meta: 'Lagos, NG • IP: 192.168.X.X', color: 'rose' },
                                    { time: '10:40 PM', level: 'BLOCKED', label: 'Inyección SQL Detenida', meta: 'Vector: Formulario /contacto', color: 'emerald' },
                                    { time: '10:35 PM', level: 'MED', label: 'Escalación de Privilegios', meta: 'Usuario: admin_temp • sudo config_write', color: 'amber' }
                                ].map((alert, i) => (
                                    <div key={i} className="p-5 rounded-[2rem] bg-[#101622] border border-white/5 hover:border-[#135bec]/30 transition-all cursor-pointer group">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[9px] font-mono text-slate-600">{alert.time} UTC</span>
                                            <span className={`text-[8px] font-black text-${alert.color}-400 uppercase tracking-widest`}>{alert.level}_</span>
                                        </div>
                                        <h4 className="text-xs font-black text-white italic mb-2 group-hover:text-[#135bec] transition-colors uppercase tracking-tight">{alert.label}</h4>
                                        <p className="text-[9px] text-slate-600 font-medium italic">{alert.meta}</p>

                                        <div className="mt-4 flex gap-2">
                                            <button className={`flex-1 bg-${alert.color}-500/10 text-${alert.color}-500 border border-${alert.color}-500/20 rounded-xl text-[8px] font-black uppercase italic py-2 hover:bg-${alert.color}-500 hover:text-white transition-all`}>Investigar_</button>
                                            <button className="flex-1 bg-white/5 text-slate-500 border border-white/10 rounded-xl text-[8px] font-black uppercase italic py-2 hover:bg-white/10">Ignorar_</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Nueva Sección: Operaciones Especiales (Fase 17 & 18) */}
                    <div className="pt-6 mb-12">
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="text-xl font-black text-white italic uppercase tracking-tighter italic-none">Operaciones Especiales & Recuperación_</h2>
                            <div className="h-px flex-1 bg-white/5 mx-4"></div>
                            <span className="text-[10px] font-black text-[#135bec] uppercase tracking-widest italic animate-pulse">RECURSOS TÁCTICOS_</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: 'MONITOR GLOBAL', sub: 'Salud de Red Proactiva', href: '/admin/audit/defense/network-health', icon: <Globe className="w-6 h-6" />, color: 'blue' },
                                { title: 'SIMULADOR IA', sub: 'Ataques 3D Controlados', href: '/admin/audit/defense/simulator', icon: <Bug className="w-6 h-6" />, color: 'rose' },
                                { title: 'REPORTE IA', sub: 'Análisis Post-Mortem', href: '/admin/audit/defense/report', icon: <FileText className="w-6 h-6" />, color: 'blue' },
                                { title: 'RECUPERACIÓN', sub: 'Failover Regional', href: '/admin/audit/defense/recovery', icon: <Flame className="w-6 h-6" />, color: 'orange' },
                                { title: 'CENTRO IRC', sub: 'Misión de Control', href: '/admin/audit/defense/irc', icon: <MissionControl className="w-6 h-6" />, color: 'blue' },
                                { title: 'ROLLBACK', sub: 'Restauración Instantánea', href: '/admin/audit/defense/rollback', icon: <History className="w-6 h-6" />, color: 'orange' }
                            ].map((tool, i) => (
                                <a
                                    href={tool.href}
                                    key={i}
                                    className={`group p-6 rounded-[2.5rem] bg-[#1a2233]/40 border border-white/5 hover:border-${tool.color === 'rose' ? 'rose-500' : tool.color === 'orange' ? 'orange-500' : 'blue-500'}/30 transition-all shadow-xl flex flex-col items-center text-center relative overflow-hidden`}
                                >
                                    <div className={`mb-4 p-4 rounded-2xl bg-white/5 text-${tool.color === 'rose' ? 'rose-500' : tool.color === 'orange' ? 'orange-500' : 'blue-500'} group-hover:scale-110 transition-transform`}>
                                        {tool.icon}
                                    </div>
                                    <h4 className="text-[11px] font-black text-white uppercase italic tracking-widest mb-1 italic-none">{tool.title}_</h4>
                                    <p className="text-[9px] text-slate-500 font-medium italic">{tool.sub}</p>
                                    <ArrowRight className="w-4 h-4 mt-6 text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Tabla Detallada de Eventos */}
                    <div className="bg-[#161d2b]/40 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-sm font-black text-white italic uppercase tracking-widest flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-slate-500" />
                                Historial de Eventos del Sistema_
                            </h3>
                            <div className="flex gap-4">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-600" />
                                    <input className="bg-[#101622] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-[10px] italic font-black text-white focus:outline-none focus:border-[#135bec] transition-all w-64" placeholder="Buscar logs de seguridad..." />
                                </div>
                                <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-[#135bec] text-white text-[10px] font-black uppercase italic tracking-widest hover:bg-blue-600 transition-all">
                                    <Download className="w-3.5 h-3.5" />
                                    Exportar Reporte Militar_
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 bg-white/[0.02] border-b border-white/5 italic">
                                        <th className="p-6">TIMESTAMP</th>
                                        <th className="p-6">CRITICIDAD</th>
                                        <th className="p-6">FUENTE</th>
                                        <th className="p-6">TIPO EVENTO</th>
                                        <th className="p-6 text-right">ESTADO</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[11px] font-semibold text-slate-400 divide-y divide-white/5">
                                    {EVENTS.map((ev, i) => (
                                        <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="p-6 font-mono text-[10px]">2023-11-28 <span className="text-slate-600">{ev.time}</span></td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${ev.severity === 'Critical' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,1)] animate-pulse' : ev.severity === 'Warning' ? 'bg-amber-500' : 'bg-[#135bec]'}`} />
                                                    <span className={`italic uppercase tracking-widest text-[9px] ${ev.severity === 'Critical' ? 'text-rose-400' : 'text-slate-400'}`}>{ev.severity}_</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-white italic">{ev.source}</td>
                                            <td className="p-6 italic">{ev.event}</td>
                                            <td className="p-6 text-right font-black italic text-[10px] tracking-widest uppercase">{ev.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Footer del Centro de Comando */}
                <footer className="p-8 border-t border-white/5 bg-[#101622] flex flex-col md:flex-row justify-between items-center gap-8 z-20">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 italic">
                        © 2024 SinapCODE <span className="text-slate-800 mx-2">|</span> PROTOCOLO DE DEFENSA ACTIVA V.4.2
                    </div>
                    <div className="flex gap-10">
                        {['Protocolos', 'Estado Sistema', 'Soporte Táctico'].map(link => (
                            <a key={link} className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-[#135bec] transition-all italic" href="#">{link}_</a>
                        ))}
                    </div>
                </footer>
            </main>
        </div>
    );
}
