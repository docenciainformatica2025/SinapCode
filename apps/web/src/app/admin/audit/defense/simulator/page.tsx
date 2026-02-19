'use client';

import { useState, useEffect } from 'react';
import {
    ShieldAlert,
    ShieldCheck,
    Zap,
    Activity,
    Lock,
    Terminal,
    Bug,
    Cpu,
    AlertTriangle,
    RefreshCw,
    Play,
    Pause,
    FileText,
    History,
    Network,
    Database,
    Globe,
    Search,
    Filter,
    ArrowRight
} from 'lucide-react';

const SCENARIOS = [
    { id: 'ddos', name: 'Ataque DDoS Masivo', severity: 'Crítica', desc: 'Simula un ataque distribuido de 500GB/s contra el balanceador de carga.', color: 'rose' },
    { id: 'bruteforce', name: 'Brute Force / Auth', severity: 'Alta', desc: 'Ataque de diccionario contra el servicio de autenticación central.', color: 'amber' },
    { id: 'sqli', name: 'Inyección SQL (DB)', severity: 'Media', desc: 'Intento de extracción de datos mediante payloads en campos de formulario.', color: 'yellow' },
    { id: 'social', name: 'Phishing Interno', severity: 'Baja', desc: 'Simulación de filtración de credenciales vía ingeniería social.', color: 'blue' }
];

