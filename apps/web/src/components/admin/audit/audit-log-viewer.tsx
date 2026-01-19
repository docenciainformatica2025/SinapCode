'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface AuditLog {
    id: string;
    timestamp: Date;
    user: string;
    action: string;
    resource: string;
    details: string;
    ip: string;
    status: 'success' | 'failed';
}

const mockLogs: AuditLog[] = [
    {
        id: '1',
        timestamp: new Date(Date.now() - 5 * 60000),
        user: 'admin@sinapcode.com',
        action: 'DELETE',
        resource: 'User',
        details: 'Deleted user: test@example.com',
        ip: '192.168.1.100',
        status: 'success',
    },
    {
        id: '2',
        timestamp: new Date(Date.now() - 15 * 60000),
        user: 'admin@sinapcode.com',
        action: 'UPDATE',
        resource: 'Course',
        details: 'Updated course: Python para Data Science',
        ip: '192.168.1.100',
        status: 'success',
    },
    {
        id: '3',
        timestamp: new Date(Date.now() - 30 * 60000),
        user: 'admin@sinapcode.com',
        action: 'CREATE',
        resource: 'User',
        details: 'Created user: newuser@example.com',
        ip: '192.168.1.100',
        status: 'success',
    },
    {
        id: '4',
        timestamp: new Date(Date.now() - 45 * 60000),
        user: 'teacher@sinapcode.com',
        action: 'DELETE',
        resource: 'Course',
        details: 'Attempted to delete course: Hacking Ético',
        ip: '192.168.1.105',
        status: 'failed',
    },
];

export function AuditLogViewer() {
    const [logs, setLogs] = useState<AuditLog[]>(mockLogs);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAction, setFilterAction] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const filteredLogs = logs.filter(log => {
        const matchesSearch =
            log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesAction = filterAction === 'all' || log.action === filterAction;
        const matchesStatus = filterStatus === 'all' || log.status === filterStatus;

        return matchesSearch && matchesAction && matchesStatus;
    });

    const exportLogs = (format: 'csv' | 'json') => {
        toast.success(`Exportando logs como ${format.toUpperCase()}...`);
        // Implementation would go here
    };

    const getActionColor = (action: string) => {
        switch (action) {
            case 'CREATE':
                return 'text-emerald-400';
            case 'UPDATE':
                return 'text-blue-400';
            case 'DELETE':
                return 'text-red-400';
            default:
                return 'text-platinum-dim';
        }
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">Filtros y Búsqueda</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Buscar en logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-platinum-dim focus:outline-none focus:border-neural-blue transition"
                    />
                    <select
                        value={filterAction}
                        onChange={(e) => setFilterAction(e.target.value)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neural-blue transition"
                    >
                        <option value="all">Todas las acciones</option>
                        <option value="CREATE">CREATE</option>
                        <option value="UPDATE">UPDATE</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neural-blue transition"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                    </select>
                    <div className="flex gap-2">
                        <button
                            onClick={() => exportLogs('csv')}
                            className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium"
                        >
                            📊 CSV
                        </button>
                        <button
                            onClick={() => exportLogs('json')}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                        >
                            📄 JSON
                        </button>
                    </div>
                </div>
            </div>

            {/* Logs Table */}
            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-platinum-dim uppercase tracking-wider">
                                    Timestamp
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-platinum-dim uppercase tracking-wider">
                                    Usuario
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-platinum-dim uppercase tracking-wider">
                                    Acción
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-platinum-dim uppercase tracking-wider">
                                    Recurso
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-platinum-dim uppercase tracking-wider">
                                    Detalles
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-platinum-dim uppercase tracking-wider">
                                    IP
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-platinum-dim uppercase tracking-wider">
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-white/5 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-platinum-dim">
                                        {log.timestamp.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                        {log.user}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getActionColor(log.action)}`}>
                                        {log.action}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                        {log.resource}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-platinum-dim max-w-xs truncate">
                                        {log.details}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-platinum-dim font-mono">
                                        {log.ip}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${log.status === 'success'
                                                    ? 'bg-emerald-500/20 text-emerald-400'
                                                    : 'bg-red-500/20 text-red-400'
                                                }`}
                                        >
                                            {log.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLogs.length === 0 && (
                    <div className="p-8 text-center text-platinum-dim">
                        No se encontraron logs con los filtros aplicados
                    </div>
                )}
            </div>

            {/* Summary */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-sm text-platinum-dim">Total de logs: </span>
                        <span className="text-lg font-bold text-white">{filteredLogs.length}</span>
                    </div>
                    <div className="flex gap-6">
                        <div>
                            <span className="text-sm text-platinum-dim">Exitosos: </span>
                            <span className="text-lg font-bold text-emerald-400">
                                {filteredLogs.filter(l => l.status === 'success').length}
                            </span>
                        </div>
                        <div>
                            <span className="text-sm text-platinum-dim">Fallidos: </span>
                            <span className="text-lg font-bold text-red-400">
                                {filteredLogs.filter(l => l.status === 'failed').length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
