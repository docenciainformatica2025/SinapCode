'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    Bot,
    ShieldCheck,
    Activity,
    Cpu,
    Code,
    Terminal,
    Plus,
    Play,
    Pause,
    History,
    Network,
    Sparkles,
    AlertCircle,
    CheckCircle2,
    RefreshCw,
    TrendingUp
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/admin/breadcrumbs';

export default function AIAutomationPage() {
    const [isAutoActive, setIsAutoActive] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const logs = [
        { time: '14:20:05', level: 'INFO', agent: 'UX_Optimizer_v2', msg: 'Detectada alta tasa de rebote en /pricing para usuarios móviles (LATAM).' },
        { time: '14:20:08', level: 'ACTION', agent: 'UX_Optimizer_v2', msg: 'Generando variante de copy B con énfasis en prueba gratuita local.' },
        { time: '14:20:12', level: 'SYSTEM', agent: 'A/B_Deployer', msg: 'Desplegando experimento ID: EXP-302 en clúster edge 4.' },
        { time: '14:21:40', level: 'SUCCESS', agent: 'Sales_Bot_Alpha', msg: 'Cierre de lead ID: 4920 detectado. Atribución: Campaña Email #2.' },
        { time: '14:22:15', level: 'CRITICAL', agent: 'Resource_Monitor', msg: 'Aumento de latencia en API de Geocalización. Escalando recursos en AWS-East.' },
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Control Room Header */}
            <div className="bg-deep-space/60 p-10 rounded-[3rem] border border-white/5 backdrop-blur-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neural-blue/5 rounded-full blur-[150px] -z-10 animate-pulse" />

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-white/5 pb-10 mb-10">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-4 h-4 rounded-full ${isAutoActive ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]' : 'bg-red-500'} animate-pulse`} />
                            <h1 className="text-4xl font-black text-white tracking-tighter">Protocolo Autónomo Sinap_IA</h1>
                        </div>
                        <p className="text-platinum-dim font-bold opacity-70 max-w-2xl">
                            Consola central de optimización heurística. Los agentes IA monitorean, prueban y despliegan mejoras de conversión sin intervención humana directa.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">Estado del Protocolo_</div>
                        <div className="flex bg-white/5 p-2 rounded-[2rem] border border-white/10 backdrop-blur-xl">
                            <button
                                onClick={() => setIsAutoActive(true)}
                                className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isAutoActive ? 'bg-neural-blue text-white shadow-glow' : 'text-platinum-dim hover:text-white'}`}
                            >
                                <Play className="w-3 h-3" />
                                Activo
                            </button>
                            <button
                                onClick={() => setIsAutoActive(false)}
                                className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${!isAutoActive ? 'bg-red-500 text-white shadow-glow' : 'text-platinum-dim hover:text-white'}`}
                            >
                                <Pause className="w-3 h-3" />
                                Suspendido
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Agentes Activos', value: '42', icon: Bot, color: 'text-neural-blue' },
                        { label: 'Tareas Completadas', value: '1.2k', icon: ShieldCheck, color: 'text-emerald-400' },
                        { label: 'Ratio Éxito IA', value: '94.2%', icon: Activity, color: 'text-purple-400' },
                        { label: 'Tiempo de Actividad', value: '342h', icon: Cpu, color: 'text-amber-400' },
                    ].map((m, i) => (
                        <div key={i} className="flex items-center gap-5 group/stat cursor-pointer">
                            <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${m.color} group-hover/stat:bg-white/10 transition-all`}>
                                <m.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-platinum-dim uppercase tracking-[0.1em] opacity-60 mb-1">{m.label}</p>
                                <h4 className="text-2xl font-black text-white tracking-tighter">{m.value}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* 1. Live Logic Terminal */}
                <div className="col-span-12 xl:col-span-8 glass-panel-nexus rounded-[2.5rem] p-1 border border-white/5 bg-deep-space/40 overflow-hidden shadow-2xl flex flex-col h-[600px]">
                    <div className="h-14 bg-white/5 border-b border-white/10 flex items-center justify-between px-8 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <Terminal className="text-neural-blue w-4 h-4" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Consola de Procesamiento Heurístico_</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Streaming_Data
                            </span>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-8 font-mono text-xs overflow-y-auto space-y-4 scrollbar-hide">
                        {logs.map((log, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className="flex gap-4 group/log"
                            >
                                <span className="text-platinum-dim opacity-30 whitespace-nowrap">{log.time}</span>
                                <span className={`font-black tracking-tighter w-16 whitespace-nowrap 
                                    ${log.level === 'CRITICAL' ? 'text-red-500' :
                                        log.level === 'ACTION' ? 'text-neural-blue' :
                                            log.level === 'SUCCESS' ? 'text-emerald-500' : 'text-purple-400'}`}
                                >
                                    [{log.level}]
                                </span>
                                <span className="text-emerald-400 opacity-60 w-32 truncate">{log.agent}</span>
                                <span className="text-white opacity-80 group-hover/log:opacity-100 transition-opacity">
                                    {log.msg}
                                    {i === logs.length - 1 && <span className="inline-block w-2 h-4 bg-neural-blue ml-2 animate-pulse" />}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.15em] text-platinum-dim italic">
                        <span>Cluster: SINAP-EDGE-CORE-82</span>
                        <span>LATENCY: 12ms</span>
                    </div>
                </div>

                {/* 2. Active Agents Sidebar */}
                <div className="col-span-12 xl:col-span-4 flex flex-col gap-8">
                    <div className="glass-panel-nexus rounded-[2.5rem] p-8 border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl flex-1">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-white tracking-tighter">Agentes en Desfase_</h3>
                            <button className="p-2 bg-white/5 rounded-xl border border-white/10 text-platinum-dim hover:text-white transition-all">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {[
                                { name: 'GrowthHacker_AI', status: 'Optimizando Copy', power: 85, color: 'bg-neural-blue' },
                                { name: 'UX_Vision_v4', status: 'Escaneando Heatmaps', power: 42, color: 'bg-purple-500' },
                                { name: 'Campaign_Oracle', status: 'Bid Management', power: 98, color: 'bg-emerald-500' },
                                { name: 'Compliance_Guard', status: 'Verificando GDPR', power: 12, color: 'bg-amber-400' },
                            ].map((agent, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="flex justify-between items-end mb-3">
                                        <div>
                                            <p className="text-sm font-black text-white group-hover:text-neural-blue transition-colors">{agent.name}</p>
                                            <p className="text-[10px] font-bold text-platinum-dim opacity-60">{agent.status}</p>
                                        </div>
                                        <div className="text-[9px] font-black text-white/50">{agent.power}% LOAD</div>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${agent.power}%` }}
                                            className={`h-full ${agent.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-platinum-dim hover:text-white transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                            <RefreshCw className="w-3 h-3" />
                            Reiniciar Swarm
                        </button>
                    </div>

                    {/* Task Queue Card */}
                    <div className="glass-panel-nexus rounded-[2.5rem] p-8 border border-white/5 bg-gradient-to-br from-purple-600/10 to-neural-blue/10 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                                <Network className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-black text-white tracking-tighter">Cola de Tareas_</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { task: 'Análisis Sentimiento Feedback', eta: '2m', color: 'border-white/10 opacity-70' },
                                { task: 'Auto-Scaling DB Clúster', eta: '5m', color: 'border-white/10 opacity-70' },
                                { task: 'Generación Banners Q4 Campaign', eta: '12m', color: 'border-white/10 opacity-70' },
                            ].map((task, i) => (
                                <div key={i} className={`p-4 rounded-[1.2rem] border ${task.color} bg-white/5 flex justify-between items-center group-hover:translate-x-1 transition-all`}>
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{task.task}</span>
                                    <span className="text-[10px] font-bold text-platinum-dim opacity-50">ETA: {task.eta}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Reasoning Section */}
            <div className="glass-panel-nexus rounded-[3rem] p-10 border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl relative">
                <div className="flex items-center gap-4 mb-10">
                    <Sparkles className="text-neural-blue w-6 h-6" />
                    <h3 className="text-2xl font-black text-white tracking-tighter">Razonamiento de la IA_</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Hallazgo Crítico',
                            desc: 'El checkout v2 experimenta un \'friction-loop\' en navegadores Safari. Recomendación: Cambio automático de pasarela a versión ligera.',
                            icon: AlertCircle,
                            color: 'text-amber-400',
                            bg: 'bg-amber-400/10'
                        },
                        {
                            title: 'Oporunidad de Crecimiento',
                            desc: 'Los usuarios que visitan el Blog después de la Academia tienen un LTV 2.4x mayor. Acción: Inyectar sugerencias de lectura en el dashboard.',
                            icon: TrendingUp,
                            color: 'text-emerald-400',
                            bg: 'bg-emerald-400/10'
                        },
                        {
                            title: 'Auto-Corrección',
                            desc: 'Variante B del Banner principal no alcanzó relevancia. Desactivando automáticamente y volcando tráfico a Variante A.',
                            icon: CheckCircle2,
                            color: 'text-neural-blue',
                            bg: 'bg-neural-blue/10'
                        }
                    ].map((card, i) => (
                        <div key={i} className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 relative group hover:bg-white/[0.05] transition-all">
                            <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center ${card.color} mb-6 shadow-2xl`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-black text-white mb-3 tracking-tighter">{card.title}</h4>
                            <p className="text-xs font-bold text-platinum-dim opacity-70 leading-relaxed italic">&quot;&#123;card.desc&#125;&quot;</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
