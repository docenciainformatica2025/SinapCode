'use client';

import { useState, useEffect } from 'react';
import {
    History,
    AlertTriangle,
    CheckCircle2,
    Globe,
    Database,
    RefreshCcw,
    Activity,
    Terminal,
    Settings,
    ArrowRight,
    Clock,
    Zap,
    Scale,
    ShieldAlert,
    Cpu,
    Lock
} from 'lucide-react';

export default function InstantRollback() {
    const [mounted, setMounted] = useState(false);
    const [selectedSnapshot, setSelectedSnapshot] = useState(75); // Slider percentage
    const [isRollingBack, setIsRollingBack] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    const startRollback = () => {
        setIsRollingBack(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsRollingBack(false);
                    return 100;
                }
                return prev + 1;
            });
        }, 150);
    };

    if (!mounted) return null;

    return (
        <div className="flex h-screen bg-[#1a120c] text-slate-300 font-sans overflow-hidden italic-none">
            {/* Header: Estado Crítico */}
            <header className="absolute top-0 left-0 right-0 h-16 border-b border-[#f27f0d]/30 bg-[#0b1219]/90 backdrop-blur-xl flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#f27f0d]">
                        <div className="w-8 h-8 rounded bg-[#f27f0d]/20 flex items-center justify-center animate-pulse">
                            <AlertTriangle className="w-5 h-5 text-[#f27f0d]" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic italic-none">
                            SinapCODE <span className="text-[#f27f0d] font-light">ROLLBACK_</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="text-right hidden md:block">
                        <p className="text-[9px] text-[#f27f0d]/50 font-black uppercase tracking-widest italic italic-none">TIEMPO DESDE FALLO_</p>
                        <p className="text-xl font-mono text-white italic-none">00:04:32</p>
                    </div>
                    <div className="h-8 w-px bg-white/5 mx-2"></div>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                        </span>
                        <span className="text-xs font-black text-rose-500 uppercase tracking-widest italic italic-none">SISTEMA INESTABLE_</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex pt-16 overflow-hidden relative">
                {/* Fondo Decorativo */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(242,127,13,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40"></div>

                {/* Columna Izquierda: Diagnóstico y Timeline */}
                <section className="flex-1 p-10 overflow-y-auto space-y-12 z-10 custom-scrollbar">

                    {/* Paso 1: Diagnóstico de Falla */}
                    <div className="animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-6 w-6 rounded-full bg-[#f27f0d]/20 flex items-center justify-center border border-[#f27f0d]/40 text-[#f27f0d] text-[10px] font-black italic italic-none">1</div>
                            <h2 className="text-lg font-black text-white uppercase tracking-widest italic italic-none">DIAGNÓSTICO DE FALLA_</h2>
                            <span className="px-2 py-0.5 rounded text-[8px] bg-white/5 border border-white/10 text-slate-500 font-bold uppercase italic italic-none">ANALISIS IA COMPLETO</span>
                        </div>

                        <div className="bg-[#2d241b] border-l-4 border-[#f27f0d] rounded-r-3xl p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Cpu className="w-24 h-24 text-[#f27f0d]" /></div>
                            <div className="grid md:grid-cols-2 gap-10 relative z-10">
                                <div>
                                    <h3 className="text-[9px] text-[#f27f0d]/60 font-black uppercase mb-2 tracking-[0.2em] italic italic-none">CAUSA RAÍZ_</h3>
                                    <p className="text-2xl text-white font-black italic tracking-tighter mb-6 italic-none">Leak de Memoria en Auth Service <span className="text-[#f27f0d]">v4.2.1</span></p>
                                    <h3 className="text-[9px] text-[#f27f0d]/60 font-black uppercase mb-2 tracking-[0.2em] italic italic-none">EVENTO DISPARADOR_</h3>
                                    <div className="flex items-center gap-3 font-mono text-[11px] text-rose-500 bg-rose-500/5 px-4 py-3 rounded-xl border border-rose-500/20 w-fit italic-none">
                                        <Zap className="w-4 h-4" />
                                        <span>commit_hash: 8f32a7b</span>
                                    </div>
                                </div>
                                <div className="bg-[#1a120c] rounded-2xl p-6 font-mono text-[10px] text-slate-500 border border-white/5 italic-none">
                                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                                        <span className="font-black text-slate-600">LOG_TAIL_ERROR</span>
                                        <span className="text-[#f27f0d] font-bold">VIVO</span>
                                    </div>
                                    <p className="mb-1"><span className="text-slate-800">10:42:01</span> [FATAL] Heap out of memory</p>
                                    <p className="mb-1"><span className="text-slate-800">10:42:02</span> [ERROR] Connection reset by peer</p>
                                    <p className="text-rose-500 font-bold"><span className="text-slate-800">10:42:05</span> [CRITICAL] Health Check Failed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Paso 2: Línea de Tiempo de Snapshots */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center border border-white/5 text-slate-400 text-[10px] font-black italic italic-none">2</div>
                            <h2 className="text-lg font-black text-white uppercase tracking-widest italic italic-none">SELECCIONAR INSTANTÁNEA ESTABLE_</h2>
                        </div>

                        <div className="bg-[#2d241b] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
                            {/* Visualización del Timeline */}
                            <div className="relative w-full h-32 flex items-end mb-10 select-none">
                                {/* Línea Base */}
                                <div className="absolute bottom-4 left-0 right-0 h-1 bg-white/5 rounded-full"></div>

                                {/* Marcadores */}
                                {[
                                    { pos: 10, version: 'v4.1.9', label: 'Estable', time: '09:00 AM' },
                                    { pos: 40, version: 'v4.2.0', label: 'Estable', time: '10:00 AM' },
                                    { pos: 75, version: 'v4.2.1-fix', label: 'Target', time: '10:30 AM', active: true },
                                    { pos: 95, version: 'v4.2.1', label: 'Fallo', time: '10:42 AM', fail: true }
                                ].map((m, i) => (
                                    <div
                                        key={i}
                                        className={`absolute bottom-4 w-4 h-4 rounded-full border-2 transform translate-y-1/2 cursor-pointer transition-all hover:scale-150 z-10 ${m.active ? 'bg-[#f27f0d] border-[#1a120c] shadow-[0_0_15px_rgba(242,127,13,0.8)]' : m.fail ? 'bg-rose-500 border-[#1a120c] cursor-not-allowed' : 'bg-emerald-500 border-[#1a120c] opacity-40'}`}
                                        style={{ left: `${m.pos}%` }}
                                    >
                                        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#1a120c]/90 border p-3 rounded-2xl w-40 text-center transition-opacity ${m.active ? 'opacity-100 border-[#f27f0d]' : 'opacity-0 group-hover:opacity-100 border-white/10'}`}>
                                            <p className={`text-[10px] font-black uppercase italic italic-none mb-1 ${m.active ? 'text-[#f27f0d]' : 'text-slate-500'}`}>{m.label}_</p>
                                            <p className="text-sm font-black text-white italic italic-none">{m.version}</p>
                                            <p className="text-[8px] text-slate-600 font-mono italic-none mt-1">{m.time} • Integ: 100%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Slider Control */}
                            <div className="relative pt-6">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={selectedSnapshot}
                                    onChange={(e) => !isRollingBack && setSelectedSnapshot(parseInt(e.target.value))}
                                    className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#f27f0d]"
                                />
                                <div className="flex justify-between text-[8px] font-black text-slate-600 uppercase tracking-widest italic italic-none mt-4">
                                    <span>09:00 AM (ARRANQUE)</span>
                                    <span>{new Date().toLocaleTimeString()} (AHORA)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Paso 3: Ejecución */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center border border-white/5 text-slate-400 text-[10px] font-black italic italic-none">3</div>
                            <h2 className="text-lg font-black text-white uppercase tracking-widest italic italic-none">EJECUTAR RESTAURACIÓN_</h2>
                        </div>

                        <div className="bg-[#2d241b] border border-white/5 p-10 rounded-[3rem] flex items-center justify-between gap-10 shadow-3xl">
                            <div className="flex-1">
                                <h4 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2 italic-none">Listo para Restaurar_</h4>
                                <p className="text-[11px] text-slate-500 italic leading-relaxed">
                                    Apuntando a <span className="text-[#f27f0d] font-bold italic-none">Instantánea #2291</span>. Esta acción revertirá la Base de Datos, Blog y Academia al estado funcional detectado a las 10:30 AM.
                                </p>
                                <div className="mt-6 flex gap-3">
                                    <span className="text-[9px] bg-white/5 text-slate-500 px-3 py-1.5 rounded-xl border border-white/5 font-black uppercase italic italic-none">DB: SEGURO</span>
                                    <span className="text-[9px] bg-white/5 text-slate-500 px-3 py-1.5 rounded-xl border border-white/5 font-black uppercase italic italic-none">CACHE: PURGAR_</span>
                                </div>
                            </div>

                            <button
                                onClick={startRollback}
                                disabled={isRollingBack}
                                className={`group relative h-24 px-12 rounded-[2rem] font-black uppercase italic tracking-[0.3em] text-sm overflow-hidden transition-all active:scale-95 ${isRollingBack ? 'bg-slate-800 text-slate-600' : 'bg-[#f27f0d] text-white shadow-[0_0_40px_rgba(242,127,13,0.35)] hover:shadow-[0_0_60px_rgba(242,127,13,0.5)]'}`}
                            >
                                <div className="relative z-10 flex items-center gap-4">
                                    <History className={`w-6 h-6 ${isRollingBack ? 'animate-spin' : 'animate-pulse'}`} />
                                    <span>{isRollingBack ? 'RESTAURANDO...' : 'INICIAR ROLLBACK_'}</span>
                                </div>
                                {!isRollingBack && <div className="absolute inset-x-0 bottom-0 h-2 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#1a120c_8px,#1a120c_16px)] opacity-30"></div>}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Columna Derecha: Impacto Global y Restauración */}
                <aside className="w-[450px] bg-[#2d241b]/50 border-l border-white/5 backdrop-blur-xl flex flex-col z-20">
                    <div className="p-8 border-b border-white/5">
                        <h3 className="text-[10px] uppercase text-[#f27f0d] font-black mb-10 tracking-widest italic flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            IMPACTO GLOBAL DE SERVICIOS_
                        </h3>

                        {/* Visualización de Globo/Radar */}
                        <div className="relative w-full aspect-square bg-[#1a120c] rounded-[3rem] border border-white/5 overflow-hidden mb-10 flex items-center justify-center group">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f27f0d_2px,transparent_2px)] bg-[size:30px_30px]"></div>

                            {/* Radar Sweep */}
                            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(242,127,13,0.1)_360deg)] animate-[spin_4s_linear_infinite] rounded-full scale-150"></div>

                            {/* Círculo Central de Progreso */}
                            <div className="relative z-10 w-56 h-56 rounded-full border-4 border-white/5 flex flex-col items-center justify-center bg-[#2d241b]/90 backdrop-blur-xl shadow-3xl">
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="6" />
                                    <circle
                                        cx="50" cy="50" r="46" fill="none"
                                        stroke="#f27f0d"
                                        strokeWidth="6"
                                        strokeDasharray="290"
                                        strokeDashoffset={290 - (progress * 2.9)}
                                        strokeLinecap="round"
                                        className="transition-all duration-300 ease-out"
                                    />
                                </svg>
                                <div className="text-center z-10">
                                    <p className="text-5xl font-black text-white italic tracking-tighter italic-none">{progress}%</p>
                                    <p className="text-[10px] uppercase text-[#f27f0d] font-black tracking-[0.3em] mt-2 italic animate-pulse group-hover:block hidden">RESTAURANDO_</p>
                                    <p className="text-[10px] uppercase text-slate-600 font-black tracking-[0.3em] mt-2 italic group-hover:hidden">PROGRESO_</p>
                                </div>
                            </div>
                        </div>

                        {/* Lista de Regiones */}
                        <div className="space-y-4">
                            {[
                                { name: 'US-East (N. Virginia)', status: 'Online', progress: 100, color: 'emerald' },
                                { name: 'EU-West (Ireland)', status: 'Rolling back...', progress: progress > 45 ? progress : 45, color: 'orange' },
                                { name: 'AP-Southeast (Sydney)', status: 'Waiting...', progress: progress > 0 ? progress : 0, color: 'slate' }
                            ].map((r, i) => (
                                <div key={i} className={`relative p-5 rounded-2xl bg-[#1a120c] border border-white/5 overflow-hidden transition-all ${r.progress === 100 ? 'border-emerald-500/20' : ''}`}>
                                    <div className={`absolute left-0 top-0 bottom-0 bg-${r.color === 'emerald' ? 'emerald' : r.color === 'orange' ? '[#f27f0d]' : 'slate'}-500/10 transition-all duration-500`} style={{ width: `${r.progress}%` }}></div>
                                    <div className="relative z-10 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            {r.progress === 100 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <RefreshCcw className="w-4 h-4 text-[#f27f0d] animate-spin" />}
                                            <div>
                                                <p className="text-xs font-black text-white italic italic-none">{r.name}</p>
                                                <p className="text-[9px] text-slate-600 font-bold italic italic-none">{r.status}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[11px] font-mono font-bold ${r.progress === 100 ? 'text-emerald-500' : 'text-[#f27f0d]'}`}>{r.progress}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Terminal de Sistema (Rollback Logs) */}
                    <div className="flex-1 bg-[#101922] p-6 font-mono text-[10px] italic-none overflow-y-auto custom-scrollbar italic-none">
                        <div className="flex items-center justify-between mb-4 text-slate-700 border-b border-white/5 pb-2">
                            <span className="font-black italic tracking-widest">SYSTEM_RECOVERY_LOG</span>
                            <span className="text-[8px] border border-white/5 px-1.5 py-0.5 rounded-lg">TAIL -F</span>
                        </div>
                        <div className="space-y-1 text-slate-500 italic-none">
                            <p><span className="text-slate-800">10:45:01</span> Iniciando procedimiento de rollback ID #9921</p>
                            <p><span className="text-slate-800">10:45:02</span> &gt; Bloqueando acceso de escritura a DB_MAIN...</p>
                            <p className="text-emerald-500/80"><span className="text-slate-800">10:45:03</span> &gt; Bloqueo de escritura adquirido con éxito.</p>
                            <p><span className="text-slate-800">10:45:03</span> Cargando instantánea v4.2.0-hotfix...</p>
                            <p><span className="text-slate-800">10:45:05</span> Verificando sumas de verificación de integridad...</p>
                            <p className="text-[rgb(242,127,13)]"><span className="text-slate-800">10:45:08</span> ! Advertencia: Log de transacciones pesado detectado</p>
                            <p><span className="text-slate-800">10:45:09</span> Reproduciendo transacciones desde WAL...</p>
                            <p><span className="text-slate-800">10:45:12</span> [EU-WEST] Reiniciando pods de autenticación...</p>
                            <p className="animate-pulse text-white mt-4 italic-none italic-none">_</p>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Footer de Versión */}
            <footer className="absolute bottom-0 left-0 right-0 h-10 border-t border-white/5 bg-[#0b1219] flex items-center justify-between px-6 z-50 text-[9px] font-black text-slate-700 uppercase italic italic-none tracking-[0.2em]">
                <div className="flex items-center gap-6">
                    <span>SinapCODE v2.4.1</span>
                    <span className="h-3 w-px bg-white/5"></span>
                    <span>Conexión Segura: TLS 1.3</span>
                </div>
                <div>AUTORIZADO: ADM_01</div>
            </footer>
        </div>
    );
}
