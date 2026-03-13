'use client';

import { MagicToolCard } from '@/components/teacher/magic-tool-card';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, LayoutPanelLeft, Search, Filter } from 'lucide-react';

export default function TeacherDashboard() {
    return (
        <div className="min-h-screen bg-[#F1F0E8] text-[#1E1E1E] relative overflow-hidden selection:bg-[#C9A78A]/30">
            {/* Background Dynamics */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-br from-[#C9A78A]/10 via-[#E2C4A8]/5 to-transparent rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#1E1E1E]/5 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" />

            <div className="p-8 md:p-12 relative z-10 max-w-7xl mx-auto pt-24">
                <header className="mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-white border border-[#1E1E1E]/5 flex items-center justify-center shadow-2xl shadow-[#1E1E1E]/5">
                            <GraduationCap className="w-8 h-8 text-[#C9A78A]" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-4xl md:text-5xl font-black text-[#1E1E1E] tracking-tighter leading-none flex items-center gap-3">
                                Zona Docente <span className="text-[#C9A78A]">Magic</span> <Sparkles className="w-8 h-8 text-[#C9A78A] animate-pulse" />
                            </h1>
                            <p className="text-[#1E1E1E]/40 mt-3 text-lg font-black uppercase tracking-[0.1em] max-w-2xl">
                                Potencia tu pedagogía con el primer Copiloto Educativo diseñado para la era de la IA.
                            </p>
                        </div>
                    </motion.div>

                    {/* Quick Stats or Info Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap items-center gap-6 pt-4"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#1E1E1E]/5 shadow-sm">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1E1E1E]/40">Módulo IA</span>
                            <span className="text-xs font-bold text-[#C9A78A] bg-[#C9A78A]/10 px-2 py-0.5 rounded">Activo_</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#1E1E1E]/5 shadow-sm">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1E1E1E]/40">Créditos de Generación</span>
                            <span className="text-xs font-black text-[#1E1E1E]">ILIMITADOS_</span>
                        </div>
                    </motion.div>
                </header>

                {/* Filter / Search Area */}
                <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <LayoutPanelLeft className="w-5 h-5 text-[#C9A78A]" />
                        <h2 className="text-xl font-black text-[#1E1E1E] uppercase tracking-widest italic">Kit de Herramientas_</h2>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E1E1E]/20" />
                            <input
                                type="text"
                                placeholder="BUSCAR HERRAMIENTA..."
                                className="w-full bg-white border border-[#1E1E1E]/5 rounded-xl px-10 py-4 text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C9A78A] transition-all font-black tracking-widest shadow-sm"
                            />
                        </div>
                        <button className="p-4 bg-white border border-[#1E1E1E]/5 rounded-xl hover:bg-[#F1F0E8] transition-all shadow-sm">
                            <Filter className="w-4 h-4 text-[#1E1E1E]/40" />
                        </button>
                    </div>
                </div>

                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    <MagicToolCard
                        icon="📝"
                        title="Generador de Rúbricas"
                        desc="Construye criterios de evaluación técnicos y de soft skills ultra-precisos alineados con estándares internacionales."
                        gradient="from-[#C9A78A]/20 via-[#C9A78A]/10 to-transparent"
                        accentColor="text-[#C9A78A]"
                    />
                    <MagicToolCard
                        icon="🧠"
                        title="Quiz Maker Pro"
                        desc="Transforma cualquier extracto técnico en un examen de alto nivel con retroalimentación automática generada por IA."
                        gradient="from-[#1E1E1E]/20 via-[#1E1E1E]/5 to-transparent"
                        accentColor="text-[#1E1E1E]"
                    />
                    <MagicToolCard
                        icon="🗺️"
                        title="Planificador de Rutas"
                        desc="Estructura sesiones de aprendizaje basadas en proyectos (ABP) que mantengan a los estudiantes en 'Flow State'."
                        gradient="from-[#C9A78A]/20 via-[#C9A78A]/10 to-transparent"
                        accentColor="text-[#C9A78A]"
                    />
                    <MagicToolCard
                        icon="📧"
                        title="Asistente de Comunicación"
                        desc="Redacta reportes de progreso y comunicaciones para padres con un tono profesional, empático y constructivo."
                        gradient="from-[#1E1E1E]/20 via-[#1E1E1E]/5 to-transparent"
                        accentColor="text-[#1E1E1E]"
                    />
                    <MagicToolCard
                        icon="💡"
                        title="Laboratorio de Ideas"
                        desc="Sugerencias disruptivas de hardware y software (Micro:bit, Arduino, Web3) para tus clases de informática."
                        gradient="from-[#C9A78A]/20 via-[#C9A78A]/10 to-transparent"
                        accentColor="text-[#C9A78A]"
                    />
                    <MagicToolCard
                        icon="🤖"
                        title="Revisión de Código IA"
                        desc="Sube los proyectos de tus estudiantes y obtén un análisis pedagógico de la lógica y calidad del código."
                        gradient="from-[#1E1E1E]/20 via-[#1E1E1E]/5 to-transparent"
                        accentColor="text-[#1E1E1E]"
                    />
                </main>

                <footer className="mt-20 py-8 border-t border-[#1E1E1E]/5 text-center">
                    <p className="text-[10px] font-black text-[#1E1E1E]/30 uppercase tracking-[0.3em] italic">
                        SinapCode Magic v2.0 • IA Desarrollada por Protocolo Sigma_
                    </p>
                </footer>
            </div>
        </div>
    );
}
