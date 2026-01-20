'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    DollarSign,
    Activity,
    TrendingUp,
    Globe,
    Server,
    ShieldCheck,
    Cpu
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

// Registrar componentes de Chart.js
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

export default function AdminDashboard() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Configuración de la Gráfica
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        family: "'Inter', sans-serif"
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#FFD700',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 10,
            }
        },
        scales: {
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            }
        }
    };

    const chartData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Usuarios Activos',
                data: [120, 190, 300, 500, 800, 1200, 2400],
                borderColor: '#FFD700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Ingresos ($)',
                data: [800, 1500, 3200, 4500, 6000, 8500, 12500],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const stats = [
        {
            label: 'Usuarios Totales',
            value: '2.4k',
            change: '+12%',
            trend: 'up',
            icon: Users,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            border: 'border-blue-400/20'
        },
        {
            label: 'Ingresos Mensuales',
            value: '$12.5k',
            change: '+8.2%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-green-400',
            bg: 'bg-green-400/10',
            border: 'border-green-400/20'
        },
        {
            label: 'Blogs Publicados',
            value: '42',
            change: '+3',
            trend: 'up',
            icon: Globe,
            color: 'text-purple-400',
            bg: 'bg-purple-400/10',
            border: 'border-purple-400/20'
        },
        {
            label: 'Estado del Sistema',
            value: '99.9%',
            change: 'Normal',
            trend: 'neutral',
            icon: Server,
            color: 'text-gold',
            bg: 'bg-gold/10',
            border: 'border-gold/20'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                    Panel de Control <span className="text-gold">Master</span>
                </h1>
                <p className="text-muted flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    Sistema Operativo SinapCode v2.2 - Estado Óptimo
                </p>
            </motion.div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className={`bg-surface/50 backdrop-blur-sm p-6 rounded-2xl border ${stat.border} hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${stat.trend === 'up' ? 'text-green-400 bg-green-400/10' : 'text-gray-400 bg-gray-400/10'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                            <div className="text-sm text-platinum-dim font-medium">{stat.label}</div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Chart & Activity Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 bg-surface/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 shadow-xl"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-gold" />
                            Crecimiento y Métricas
                        </h2>
                        <select className="bg-black/30 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none focus:border-gold/50 transition">
                            <option>Últimos 7 meses</option>
                            <option>Este año</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <Line options={chartOptions} data={chartData} />
                    </div>
                </motion.div>

                {/* System Health Section */}
                <motion.div
                    variants={itemVariants}
                    className="bg-surface/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 shadow-xl flex flex-col"
                >
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-neural-blue" />
                        Salud del Núcleo
                    </h2>

                    <div className="space-y-6 flex-1">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-platinum-dim">CPU Core (aws-east-2)</span>
                                <span className="text-white font-mono">45%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "45%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-platinum-dim">RAM Usage (32GB)</span>
                                <span className="text-white font-mono">62%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "62%" }}
                                    transition={{ duration: 1, delay: 0.7 }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-platinum-dim">Database Connections</span>
                                <span className="text-white font-mono">85/100</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "85%" }}
                                    transition={{ duration: 1, delay: 0.9 }}
                                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 mt-6">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mt-1.5" />
                            <div>
                                <p className="text-emerald-400 text-sm font-bold">Todos los sistemas operativos</p>
                                <p className="text-emerald-400/70 text-xs mt-1">Último escaneo: hace 30s</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
                variants={itemVariants}
                className="bg-surface/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 shadow-xl"
            >
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-gold" />
                    Bitácora de Eventos
                </h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition group cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
                                <Users className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-white text-sm font-medium">Nuevo estudiante registrado: <span className="text-blue-300">Juan Pérez</span></p>
                                <p className="text-xs text-muted mt-0.5">ID: usr_8923 • Plan Gratuito</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-platinum-dim">Hace {i * 15 + 2} min</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
