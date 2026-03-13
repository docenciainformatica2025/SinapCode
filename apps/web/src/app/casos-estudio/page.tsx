'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Box, Activity, Map, ArrowRight } from 'lucide-react';

const CASE_STUDIES = [
    {
        title: "Nox Health",
        category: "Digital Health & Biometrics",
        description: "Protocolo de monitoreo avanzado y predicción de salud mediante IA 360.",
        icon: Activity,
        color: "#C9A78A",
        stats: "99.2% Accuracy",
        link: "/nox"
    },
    {
        title: "Vitriu",
        category: "Cloud Security",
        description: "Infraestructura transparente para el manejo de identidades de próxima generación.",
        icon: Box,
        color: "#A7C1C0",
        stats: "Zero-Trust Ready",
        link: "/vitriu"
    },
    {
        title: "Finder",
        category: "Real Estate Tech",
        description: "Buscador inteligente de activos inmobiliarios con análisis predictivo de mercado.",
        icon: Map,
        color: "#F9E795",
        stats: "15ms Latency",
        link: "/finder"
    }
];

export default function CasosEstudioPage() {
    return (
        <div className="min-h-screen bg-[#F1F0E8] text-[#1E1E1E]">
            <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
                {/* Header Section */}
                <div className="mb-24">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[#1E1E1E]/40 hover:text-[#1E1E1E] transition-all mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">Retornar</span>
                    </Link>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 italic uppercase">
                        Casos de <span className="text-[#C9A78A]">Estudio</span>
                    </h1>

                    <p className="max-w-2xl text-xl md:text-2xl font-light leading-relaxed text-[#1E1E1E]/60">
                        Documentación detallada sobre el despliegue de ecosistemas digitales de alto rendimiento. Resultados tangibles para problemas complejos.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CASE_STUDIES.map((study, index) => (
                        <motion.div
                            key={study.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-[40px] border border-[#1E1E1E]/5 p-10 hover:shadow-2xl hover:shadow-[#C9A78A]/5 transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#F1F0E8] flex items-center justify-center mb-8 group-hover:bg-[#C9A78A]/10 transition-colors">
                                <study.icon style={{ color: study.color }} className="w-8 h-8" />
                            </div>

                            <div className="flex-1">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A78A] mb-4 block italic">
                                    {study.category}
                                </span>
                                <h3 className="text-3xl font-bold mb-4 group-hover:text-[#C9A78A] transition-colors leading-tight">
                                    {study.title}
                                </h3>
                                <p className="text-[#1E1E1E]/60 font-light leading-relaxed mb-8">
                                    {study.description}
                                </p>
                            </div>

                            <div className="pt-8 border-t border-[#1E1E1E]/5 flex items-center justify-between">
                                <span className="text-xs font-bold font-mono text-[#1E1E1E]/30 italic uppercase tracking-wider">
                                    {study.stats}
                                </span>
                                <Link
                                    href={study.link}
                                    className="p-3 bg-[#F1F0E8] rounded-full group-hover:bg-[#1E1E1E] group-hover:text-white transition-all transform group-hover:rotate-12"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-32 text-center py-24 bg-[#1E1E1E] rounded-[64px] text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A78A]/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight italic">¿Tienes un proyecto en mente?</h2>
                        <p className="text-white/40 max-w-lg mx-auto mb-12 font-light text-lg">
                            Diseñamos aplicaciones que resuelven problemas reales. Hablemos sobre tu próximo ecosistema.
                        </p>
                        <Link
                            href="/contacto"
                            className="px-12 py-5 bg-[#C9A78A] text-[#1E1E1E] rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:brightness-110 transition-all inline-flex items-center gap-4"
                        >
                            Iniciar Conversación <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
