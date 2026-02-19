'use client';

import { motion } from 'framer-motion';
import {
    Calendar,
    Download,
    FileText,
    Code,
    ChevronDown,
    LayoutDashboard,
    ArrowUpRight,
    Zap,
    Bot,
    Radio
} from 'lucide-react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/admin/breadcrumbs';
import { HeroMetrics } from '@/components/admin/analytics/master-hub/hero-metrics';
import { HeatmapHub } from '@/components/admin/analytics/master-hub/heatmap-hub';
import { UserJourneyFlow } from '@/components/admin/analytics/master-hub/user-journey-flow';
import { GeoDistributionMap } from '@/components/admin/analytics/master-hub/geo-distribution-map';
import { InteractionMetrics } from '@/components/admin/analytics/master-hub/interaction-metrics';

export default function AnalyticsMasterHub() {
    return (
        <div className="space-y-8 pb-20">
            <Breadcrumbs />
            {/* Header section with strategic actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-neural-blue/5 rounded-full blur-[80px] -z-10 group-hover:bg-neural-blue/10 transition-all duration-700" />

                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Master Analytics & Insights 360°</h1>
                    <div className="flex items-center gap-3 text-sm font-bold text-platinum-dim opacity-70">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Sistema LIVE • Última actualización: Justo ahora
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl border border-white/10 text-platinum-dim hover:text-white transition-all text-xs font-black uppercase tracking-widest shadow-xl">
                        <Calendar className="w-4 h-4 text-neural-blue" />
                        Últimos 30 días
                        <ChevronDown className="w-4 h-4 opacity-50" />
                    </button>

                    <div className="flex gap-2">
                        <Link href="/admin/analytics/master/attribution" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-platinum-dim hover:text-white transition-all shadow-lg flex items-center gap-2 group/btn" title="Atribución">
                            <Zap className="w-4 h-4 text-primary group-hover/btn:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Atribución</span>
                        </Link>
                        <Link href="/admin/analytics/master/automation" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-platinum-dim hover:text-white transition-all shadow-lg flex items-center gap-2 group/btn" title="Automatización">
                            <Bot className="w-4 h-4 text-primary group-hover/btn:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">IA Protocol</span>
                        </Link>
                        <Link href="/admin/analytics/master/war-room" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-platinum-dim hover:text-white transition-all shadow-lg flex items-center gap-2 group/btn" title="War Room">
                            <Radio className="w-4 h-4 text-red-500 group-hover/btn:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">War Room</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}

            {/* 1. Hero Summary Metrics */}
            <HeroMetrics />

            {/* 2. Advanced Visualizations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 h-[600px]">
                    <HeatmapHub />
                </div>
                <div className="lg:col-span-8 h-[600px]">
                    <UserJourneyFlow />
                </div>
            </div>

            {/* 3. Deep Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
                <div className="lg:col-span-7 h-[500px]">
                    <InteractionMetrics />
                </div>
                <div className="lg:col-span-5 h-[500px]">
                    <GeoDistributionMap />
                </div>
            </div>

            {/* Strategic Advisory Banner */}
            <div className="bg-gradient-to-r from-neural-blue/20 via-purple-600/20 to-neural-blue/20 p-1 rounded-3xl group cursor-pointer shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-white/5 group-hover:opacity-0 transition-opacity" />
                <div className="bg-deep-space/60 backdrop-blur-3xl p-8 rounded-[1.4rem] flex flex-col lg:flex-row items-center justify-between gap-6 relative">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neural-blue to-purple-600 flex items-center justify-center text-white shadow-glow">
                            <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform duration-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tighter mb-1">Optimización Basada en Datos_</h3>
                            <p className="text-platinum-dim font-bold opacity-70">Detectamos una oportunidad para aumentar la conversión en un +15% automatizando el copy del checkout.</p>
                        </div>
                    </div>
                    <button className="px-8 py-4 bg-neural-blue hover:bg-neural-blue/80 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-glow whitespace-nowrap">
                        Activar IA Autónoma
                    </button>
                </div>
            </div>
        </div>
    );
}
