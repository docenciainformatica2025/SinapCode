'use client';

import { Breadcrumbs } from '@/components/admin/breadcrumbs';
import { MarketingROIDashboard } from '@/components/admin/analytics/marketing-roi-dashboard';
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
                console.error('Error al obtener analíticas:', error);
                toast.error('Error al cargar analíticas');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <div className="space-y-12 pb-20">
            <Breadcrumbs />

            {/* Marketing ROI Panel - The new Star Component */}
            <MarketingROIDashboard />

            <div className="pt-12 border-t border-white/5">
                <h3 className="text-2xl font-black text-white mb-8 tracking-tighter italic">Analíticas de <span className="text-primary">Uso_</span></h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <UsageChart data={analyticsData?.usage || null} />
                    <PerformanceMetrics />
                </div>
            </div>

            <ExportReports />
        </div>
    );
}