export default function ThreatSimulator() {
    const [mounted, setMounted] = useState(false);
    const [activeScenario, setActiveScenario] = useState('ddos');
    const [isSimulating, setIsSimulating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const startSimulation = () => {
        setIsSimulating(true);
        setProgress(0);
        setLogs([
            { time: '14:02:15', type: 'SYSTEM', msg: 'Simulación iniciada. Verificando estado de nodos...' }
        ]);

        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + 1;
                if (next >= 100) {
                    clearInterval(interval);
                    setIsSimulating(false);
                    return 100;
                }

                // Add logs at certain points
                if (next === 20) addLog('DETECTION', 'Pico de tráfico detectado. Firma: DDoS_SynFlood_v4', 'rose');
                if (next === 40) addLog('AI_DEFENSE', 'Activando Centro de Limpieza (Scrubbing Center) US-East-1', 'blue');
                if (next === 60) addLog('AI_DEFENSE', 'Escalado automático: +10 instancias de firewall añadidas', 'emerald');
                if (next === 85) addLog('STATUS', 'Tráfico mitigado. Rotando llaves de cifrado como precaución', 'emerald');

                return next;
            });
        }, 150);
    };

    const addLog = (type: string, msg: string, color: string) => {
        setLogs(prev => [{ time: new Date().toLocaleTimeString(), type, msg, color }, ...prev]);
    };

    if (!mounted) return null;

    return (
        <div className="flex h-screen bg-[#101622] text-slate-300 font-sans overflow-hidden italic-none">
            {/* Nav Superior */}
            <header className="absolute top-0 left-0 right-0 h-16 border-b border-white/5 bg-[#101622]/80 backdrop-blur-xl flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-rose-500">
                        <Bug className="w-8 h-8 animate-pulse" />
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            SinapCODE <span className="text-slate-500 font-light text-sm">| SIMULADOR_AMENAZAS_</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest italic">Nivel de Riesgo: CRÍTICO</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase text-white hover:bg-white/10 transition-all italic">
                        <History className="w-4 h-4" />
                        Historial_
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-black uppercase shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition-all italic">
                        <FileText className="w-4 h-4" />
                        Reporte Post-Mortem_
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex pt-16 overflow-hidden">
                {/* Sidebar Izquierda: Escenarios */}
                <aside className="w-80 border-r border-white/5 bg-[#161d2b]/50 backdrop-blur-sm flex flex-col p-6 overflow-y-auto shrink-0">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 italic">Vectores de Ataque_</h3>
                    <div className="space-y-4">
                        {SCENARIOS.map(s => (
                            <div
                                key={s.id}
                                onClick={() => !isSimulating && setActiveScenario(s.id)}
                                className={`group p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${activeScenario === s.id ? 'bg-rose-500/10 border-rose-500/30' : 'bg-[#101622] border-white/5 hover:border-white/10'}`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`p-2 rounded-xl bg-[#1a2233] border border-white/10 ${activeScenario === s.id ? 'text-rose-500' : 'text-slate-500 group-hover:text-white'}`}>
                                        {s.id === 'ddos' ? <Network className="w-5 h-5" /> : s.id === 'bruteforce' ? <Lock className="w-5 h-5" /> : s.id === 'sqli' ? <Database className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                                    </div>
                                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${s.color === 'rose' ? 'bg-rose-500/20 text-rose-500 border-rose-500/20' : s.color === 'amber' ? 'bg-amber-500/20 text-amber-500 border-amber-500/20' : 'bg-blue-500/20 text-blue-500 border-blue-500/20'}`}>
                                        {s.severity}
                                    </span>
                                </div>
                                <h4 className={`text-sm font-black italic mb-1 uppercase tracking-tighter ${activeScenario === s.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{s.name}</h4>
                                <p className="text-[10px] text-slate-500 leading-relaxed italic mb-3">{s.desc}</p>

                                {activeScenario === s.id && isSimulating && (
                                    <div className="space-y-2">
                                        <div className="w-full h-1 bg-[#1a2233] rounded-full overflow-hidden">
                                            <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-between text-[8px] font-black text-rose-500 uppercase italic">
                                            <span>EJECUTANDO_</span>
                                            <span>{progress}%</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Panel Central: Visualización */}
                <section className="flex-1 bg-[#101622] relative flex flex-col overflow-hidden">
                    {/* Visualización 3D Mockup */}
                    <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.05)_0%,transparent_70%)]">
                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(19,91,236,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(19,91,236,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                        {/* Infraestructura Central */}
                        <div className="relative z-10 scale-125">
                            <div className="w-64 h-64 rounded-full border border-white/5 flex items-center justify-center relative">
                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-500/20 animate-[spin_60s_linear_infinite]"></div>
                                <div className="w-48 h-48 rounded-full bg-[#161d2b] border border-white/10 flex items-center justify-center shadow-2xl relative">
                                    <div className={`absolute inset-0 rounded-full border-2 border-rose-500 transition-all duration-500 ${isSimulating ? 'opacity-40 animate-ping' : 'opacity-0'}`}></div>
                                    <ShieldAlert className={`w-12 h-12 text-rose-500 transition-all ${isSimulating ? 'animate-bounce' : ''}`} />
                                </div>

                                {/* Nodos Periféricos */}
                                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                                    <div
                                        key={deg}
                                        className="absolute w-6 h-6 rounded-lg bg-[#1a2233] border border-white/10 flex items-center justify-center"
                                        style={{
                                            transform: `rotate(${deg}deg) translate(140px) rotate(-${deg}deg)`,
                                            transition: 'all 0.5s ease'
                                        }}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${isSimulating && i % 2 === 0 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                                    </div>
                                ))}
                            </div>

                            {/* Overlay de Etiquetas Tácticas */}
                            <div className="absolute -top-20 -left-20 bg-[#161d2b]/80 backdrop-blur p-3 rounded-2xl border border-rose-500/30">
                                <div className="text-[8px] font-black text-rose-500 uppercase tracking-widest mb-1 italic">Vulnerabilidad_</div>
                                <div className="text-[10px] text-white font-bold italic">PUERTO_8080 EXPUES_</div>
                            </div>

                            <div className="absolute -bottom-10 -right-20 bg-[#161d2b]/80 backdrop-blur p-3 rounded-2xl border border-emerald-500/30">
                                <div className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-1 italic">Defensa Activa_</div>
                                <div className="text-[10px] text-white font-bold italic">AI_SENTINEL_OK</div>
                            </div>
                        </div>
                    </div>

                    {/* Footer HUD: Métricas */}
                    <div className="h-40 bg-[#161d2b]/80 backdrop-blur-3xl border-t border-white/5 p-8 flex gap-8 z-30">
                        <div className="flex-1 bg-[#101622] rounded-3xl border border-white/5 p-6 relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Latencia del Sistema_</h4>
                                <Activity className="w-4 h-4 text-rose-500" />
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-black text-white italic tracking-tighter">{isSimulating ? '142' : '14'}ms</span>
                                <span className={`text-[9px] font-black italic mb-1 ${isSimulating ? 'text-rose-500' : 'text-emerald-500'}`}>{isSimulating ? '▲ 450%' : 'NORMAL'}</span>
                            </div>
                        </div>

                        <div className="flex-1 bg-[#101622] rounded-3xl border border-white/5 p-6 relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Peticiones Bloqueadas_</h4>
                                <ShieldCheck className="w-4 h-4 text-[#135bec]" />
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-black text-white italic tracking-tighter">{isSimulating ? '942' : '0'}</span>
                                <span className="text-[9px] font-black italic text-slate-500 mb-1 uppercase tracking-widest italic">Req/s</span>
                            </div>
                        </div>

                        <div className="flex-[1.5] flex items-center justify-end px-4">
                            {!isSimulating ? (
                                <button
                                    onClick={startSimulation}
                                    className="flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-rose-500 hover:bg-rose-600 text-white font-black uppercase italic tracking-[0.2em] shadow-2xl shadow-rose-900/50 transition-all group"
                                >
                                    <Play className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
                                    Iniciar Simulación_
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsSimulating(false)}
                                    className="flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-[#1a2233] border border-white/10 text-white font-black uppercase italic tracking-[0.2em] shadow-2xl transition-all group"
                                >
                                    <Pause className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
                                    Abortar Sistema_
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Sidebar Derecha: Log de Respuesta IA */}
                <aside className="w-96 border-l border-white/5 bg-[#0b1219] flex flex-col shrink-0">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#161d2b]/30">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-3 w-3">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimulating ? 'bg-rose-500' : 'bg-[#135bec]'}`}></span>
                                <span className={`relative inline-flex rounded-full h-3 w-3 ${isSimulating ? 'bg-rose-500' : 'bg-[#135bec]'}`}></span>
                            </div>
                            <h2 className="text-[10px] font-black text-white uppercase tracking-widest italic">IA Response Log_</h2>
                        </div>
                        <Terminal className="w-4 h-4 text-slate-700" />
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 font-mono text-[10px] space-y-4">
                        {logs.length === 0 ? (
                            <div className="text-slate-700 italic">Esperando inicialización de sistema...</div>
                        ) : (
                            logs.map((log, i) => (
                                <div key={i} className={`border-l-2 pl-3 py-1 bg-white/[0.02] border-${log.color ? log.color : 'slate'}-500/50`}>
                                    <div className="flex gap-2 text-[8px] text-slate-600 mb-1">
                                        <span>{log.time}</span>
                                        <span className={`font-black text-${log.color ? log.color : 'slate'}-500`}>[{log.type}]</span>
                                    </div>
                                    <p className={`${log.color === 'rose' ? 'text-rose-400' : log.color === 'blue' ? 'text-blue-400' : 'text-slate-400'}`}>
                                        {log.msg}
                                    </p>
                                </div>
                            ))
                        )}
                        {isSimulating && (
                            <div className="flex items-center gap-2 text-rose-500 animate-pulse">
                                <span>&gt;_</span>
                                <span className="bg-rose-500 w-2 h-4 block"></span>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-white/5 bg-[#161d2b]/20 grid grid-cols-2 gap-3">
                        <button className="py-3 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase text-slate-500 hover:text-white transition-all italic tracking-widest">
                            Limpiar Caché_
                        </button>
                        <button className="py-3 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase text-slate-500 hover:text-white transition-all italic tracking-widest">
                            Reset Llaves_
                        </button>
                    </div>
                </aside>
            </main>
        </div>
    );
}
