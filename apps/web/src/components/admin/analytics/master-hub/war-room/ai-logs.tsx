'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Database } from 'lucide-react';

export function WarRoomAILogs() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const logs = [
        { time: '12:20:04', msg: 'Balanceo de carga iniciado para cluster AF-SOUTH-1', type: 'primary' },
        { time: '12:20:12', msg: 'Optimización de caché CDN: 99.2% hit rate', type: 'info' },
        { time: '12:20:18', msg: 'Aislamiento de shards de DB: SHARD_04_READ_REPLICA', type: 'warning' },
        { time: '12:20:25', msg: 'Auto-scaling: Añadidas 12x c5.xlarge instancias', type: 'info' },
        { time: '12:20:31', msg: 'Redireccionando tráfico US-WEST vía CloudFront secundario', type: 'info' },
        { time: '12:20:38', msg: 'IA Core: Mitigando influjo repentino en APAC-SEOUL', type: 'primary' },
        { time: '12:20:45', msg: 'Health check: Todos los sistemas operativos', type: 'success' },
        { time: '12:20:52', msg: 'Optimizando protocolos de handshake WebSocket...', type: 'primary' },
    ];

    if (!mounted) return null;

    return (
        <div className="bg-black/60 border border-white/10 rounded-[2.5rem] flex flex-col h-full overflow-hidden shadow-2xl backdrop-blur-3xl">
            <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 opacity-40">
                    <Terminal className="w-4 h-4 text-[#0df2f2]" />
                    AI Traffic Controller_
                </h4>
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0df2f2] animate-pulse shadow-[0_0_10px_rgba(13,242,242,0.8)]" />
                    <span className="text-[9px] text-[#0df2f2]/60 font-black tracking-widest uppercase italic">Neural Stream Active</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 font-mono text-[11px] space-y-5 custom-scrollbar subpixel-text">
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                        className="flex gap-4 items-start group"
                    >
                        <span className="text-white/20 font-bold tabular-nums">[{log.time}]</span>
                        <span className={`${log.type === 'primary' ? 'text-[#0df2f2]' :
                            log.type === 'warning' ? 'text-orange-500' :
                                log.type === 'success' ? 'text-green-500' :
                                    'text-white/30'
                            } tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300 font-medium`}>
                            {log.msg}_
                        </span>
                    </motion.div>
                ))}
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-1.5 h-3 bg-primary/40 ml-1"
                />
            </div>

            <div className="p-5 bg-white/[0.01] border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <Database className="w-3 h-3 text-white/20" />
                    <span className="text-[9px] text-white/30 font-black uppercase tracking-widest">Master-Active DB</span>
                </div>
                <div className="flex items-center gap-3 justify-end text-right">
                    <span className="text-[9px] text-white/30 font-black uppercase tracking-widest">WAF Active</span>
                    <Shield className="w-3 h-3 text-green-500/40" />
                </div>
            </div>
        </div>
    );
}
