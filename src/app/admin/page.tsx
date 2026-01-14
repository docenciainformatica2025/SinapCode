'use client';

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
                        value={2847}
                        change={18.2}
                        trend="up"
                        icon={<Users className="h-5 w-5 text-neural-blue" />}
                        status="healthy"
                    />
                    <StatCard
                        title="Revenue (MRR)"
                        value={45890}
                        change={12.5}
                        trend="up"
                        format="currency"
                        icon={<DollarSign className="h-5 w-5 text-emerald-400" />}
                        status="healthy"
                    />
                    <StatCard
                        title="Cursos Activos"
                        value={156}
                        change={8.3}
                        trend="up"
                        icon={<BookOpen className="h-5 w-5 text-synapse-purple" />}
                        status="healthy"
                    />
                    <StatCard
                        title="Tasa de Conversión"
                        value={24.8}
                        change={-2.1}
                        trend="down"
                        format="percentage"
                        icon={<TrendingUp className="h-5 w-5 text-amber-400" />}
                        status="warning"
                    />
                </div>
            </div>

            {/* Secondary KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Usuarios Activos Hoy"
                    value={1234}
                    change={5.2}
                    trend="up"
                    icon={<Activity className="h-4 w-4 text-neural-blue" />}
                />
                <StatCard
                    title="Nuevos Registros (24h)"
                    value={89}
                    change={15.8}
                    trend="up"
                    icon={<Users className="h-4 w-4 text-emerald-400" />}
                />
                <StatCard
                    title="API Response Time"
                    value="45ms"
                    change={-12.3}
                    trend="up"
                    icon={<Zap className="h-4 w-4 text-accent-gold" />}
                    status="healthy"
                />
            </div>

            {/* Financial Performance */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent-gold rounded-full"></span>
                    Financial Performance
                </h3>
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
                    System Health
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/10">
                        <h4 className="text-lg font-bold text-white mb-6">Infrastructure Status</h4>
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

            {/* Performance Validation */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent-gold rounded-full"></span>
                    Performance Validation (Lighthouse)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-emerald-400 mb-2">95</div>
                        <div className="text-sm text-platinum-dim">Performance</div>
                        <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: '95%' }}></div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold text-emerald-400 mb-2">100</div>
                        <div className="text-sm text-platinum-dim">Accessibility</div>
                        <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold text-emerald-400 mb-2">100</div>
                        <div className="text-sm text-platinum-dim">Best Practices</div>
                        <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold text-emerald-400 mb-2">98</div>
                        <div className="text-sm text-platinum-dim">SEO</div>
                        <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: '98%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
