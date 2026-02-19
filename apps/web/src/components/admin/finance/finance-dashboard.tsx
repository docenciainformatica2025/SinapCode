'use client';

import { motion } from 'framer-motion';
import {
    DollarSign,
    TrendingUp,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    PieChart,
    Brain,
    History,
    Calendar,
    ChevronDown,
    Zap
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components safely
if (typeof window !== 'undefined') {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler
    );
}


const FINANCIAL_KPIS = [
    {
        label: 'MRR (Mensual)',
        value: '$145,250',
        change: '+12%',
        isPositive: true,
        icon: DollarSign,
        color: 'blue'
    },
    {
        label: 'Churn Rate',
        value: '2.4%',
        change: '-0.5%',
        isPositive: true, // Lower churn is positive
        icon: PieChart,
        color: 'rose'
    },
    {
        label: 'LTV (Lifetime Value)',
        value: '$1,250',
        change: '+5%',
        isPositive: true,
        icon: Users,
        color: 'emerald'
    },
    {
        label: 'Total Revenue',
        value: '$2,150,000',
        change: '+18%',
        isPositive: true,
        icon: TrendingUp,
        color: 'purple'
    }
];

const TRANSACTIONS = [
    { id: '1', user: 'Jane Doe', course: 'Advanced AI & ML', amount: '$199.00', date: 'Oct 25, 2023', status: 'Success' },
    { id: '2', user: 'John Smith', course: 'Intro to Python', amount: '$49.00', date: 'Oct 24, 2023', status: 'Pending' },
    { id: '3', user: 'Emily Chen', course: 'Deep Learning', amount: '$299.00', date: 'Oct 23, 2023', status: 'Success' },
    { id: '4', user: 'Michael Brown', course: 'Data Science Bootcamp', amount: '$450.00', date: 'Oct 22, 2023', status: 'Refunded' },
    { id: '5', user: 'Sarah Lee', course: 'UI/UX Principles', amount: '$120.00', date: 'Oct 21, 2023', status: 'Success' },
];

export function AdminFinanceDashboard() {
    // Prediction data simulation
    const chartData = {
        labels: ['June', 'July', 'August', 'September', 'October', 'November (Pred)'],
        datasets: [
            {
                label: 'Actual Revenue',
                data: [90000, 105000, 120000, 115000, 145250, null],
                borderColor: '#197fe6',
                backgroundColor: 'rgba(25, 127, 230, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: '#197fe6',
            },
            {
                label: 'AI Forecast',
                data: [null, null, null, null, 145250, 168000],
                borderColor: '#a855f7',
                borderDash: [5, 5],
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: '#a855f7',
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                displayColors: true,
            }
        },
        scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.4)' } },
            x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.4)' } }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* KPI Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {FINANCIAL_KPIS.map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-4k p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                                <kpi.icon className={`w-5 h-5 text-${kpi.color}-400`} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black uppercase ${kpi.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {kpi.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {kpi.change}
                            </div>
                        </div>
                        <p className="text-[10px] text-platinum-dim font-black uppercase tracking-widest mb-1">{kpi.label}</p>
                        <h3 className="text-3xl font-black text-white italic tracking-tighter">{kpi.value}</h3>
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    </motion.div>
                ))}
            </div>

            {/* Revenue & Forecast Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 glass-4k p-10 rounded-[3rem] border border-white/5 relative overflow-hidden min-h-[500px] flex flex-col">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-1">Tendencia de Ingresos_</h2>
                            <p className="text-[10px] text-platinum-dim font-bold tracking-widest uppercase opacity-60">Análisis Histórico vs Predicción por IA</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 group cursor-help">
                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                <span className="text-[9px] font-black uppercase text-platinum-dim">Real</span>
                            </div>
                            <div className="flex items-center gap-2 group cursor-help">
                                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                <span className="text-[9px] font-black uppercase text-platinum-dim">Forecast IA</span>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                Octubre 2023 <ChevronDown className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[300px]">
                        <Line data={chartData} options={chartOptions} />
                    </div>

                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Brain className="w-40 h-40 text-purple-500" />
                    </div>
                </div>

                {/* AI Insights Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-6">
                            <Zap className="w-5 h-5 text-amber-400" />
                            <h3 className="text-lg font-black text-white italic tracking-tighter uppercase">NEXUS Financial IA_</h3>
                        </div>
                        <p className="text-sm text-platinum-dim mb-6 font-medium leading-relaxed italic">
                            "Basado en el crecimiento del último trimestre, proyectamos un aumento del 14.5% en las conversiones del Black Friday. Recomendamos ajustar el LTV objetivo a $1,350 mediante upselling en el curso de IA."
                        </p>
                        <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-platinum-dim">Confianza Predicción</span>
                            <span className="text-xs font-black text-emerald-400">92% ACCURACY</span>
                        </div>
                    </div>

                    <div className="glass-4k p-8 rounded-[2.5rem] border border-white/5 flex-1 max-h-[250px] overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <History className="w-5 h-5 text-neural-blue" />
                            <h3 className="text-lg font-black text-white italic tracking-tighter uppercase">Anomalías Detectadas_</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                                <div className="w-2 h-2 rounded-full bg-rose-500" />
                                <span className="text-xs text-rose-200 font-medium">Churn inusual en nivel 'Pro'</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs text-emerald-200 font-medium">Nuevo mercado: LATAM (+20%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="glass-4k p-10 rounded-[3rem] border border-white/5 overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Transacciones Recientes_</h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-neural-blue hover:text-white transition">Exportar CSV</button>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-platinum-dim">
                                <th className="pb-4 pr-6">Fecha</th>
                                <th className="pb-4 pr-6">Usuario</th>
                                <th className="pb-4 pr-6">Programa</th>
                                <th className="pb-4 pr-6 text-right">Monto</th>
                                <th className="pb-4 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            {TRANSACTIONS.map((tx) => (
                                <tr key={tx.id} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                                    <td className="py-4 text-platinum-dim font-mono text-xs">{tx.date}</td>
                                    <td className="py-4 text-white font-bold italic">{tx.user}</td>
                                    <td className="py-4 text-platinum-dim">{tx.course}</td>
                                    <td className="py-4 text-right font-black text-white">{tx.amount}</td>
                                    <td className="py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${tx.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            tx.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                            }`}>
                                            {tx.status}
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
