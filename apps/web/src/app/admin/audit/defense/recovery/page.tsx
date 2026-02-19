'use client';

import { useState, useEffect } from 'react';
import {
    ShieldAlert,
    RefreshCcw,
    Globe,
    Zap,
    Database,
    Cloud,
    AlertCircle,
    CheckCircle2,
    History,
    Settings,
    ArrowRight,
    Lock,
    Cpu,
    Activity,
    Server,
    Clock,
    Flame
} from 'lucide-react';

const REGIONS = [
    { id: 'us-east', name: 'US-East (N. Virginia)', status: 'Active', latency: '42ms', load: '68%', health: 100 },
    { id: 'eu-west', name: 'EU-West (Ireland)', status: 'Standby', latency: '124ms', load: '0%', health: 100 },
    { id: 'eu-central', name: 'EU-Central (Frankfurt)', status: 'Offline', latency: '--', load: '0%', health: 95 }
];

export default function DisasterRecovery() {
    const [mounted, setMounted] = useState(false);
    const [activeRegion, setActiveRegion] = useState('us-east');
    const [isFailingOver, setIsFailingOver] = useState(false);
    const [failoverProgress, setFailoverProgress] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    const startFailover = () => {
        setIsFailingOver(true);
        setFailoverProgress(0);
        const interval = setInterval(() => {
            setFailoverProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsFailingOver(false);
                    setActiveRegion('eu-west');
                    return 100;
                }
                return prev + 2;
            });
        }, 100);
    };

    if (!mounted) return null;

    return (
        <div className="flex h-screen bg-[#0b0f1a] text-slate-300 font-sans overflow-hidden italic-none">
            {/* Header: Hazard / Warning Style */}
            <header className="absolute top-0 left-0 right-0 h-16 border-b border-rose-500/20 bg-rose-500/5 backdrop-blur-xl flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-rose-500">
                        <Flame className="w-8 h-8 animate-pulse" />
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            SinapCODE <span className="text-rose-500/50 font-light text-sm">| RECUPERACIÓN_DESASTRES_</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="bg-rose-500/20 border border-rose-500/40 px-4 py-1 rounded-full flex items-center gap-3">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </div>
                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] italic">PROTOCOLO DE EMERGENCIA ACTIVO_</span>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase text-white hover:bg-white/10 transition-all italic tracking-widest">
                        <Clock className="w-4 h-4" />
                        Cronograma_
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex pt-16 overflow-hidden">
                {/* Panel Izquierdo: Monitor de Salud Regional */}
                <aside className="w-[480px] border-r border-white/5 bg-[#101622]/50 backdrop-blur-sm flex flex-col p-8 overflow-y-auto shrink-0">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 italic">INFRAESTRUCTURA GLOBAL_</h3>

                    <div className="space-y-6">
                        {REGIONS.map(r => (
                            <div
                                key={r.id}
                                className={`group p-6 rounded-3xl border transition-all relative overflow-hidden ${activeRegion === r.id ? 'bg-[#1a2233] border-emerald-500/30 shadow-[0_40px_80px_-20px_rgba(16,185,129,0.1)]' : 'bg-[#0d121f] border-white/5 opacity-60'}`}
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-20"></div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-2xl bg-[#0b0f1a] border border-white/5 ${activeRegion === r.id ? 'text-emerald-500' : 'text-slate-600'}`}>
                                            <Globe className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-white italic tracking-tighter uppercase">{r.name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className={`w-1.5 h-1.5 rounded-full ${r.status === 'Active' ? 'bg-emerald-500' : r.status === 'Standby' ? 'bg-amber-500' : 'bg-slate-700'}`}></div>
                                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">{r.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">SALUD_</div>
                                        <div className={`text-sm font-black italic tracking-tighter ${r.health === 100 ? 'text-emerald-500' : 'text-rose-500'}`}>{r.health}%</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-2xl bg-[#0b0f1a]/50 border border-white/5">
                                        <div className="text-[8px] text-slate-600 font-bold uppercase mb-1 italic">Latencia_</div>
                                        <div className="text-xs font-black text-slate-400 italic italic-none">{r.latency}</div>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-[#0b0f1a]/50 border border-white/5">
                                        <div className="text-[8px] text-slate-600 font-bold uppercase mb-1 italic">Carga de Red_</div>
                                        <div className="text-xs font-black text-slate-400 italic italic-none">{r.load}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botón de Failover Global */}
                    <div className="mt-12">
                        <div className="bg-rose-500/5 border border-rose-500/20 rounded-3xl p-6 relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col items-center">
                                <AlertCircle className="w-12 h-12 text-rose-500 mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2 italic-none text-center">Iniciativa de Failover Global_</h4>
                                <p className="text-[10px] text-slate-500 text-center italic mb-6 leading-relaxed">
                                    Desvía el 100% del tráfico al Nodo de Respaldo <br /><span className="text-amber-500 font-bold italic-none">EU-WEST (Ireland)</span> de forma inmediata.
                                </p>

                                <button
                                    onClick={startFailover}
                                    disabled={isFailingOver}
                                    className={`relative w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase italic tracking-widest text-xs transition-all overflow-hidden ${isFailingOver ? 'bg-slate-800 text-slate-600' : 'bg-rose-500 text-white shadow-lg shadow-rose-900/40 hover:bg-rose-600 scale-100 hover:scale-[1.02]'}`}
                                >
                                    {isFailingOver ? (
                                        <>
                                            <RefreshCcw className="w-4 h-4 animate-spin" />
                                            PROCESANDO_ {failoverProgress}%
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCcw className="w-4 h-4" />
                                            ORDENAR FAILOVER_
                                        </>
                                    )}
                                    {/* Hazard striping code for effect */}
                                    {!isFailingOver && <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.1)_5px,rgba(0,0,0,0.1)_10px)] opacity-30"></div>}
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Panel Central: Métricas RTO/RPO y Backups */}
                <section className="flex-1 bg-[#101622] p-10 flex flex-col gap-8 overflow-y-auto">
                    {/* Visualización RTO/RPO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* RTO (Time Objective) */}
                        <div className="bg-[#1a2233]/40 border border-white/5 rounded-[3rem] p-8 relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Clock className="w-32 h-32 text-rose-500" /></div>
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10 italic flex items-center gap-2">
                                <ShieldAlert className="w-3 h-3 text-rose-500" />
                                OBJETIVO DE TIEMPO (RTO)_
                            </h3>
                            <div className="flex flex-col items-center">
                                <div className="text-6xl font-black text-white italic tracking-tighter mb-2">04:12</div>
                                <div className="text-[10px] text-rose-500 font-black uppercase tracking-[0.3em] italic mb-8 italic-none">MINUTOS PARA RESTAURACIÓN</div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-500 w-[65%]" style={{ filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.5))' }}></div>
                                </div>
                                <div className="flex justify-between w-full mt-2 text-[8px] font-black text-slate-500 uppercase tracking-widest italic">
                                    <span>LIMITE_ 06:00</span>
                                    <span className="text-rose-500">ESTADO: CRÍTICO_</span>
                                </div>
                            </div>
                        </div>

                        {/* RPO (Recovery Point) */}
                        <div className="bg-[#1a2233]/40 border border-white/5 rounded-[3rem] p-8 relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Database className="w-32 h-32 text-emerald-500" /></div>
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10 italic flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                PUNTO DE RECUPERACIÓN (RPO)_
                            </h3>
                            <div className="flex flex-col items-center">
                                <div className="text-6xl font-black text-white italic tracking-tighter mb-2">00:15</div>
                                <div className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em] italic mb-8 italic-none">SEG. DE PÉRDIDA MÁXIMA</div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[92%]" style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.5))' }}></div>
                                </div>
                                <div className="flex justify-between w-full mt-2 text-[8px] font-black text-slate-500 uppercase tracking-widest italic">
                                    <span>LIMITE_ 01:00</span>
                                    <span className="text-emerald-500">ESTADO: ÓPTIMO_</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de Backups e Integridad */}
                    <div className="flex-1 bg-[#161d2b] border border-white/5 rounded-[3rem] p-10 shadow-2xl overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter italic-none">Historial de Resguardo (Snapshots)_</h3>
                                <p className="text-xs text-slate-500 italic mt-1">Verificación automática de integridad SHA-256 cada 15 min.</p>
                            </div>
                            <button className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all">
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-4 custom-scrollbar">
                            {[
                                { id: 'SNP-9942', time: '10:45 AM', size: '14.2 GB', region: 'EU-WEST (Standby)', status: 'Verified' },
                                { id: 'SNP-9941', time: '10:30 AM', size: '14.1 GB', region: 'Global-Sync', status: 'Verified' },
                                { id: 'SNP-9940', time: '10:15 AM', size: '13.9 GB', region: 'Global-Sync', status: 'Verified' },
                                { id: 'SNP-9939', time: '10:00 AM', size: '13.8 GB', region: 'Global-Sync', status: 'Warning' }
                            ].map((s, i) => (
                                <div key={i} className="group p-5 rounded-2xl bg-[#0d121f] border border-white/5 hover:border-white/10 transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-10 h-10 rounded-xl bg-[#0b0f1a] border border-white/5 flex items-center justify-center ${s.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic mb-0.5">ID_RECU_</div>
                                            <div className="text-sm font-black text-white italic italic-none">{s.id}</div>
                                        </div>
                                        <div className="w-px h-8 bg-white/5"></div>
                                        <div>
                                            <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-0.5 italic">MARCA_TIEMPO_</div>
                                            <div className="text-[11px] text-slate-400 font-mono italic-none">{s.time}</div>
                                        </div>
                                        <div className="w-px h-8 bg-white/5"></div>
                                        <div>
                                            <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-0.5 italic">REGION_</div>
                                            <div className="text-[11px] text-slate-400 italic italic-none">{s.region}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-0.5 italic">INTEGRIDAD_</div>
                                            <div className={`text-[10px] font-black uppercase italic italic-none ${s.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                {s.status === 'Verified' ? 'CERTIFICADO_OK' : 'VERIFICANDO...'}
                                            </div>
                                        </div>
                                        <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-slate-500 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all">
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
