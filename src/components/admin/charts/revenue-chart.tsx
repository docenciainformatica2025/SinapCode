'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function RevenueChart() {
    const [data, setData] = useState<{ name: string, revenue: number }[]>([]);
    const [growth, setGrowth] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/analytics/financial');
                if (res.ok) {
                    const json = await res.json();
                    setData(json.data);
                    setGrowth(Number(json.meta.growth));
                }
            } catch (error) {
                console.error('Failed to load chart data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || data.length === 0) {
        return (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 w-full h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    // Transform Data for SVG
    const labels = data.map(d => d.name);
    const revenues = data.map(d => d.revenue);
    const maxVal = Math.max(...revenues, 100); // Scale based on max revenue, min 100 default

    const width = 800;
    const height = 300;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const dataPoints = revenues.map(val => (val / maxVal) * 100); // Normalize to 0-100 for drawing logic

    // Points logic
    const points = dataPoints.map((val, idx) => {
        const x = padding + (idx * (chartWidth / (dataPoints.length - 1)));
        const y = padding + chartHeight - (val / 100 * chartHeight);
        return `${x},${y}`;
    }).join(' ');

    const fillPath = `${padding},${padding + chartHeight} ${points} ${padding + chartWidth},${padding + chartHeight}`;

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 w-full overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white">Crecimiento de Ingresos (Semestral)</h3>
                    <p className="text-sm text-platinum-dim">Ingresos procesados últimos 6 meses</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${growth >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                    <span className={`${growth >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-bold`}>
                        {growth > 0 ? '+' : ''}{growth}%
                    </span>
                </div>
            </div>

            <div className="relative w-full aspect-[21/9]">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Grid Lines */}
                    {[0, 1, 2, 3, 4].map(i => {
                        const y = padding + (i * (chartHeight / 4));
                        return (
                            <line
                                key={i}
                                x1={padding}
                                y1={y}
                                x2={width - padding}
                                y2={y}
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth="1"
                            />
                        )
                    })}

                    {/* Gradient Defs */}
                    <defs>
                        <linearGradient id="gradientDetails" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <motion.path
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: 1, pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        d={`M${fillPath}`}
                        fill="url(#gradientDetails)"
                        stroke="none"
                    />

                    {/* Line Path */}
                    <motion.polyline
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={points}
                        filter="drop-shadow(0px 0px 8px rgba(59, 130, 246, 0.5))"
                    />

                    {/* Points */}
                    {dataPoints.map((val, idx) => {
                        const x = padding + (idx * (chartWidth / (dataPoints.length - 1)));
                        const y = padding + chartHeight - (val / 100 * chartHeight);
                        return (
                            <motion.circle
                                key={idx}
                                cx={x}
                                cy={y}
                                r="4"
                                fill="#fff"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 + (idx * 0.1) }}
                            />
                        )
                    })}
                </svg>

                {/* X Axis Labels */}
                <div className="flex justify-between px-2 mt-2 text-xs text-platinum-dim font-mono">
                    {labels.map((label, idx) => (
                        <span key={idx} style={{ width: `${100 / labels.length}%`, textAlign: 'center' }}>{label}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
