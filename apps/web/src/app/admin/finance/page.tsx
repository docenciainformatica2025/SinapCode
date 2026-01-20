'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign,
    TrendingUp,
    CreditCard,
    Download,
    FileText,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    Search
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminFinance() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const handleDownloadInvoice = (id: string) => {
        // Extract ID from format #INV-2026-00X
        const cleanId = id.replace('#', '').replace(/-/g, '');

        toast.promise(
            // Fetch validation inside promise not strictly necessary for window.open 
            // but good for UX. For now, simple direct open:
            new Promise((resolve) => {
                window.open(`/api/admin/finance/invoice/${cleanId}?t=${Date.now()}`, '_blank');
                setTimeout(resolve, 1000);
            }),
            {
                loading: 'Generando factura PDF certificada...',
                success: `Factura ${id} descargada correctamente`,
                error: 'Error al generar factura',
            }
        );
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
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Finanzas & Facturación</h1>
                    <p className="text-muted flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Gestión de ingresos y documentos fiscales en tiempo real
                    </p>
                </motion.div>
                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/20 rounded-xl text-gold hover:bg-gold/20 transition-all font-bold shadow-neon-amber"
                >
                    <Download className="w-4 h-4" />
                    Exportar Reporte Mensual
                </motion.button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Ingresos Totales', value: '$12,450.00', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
                    { title: 'Suscripciones Activas', value: '1,284', change: '+5.2%', trend: 'up', icon: CreditCard, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                    { title: 'ARR (Anual)', value: '$149,400', change: '-2.1%', trend: 'down', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="bg-surface/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 shadow-lg group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-4 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${stat.trend === 'up' ? 'text-green-400 bg-green-400/10' : 'text-rose-400 bg-rose-400/10'
                                }`}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                        <div className="text-sm text-platinum-dim">{stat.title}</div>
                    </motion.div>
                ))}
            </div>

            {/* Transactions Table */}
            <motion.div
                variants={itemVariants}
                className="bg-surface/50 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden shadow-xl"
            >
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gold" />
                        Historial de Transacciones
                    </h2>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-dim" />
                        <input
                            type="text"
                            placeholder="Buscar factura o usuario..."
                            className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-gold/50 outline-none transition"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-platinum-dim font-bold uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4">ID Factura</th>
                                <th className="px-6 py-4">Usuario</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4">Monto</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-white/5 transition duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-platinum-dim" />
                                            <span className="font-mono text-white">#INV-2026-00{i}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-neural-blue/20 flex items-center justify-center text-neural-blue text-xs font-bold">
                                                JD
                                            </div>
                                            <div>
                                                <div className="text-white font-medium">Juan Doe</div>
                                                <div className="text-xs text-platinum-dim">juan.doe@example.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-platinum-dim">1{i} Ene, 2026</td>
                                    <td className="px-6 py-4 text-white font-bold">$29.00</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                            Pagado
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDownloadInvoice(`#INV-2026-00${i}`)}
                                            className="text-platinum-dim hover:text-gold transition p-2 hover:bg-gold/10 rounded-lg"
                                            title="Regenerar Factura"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
}
