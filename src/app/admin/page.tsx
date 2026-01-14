'use client';

import { RevenueChart } from '@/components/admin/charts/revenue-chart';
import { HeatmapWidget } from '@/components/admin/charts/heatmap-widget';
import { KPIGrid } from '@/components/admin/charts/kpi-grid';
import { VerifiedBadge } from '@/components/badges/verified-badge';
import { MetricCard } from '@/components/admin/metric-card';
import { SystemStatus } from '@/components/admin/system-status';
import { AlertsPanel } from '@/components/admin/alerts-panel';
import { Breadcrumbs } from '@/components/admin/breadcrumbs';
import { QuickActions } from '@/components/admin/quick-actions';

export default function AdminPage() {
    return (
        <div className="space-y-8">
            {/* Breadcrumbs */}
            <Breadcrumbs />
            {/* Header */}
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold text-white">Mission Control</h2>
                        <VerifiedBadge type="security" title="ISO 27001 Auditor" date="2026" />
                    </div>
                    <p className="text-platinum-dim">Real-time system monitoring & analytics</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg bg-white/5 text-sm hover:bg-white/10 border border-white/5 transition">
                        📊 Export Report
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-brain-spark text-white text-sm font-semibold shadow-neon-blue hover:brightness-110 transition animate-pulse-slow">
                        🔴 Live Monitor
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Financial KPIs */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent-gold rounded-full"></span>
                    Financial Performance
                </h3>
                <KPIGrid />
            </div>

            {/* Main Visuals: Revenue & Heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart />
                <HeatmapWidget />
            </div>

            {/* System Health Overview */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                    System Health
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard
                        title="API Response Time"
                        value="45ms"
                        change="-12% vs yesterday"
                        trend="up"
                        icon="⚡"
                        status="healthy"
                    />
                    <MetricCard
                        title="Active Users"
                        value="2,847"
                        change="+18% this week"
                        trend="up"
                        icon="👥"
                        status="healthy"
                    />
                    <MetricCard
                        title="Error Rate"
                        value="0.03%"
                        change="Within threshold"
                        trend="neutral"
                        icon="🛡️"
                        status="healthy"
                    />
                    <MetricCard
                        title="Cache Hit Rate"
                        value="94.2%"
                        change="+2.1% optimization"
                        trend="up"
                        icon="💾"
                        status="healthy"
                    />
                </div>
            </div>

            {/* Services Status & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-6">Infrastructure Status</h3>
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

            {/* Performance Validation (Lighthouse) */}
            <div className="glass-panel p-6 rounded-2xl">
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
