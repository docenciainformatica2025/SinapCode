'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface AIDemoSectionProps {
    data?: any;
}

export function AIDemoSection({ data }: AIDemoSectionProps) {
    const [activeScenario, setActiveScenario] = useState(0);

    const scenarios = [
        {
            title: 'Método Socrático',
            description: 'No te da la respuesta, te hace preguntas para que la descubras por ti mismo.',
            conversation: [
                { role: 'student', text: '¿Cómo hago un loop en Python?' },
                { role: 'ai', text: '🤔 Buena pregunta. ¿Qué es exactamente lo que quieres que se repita en tu código?' },
                { role: 'student', text: 'Quiero imprimir los números del 1 al 10 en la consola.' },
                { role: 'ai', text: 'Entiendo. ¿Conoces alguna estructura en programación que sirva para iterar sobre un rango de valores?' },
                { role: 'student', text: 'Creo que se usa "for", pero no estoy seguro de la sintaxis.' },
                { role: 'ai', text: '¡Exacto! En Python usamos "for i in range()". ¿Qué número pondrías dentro del paréntesis para llegar al 10?' },
            ],
        },
        {
            title: 'Debugging Inteligente',
            description: 'Analiza tu código en tiempo real y te guía hacia la solución del error.',
            conversation: [
                { role: 'student', text: 'Mi código no funciona y no entiendo por qué 😢' },
                { role: 'ai', text: 'Veo un "IndentationError" en la línea 5. ¿Notas algo diferente en el espacio al inicio de esa línea?' },
                { role: 'student', text: 'Ah, creo que me falta un espacio de indentación.' },
                { role: 'ai', text: '¡Correcto! Recuerda que Python utiliza la indentación para definir bloques de código.' },
            ],
        },
        {
            title: 'Explicación de Conceptos',
            description: 'Te explica conceptos complejos de forma sencilla, usando analogías y ejemplos prácticos.',
            conversation: [
                { role: 'student', text: '¿Qué es la recursividad?' },
                { role: 'ai', text: 'Imagina una muñeca rusa que contiene otra muñeca rusa idéntica más pequeña, y así sucesivamente. ¿Te ayuda esa imagen?' },
                { role: 'student', text: 'Sí, es como una función que se llama a sí misma una y otra vez.' },
                { role: 'ai', text: '¡Perfecto! Es una técnica donde un problema se resuelve dividiéndolo en versiones más pequeñas de sí mismo.' },
            ],
        },
    ];

    const features = [
        {
            icon: '🧠',
            title: 'Aprende a Pensar',
            description: 'No memorices código. Entiende la lógica profunda detrás de cada concepto técnico.',
            color: 'bg-apple-lavender/10 border-apple-lavender/20 text-apple-lavender'
        },
        {
            icon: '⚡',
            title: 'Respuestas Instantáneas',
            description: 'Disponible 24/7. Sin esperas, tu mentor personal siempre está listo para ayudarte.',
            color: 'bg-apple-lemon/10 border-apple-lemon/20 text-apple-lemon'
        },
        {
            icon: '🎯',
            title: 'Personalizado',
            description: 'La IA se adapta a tu nivel actual, ritmo y estilo de aprendizaje individual.',
            color: 'bg-apple-mint/10 border-apple-mint/20 text-apple-mint'
        },
        {
            icon: '🔒',
            title: 'Privado y Seguro',
            description: 'Tus conversaciones son privadas y seguras. Cumplimos estrictamente con GDPR.',
            color: 'bg-apple-pink/10 border-apple-pink/20 text-apple-pink'
        },
    ];

    return (
        <section id="demo" className="py-24 md:py-32 bg-[#F1F0E8] overflow-hidden section-spacing relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#A7C1C0]/10 to-[#F9E795]/10 opacity-40 pointer-events-none" />
            <div className="container-page px-6 sm:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-serif mb-8 tracking-tighter leading-none text-[#1E1E1E]">
                        Tu Mentor IA <span className="text-[#C9A78A] italic">Evolutivo</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-base md:text-lg text-[#1E1E1E]/70 font-light leading-relaxed text-pretty">
                        Resuelve dudas complejas en segundos con protocolos de ingeniería de élite.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
                    {/* Sidebar / Options */}
                    <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
                        {scenarios.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveScenario(i)}
                                className={`w-full p-6 md:p-8 rounded-[2rem] text-left border transition-all duration-500 group relative overflow-hidden ${activeScenario === i
                                    ? 'bg-white border-[#C9A78A]/30 text-[#1E1E1E] shadow-xl'
                                    : 'bg-white/50 border-black/5 text-[#1E1E1E]/70 hover:bg-white/80 hover:border-black/10'
                                    }`}
                            >
                                <span className={`block text-[10px] font-bold uppercase tracking-widest mb-3 transition-colors ${activeScenario === i ? 'text-[#C9A78A]' : 'text-[#1E1E1E]/40 group-hover:text-[#1E1E1E]/60'}`}>
                                    Escenario 0{i + 1}
                                </span>
                                <span className="text-xl font-serif font-bold block mb-2 tracking-tight">{s.title}</span>
                                <p className="text-sm font-light leading-relaxed opacity-80 line-clamp-2 text-pretty">{s.description}</p>
                                {activeScenario === i && (
                                    <motion.div layoutId="active-bg" className="absolute left-0 top-0 bottom-0 w-1 bg-[#C9A78A]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Chat Display */}
                    <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm h-[550px] flex flex-col relative">
                        {/* Header */}
                        <div className="bg-white/50 border-b border-black/5 p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#A7C1C0]/20 flex items-center justify-center text-[#1E1E1E] border border-[#A7C1C0]/30 text-lg">🤖</div>
                                <div>
                                    <div className="text-sm font-bold text-[#1E1E1E] font-serif tracking-tight leading-none mb-1.5 transition-all">Sinap Mentor AI</div>
                                    <div className="text-[10px] font-bold text-[#C9A78A] flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#C9A78A] rounded-full animate-pulse"></span>
                                        Protocolo Activo
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-black/5 border border-black/5 text-[10px] font-bold text-[#1E1E1E]/60 uppercase tracking-widest">
                                v2.4.0
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/5">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeScenario}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                    className="space-y-6"
                                >
                                    {scenarios[activeScenario].conversation.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex ${msg.role === 'student' ? 'justify-start' : 'justify-end'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] px-6 py-4 rounded-[2rem] text-sm font-light leading-relaxed shadow-sm border ${msg.role === 'student'
                                                    ? 'bg-[#F1F0E8] text-[#1E1E1E] border-black/5 rounded-tl-none'
                                                    : 'bg-[#1E1E1E] text-white border-black/10 rounded-tr-none'
                                                    }`}
                                            >
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Input Mockup */}
                        <div className="p-6 bg-white/50 border-t border-black/5 mt-auto">
                            <div className="bg-[#F1F0E8] border border-black/5 rounded-2xl px-6 py-3.5 text-[#1E1E1E]/40 text-sm font-light">
                                Haz una pregunta sobre el escenario actual...
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="p-10 rounded-[2rem] bg-white border border-black/5 hover:border-[#A7C1C0]/50 transition-all duration-500 group shadow-sm text-center"
                        >
                            <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-8 transition-all duration-500 transform group-hover:scale-110 border bg-black/5 border-black/10`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-serif font-bold text-[#1E1E1E] mb-4 tracking-tight">{feature.title}</h3>
                            <p className="text-sm text-[#1E1E1E]/70 font-light leading-relaxed group-hover:text-[#1E1E1E]/90 transition-colors text-pretty">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
                <div className="text-center mt-16">
                    <Link
                        href="/auth/register"
                        className="bg-[#1E1E1E] text-white px-8 py-4 rounded-full text-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 inline-block font-sans"
                    >
                        Acceso Instantáneo al Mentor
                    </Link>
                </div>
            </div>
        </section>
    );
}
