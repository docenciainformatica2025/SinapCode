'use client';

import { motion } from 'framer-motion';
import {
    Zap,
    ArrowRight,
    TrendingUp,
    ArrowUp,
    ArrowDown,
    Layers,
    School,
    Rss,
    Briefcase,
    Globe,
    Linkedin,
    Search,
    Link as LinkIcon,
    Users,
    MousePointer2,
    Timer,
    Plus,
    Calendar,
    Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { Breadcrumbs } from '@/components/admin/breadcrumbs';

export default function ABExperimentsPage() {
    const [autonomous, setAutonomous] = useState(true);

    return (
        <div className="space-y-8 pb-20">
            <Breadcrumbs />
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Centro de Experimentos & Trazabilidad</h1>
                    <p className="text-platinum-dim font-bold opacity-60">Monitoreo de optimización por IA en tiempo real y trazabilidad del ciclo de vida del producto.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-platinum-dim hover:text-white transition-all flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                        <Calendar className="w-4 h-4 text-neural-blue" />
                        Últimos 30 días
                    </button>
                    <button className="px-6 py-3 rounded-2xl bg-neural-blue text-white shadow-glow hover:bg-neural-blue/80 transition-all flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                        <Plus className="w-4 h-4" />
                        Nuevo Experimento
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* 1. Live A/B Experiment Card */}
                <div className="col-span-12 xl:col-span-8 glass-panel-nexus rounded-[2.5rem] p-8 relative overflow-hidden group border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-neural-blue/5 rounded-full blur-[120px] -z-10" />

                    <div className="flex flex-col lg:flex-row justify-between items-start mb-10 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-neural-blue text-white tracking-widest uppercase">EN VIVO</span>
                                <h2 className="text-2xl font-black text-white tracking-tighter">Optimización Landing de Cursos V3</h2>
                            </div>
                            <p className="text-sm font-bold text-platinum-dim opacity-70">Probando copy generado por IA y layout vs Control original.</p>
                        </div>

                        {/* Autonomous Toggle */}
                        <div className="flex items-center gap-6 bg-white/5 p-3 rounded-[1.5rem] border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setAutonomous(!autonomous)}
                                    className={`w-12 h-6 rounded-full relative transition-all duration-300 ${autonomous ? 'bg-neural-blue' : 'bg-white/10'}`}
                                >
                                    <motion.div
                                        animate={{ x: autonomous ? 24 : 4 }}
                                        className="w-4 h-4 bg-white rounded-full absolute top-1"
                                    />
                                </button>
                                <span className="text-xs font-black text-white uppercase tracking-widest">Optimización Autónoma</span>
                            </div>
                            <div className="text-[10px] font-black text-neural-blue bg-neural-blue/10 px-3 py-1.5 rounded-full border border-neural-blue/20 flex items-center gap-2">
                                <Sparkles className="w-3 h-3" />
                                IA ACTIVADA
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Variant A: Original */}
                        <div className="relative rounded-3xl border border-white/10 bg-deep-space/40 overflow-hidden group/variant">
                            <div className="absolute top-4 left-4 z-10 bg-deep-space/90 backdrop-blur-xl text-[9px] font-black px-3 py-1.5 rounded-full text-platinum-dim border border-white/10 uppercase tracking-widest">
                                Original (Control)
                            </div>
                            <div className="h-48 bg-slate-900 overflow-hidden opacity-40 group-hover/variant:opacity-50 transition-all duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80&w=2162"
                                    alt="Control Landing Page"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 flex justify-between items-center border-t border-white/5">
                                <div>
                                    <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-1 opacity-60">Tasa de Conversión</p>
                                    <p className="text-3xl font-black text-white tracking-tighter">2.1%</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-1 opacity-60">Tráfico</p>
                                    <p className="text-2xl font-black text-white/80 tracking-tighter">50%</p>
                                </div>
                            </div>
                        </div>

                        {/* Variant B: AI Optimized */}
                        <div className="relative rounded-3xl border-2 border-neural-blue bg-deep-space/60 overflow-hidden shadow-[0_0_50px_rgba(13,185,242,0.15)] group/ai">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-neural-blue to-purple-600" />
                            <div className="absolute top-4 left-4 z-10 bg-neural-blue backdrop-blur-xl text-[9px] font-black px-4 py-1.5 rounded-full text-white shadow-xl flex items-center gap-2 uppercase tracking-widest">
                                <Sparkles className="w-3 h-3" />
                                Optimizado por IA
                            </div>
                            <div className="h-48 bg-slate-900 overflow-hidden group-hover/ai:scale-105 transition-transform duration-700">
                                <img
                                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070"
                                    alt="AI Optimized Landing"
                                    className="w-full h-full object-cover opacity-80"
                                />
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-4 border-t border-white/10">
                                <div>
                                    <p className="text-[10px] font-black text-neural-blue uppercase tracking-widest mb-1">Tasa de Conversión</p>
                                    <div className="text-3xl font-black text-white flex items-end gap-3 tracking-tighter">
                                        3.8%
                                        <span className="text-[10px] text-emerald-400 font-black mb-1.5 flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" /> +81%
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-neural-blue/10 rounded-2xl p-3 border border-neural-blue/20 flex flex-col items-center justify-center text-center backdrop-blur-xl">
                                    <p className="text-[9px] font-black text-neural-blue uppercase tracking-widest mb-1">Impacto Total</p>
                                    <p className="text-2xl font-black text-neural-blue tracking-tighter">+15.4%</p>
                                </div>
                            </div>
                            <div className="bg-emerald-500/10 border-t border-white/5 py-2 px-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-emerald-400">99% de Relevancia Estadística</span>
                                <span className="text-platinum-dim opacity-50">Auto-despliegue en 2h 15m</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Key Metrics Summary Widgets */}
                <div className="col-span-12 md:col-span-6 xl:col-span-4 flex flex-col gap-4">
                    <div className="glass-panel-nexus rounded-[2rem] p-8 flex items-center justify-between border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl group hover:border-white/20 transition-all">
                        <div>
                            <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-2 opacity-60">Usuarios Activos Totales</p>
                            <h3 className="text-4xl font-black text-white tracking-tighter">24.5k</h3>
                            <p className="text-[10px] font-black text-emerald-400 flex items-center mt-3 gap-1">
                                <ArrowUp className="w-3 h-3" /> 12% vs semana anterior
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-3xl bg-neural-blue/10 flex items-center justify-center text-neural-blue group-hover:bg-neural-blue group-hover:text-white transition-all duration-500 shadow-glow">
                            <Users className="w-7 h-7" />
                        </div>
                    </div>

                    <div className="glass-panel-nexus rounded-[2rem] p-8 flex items-center justify-between border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl group hover:border-white/20 transition-all">
                        <div>
                            <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-2 opacity-60">Conversión Global</p>
                            <h3 className="text-4xl font-black text-white tracking-tighter">4.2%</h3>
                            <p className="text-[10px] font-black text-emerald-400 flex items-center mt-3 gap-1">
                                <ArrowUp className="w-3 h-3" /> 0.8% vs semana anterior
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-3xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 shadow-glow">
                            <MousePointer2 className="w-7 h-7" />
                        </div>
                    </div>

                    <div className="glass-panel-nexus rounded-[2rem] p-8 flex items-center justify-between border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl group hover:border-white/20 transition-all">
                        <div>
                            <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-2 opacity-60">Tiempo Medio Sesión</p>
                            <h3 className="text-4xl font-black text-white tracking-tighter">4m 12s</h3>
                            <p className="text-[10px] font-black text-red-400 flex items-center mt-3 gap-1">
                                <ArrowDown className="w-3 h-3" /> 15s vs semana anterior
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-glow">
                            <Timer className="w-7 h-7" />
                        </div>
                    </div>
                </div>

                {/* 3. Product Traceability Matrix */}
                <div className="col-span-12 lg:col-span-7 glass-panel-nexus rounded-[2.5rem] p-10 border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-black text-white tracking-tighter">Matriz de Trazabilidad_</h3>
                        <button className="text-[10px] font-black text-neural-blue hover:text-white transition-all uppercase tracking-widest flex items-center gap-2 group">
                            Ver Todos los Productos
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black text-platinum-dim uppercase tracking-widest border-b border-white/10 opacity-60">
                                    <th className="pb-6 pl-4 font-black">Producto / App</th>
                                    <th className="pb-6 font-black">Plataforma</th>
                                    <th className="pb-6 font-black">Vistas</th>
                                    <th className="pb-6 font-black">Descargas</th>
                                    <th className="pb-6 text-right pr-4 font-black">Heatmap</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { icon: School, title: 'Sinap Academy', version: 'v2.4.1', platform: 'APP MÓVIL', views: '12,405', downloads: '850', color: 'text-neural-blue', bg: 'bg-neural-blue/20', progress: 75 },
                                    { icon: Rss, title: 'Tech Blog', version: 'Ghost CMS', platform: 'WEB', views: '45,200', downloads: 'N/A', color: 'text-purple-400', bg: 'bg-purple-400/20', progress: 100 },
                                    { icon: Briefcase, title: 'Portal Empleo', version: 'React PWA', platform: 'PWA', views: '3,100', downloads: '120', color: 'text-amber-400', bg: 'bg-amber-400/20', progress: 25 },
                                ].map((row, i) => (
                                    <tr key={i} className="group hover:bg-white/5 transition-all duration-300 cursor-pointer">
                                        <td className="py-6 pl-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl ${row.bg} flex items-center justify-center ${row.color} border border-white/5 shadow-2xl`}>
                                                    <row.icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-white">{row.title}</div>
                                                    <div className="text-[10px] font-bold text-platinum-dim opacity-50">{row.version}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6">
                                            <span className="px-3 py-1.5 rounded-xl bg-white/5 text-[10px] font-black text-white border border-white/10 uppercase tracking-widest leading-none">
                                                {row.platform}
                                            </span>
                                        </td>
                                        <td className="py-6">
                                            <div className="flex flex-col gap-2">
                                                <span className="text-sm font-black text-white">{row.views}</span>
                                                <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${row.progress}%` }}
                                                        className={`h-full ${row.color.replace('text-', 'bg-')}`}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 text-sm font-black text-platinum-dim">{row.downloads}</td>
                                        <td className="py-6 text-right pr-4">
                                            <button className="text-platinum-dim hover:text-neural-blue p-3 rounded-xl hover:bg-white/5 transition-all">
                                                <Layers className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Conversion Funnel */}
                    <div className="mt-12 pt-10 border-t border-white/5 overflow-hidden">
                        <h4 className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-8 opacity-60">Embudo de Conversión General_</h4>
                        <div className="flex items-center justify-between relative px-2">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10" />

                            {[
                                { label: 'Conocimiento', value: '10,000', sub: 'Visitas', color: 'border-white/20 text-white' },
                                { label: 'Interés', value: '4,500', sub: '-55% drop', color: 'border-neural-blue/30 text-neural-blue' },
                                { label: 'Descarga', value: '850', sub: '-81% drop', color: 'border-purple-500/30 text-purple-400' },
                                { label: 'Inscripción', value: '120', sub: 'Objetivo OK', color: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]' },
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    className={`bg-deep-space/90 backdrop-blur-2xl p-5 rounded-2xl border ${step.color} w-32 shadow-3xl text-center`}
                                >
                                    <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-60">{step.label}</p>
                                    <p className="text-xl font-black">{step.value}</p>
                                    <p className="text-[8px] font-black uppercase tracking-tighter mt-1 opacity-70">{step.sub}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Origin & Sources Side Column */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                    {/* Acquisition Sources */}
                    <div className="glass-panel-nexus rounded-[2.5rem] p-10 border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl">
                        <h3 className="text-xl font-black text-white tracking-tighter mb-10">Fuentes de Adquisición_</h3>
                        <div className="space-y-8">
                            {[
                                { icon: Linkedin, label: 'LinkedIn', percentage: 40, color: 'bg-[#0077b5]', iconColor: 'text-[#0077b5]' },
                                { icon: Search, label: 'Google Search', percentage: 30, color: 'bg-white', iconColor: 'text-white' },
                                { icon: LinkIcon, label: 'Directo / Otros', percentage: 30, color: 'bg-neural-blue', iconColor: 'text-neural-blue' },
                            ].map((source, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center ${source.iconColor}`}>
                                            <source.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-black text-white">{source.label}</span>
                                    </div>
                                    <div className="flex items-center gap-6 flex-1 justify-end ml-10">
                                        <div className="flex-1 max-w-[120px] h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${source.percentage}%` }}
                                                className={`h-full ${source.color}`}
                                            />
                                        </div>
                                        <span className="text-sm font-black text-white w-8 text-right tracking-tighter">{source.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Geo visualization map mini */}
                    <div className="glass-panel-nexus rounded-[2.5rem] p-0 overflow-hidden flex-1 relative border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl min-h-[300px]">
                        <div className="absolute top-8 left-8 z-10">
                            <h3 className="text-xl font-black text-white tracking-tighter mb-1">Origen de Usuarios_</h3>
                            <p className="text-[10px] font-black text-platinum-dim opacity-60 uppercase tracking-widest">Descargas en tiempo real</p>
                        </div>

                        <div className="absolute inset-0 opacity-30 mix-blend-luminosity grayscale">
                            <img
                                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2068"
                                alt="World Map"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="absolute bottom-8 right-8 bg-deep-space/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-[9px] font-black uppercase tracking-widest text-platinum-dim z-20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-neural-blue shadow-glow" />
                                <span className="text-white">Alto Volumen</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 opacity-60" />
                                Moderado
                            </div>
                        </div>

                        {/* Pulsating Map Points */}
                        <div className="absolute top-[30%] left-[25%] group cursor-pointer">
                            <div className="relative flex items-center justify-center">
                                <span className="absolute h-8 w-8 rounded-full bg-neural-blue animate-ping opacity-20" />
                                <span className="relative h-3 w-3 rounded-full bg-neural-blue shadow-glow" />
                            </div>
                        </div>

                        <div className="absolute top-[25%] left-[52%] group cursor-pointer">
                            <div className="relative flex items-center justify-center">
                                <span className="absolute h-6 w-6 rounded-full bg-purple-500 animate-ping opacity-20" />
                                <span className="relative h-2 w-2 rounded-full bg-purple-500 shadow-glow" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
