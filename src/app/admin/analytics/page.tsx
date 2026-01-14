'use client';

import { Breadcrumbs } from '@/components/admin/breadcrumbs';
import { UsageChart } from '@/components/admin/analytics/usage-chart';
import { PerformanceMetrics } from '@/components/admin/analytics/performance-metrics';
import { ExportReports } from '@/components/admin/analytics/export-reports';

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <Breadcrumbs />

            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
                <p className="text-platinum-dim">Métricas y análisis de la plataforma</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UsageChart />
                <PerformanceMetrics />
            </div>

            <ExportReports />
        </div>
    );
}
