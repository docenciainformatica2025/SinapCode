'use client';

import { motion } from 'framer-motion';
import { Terminal, Shield, Database, Cpu } from 'lucide-react';

export function WarRoomAILogs() {
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

    return (
        <div className="bg-black/40 border border-primary/10 rounded-2xl flex flex-col h-full overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-primary/10 bg-[#162a2a]/50 flex justify-between items-center">
                <h4 className="text-primary font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3">
                    <Terminal className="w-4 h-4" />
                    AI Traffic Controller
                </h4>
                <span className="text-[8px] text-slate-500 font-black tracking-widest uppercase">Stream Encriptado</span>
            </div>

            <div className="flex-1 overflow-y-auto p-5 font-mono text-[10px] space-y-4 custom-scrollbar">
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-4 items-start"
                    >
                        <span className="text-slate-600 font-bold">[{log.time}]</span>
                        <span className={`${log.type === 'primary' ? 'text-primary' :
                                log.type === 'warning' ? 'text-orange-500' :
                                    log.type === 'success' ? 'text-green-500' :
                                        'text-slate-300'
                            } tracking-tight leading-relaxed`}>
                            {log.msg}
                        </span>
                    </motion.div>
                ))}
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-1.5 h-3 bg-primary"
                />
            </div>

            <div className="p-4 bg-[#162a2a]/30 border-t border-primary/5 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <Database className="w-3 h-3 text-primary opacity-50" />
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Master-Active DB</span>
                </div>
                <div className="flex items-center gap-3 justify-end">
                    <Shield className="w-3 h-3 text-green-500 opacity-50" />
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">WAF Active</span>
                </div>
            </div>
        </div>
    );
}
