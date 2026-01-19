'use client';

import { AdminHeader } from '@/components/admin/header';
import { Shield, Search, Filter, Download, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useState } from 'react';

// Mock data removed in favor of real API


export default function AuditPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch('/api/admin/audit');
                if (res.ok) {
                    const data = await res.json();
                    setLogs(data);
                }
            } catch (error) {
                console.error('Failed to fetch audit logs', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'text-emerald-400 bg-emerald-400/10';
            case 'warning': return 'text-amber-400 bg-amber-400/10';
            case 'danger': return 'text-rose-400 bg-rose-400/10';
            default: return 'text-blue-400 bg-blue-400/10';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success': return <CheckCircle className="h-4 w-4" />;
            case 'warning': return <AlertTriangle className="h-4 w-4" />;
            case 'danger': return <Shield className="h-4 w-4" />;
            default: return <Info className="h-4 w-4" />;
        }
    };

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Logs de Auditoría"
                description="Registro inmutable de todas las acciones administrativas. Cumplimiento ISO 27001."
            />

            {/* Actions Bar */}
            <div className="glass-panel p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative flex-1 w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-platinum-dim" />
                    <input
                        type="text"
                        placeholder="Buscar por acción, actor o IP..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-neural-blue outline-none transition"
                    />
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-black/50 border border-white/20 hover:border-neural-blue text-platinum rounded-lg transition flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Filtrar</span>
                    </button>
                    <button className="px-4 py-2 bg-neural-blue hover:bg-blue-600 text-white rounded-lg font-bold transition shadow-neon-blue flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Logs Table */}
            <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/5 text-left border-b border-white/10">
                                <th className="p-4 text-xs font-bold text-platinum-dim uppercase tracking-wider">Fecha / Hora</th>
                                <th className="p-4 text-xs font-bold text-platinum-dim uppercase tracking-wider">Actor</th>
                                <th className="p-4 text-xs font-bold text-platinum-dim uppercase tracking-wider">Acción</th>
                                <th className="p-4 text-xs font-bold text-platinum-dim uppercase tracking-wider">Detalles</th>
                                <th className="p-4 text-xs font-bold text-platinum-dim uppercase tracking-wider">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-platinum-dim">Cargando registros...</td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-platinum-dim">No hay registros de auditoría</td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-sm text-platinum font-mono">
                                            {new Date(log.timestamp || log.createdAt).toLocaleString()}
                                        </td>
                                        <td className="p-4 text-sm font-bold text-white">
                                            {log.user?.name || log.actor || 'Sistema'}
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 rounded text-xs font-bold bg-white/10 text-white border border-white/10">
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-platinum-dim max-w-md truncate">
                                            {log.details || log.image}
                                        </td>
                                        <td className="p-4">
                                            <div className={`flex items-center gap-2 px-2 py-1 rounded w-fit ${getStatusColor(log.status || 'info')}`}>
                                                {getStatusIcon(log.status || 'info')}
                                                <span className="text-xs font-bold capitalize">{log.status || 'info'}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
