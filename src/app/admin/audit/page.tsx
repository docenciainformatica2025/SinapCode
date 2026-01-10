'use client';

import { useEffect, useState } from 'react';
import { AuditLogger, AuditLogEntry } from '@/lib/audit/audit-logger';
import { motion } from 'framer-motion';

export default function AuditPage() {
    const [logs, setLogs] = useState<AuditLogEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Cargar datos (simulados)
        AuditLogger.seedMockData();
        AuditLogger.getLogs().then(data => {
            setLogs(data);
            setIsLoading(false);
        });
    }, []);

    const getActionColor = (action: string) => {
        switch (action) {
            case 'USER_BAN': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
            case 'USER_UNBAN': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'ROLE_CHANGE': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            case 'SYSTEM_ALERT': return 'text-neural-blue bg-neural-blue/10 border-neural-blue/20';
            default: return 'text-platinum-dim bg-white/5 border-white/10';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Audit Logs</h2>
                    <p className="text-platinum-dim">Immutable record of all administrative actions. ISO 27001 Compliant.</p>
                </div>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-platinum text-sm rounded-lg border border-white/10 transition">
                    ⬇ Export CSV
                </button>
            </div>

            <div className="glass-panel overflow-hidden rounded-xl border border-white/10">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="p-4 text-xs font-bold text-platinum-dim uppercase">Timestamp</th>
                                <th className="p-4 text-xs font-bold text-platinum-dim uppercase">Actor</th>
                                <th className="p-4 text-xs font-bold text-platinum-dim uppercase">Action</th>
                                <th className="p-4 text-xs font-bold text-platinum-dim uppercase">Description</th>
                                <th className="p-4 text-xs font-bold text-platinum-dim uppercase">Target</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-platinum-dim">Loading secure logs...</td>
                                </tr>
                            ) : logs.map((log) => (
                                <motion.tr
                                    key={log.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-white/5 transition-colors"
                                >
                                    <td className="p-4 text-sm text-platinum font-mono">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                    <td className="p-4 text-sm text-white font-medium">
                                        {log.actorName}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold border ${getActionColor(log.action)}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-platinum-dim">
                                        {log.description}
                                    </td>
                                    <td className="p-4 text-xs text-platinum-dim font-mono">
                                        {log.targetId || '-'}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {logs.length === 0 && !isLoading && (
                    <div className="p-8 text-center text-platinum-dim">No audit records found.</div>
                )}
            </div>
        </div>
    );
}
