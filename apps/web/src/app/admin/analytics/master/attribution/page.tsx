'use client';

import { Breadcrumbs } from '@/components/admin/breadcrumbs';
import {
    Download,
    Calendar,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    DownloadCloud
} from 'lucide-react';
import { AttributionChannelChart } from '@/components/admin/analytics/master-hub/attribution/channel-chart';
import { AttributionEfficiencyBars } from '@/components/admin/analytics/master-hub/attribution/efficiency-bars';
import { UTMCampaignTable } from '@/components/admin/analytics/master-hub/attribution/utm-campaign-table';
import { motion } from 'framer-motion';

export default function TrafficAttributionPage() {
    return (
        <div className="space-y-8 pb-20">
            <Breadcrumbs />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
                        Atribución de <span className="text-primary">Tráfico</span>
                    </h1>
                    <p className="text-slate-400 font-medium mt-1">Análisis ejecutivo de canales de adquisición y ROI estratégico.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 rounded-2xl">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-slate-300">Oct 1 - Oct 31, 2023</span>
                    </div>
                    <button className="flex items-center gap-2 bg-primary hover:brightness-110 text-black px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-lg shadow-primary/20">
                        <Download className="w-4 h-4" />
                        EXPORTAR REPORTE
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Tráfico Total', value: '128.4k', trend: '+12.5%', isUp: true, color: 'primary' },
                    { label: 'CAC Promedio', value: '$45.20', trend: '+2.1%', isUp: false, color: 'purple' },
                    { label: 'Inscritos Reales', value: '3,842', trend: '+8.4%', isUp: true, color: 'cyan' },
                    { label: 'ROI Marketing', value: '420%', trend: '+15.2%', isUp: true, color: 'gold' }
                ].map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel-nexus rounded-[2rem] p-6 border border-white/5 bg-white/5 backdrop-blur-xl relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{kpi.label}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-black ${kpi.isUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                }`}>
                                {kpi.isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                {kpi.trend}
                            </span>
                        </div>
                        <h3 className="text-3xl font-black text-white tracking-tighter">{kpi.value}</h3>
                        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full bg-primary w-2/3 rounded-full opacity-50`}></div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Middle Grid */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-4 h-full">
                    <AttributionChannelChart />
                </div>
                <div className="col-span-12 xl:col-span-8">
                    <AttributionEfficiencyBars />
                </div>
            </div>

            {/* Campaign Table Section */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8">
                    <UTMCampaignTable />
                </div>
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* App Download Origin Widget */}
                    <div className="glass-panel-nexus rounded-[2.5rem] p-8 border border-white/5 bg-white/5 backdrop-blur-xl">
                        <h4 className="text-xl font-bold text-white mb-6 tracking-tight">Origen de Descargas App</h4>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400 font-medium">Web (PWA / Directo)</span>
                                    <span className="font-bold text-white">68%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[68%] rounded-full shadow-[0_0_10px_#0df2f2]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400 font-medium">App Store / Play Store</span>
                                    <span className="font-bold text-white">32%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-[32%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/5 text-center">
                            <div className="size-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                <DownloadCloud className="w-8 h-8 text-primary" />
                            </div>
                            <h5 className="text-white font-bold">Total App Installs</h5>
                            <p className="text-2xl font-black text-primary mt-1">12,482</p>
                        </div>
                    </div>

                    {/* Regions Snapshot */}
                    <div className="glass-panel-nexus rounded-[2.5rem] p-8 border border-white/5 bg-white/5 backdrop-blur-xl h-[300px] relative overflow-hidden group">
                        <h4 className="text-xl font-bold text-white mb-4 tracking-tight">Regiones Top</h4>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale group-hover:grayscale-0 transition-all duration-1000"></div>
                        <div className="relative z-10 flex flex-col justify-end h-full">
                            <ul className="space-y-2 mb-4">
                                <li className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400">Norteamérica</span>
                                    <span className="text-primary font-bold">45%</span>
                                </li>
                                <li className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400">Latinoamérica</span>
                                    <span className="text-slate-200 font-bold">30%</span>
                                </li>
                                <li className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400">Europa</span>
                                    <span className="text-slate-200 font-bold">25%</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-300 hover:bg-white/10 transition-all uppercase tracking-widest">
                                Ver Mapa Completo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
