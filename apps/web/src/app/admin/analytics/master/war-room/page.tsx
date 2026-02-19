'use client';

import { motion } from 'framer-motion';
import {
    Activity,
    Globe,
    Cpu,
    Server,
    Zap,
    ShieldCheck,
    MemoryStick,
    TrendingUp
} from 'lucide-react';
import { WarRoomSurgeVisualizer } from '@/components/admin/analytics/master-hub/war-room/surge-visualizer';
import { WarRoomAILogs } from '@/components/admin/analytics/master-hub/war-room/ai-logs';
import { Breadcrumbs } from '@/components/admin/breadcrumbs';

export default function PostLaunchWarRoomPage() {
    return (
        <main className="min-h-screen bg-[#0a1212] text-slate-100 p-6 lg:p-10 space-y-8 pb-32">
            <Breadcrumbs />

            {/* Top Bar Navigation */}
            <header className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-primary/20 pb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/10"></div>

                <div className="flex items-center gap-5">
                    <div className="size-10 text-primary">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="size-full">
                            <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                            SinapCODE <span className="text-primary italic">War Room</span>
                        </h1>
                        <p className="text-[10px] text-primary/60 font-black tracking-[0.3em] uppercase mt-1">
                            Post-Launch Live Monitor v2.4 • Telemetría Activa
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/30">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-primary text-[10px] font-black uppercase tracking-widest italic">System: STABLE (AI Managed)</span>
                    </div>
                    <div className="size-11 rounded-full border border-primary/20 bg-[#162a2a] flex items-center justify-center text-primary shadow-lg shadow-primary/10 cursor-pointer hover:bg-primary/20 transition-colors">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                </div>
            </header>

            {/* Global Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Usuarios Concurrentes', value: '542,810', sub: '+142% picos detectados', icon: Activity, color: 'primary' },
                    { label: 'Throughput Real', value: '1.24M req/s', sub: 'Latencia Normal (42ms)', icon: Activity, color: 'primary' },
                    { label: 'Carga CPU (Promedio)', value: '88.4%', sub: 'Niveles Críticos Controlados', icon: Cpu, color: 'red' },
                    { label: 'Nodos CDN Activos', value: '1,402', sub: '+24 Auto-Provisionados', icon: Server, color: 'primary' },
                ].map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-[#162a2a] border ${kpi.color === 'red' ? 'border-red-500/20' : 'border-primary/20'} p-6 rounded-2xl shadow-2xl transition-all hover:scale-[1.02] cursor-default`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{kpi.label}</span>
                            <kpi.icon className={`w-4 h-4 ${kpi.color === 'red' ? 'text-red-500' : 'text-primary'}`} />
                        </div>
                        <h3 className="text-3xl font-black text-white tracking-tighter italic">{kpi.value}</h3>
                        <div className="flex items-center gap-2 mt-3 text-[10px] font-black uppercase tracking-tighter">
                            {kpi.color === 'red' ? (
                                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-full w-[88%]"></div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 text-primary">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>{kpi.sub}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Simulation Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Visualizer and Scaling */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <div className="h-[450px]">
                        <WarRoomSurgeVisualizer />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#162a2a] border border-primary/20 rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
                            <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Estado de Auto-Scaling</h4>
                            <div className="flex items-end justify-between mb-4">
                                <span className="text-3xl font-black text-white italic tracking-tighter">142 <span className="text-sm font-normal text-slate-500 italic uppercase">/ 200 Instancias</span></span>
                                <span className="text-primary text-[9px] font-black animate-pulse uppercase tracking-widest">Provisionando...</span>
                            </div>
                            <div className="space-y-4">
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '71%' }}
                                        transition={{ duration: 1.5 }}
                                        className="h-full bg-primary relative"
                                    >
                                        <div className="absolute top-0 right-0 h-full w-8 bg-white/30 animate-pulse"></div>
                                    </motion.div>
                                </div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter italic leading-relaxed">
                                    Escalado activado por umbral de 500k concurrentes. Velocidad de despliegue: 1.2 inst/seg.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#162a2a] border border-primary/20 rounded-2xl p-6 grid grid-cols-2 gap-6 shadow-2xl">
                            <div className="flex flex-col items-center justify-center border-r border-primary/10">
                                <div className="relative size-24 mb-3">
                                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                        <circle className="text-slate-800" cx="18" cy="18" fill="none" r="16" stroke="currentColor" strokeWidth="2"></circle>
                                        <motion.circle
                                            initial={{ strokeDashoffset: 100 }}
                                            animate={{ strokeDashoffset: 12 }}
                                            transition={{ duration: 1 }}
                                            className="text-red-500" cx="18" cy="18" fill="none" r="16" stroke="currentColor" strokeDasharray="100" strokeLinecap="round" strokeWidth="3"
                                        ></motion.circle>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-black text-white italic">88%</span>
                                    </div>
                                </div>
                                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">CPU Util</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="relative size-24 mb-3">
                                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                        <circle className="text-slate-800" cx="18" cy="18" fill="none" r="16" stroke="currentColor" strokeWidth="2"></circle>
                                        <motion.circle
                                            initial={{ strokeDashoffset: 100 }}
                                            animate={{ strokeDashoffset: 25 }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="text-primary" cx="18" cy="18" fill="none" r="16" stroke="currentColor" strokeDasharray="100" strokeLinecap="round" strokeWidth="3"
                                        ></motion.circle>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-black text-white italic">75%</span>
                                    </div>
                                </div>
                                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Mem Load</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map and Logs */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <div className="bg-[#162a2a] border border-primary/20 rounded-2xl p-6 h-[320px] relative overflow-hidden flex flex-col shadow-2xl">
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6 flex items-center gap-3">
                            <Globe className="w-4 h-4 text-primary" />
                            Global Traffic Map
                        </h4>
                        <div className="flex-1 relative opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center rounded-xl border border-white/5">
                            {/* Pulse Nodes */}
                            <div className="absolute top-1/4 left-1/4 size-4 bg-red-500 rounded-full animate-ping opacity-50"></div>
                            <div className="absolute top-1/4 left-1/4 size-2 bg-red-500 rounded-full"></div>
                            <div className="absolute top-1/2 right-1/3 size-4 bg-primary rounded-full animate-ping opacity-50"></div>
                            <div className="absolute top-1/2 right-1/3 size-2 bg-primary rounded-full"></div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest">
                                <span className="size-2 rounded-full bg-red-500"></span>
                                <span className="text-slate-500">Critical (NA-East)</span>
                            </div>
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest">
                                <span className="size-2 rounded-full bg-primary"></span>
                                <span className="text-slate-500">Steady (EU-Central)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <WarRoomAILogs />
                    </div>
                </div>
            </div>

            {/* Global Status Bar Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-[#0a1212]/95 backdrop-blur-xl border-t border-primary/20 px-10 py-3 flex items-center justify-between z-[60] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-10 text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-3">
                        <span className="text-primary italic">Latency:</span>
                        <span className="text-slate-200">42ms</span>
                    </span>
                    <span className="flex items-center gap-3">
                        <span className="text-primary italic">Errors:</span>
                        <span className="text-slate-200">0.02%</span>
                    </span>
                    <span className="flex items-center gap-3">
                        <span className="text-primary italic">IA Status:</span>
                        <span className="text-green-500 italic">Core Optimizing</span>
                    </span>
                </div>
                <div className="flex items-center gap-6 text-[10px] font-black font-mono tracking-[0.2em] uppercase italic">
                    <span className="text-slate-600">Protocol v1.992 Alpha</span>
                    <div className="flex items-center gap-2 text-primary">
                        <Activity className="w-3 h-3 animate-pulse" />
                        LIVE TELEMETRY
                    </div>
                </div>
            </footer>
        </main>
    );
}
