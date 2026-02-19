import Link from 'next/link';
import { ArrowRight, CheckCircle2, Bot, Code, Users, Award, BrainCircuit } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function MethodologyPage() {
    return (
        <div className="min-h-screen bg-deep-space text-white overflow-hidden selection:bg-primary/30">

            {/* Background Ambient Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-20 animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] opacity-20 animate-pulse-slow delay-1000" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <main className="relative z-10 pt-32 pb-20">

                {/* Hero Section */}
                <section className="container mx-auto px-4 text-center mb-32">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
                            <span className="text-primary font-bold text-sm tracking-wider uppercase">Philosophy & Method</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
                            Nuestra Metodología: <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-secondary animate-gradient-x">
                                Aprende Haciendo
                            </span>
                        </h1>
                        <p className="text-xl text-platinum-dim max-w-2xl mx-auto leading-relaxed mb-12">
                            El camino más rápido para dominar la tecnología es construyendo.
                            Olvídate de la teoría pasiva; aquí tu viaje hacia la maestría es 100% práctico y personalizado.
                        </p>
                    </div>

                    {/* Abstract Tech Illustration Placeholder */}
                    <div className="relative max-w-5xl mx-auto h-[400px] md:h-[500px] bg-surface/30 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* 3D Isometric placeholders (CSS/SVG representation) */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-blob" />
                            <div className="absolute w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-blob animation-delay-2000 translate-x-32" />

                            <div className="z-10 text-center">
                                <BrainCircuit className="w-24 h-24 text-white/80 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                                <div className="text-2xl font-bold font-mono text-white/50">SYSTEM_ACTIVE</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Learning Path Section */}
                <section className="container mx-auto px-4 mb-32">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-white">Tu Ruta de Aprendizaje</h2>

                    <div className="max-w-5xl mx-auto relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-secondary/50 -translate-y-1/2 rounded-full" />

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
                            {/* Step 1 */}
                            <div className="relative group text-center md:flex md:flex-col md:justify-end md:min-h-[320px]">
                                <div className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-16 h-16 rounded-full bg-surface border-2 border-primary/50 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(25,127,230,0.3)] group-hover:scale-110 transition-transform duration-300 mx-auto mb-4 md:mb-0">
                                    <span className="text-2xl font-black text-white">1</span>
                                    <div className="absolute -top-8 text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">Start</div>
                                </div>
                                <div className="md:mt-32">
                                    <BrainCircuit className="w-8 h-8 text-cyan-400 mx-auto mb-4 md:hidden" />
                                    <h3 className="text-xl font-bold text-white mb-2">Evaluación Inicial</h3>
                                    <p className="text-sm text-platinum-dim">Descubre tu nivel, define tus metas.</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative group text-center mt-8 md:mt-0 md:flex md:flex-col md:justify-start md:min-h-[320px]">
                                <div className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-16 h-16 rounded-full bg-surface border-2 border-primary/50 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(25,127,230,0.3)] group-hover:scale-110 transition-transform duration-300 mx-auto mb-4 md:mb-0">
                                    <span className="text-2xl font-black text-white">2</span>
                                </div>
                                <div className="md:mb-32">
                                    <Bot className="w-8 h-8 text-cyan-400 mx-auto mb-4 md:hidden" />
                                    <h3 className="text-xl font-bold text-white mb-2">Laboratorios AI</h3>
                                    <p className="text-sm text-platinum-dim">Práctica guiada, retroalimentación instantánea.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative group text-center md:flex md:flex-col md:justify-end md:min-h-[320px] mt-8 md:mt-0">
                                <div className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center z-10 shadow-[0_0_30px_rgba(25,127,230,0.5)] group-hover:scale-110 transition-transform duration-300 mx-auto mb-4 md:mb-0 box-content border-4 border-deep-space">
                                    <span className="text-3xl font-black text-white">3</span>
                                </div>
                                <div className="md:mt-32">
                                    <Code className="w-8 h-8 text-cyan-400 mx-auto mb-4 md:hidden" />
                                    <h3 className="text-xl font-bold text-white mb-2 text-primary">Proyectos Reales</h3>
                                    <p className="text-sm text-platinum-dim">Desarrolla aplicaciones, resuelve problemas complejos.</p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="relative group text-center mt-8 md:mt-0 md:flex md:flex-col md:justify-start md:min-h-[320px]">
                                <div className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-16 h-16 rounded-full bg-surface border-2 border-secondary/50 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform duration-300 mx-auto mb-4 md:mb-0">
                                    <span className="text-2xl font-black text-white">4</span>
                                </div>
                                <div className="md:mb-32">
                                    <Users className="w-8 h-8 text-cyan-400 mx-auto mb-4 md:hidden" />
                                    <h3 className="text-xl font-bold text-white mb-2">Code Review</h3>
                                    <p className="text-sm text-platinum-dim">Aprende de otros, mejora tu código.</p>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className="relative group text-center md:flex md:flex-col md:justify-end md:min-h-[320px] mt-8 md:mt-0">
                                <div className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-16 h-16 rounded-full bg-surface border-2 border-yellow-500/50 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(234,179,8,0.3)] group-hover:scale-110 transition-transform duration-300 mx-auto mb-4 md:mb-0">
                                    <span className="text-2xl font-black text-white">5</span>
                                </div>
                                <div className="md:mt-32">
                                    <Award className="w-8 h-8 text-yellow-500 mx-auto mb-4 md:hidden" />
                                    <h3 className="text-xl font-bold text-white mb-2 text-yellow-500">Certificación</h3>
                                    <p className="text-sm text-platinum-dim">Valida tus habilidades, impulsa tu carrera.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI Tutor Showcase */}
                <section className="container mx-auto px-4 mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                            Tu Tutor Personal de IA
                        </h2>
                        <p className="text-lg text-platinum-dim max-w-2xl mx-auto">
                            Nuestro modelo de IA te acompaña en cada paso, explicando conceptos,
                            sugiriendo mejoras y resolviendo dudas al instante.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto bg-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                        {/* Fake Browser/Chat Header */}
                        <div className="bg-black/40 px-6 py-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="text-xs font-mono text-white/40">Asistente SinapCODE</div>
                            <div className="w-4" />
                        </div>

                        {/* Chat Interface Mockup */}
                        <div className="p-8 space-y-6 font-mono text-sm max-h-[500px] overflow-hidden relative">
                            {/* Gradient Overlay bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent z-10" />

                            {/* User Message */}
                            <div className="flex justify-end">
                                <div className="bg-white/10 text-white px-5 py-3 rounded-2xl rounded-tr-none hover:bg-white/15 transition-colors border border-white/5 max-w-[80%]">
                                    <p>¿Cómo optimizo este bucle en Python para grandes volúmenes de datos?</p>
                                </div>
                            </div>

                            {/* AI Response */}
                            <div className="flex justify-start items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0 flex items-center justify-center shadow-lg">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div className="bg-black/40 text-platinum px-6 py-5 rounded-2xl rounded-tl-none border border-primary/20 w-full shadow-inner">
                                    <p className="mb-4 text-cyan-300 font-bold">¡Claro! Para grandes volúmenes de datos, te recomiendo usar "list comprehensions" o generadores.</p>

                                    <div className="rounded-lg bg-black/50 border border-white/10 p-4 font-mono text-xs md:text-sm text-gray-300 my-4 overflow-x-auto">
                                        <code>
                                            <span className="text-purple-400"># Ineficiente</span>{'\n'}
                                            result = []{'\n'}
                                            <span className="text-blue-400">for</span> i <span className="text-blue-400">in</span> range(1000000):{'\n'}
                                            {'    '}if i % 2 == 0:{'\n'}
                                            {'        '}result.append(i * 2){'\n'}
                                            {'\n'}
                                            <span className="text-green-400"># Optimizado (Generador)</span>{'\n'}
                                            result = (i * 2 <span className="text-blue-400">for</span> i <span className="text-blue-400">in</span> range(1000000) <span className="text-blue-400">if</span> i % 2 == 0)
                                        </code>
                                    </div>

                                    <p>Esto reduce significativamente el uso de memoria ya que los valores se generan bajo demanda.</p>
                                </div>
                            </div>

                            {/* Input Mockup */}
                            <div className="absolute bottom-6 left-6 right-6 z-20">
                                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 flex items-center justify-between shadow-xl">
                                    <span className="text-white/30 animate-pulse">Escribe tu respuesta...</span>
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <ArrowRight className="w-4 h-4 text-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="container mx-auto px-4 text-center">
                    <Link href="/auth/register">
                        <button className="px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white font-black text-xl rounded-2xl shadow-[0_0_40px_-10px_rgba(25,127,230,0.5)] hover:shadow-[0_0_60px_-10px_rgba(25,127,230,0.6)] hover:scale-105 transition-all duration-300">
                            Comienza tu Viaje Ahora
                        </button>
                    </Link>
                </section>

            </main>
        </div>
    );
}
