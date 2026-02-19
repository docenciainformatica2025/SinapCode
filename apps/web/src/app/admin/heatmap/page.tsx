'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeatmapStore, ClickPoint } from '@/lib/heatmap-store';
import { Shield, Eye, Trash2, RefreshCcw } from 'lucide-react';

export default function HeatmapPage() {
    const [points, setPoints] = useState<ClickPoint[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setPoints(HeatmapStore.getAll());
    }, []);

    const handleClear = () => {
        if (confirm('¿Deseas resetear los datos del mapa de calor?')) {
            HeatmapStore.clear();
            setPoints([]);
        }
    };

    const handleRefresh = () => {
        setPoints(HeatmapStore.getAll());
    };

    if (!mounted) return null;

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                        <Shield className="w-5 h-5 fill-primary/10" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Suite Analítica SinapCode_</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter leading-none">
                        MAPA DE <span className="text-primary italic">CALOR_</span>
                    </h1>
                    <p className="text-platinum-dim font-medium max-w-xl">
                        Análisis de interacción en tiempo real. Los puntos rojos indican zonas de mayor atracción visual y clics.
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                    >
                        <RefreshCcw className="w-4 h-4" /> Actualizar
                    </button>
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500/20 transition-all"
                    >
                        <Trash2 className="w-4 h-4" /> Limpiar Datos
                    </button>
                </div>
            </div>

            {/* Heatmap Visualizer Canvas */}
            <div className="relative w-full aspect-[16/9] bg-surface/30 backdrop-blur-3xl rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden group">
                {/* Mock Browser UI */}
                <div className="absolute top-0 inset-x-0 h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2 z-20">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="mx-auto bg-black/40 px-10 py-1 rounded-lg text-[9px] text-platinum-dim font-mono border border-white/5 uppercase tracking-widest">
                        Preview: https://sinapcode.ai/home
                    </div>
                </div>

                {/* Heatmap Visualization Overlay */}
                <div className="absolute inset-0 pt-12">
                    {/* Placeholder for Home Representation (Simplified) */}
                    <div className="w-full h-full opacity-30 select-none grayscale invert transition-all group-hover:grayscale-0 group-hover:invert-0 pointer-events-none">
                        <div className="container mx-auto py-20 px-10 space-y-20">
                            <div className="h-40 bg-white/10 rounded-2xl w-3/4" />
                            <div className="grid grid-cols-3 gap-8">
                                <div className="h-60 bg-white/5 rounded-2xl" />
                                <div className="h-60 bg-white/5 rounded-2xl" />
                                <div className="h-60 bg-white/5 rounded-2xl" />
                            </div>
                        </div>
                    </div>

                    {/* The Actual Heatmap Points */}
                    <div className="absolute inset-0 pt-12 pointer-events-none">
                        {points.map((p, i) => (
                            <motion.div
                                key={`${p.timestamp}-${i}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 0.6, scale: 1 }}
                                className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
                                style={{
                                    left: `${p.x}%`,
                                    top: `${p.y}%`,
                                    background: 'radial-gradient(circle, rgba(239, 68, 68, 1) 0%, rgba(239, 68, 68, 0) 70%)'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {points.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-platinum-dim/40 gap-4 mt-12">
                        <Eye className="w-12 h-12 opacity-20" />
                        <p className="font-black uppercase tracking-[0.3em] text-[10px]">Esperando datos de interacción...</p>
                    </div>
                )}
            </div>

            {/* Analytical Insights Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-surface/30 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-xl">
                    <p className="text-[10px] text-platinum-dim font-black uppercase tracking-widest mb-1">Impacto Total</p>
                    <h4 className="text-4xl font-black text-white italic">{points.length} Clics</h4>
                </div>
                <div className="bg-surface/30 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-xl col-span-2">
                    <p className="text-[10px] text-platinum-dim font-black uppercase tracking-widest mb-1">Protocolo de Análisis</p>
                    <p className="text-xs text-platinum-dim/60 font-medium">Los datos se almacenan de forma segura utilizando coordenadas relativas para asegurar que la visualización sea exacta en todas las resoluciones de pantalla.</p>
                </div>
            </div>
        </div>
    );
}
