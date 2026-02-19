'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Server,
    Shield,
    Cpu,
    Database,
    Activity,
    Terminal,
    FileText,
    RefreshCw,
    CheckCircle2,
    AlertTriangle,
    Wifi
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/header';

// Mock Logs Generator
const generateLog = () => {
    const types = ['INFO', 'SUCCESS', 'WARN', 'ERROR'];
    const type = types[Math.floor(Math.random() * (Math.random() > 0.9 ? 4 : 2))]; // Mainly Info/Success
    const messages = [
        'User authentication verified',
        'Database connection pool maintained',
        'API Request /api/admin/users processed',
        'Cache invalidated for key: users-list',
        'Next.js Server Actions execution started',
        'Generating static pages for incremental regeneration'
    ];
    return {
        timestamp: new Date().toISOString(),
        type,
        message: messages[Math.floor(Math.random() * messages.length)]
    };
};

export default function AdminSystem() {
    const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'env'>('overview');
    const [logs, setLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Simulate Real-time Logs
    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => [generateLog(), ...prev].slice(0, 50));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const refreshHealth = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <AdminHeader
                title="Sistema y Salud"
                description="Monitor de infraestructura, logs en tiempo real y configuración técnica"
            />

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 space-x-6">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-4 text-sm font-bold transition relative ${activeTab === 'overview' ? 'text-gold' : 'text-platinum-dim hover:text-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Resumen de Salud
                    </div>
                    {activeTab === 'overview' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />}
                </button>
                <button
                    onClick={() => setActiveTab('logs')}
                    className={`pb-4 text-sm font-bold transition relative ${activeTab === 'logs' ? 'text-neural-blue' : 'text-platinum-dim hover:text-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4" /> Live Logs
                    </div>
                    {activeTab === 'logs' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-neural-blue" />}
                </button>
                <button
                    onClick={() => setActiveTab('env')}
                    className={`pb-4 text-sm font-bold transition relative ${activeTab === 'env' ? 'text-synapse-purple' : 'text-platinum-dim hover:text-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <Database className="w-4 h-4" /> Entorno y BD
                    </div>
                    {activeTab === 'env' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-synapse-purple" />}
                </button>
            </div>

            {/* CONTENT */}
            <div className="min-h-[400px]">
                {activeTab === 'overview' && (
                    <motion.div variants={itemVariants} className="space-y-6">
                        {/* Status Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass-panel p-6 rounded-xl border border-white/10 bg-emerald-500/5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-400">
                                        <Server className="w-6 h-6" />
                                    </div>
                                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        ONLINE
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">99.98%</div>
                                <div className="text-sm text-platinum-dim">Uptime (Últimos 30 días)</div>
                            </div>

                            <div className="glass-panel p-6 rounded-xl border border-white/10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-neural-blue/20 rounded-lg text-neural-blue">
                                        <Cpu className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-mono text-platinum-dim">vCore 2.0</span>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">24ms</div>
                                <div className="text-sm text-platinum-dim">Latencia promedio API</div>
                            </div>

                            <div className="glass-panel p-6 rounded-xl border border-white/10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-synapse-purple/20 rounded-lg text-synapse-purple">
                                        <Database className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-mono text-platinum-dim">PostgreSQL</span>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">Healty</div>
                                <div className="text-sm text-platinum-dim">Pool Connection Status</div>
                            </div>
                        </div>

                        {/* Detail Panels */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="glass-panel p-6 rounded-xl border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-gold" />
                                    Estado de Microservicios
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Identity Service (Auth.js)', status: 'Operational', ping: '12ms' },
                                        { name: 'PDF Generation Engine', status: 'Operational', ping: '45ms' },
                                        { name: 'Database (Prisma/Neon)', status: 'Operational', ping: '22ms' },
                                        { name: 'Storage CND (R2)', status: 'Operational', ping: '8ms' },
                                        { name: 'Email Gateway (Resend)', status: 'Operational', ping: '89ms' },
                                    ].map((service, i) => (
                                        <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-gray-500' : 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]'}`} />
                                                <span className="text-sm font-medium text-white">{service.name}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs font-mono text-platinum-dim">{service.ping}</span>
                                                <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">
                                                    {service.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={refreshHealth}
                                    className="mt-6 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-platinum transition flex items-center justify-center gap-2"
                                >
                                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                                    Actualizar Diagnóstico
                                </button>
                            </div>

                            <div className="glass-panel p-6 rounded-xl border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                                    Alertas Recientes
                                </h3>

                                <div className="space-y-4">
                                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                                            <span className="text-sm font-bold text-amber-400">High Memory Warning</span>
                                            <span className="text-[10px] text-amber-400/60 ml-auto">Hace 2 horas</span>
                                        </div>
                                        <p className="text-xs text-platinum-dim">
                                            El proceso de generación de reportes consumió 85% de memoria disponible momentáneamente.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Activity className="w-4 h-4 text-blue-400" />
                                            <span className="text-sm font-bold text-blue-400">Backup Completado</span>
                                            <span className="text-[10px] text-blue-400/60 ml-auto">Hace 5 horas</span>
                                        </div>
                                        <p className="text-xs text-platinum-dim">
                                            Copia de seguridad incremental de la base de datos realizada exitosamente (Size: 45MB).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'logs' && (
                    <motion.div variants={itemVariants} className="glass-panel rounded-xl overflow-hidden border border-white/10 bg-[#0c0c0c]">
                        <div className="p-3 bg-white/5 border-b border-white/5 flex justify-between items-center">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <span className="text-xs font-mono text-platinum-dim">server-logs-stream.log</span>
                        </div>
                        <div className="p-4 font-mono text-xs h-[500px] overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {logs.map((log, idx) => (
                                <div key={idx} className="flex gap-3 hover:bg-white/5 p-0.5 rounded px-2">
                                    <span className="text-platinum-dim opacity-50 select-none">{log.timestamp}</span>
                                    <span className={`font-bold w-16 ${log.type === 'SUCCESS' ? 'text-emerald-400' :
                                            log.type === 'ERROR' ? 'text-rose-400' :
                                                log.type === 'WARN' ? 'text-amber-400' :
                                                    'text-blue-400'
                                        }`}>[{log.type}]</span>
                                    <span className="text-platinum">{log.message}</span>
                                </div>
                            ))}
                            <div className="animate-pulse text-neural-blue mt-2">_</div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'env' && (
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="glass-panel p-8 rounded-xl border border-white/10 text-center py-20">
                            <Database className="w-16 h-16 text-platinum-dim mx-auto mb-4 opacity-20" />
                            <h3 className="text-xl font-bold text-white">Configuración de Entorno</h3>
                            <p className="text-platinum-dim max-w-md mx-auto mt-2">
                                Las variables de entorno y configuración de conexión están protegidas y solo son visibles mediante acceso directo al servidor seguro.
                            </p>
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="text-xs text-platinum-dim mb-1">NODE_ENV</div>
                                    <div className="text-white font-mono text-sm">production</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="text-xs text-platinum-dim mb-1">DATABASE_PROVIDER</div>
                                    <div className="text-white font-mono text-sm">postgresql</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="text-xs text-platinum-dim mb-1">REGION</div>
                                    <div className="text-white font-mono text-sm">us-east-1</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
