'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    DollarSign,
    Activity,
    TrendingUp,
    Globe,
    Server,
    ShieldCheck,
    Cpu,
    Shield,
    ArrowUpRight,
    ArrowDownRight,
    Bot,
    ChevronRight,
    Zap,
    LayoutDashboard,
    AlertCircle
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


import { RoleSwitcherWidget } from '@/components/admin/role-switcher-widget';
import { AdminFinanceDashboard } from '@/components/admin/finance/finance-dashboard';
import { AdminContentSocial } from '@/components/admin/content/social-integrator';

// Constants moved outside components
const KPI_STATS = [
    {
        label: 'Usuarios Activos',
        value: '2,481',
        trend: '+12.5%',
        isUp: true,
        icon: Users,
        color: 'from-blue-500 to-cyan-500',
        glow: 'shadow-blue-500/20'
    },
    {
        label: 'Ingresos Mensuales',
        value: '$48,290',
        trend: '+8.2%',
        isUp: true,
        icon: DollarSign,
        color: 'from-emerald-500 to-teal-500',
        glow: 'shadow-emerald-500/20'
    },
    {
        label: 'Tasa de Conversión',
        value: '3.2%',
        trend: '-0.4%',
        isUp: false,
        icon: TrendingUp,
        color: 'from-amber-500 to-orange-500',
        glow: 'shadow-amber-500/20'
    },
    {
        label: 'Uptime Sistema',
        value: '99.98%',
        trend: '+0.01%',
        isUp: true,
        icon: Activity,
        color: 'from-purple-500 to-indigo-500',
        glow: 'shadow-purple-500/20'
    },
];

const LOG_ENTRIES = [
    { user: 'Node_74', action: 'Acceso Biométrico', time: 'hace 2m', status: 'Exitoso' },
    { user: 'Admin_X', action: 'Deploy de Módulo IA', time: 'hace 5m', status: 'Finalizado' },
    { user: 'System', action: 'Backup Neuronal', time: 'hace 12m', status: 'En Cola' },
    { user: 'Root', action: 'Cambio de Protocolo', time: 'hace 15m', status: 'Pendiente' },
];

type View = 'OPS' | 'FINANCE' | 'CONTENT';

