'use client';

import { motion } from 'framer-motion';

export function RevenueChart() {
    // Mock Data for 12 months (0-100 scale relative)
    const dataPoints = [20, 35, 30, 45, 60, 55, 75, 80, 70, 85, 90, 100];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Calculate path
    const width = 800;
    const height = 300;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

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
                    <h3 className="text-xl font-bold text-white">Revenue Growth (MRR)</h3>
                    <p className="text-sm text-platinum-dim">Monthly Recurring Revenue</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-emerald-400 font-bold">+24.5%</span>
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
                        <span key={idx} style={{ width: `${100 / 12}%`, textAlign: 'center' }}>{label}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
