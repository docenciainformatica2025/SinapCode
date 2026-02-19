'use client';

import { motion } from 'framer-motion';
import {
    Users,
    TrendingUp,
    Target,
    Share2,
    ArrowUpRight,
    Linkedin,
    Twitter,
    Instagram,
    ExternalLink,
    Clock
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// --- MOCK DATA ---
const KPI_DATA = [
    { title: 'Total Reach', value: '1.2M', growth: '+15%', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Engagement Rate', value: '8.5%', growth: '+2.1%', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { title: 'Lead Conv. (Social)', value: '3.2%', growth: '+0.5%', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { title: 'Top Network', value: 'LinkedIn', label: '45% total leads', icon: Linkedin, color: 'text-sky-500', bg: 'bg-sky-500/10' }
];

const RECENT_POSTS = [
    { title: 'Mastering Python with AI', platform: 'LinkedIn', clicks: '2.1K', shares: '450', roi: '$5.8K', status: 'high' },
    { title: 'Intro to Neural Networks', platform: 'TikTok', clicks: '4.5K', shares: '1.2K', roi: '$3.2K', status: 'medium' },
    { title: 'AI for Business Leaders', platform: 'X', clicks: '1.8K', shares: '320', roi: '$4.5K', status: 'high' }
];

const HEATMAP_HOURS = ['2 AM', '6 AM', '8 AM', '10 AM', '12 PM', '4 PM', '6 PM', '24 PM'];
const HEATMAP_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

// --- COMPONENTS ---

interface HeatmapCellProps {
    intensity: number;
}

function HeatmapCell({ intensity }: HeatmapCellProps) {
    // Professional Teal to Red gradient mapping
    // Low: #4fd1c5 (teal-400)
    // High: #f56565 (red-500)
    const getBgColor = (val: number) => {
        if (val > 0.8) return 'bg-[#f56565]'; // High - Red
        if (val > 0.6) return 'bg-[#ed8936]'; // Mid-High - Orange
        if (val > 0.4) return 'bg-[#ecc94b]'; // Mid - Yellow
        if (val > 0.2) return 'bg-[#4fd1c5]'; // Mid-Low - Teal
        return 'bg-[#2d3748]'; // Low - Slate
    };

    return (
        <div
            className={`aspect-square rounded-sm ${getBgColor(intensity)} transition-colors duration-500 hover:ring-1 hover:ring-white/20`}
            title={`Intensity: ${(intensity * 100).toFixed(0)}%`}
        />
    );
}

function HeatmapGrid({ rows, cols }: { rows: number; cols: number }) {
    return (
        <div className={`grid gap-0.5 w-full`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {Array.from({ length: rows * cols }).map((_, i) => {
                // Generate semi-random pattern for demonstration
                const intensity = (Math.sin(i * 0.2) + 1) / 2 * Math.random();
                return <HeatmapCell key={i} intensity={intensity} />;
            })}
        </div>
    );
}

export function MarketingROIDashboard() {

    const performanceData = {
        labels: ['AI Content (9.2%)', 'Manual Content (6.5%)'],
        datasets: [
            {
                label: 'Avg. Engagement Rate',
                data: [9.2, 6.5],
                backgroundColor: ['#197fe6', '#4a5568'],
                borderRadius: 4,
            }
        ]
    };

    const roiData = {
        labels: ['AI Content ($4.2K)', 'Manual Content ($2.8K)'],
        datasets: [
            {
                label: 'Avg. Enrollment ROI',
                data: [4200, 2800],
                backgroundColor: ['#197fe6', '#4a5568'],
                borderRadius: 4,
            }
        ]
    };

    const trendData = {
        labels: Array.from({ length: 20 }, (_, i) => i + 1),
        datasets: [
            {
                label: 'Engagement Trend',
                data: [35, 42, 38, 55, 62, 58, 75, 82, 70, 85, 95, 88, 72, 80, 90, 85, 78, 92, 105, 98],
                borderColor: '#197fe6',
                backgroundColor: 'rgba(25, 127, 230, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }
        ]
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tighter italic">
                        MARKTETING & <span className="text-primary">ROI_</span>
                    </h2>
                    <p className="text-platinum-dim font-medium uppercase text-[10px] tracking-widest mt-1">Análisis de Impacto Neuronales</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors shadow-2xl">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm text-white font-bold tracking-tight">Last 30 Days</span>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {KPI_DATA.map((kpi, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all group shadow-2xl"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${kpi.bg}`}>
                                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                            </div>
                            {kpi.growth && (
                                <div className="flex items-center gap-0.5 text-emerald-400 text-[10px] font-black">
                                    <ArrowUpRight className="w-3 h-3" />
                                    {kpi.growth}
                                </div>
                            )}
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest">{kpi.title}</p>
                            <h3 className="text-2xl font-black text-white tracking-tighter italic">{kpi.value}</h3>
                            {kpi.label && <p className="text-[9px] text-platinum-dim italic font-medium opacity-60">{kpi.label}</p>}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Heatmap Section */}
                <div className="lg:col-span-12 xl:col-span-8 bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                    <h4 className="text-lg font-black text-white mb-8 tracking-tighter italic uppercase">User Interaction Heatmap <span className="text-platinum-dim text-[10px] uppercase font-bold tracking-widest opacity-40">(Weekly)</span></h4>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* By Hour of Day */}
                        <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 opacity-70">By Hour of Day</h5>
                            <div className="flex gap-4">
                                <div className="flex flex-col justify-between text-[8px] font-black text-platinum-dim h-[160px] py-1 opacity-40">
                                    {HEATMAP_HOURS.map(h => <span key={h}>{h}</span>)}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <HeatmapGrid rows={8} cols={12} />
                                    <div className="flex justify-between text-[8px] font-black text-platinum-dim px-1 opacity-40">
                                        {[12, 8, 10, 12, 4, 6, 12].map((n, i) => <span key={i}>{n}</span>)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* By Day of Week */}
                        <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 opacity-70">By Day of Week</h5>
                            <div className="flex gap-4">
                                <div className="flex flex-col justify-between text-[8px] font-black text-platinum-dim h-[160px] py-1 opacity-40">
                                    {HEATMAP_DAYS.map(d => <span key={d}>{d}</span>)}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <HeatmapGrid rows={5} cols={10} />
                                    <div className="flex justify-between text-[8px] font-black text-platinum-dim px-1 opacity-40">
                                        {HEATMAP_DAYS.map(d => <span key={d}>{d}</span>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pro Legend */}
                    <div className="flex items-center gap-12 mt-10 pt-8 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <span className="text-[8px] font-black text-platinum-dim uppercase tracking-widest opacity-60">Intensity Level:</span>
                            <div className="flex items-center gap-1 h-3">
                                <span className="text-[8px] font-black text-platinum-dim uppercase opacity-40">Low</span>
                                <div className="flex h-1.5 w-32 rounded-full overflow-hidden bg-white/5 border border-white/5">
                                    <div className="w-[20%] bg-[#4fd1c5]" />
                                    <div className="w-[30%] bg-[#ecc94b]" />
                                    <div className="w-[30%] bg-[#ed8936]" />
                                    <div className="w-[20%] bg-[#f56565]" />
                                </div>
                                <span className="text-[8px] font-black text-platinum-dim uppercase opacity-40">High</span>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Real-time Data Active</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar: AI Posts Table */}
                <div className="lg:col-span-12 xl:col-span-4 bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl h-full">
                    <h4 className="text-lg font-black text-white mb-8 tracking-tighter italic uppercase">Recent AI-Generated Posts_</h4>
                    <div className="space-y-2">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-2 pb-3 mb-3 border-b border-white/5 px-2">
                            <div className="col-span-6 text-[8px] font-black text-platinum-dim uppercase tracking-widest">Post Title</div>
                            <div className="col-span-2 text-[8px] font-black text-platinum-dim uppercase tracking-widest text-center">Clicks</div>
                            <div className="col-span-2 text-[8px] font-black text-platinum-dim uppercase tracking-widest text-center">ROI</div>
                            <div className="col-span-2 text-[8px] font-black text-platinum-dim uppercase tracking-widest text-center">Platform</div>
                        </div>
                        {RECENT_POSTS.map((post, i) => (
                            <div key={i} className="grid grid-cols-12 gap-2 py-3 px-2 rounded-xl hover:bg-white/5 transition-all group items-center">
                                <div className="col-span-6">
                                    <p className="text-[10px] font-bold text-white group-hover:text-primary transition-colors leading-tight">{post.title}</p>
                                </div>
                                <div className="col-span-2 text-center text-[10px] font-black text-platinum">{post.clicks}</div>
                                <div className="col-span-2 text-center text-[10px] font-black text-emerald-400 italic">{post.roi}</div>
                                <div className="col-span-2 flex justify-center">
                                    {post.platform === 'LinkedIn' ? <Linkedin className="w-3.5 h-3.5 text-sky-400" /> :
                                        post.platform === 'X' ? <Twitter className="w-3.5 h-3.5 text-white" /> :
                                            <Instagram className="w-3.5 h-3.5 text-pink-400" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-platinum-dim hover:text-white hover:bg-white/10 transition-all">
                        Generate Optimization Report
                    </button>
                </div>
            </div>

            {/* Performance Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <h4 className="text-lg font-black text-white tracking-tighter italic uppercase">Daily Engagement Trend_</h4>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-[9px] font-black text-platinum-dim uppercase tracking-widest">Engagement Rate %</span>
                        </div>
                    </div>
                    <div className="h-[250px] w-full">
                        <Line
                            data={trendData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: {
                                        grid: { color: 'rgba(255,255,255,0.02)' },
                                        ticks: { color: 'rgba(255,255,255,0.2)', font: { size: 8 } }
                                    },
                                    x: {
                                        grid: { display: false },
                                        ticks: { color: 'rgba(255,255,255,0.2)', font: { size: 8 } }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
                    <div>
                        <h4 className="text-lg font-black text-white mb-2 tracking-tighter italic uppercase">AI Content vs Manual_</h4>
                        <p className="text-[9px] text-platinum-dim uppercase font-black tracking-widest opacity-40 mb-10">Performance Benchmarking</p>
                    </div>

                    <div className="space-y-10">
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[9px] font-black text-white uppercase tracking-widest">Avg. Engagement Rate</span>
                                <span className="text-[9px] font-black text-primary italic">+41% AI Lift</span>
                            </div>
                            <div className="h-[90px] w-full">
                                <Bar
                                    data={performanceData}
                                    options={{
                                        indexAxis: 'y' as const,
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: { legend: { display: false } },
                                        scales: {
                                            y: { grid: { display: false }, ticks: { display: false } },
                                            x: {
                                                grid: { display: false },
                                                ticks: { color: 'rgba(255,255,255,0.1)', font: { size: 8 } }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[9px] font-black text-white uppercase tracking-widest">Avg. Enrollment ROI</span>
                                <span className="text-[9px] font-black text-emerald-400 italic">50% Growth</span>
                            </div>
                            <div className="h-[90px] w-full">
                                <Bar
                                    data={roiData}
                                    options={{
                                        indexAxis: 'y' as const,
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: { legend: { display: false } },
                                        scales: {
                                            y: { grid: { display: false }, ticks: { display: false } },
                                            x: {
                                                grid: { display: false },
                                                ticks: { color: 'rgba(255,255,255,0.1)', font: { size: 8 } }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
