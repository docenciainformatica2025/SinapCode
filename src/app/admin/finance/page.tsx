'use client';

export const dynamic = 'force-dynamic';

import { DollarSign, TrendingUp, CreditCard, Download } from 'lucide-react';

export default function AdminFinance() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Finanzas</h1>
                    <p className="text-muted">Resumen de ingresos y facturación.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-white/10 rounded-lg text-white hover:bg-white/5 transition">
                    <Download className="w-4 h-4" />
                    Exportar Reporte
                </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface p-6 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-green-400/10">
                            <DollarSign className="w-6 h-6 text-green-400" />
                        </div>
                        <span className="text-green-400 text-xs font-bold">+12%</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">$12,450</div>
                    <div className="text-sm text-muted">Ingresos este mes</div>
                </div>

                <div className="bg-surface p-6 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-blue-400/10">
                            <CreditCard className="w-6 h-6 text-blue-400" />
                        </div>
                        <span className="text-blue-400 text-xs font-bold">+5</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">128</div>
                    <div className="text-sm text-muted">Suscripciones Pro Activas</div>
                </div>

                <div className="bg-surface p-6 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-purple-400/10">
                            <TrendingUp className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="text-purple-400 text-xs font-bold">ARR</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">$145k</div>
                    <div className="text-sm text-muted">Ingresos Recurrentes Anuales</div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-lg font-bold text-white">Transacciones Recientes</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-muted font-medium">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Usuario</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4">Monto</th>
                                <th className="px-6 py-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-white/5 transition">
                                    <td className="px-6 py-4 font-mono text-muted">#INV-202{i}</td>
                                    <td className="px-6 py-4 text-white">usuario_{i}@email.com</td>
                                    <td className="px-6 py-4 text-muted">16 Ene, 2026</td>
                                    <td className="px-6 py-4 text-white font-bold">$29.00</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded bg-green-400/10 text-green-400 text-xs font-bold">
                                            Completado
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
