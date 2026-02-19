'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot,
    Zap,
    Shield,
    Activity,
    RefreshCw,
    Cpu,
    Brain,
    Layers,
    Settings,
    ChevronRight,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

interface Agent {
    id: string;
    name: string;
    role: string;
    status: 'online' | 'processing' | 'idle' | 'warning';
    health: number;
    tasks_completed: number;
    latency: string;
    icon: any;
}

const INITIAL_AGENTS: Agent[] = [
    {
        id: 'tutor-01',
        name: 'Tutor Socrático',
        role: 'Educación & Guía',
        status: 'online',
        health: 98,
        tasks_completed: 1240,
        latency: '12ms',
        icon: Brain
    },
    {
        id: 'news-01',
        name: 'SinapCode News Bot',
        role: 'Síntesis de Contenido',
        status: 'processing',
        health: 100,
        tasks_completed: 856,
        latency: '45ms',
        icon: Zap
    },
    {
        id: 'social-01',
        name: 'Social Integrator',
        role: 'Distribución Omnicanal',
        status: 'idle',
        health: 95,
        tasks_completed: 432,
        latency: '24ms',
        icon: Layers
    },
    {
        id: 'security-01',
        name: 'Shield Alpha',
        role: 'Auditoría & Seguridad',
        status: 'online',
        health: 100,
        tasks_completed: 12405,
        latency: '8ms',
        icon: Shield
    }
];

export default function AgentManager() {
    const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
    const [isSyncing, setIsSyncing] = useState(false);
    const [logs, setLogs] = useState([
        { id: 1, msg: 'Kernel: Conexión establecida con red neuronal principal', time: '17:20:00', type: 'info' },
        { id: 2, msg: 'Shield Alpha detectó 3 intentos de intrusión bloqueados', time: '17:21:05', type: 'success' },
        { id: 3, msg: 'Tutor Socrático actualizando base de conocimiento (Matemáticas)', time: '17:22:15', type: 'info' },
    ]);

    const handleSync = () => {
        setIsSyncing(true);
        const newLog = {
            id: Date.now(),
            msg: 'Iniciando sincronización global de protocolos...',
            time: new Date().toLocaleTimeString(),
            type: 'process'
        };
        setLogs(prev => [newLog, ...prev]);

        setTimeout(() => {
            setIsSyncing(false);
            setLogs(prev => [{
                id: Date.now(),
                msg: 'Protocolos sincronizados exitosamente v2.4.1',
                time: new Date().toLocaleTimeString(),
                type: 'success'
            }, ...prev]);
        }, 2000);
    };

    return (
        <div className="space-y-10">
            {/* Control Panel Header */}
            <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                    <Bot className="w-64 h-64 text-neural-blue" />
                </div>

                <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">SinapCode Command Center</h2>
                        <p className="text-sm text-platinum-dim font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-neural-blue" />
                            Monitoreando {agents.length} Agentes Activos
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={handleSync}
                            disabled={isSyncing}
                            className="px-8 py-4 bg-neural-blue text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:shadow-glow transition-all disabled:opacity-50"
                        >
                            {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                            Sincronizar Protocolos
                        </button>
                        <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-white/10 transition-all">
                            <Settings className="w-4 h-4" />
                            Parámetros Globales
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Agent Grid */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agents.map((agent) => (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-neural-blue opacity-0 group-hover:opacity-10 blur-3xl transition-opacity" />

                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-neural-blue/50 transition-all">
                                    <agent.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 ${agent.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' :
                                    agent.status === 'processing' ? 'bg-neural-blue/10 text-neural-blue' :
                                        'bg-platinum-dim/10 text-platinum-dim'
                                    }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'online' ? 'bg-emerald-400' : 'bg-neural-blue'} animate-pulse`} />
                                    {agent.status}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">{agent.name}</h3>
                                    <p className="text-[10px] text-platinum-dim font-bold uppercase tracking-widest">{agent.role}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[9px] text-white/30 font-black uppercase">Tasks Done</p>
                                        <p className="text-sm font-black text-white">{agent.tasks_completed.toLocaleString()}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] text-white/30 font-black uppercase">Health</p>
                                        <p className="text-sm font-black text-emerald-400">{agent.health}%</p>
                                    </div>
                                </div>

                                <button className="w-full mt-4 py-3 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-platinum-dim hover:text-white group/btn">
                                    Configurar Agente <ChevronRight className="inline-block w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Status & Logs */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-black/40 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/5 h-full flex flex-col min-h-[500px]">
                        <div className="flex items-center gap-3 mb-8 text-neural-blue">
                            <Activity className="w-5 h-5" />
                            <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Bitácora Kernel</h3>
                        </div>

                        <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                            {logs.map((log) => (
                                <div key={log.id} className="flex gap-4 group/log">
                                    <div className={`w-1 h-1 rounded-full mt-2 shrink-0 ${log.type === 'success' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' :
                                        log.type === 'process' ? 'bg-neural-blue animate-pulse' : 'bg-platinum-dim'
                                        }`} />
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[8px] font-black text-platinum-dim uppercase tracking-widest">{log.time}</span>
                                        </div>
                                        <p className="text-xs font-bold text-white group-hover/log:text-neural-blue transition-colors font-mono uppercase leading-relaxed">
                                            {log.msg}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Neural Load</span>
                                <span className="text-[10px] font-black text-neural-blue uppercase">22.4%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '22.4%' }}
                                    className="h-full bg-neural-blue shadow-glow"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
