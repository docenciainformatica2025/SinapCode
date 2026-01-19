'use client';

import { useState, useEffect } from 'react';
import { Users, DollarSign, BookOpen, Activity, TrendingUp, Zap } from 'lucide-react';
import { StatCard } from '@/components/admin/stat-card';
import { RevenueChart } from '@/components/admin/charts/revenue-chart';
import { HeatmapWidget } from '@/components/admin/charts/heatmap-widget';
import { KPIGrid } from '@/components/admin/charts/kpi-grid';
import { SystemStatus } from '@/components/admin/system-status';
import { AlertsPanel } from '@/components/admin/alerts-panel';
import { QuickActions } from '@/components/admin/quick-actions';
import { AdminHeader } from '@/components/admin/header';

export default function AdminPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        newUsers24h: 0,
        activeUsers24h: 0,
        activeCourses: 0,
        totalRevenue: 0,
        liveUsers: 0,
        apiLatency: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/dashboard/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data.stats);
                }
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            {/* Header */}
            <AdminHeader
                title="Mission Control"
                description="Panel de administración enterprise con analytics en tiempo real"
            />

            {/* Quick Actions */}
            <QuickActions />

            {/* Primary KPIs */}
            <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent-gold rounded-full"></span>
                    Métricas Principales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Usuarios Totales"
                        value={stats.totalUsers}
                        change={0} // TODO: Implement historical check
                        trend="neutral"
                        icon={<Users className="h-5 w-5 text-neural-blue" />}
                        status="healthy"
                    />
                    <StatCard
                        title="Ingresos Estimados"
                        value={stats.totalRevenue}
                        change={0}
                        trend="neutral"
                        format="currency"
                        icon={<DollarSign className="h-5 w-5 text-emerald-400" />}
                        status="healthy"
                    />
                    <StatCard
                        title="Cursos Activos"
                        value={stats.activeCourses}
                        change={0}
                        trend="neutral"
                        icon={<BookOpen className="h-5 w-5 text-synapse-purple" />}
                        status="healthy"
                    />
                    <StatCard
                        title="Tasa de Conversión"
                        value={stats.totalUsers > 0 ? ((stats.activeUsers24h / stats.totalUsers) * 100).toFixed(1) : 0}
                        change={0}
                        trend="neutral"
                        format="percentage"
                        icon={<TrendingUp className="h-5 w-5 text-amber-400" />}
                        status="warning"
                    />
                </div>
            </div>

            {/* Secondary KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Usuarios Activos (24h)"
                    value={stats.activeUsers24h}
                    change={0}
                    trend="neutral"
                    icon={<Activity className="h-4 w-4 text-neural-blue" />}
                />
                <StatCard
                    title="Nuevos Registros (24h)"
                    value={stats.newUsers24h}
                    change={0}
                    trend="neutral"
                    icon={<Users className="h-4 w-4 text-emerald-400" />}
                />
                <StatCard
                    title="Tiempo Respuesta API"
                    value={`${stats.apiLatency || '-'}ms`}
                    change={0}
                    trend="neutral"
                    icon={<Zap className="h-4 w-4 text-accent-gold" />}
                    status="healthy"
                />
            </div>

            {/* Financial Performance */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent-gold rounded-full"></span>
                    Rendimiento Financiero
                </h3>
                {/* KPIGrid might still have mocked data inside, limiting scope to what we can control now */}
                <KPIGrid />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart />
                <HeatmapWidget />
            </div>

            {/* System Health */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                    Estado del Sistema
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/10">
                        <h4 className="text-lg font-bold text-white mb-6">Infraestructura</h4>
                        <div className="space-y-2">
                            <SystemStatus label="Next.js Frontend" status="online" responseTime={45} />
                            <SystemStatus label="NestJS API" status="online" responseTime={120} />
                            <SystemStatus label="PostgreSQL Database" status="online" responseTime={8} />
                            <SystemStatus label="Redis Cache" status="online" responseTime={2} />
                            <SystemStatus label="AI Service (OpenAI)" status="online" responseTime={850} />
                            <SystemStatus label="CDN (Vercel)" status="online" responseTime={15} />
                        </div>
                    </div>

                    <AlertsPanel />
                </div>
            </div>

            {/* Users Live Section - Replaced Mock with Real Data Indicator */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Usuarios en Vivo</h3>
                    <span className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        LIVE
                    </span>
                </div>
                <div className="mt-4 flex items-center gap-4">
                    <div className="text-4xl font-bold text-white">{stats.liveUsers}</div>
                    <div className="text-sm text-platinum-dim">Usuarios Online ahora</div>
                </div>
            </div>
        </div>
    );
}
