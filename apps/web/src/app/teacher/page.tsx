'use client';

import { MagicToolCard } from '@/components/teacher/magic-tool-card';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, LayoutPanelLeft, Search, Filter } from 'lucide-react';

export default function TeacherDashboard() {
    return (
        <div className="min-h-screen bg-deep-space text-foreground relative overflow-hidden">
            {/* Background Dynamics */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-br from-purple-600/10 via-pink-500/5 to-transparent rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-600/10 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />

            <div className="p-8 md:p-12 relative z-10 max-w-7xl mx-auto pt-24">
                <header className="mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-2xl shadow-purple-500/10">
                            <GraduationCap className="w-8 h-8 text-purple-400" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none flex items-center gap-3">
                                Zona Docente <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Magic</span> <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
                            </h1>
                            <p className="text-platinum-dim mt-3 text-lg font-medium max-w-2xl">
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
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-platinum">Módulo IA</span>
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Activo</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-platinum">Créditos de Generación</span>
                            <span className="text-xs font-bold text-white">Ilimitados</span>
                        </div>
                    </motion.div>
                </header>

                {/* Filter / Search Mockup Area */}
                <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <LayoutPanelLeft className="w-5 h-5 text-purple-400" />
                        <h2 className="text-xl font-black text-white uppercase tracking-widest italic">Kit de Herramientas_</h2>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-dim" />
                            <input
                                type="text"
                                placeholder="Buscar herramienta..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all font-medium"
                            />
                        </div>
                        <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                            <Filter className="w-4 h-4 text-platinum-dim" />
                        </button>
                    </div>
                </div>

                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    <MagicToolCard
                        icon="📝"
                        title="Generador de Rúbricas"
                        desc="Construye criterios de evaluación técnicos y de soft skills ultra-precisos alineados con estándares internacionales."
                        gradient="from-pink-500/20 via-pink-400/10 to-transparent"
                        accentColor="text-pink-400"
                    />
                    <MagicToolCard
                        icon="🧠"
                        title="Quiz Maker Pro"
                        desc="Transforma cualquier extracto técnico en un examen de alto nivel con retroalimentación automática generada por IA."
                        gradient="from-purple-500/20 via-purple-400/10 to-transparent"
                        accentColor="text-purple-400"
                    />
                    <MagicToolCard
                        icon="🗺️"
                        title="Planificador de Rutas"
                        desc="Estructura sesiones de aprendizaje basadas en proyectos (ABP) que mantengan a los estudiantes en 'Flow State'."
                        gradient="from-blue-500/20 via-blue-400/10 to-transparent"
                        accentColor="text-blue-400"
                    />
                    <MagicToolCard
                        icon="📧"
                        title="Asistente de Comunicación"
                        desc="Redacta reportes de progreso y comunicaciones para padres con un tono profesional, empático y constructivo."
                        gradient="from-emerald-500/20 via-emerald-400/10 to-transparent"
                        accentColor="text-emerald-400"
                    />
                    <MagicToolCard
                        icon="💡"
                        title="Laboratorio de Ideas"
                        desc="Sugerencias disruptivas de hardware y software (Micro:bit, Arduino, Web3) para tus clases de informática."
                        gradient="from-amber-500/20 via-amber-400/10 to-transparent"
                        accentColor="text-amber-400"
                    />
                    <MagicToolCard
                        icon="🤖"
                        title="Revisión de Código IA"
                        desc="Sube los proyectos de tus estudiantes y obtén un análisis pedagógico de la lógica y calidad del código."
                        gradient="from-cyan-500/20 via-cyan-400/10 to-transparent"
                        accentColor="text-cyan-400"
                    />
                </main>

                <footer className="mt-20 py-8 border-t border-white/5 text-center">
                    <p className="text-[10px] font-black text-platinum-dim uppercase tracking-[0.3em] italic">
                        SinapCode Magic v2.0 • IA Desarrollada por Protocolo Sigma
                    </p>
                </footer>
            </div>
        </div>
    );
}