export default function AdminDashboard() {
    const [mounted, setMounted] = useState(false);
    const [activeView, setActiveView] = useState<View>('OPS');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className="flex items-center justify-center min-h-screen bg-deep-space">
            <div className="w-12 h-12 border-4 border-neural-blue/20 border-t-neural-blue rounded-full animate-spin" />
        </div>
    );

    // Configuración de la Gráfica (Line Chart with Area fill)
    const chartData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Usuarios Activos',
                data: [1200, 1900, 3000, 5000, 8000, 12000, 24000],
                borderColor: '#197fe6',
                backgroundColor: 'rgba(25, 127, 230, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#197fe6',
                borderWidth: 3,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(5, 5, 5, 0.9)',
                titleColor: '#fff',
                bodyColor: '#197fe6',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                titleFont: { weight: 'bold' as const },
            }
        },
        scales: {
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    font: { size: 10 }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    font: { size: 10 }
                }
            }
        }
    };

    return (
        <div className="space-y-10 pb-20 max-w-[1600px] mx-auto overflow-hidden">
            {/* Header: Executive Context */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-neural-blue">
                        <Shield className="w-5 h-5 fill-neural-blue/10" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Suite Ejecutiva SinapCode_</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter leading-none uppercase">
                        {activeView === 'OPS' && <>Centro de <span className="text-neural-blue italic">Operaciones_</span></>}
                        {activeView === 'FINANCE' && <>Dashboard <span className="text-neural-blue italic">Financiero_</span></>}
                        {activeView === 'CONTENT' && <>Fábrica de <span className="text-neural-blue italic">Contenidos_</span></>}
                    </h1>
                </div>

                <div className="flex flex-wrap items-center gap-4 bg-white/5 backdrop-blur-2xl p-2 rounded-[2rem] border border-white/5 shadow-2xl">
                    {[
                        { id: 'OPS', label: 'Operaciones', icon: LayoutDashboard },
                        { id: 'FINANCE', label: 'Finanzas', icon: DollarSign },
                        { id: 'CONTENT', label: 'Contenidos', icon: Zap },
                    ].map((view) => (
                        <button
                            key={view.id}
                            onClick={() => setActiveView(view.id as View)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeView === view.id
                                ? 'bg-neural-blue text-white shadow-lg shadow-neural-blue/20'
                                : 'text-platinum-dim hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <view.icon className="w-4 h-4" />
                            {view.label}
                        </button>
                    ))}
                    <div className="w-[1px] h-8 bg-white/10 mx-2 hidden sm:block" />
                    <RoleSwitcherWidget />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeView === 'OPS' && (
                    <motion.div
                        key="ops"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-10"
                    >
                        {/* KPI Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {KPI_STATS.map((kpi, i) => (
                                <motion.div
                                    key={kpi.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="group bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all shadow-2xl relative overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${kpi.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`} />

                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg ${kpi.glow}`}>
                                            <kpi.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${kpi.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {kpi.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                            {kpi.trend}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[10px] text-platinum-dim font-black uppercase tracking-[0.2em]">{kpi.label}</p>
                                        <h3 className="text-3xl font-black text-white italic tracking-tighter">{kpi.value}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Main Content Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Visual Projection Tool */}
                            <div className="lg:col-span-8 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col min-h-[500px]">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Proyección de Crecimiento_</h3>
                                        <p className="text-xs text-platinum-dim font-bold tracking-widest uppercase opacity-60">Análisis de Usuarios Activos Semestral</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-black/40 p-2 rounded-2xl border border-white/5">
                                        {['Día', 'Sem', 'Mes', 'Año'].map(filter => (
                                            <button
                                                key={filter}
                                                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === 'Mes' ? 'bg-neural-blue text-white shadow-lg' : 'text-platinum-dim hover:bg-white/5'}`}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex-1 w-full relative min-h-[300px]">
                                    <Line data={chartData} options={chartOptions} />
                                </div>
                            </div>


                            {/* Sidebar: System Health */}
                            <div className="lg:col-span-4 flex flex-col gap-8">
                                {/* Live Activity */}
                                <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 shadow-2xl flex-1 relative overflow-hidden">
                                    <div className="flex items-center gap-3 mb-8 text-secondary">
                                        <Bot className="w-5 h-5" />
                                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Bitácora Kernel_</h3>
                                    </div>

                                    <div className="space-y-6">
                                        {LOG_ENTRIES.map((log, i) => (
                                            <div key={i} className="flex gap-4 group/log cursor-pointer">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover/log:border-neural-blue/30 transition-all">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-neural-blue animate-pulse" />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xs font-black text-white">{log.user}</span>
                                                        <span className="text-[9px] text-platinum-dim font-bold uppercase tracking-widest">{log.time}</span>
                                                    </div>
                                                    <p className="text-[10px] text-platinum-dim opacity-60 font-medium group-hover/log:text-white transition-colors">{log.action}</p>
                                                </div>
                                                <div className="ml-auto">
                                                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded bg-white/5 border border-white/5 ${log.status === 'Exitoso' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                        {log.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="mt-10 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-platinum-dim hover:bg-white/10 hover:text-white transition-all">
                                        Ver Logs Completos_
                                    </button>
                                </div>

                                {/* Quick Stats Card */}
                                <div className="bg-gradient-to-br from-neural-blue to-purple-600 p-8 rounded-[2.5rem] shadow-2xl shadow-neural-blue/20 flex items-center justify-between relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Carga del Servidor</p>
                                        <h4 className="text-2xl font-black text-white italic">ÓPTIMA_ 22%</h4>
                                    </div>
                                    <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                        <Server className="text-white w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeView === 'FINANCE' && <AdminFinanceDashboard />}
                {activeView === 'CONTENT' && <AdminContentSocial />}
            </AnimatePresence>
        </div>
    );
}

