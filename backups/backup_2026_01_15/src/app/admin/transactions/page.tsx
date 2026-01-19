'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/header';
import { Search, Filter, Download, DollarSign, CreditCard, ArrowUpRight, ArrowDownLeft, FileText, RotateCcw, XCircle } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchTransactions();
    }, [statusFilter]); // Reload when filter changes

    // Debounce search could be added here

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                search: searchTerm,
                status: statusFilter
            });
            const res = await fetch(`/api/admin/transactions?${params}`);
            const data = await res.json();
            setTransactions(data.transactions || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSimulate = async () => {
        const toastId = toast.loading('Simulando transacción segura...');
        try {
            const res = await fetch('/api/admin/transactions/simulate', { method: 'POST' });
            if (res.ok) {
                toast.success('Venta registrada exitosamente', { id: toastId });
                fetchTransactions();
            } else {
                toast.error('Error al simular', { id: toastId });
            }
        } catch (error) {
            toast.error('Error de conexión', { id: toastId });
        }
    };

    const handleExport = () => {
        const params = new URLSearchParams({
            search: searchTerm,
            status: statusFilter
        });
        window.open(`/api/admin/transactions/export?${params}`, '_blank');
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        const actionName = newStatus === 'REFUNDED' ? 'reembolsar' : 'cancelar';
        if (!confirm(`¿Estás seguro de que deseas ${actionName} esta transacción? Esta acción no se puede deshacer.`)) return;

        const toastId = toast.loading(`Procesando ${actionName}...`);
        try {
            const res = await fetch(`/api/admin/transactions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                toast.success(`Transacción actualizada a ${newStatus}`, { id: toastId });
                fetchTransactions();
            } else {
                const err = await res.text();
                toast.error(`Error: ${err}`, { id: toastId });
            }
        } catch (error) {
            toast.error('Error de conexión', { id: toastId });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchTransactions();
    };

    const getStatusStyle = (status: string) => {
        switch (status.toUpperCase()) {
            case 'COMPLETED': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'PENDING': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'FAILED': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            case 'REFUNDED': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            default: return 'bg-white/5 text-platinum border-white/10';
        }
    };

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Transacciones Financieras"
                description="Registro detallado de ingresos, reembolsos y movimientos."
            />

            {/* Actions Bar */}
            <div className="glass-panel p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center">
                <form onSubmit={handleSearch} className="relative flex-1 w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-platinum-dim" />
                    <input
                        type="text"
                        placeholder="Buscar por usuario, ID transacción..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-neural-blue outline-none transition"
                    />
                </form>

                <div className="flex gap-3">
                    <button
                        onClick={handleSimulate}
                        className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg font-bold transition flex items-center gap-2"
                    >
                        <DollarSign className="h-4 w-4" />
                        <span className="hidden sm:inline">Simular Venta</span>
                    </button>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 bg-black/50 border border-white/20 hover:border-neural-blue text-platinum rounded-lg transition"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="COMPLETED">Completados</option>
                        <option value="PENDING">Pendientes</option>
                        <option value="FAILED">Fallidos</option>
                        <option value="REFUNDED">Reembolsos</option>
                    </select>

                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-neural-blue hover:bg-blue-600 text-white rounded-lg font-bold transition shadow-neon-blue flex items-center gap-2"
                    >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Exportar</span>
                    </button>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="text-left p-4 text-xs font-bold text-platinum-dim uppercase tracking-wider">Transacción</th>
                                <th className="text-left p-4 text-xs font-bold text-platinum-dim uppercase tracking-wider">Usuario</th>
                                <th className="text-left p-4 text-xs font-bold text-platinum-dim uppercase tracking-wider">Detalle</th>
                                <th className="text-left p-4 text-xs font-bold text-platinum-dim uppercase tracking-wider">Monto</th>
                                <th className="text-left p-4 text-xs font-bold text-platinum-dim uppercase tracking-wider">Estado</th>
                                <th className="text-left p-4 text-xs font-bold text-platinum-dim uppercase tracking-wider">Fecha</th>
                                <th className="text-right p-4 text-xs font-bold text-platinum-dim uppercase tracking-wider">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-platinum-dim">
                                        <div className="flex justify-center gap-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Cargando transacciones...
                                        </div>
                                    </td>
                                </tr>
                            ) : transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-platinum-dim">
                                        No se encontraron transacciones.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-white/5 transition group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white/5 rounded-lg text-platinum">
                                                    {tx.status === 'REFUNDED' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-white text-sm font-mono truncate max-w-[120px]" title={tx.id}>
                                                        #{tx.id.slice(0, 8)}
                                                    </span>
                                                    <span className="text-xs text-platinum-dim flex items-center gap-1">
                                                        <CreditCard className="h-3 w-3" /> {tx.provider}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neural-blue to-purple-600 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                                                    {tx.user?.image ? (
                                                        <Image src={tx.user.image} alt={tx.user.name || 'User'} width={32} height={32} />
                                                    ) : (
                                                        (tx.user?.name?.[0] || 'U').toUpperCase()
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-white text-sm">{tx.user?.name || 'Unknown'}</span>
                                                    <span className="text-xs text-platinum-dim">{tx.user?.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm text-platinum">{tx.description || 'Sin descripción'}</span>
                                            {tx.productType && (
                                                <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-white/10 rounded uppercase text-platinum-dim">
                                                    {tx.productType}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className="text-white font-mono font-bold">
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: tx.currency || 'USD' }).format(tx.amount)}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusStyle(tx.status)}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-platinum-dim">
                                            {new Date(tx.createdAt).toLocaleDateString()}
                                            <div className="text-xs opacity-50">{new Date(tx.createdAt).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {tx.status === 'COMPLETED' && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(tx.id, 'REFUNDED')}
                                                        className="p-2 hover:bg-white/10 rounded-lg text-platinum hover:text-rose-400 transition"
                                                        title="Reembolsar Transacción"
                                                    >
                                                        <RotateCcw className="h-4 w-4" />
                                                    </button>
                                                )}
                                                {tx.status === 'PENDING' && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(tx.id, 'FAILED')}
                                                        className="p-2 hover:bg-white/10 rounded-lg text-platinum hover:text-rose-400 transition"
                                                        title="Cancelar Transacción"
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => window.open(`/api/admin/transactions/receipt/${tx.id}`, '_blank')}
                                                    className="p-2 hover:bg-white/10 rounded-lg text-platinum hover:text-white transition"
                                                    title="Descargar Recibo Oficial"
                                                >
                                                    <FileText className="h-4 w-4" />
                                                </button>
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
