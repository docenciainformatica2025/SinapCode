'use client';

import { Breadcrumbs } from '@/components/admin/breadcrumbs';
import { UsageChart } from '@/components/admin/analytics/usage-chart';
import { PerformanceMetrics } from '@/components/admin/analytics/performance-metrics';
import { ExportReports } from '@/components/admin/analytics/export-reports';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function AnalyticsPage() {
    const [analyticsData, setAnalyticsData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch('/api/admin/analytics');
                if (res.ok) {
                    const data = await res.json();
                    setAnalyticsData(data);
                }
            } catch (error) {
                console.error('Error fetching analytics:', error);
                toast.error('Error al cargar analíticas');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <div className="space-y-8">
            <Breadcrumbs />

            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
                <p className="text-platinum-dim">Métricas y análisis de la plataforma en tiempo real</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UsageChart data={analyticsData?.usage || null} />
                <PerformanceMetrics />
            </div>

            <ExportReports />
        </div>
    );
}
