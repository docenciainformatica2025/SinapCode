'use client';

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
        },
        {
            icon: '⚡',
            title: 'Respuestas Instantáneas',
            description: 'Disponible 24/7. Sin esperas, tu mentor personal siempre está listo para ayudarte.',
        },
        {
            icon: '🎯',
            title: 'Personalizado',
            description: 'La IA se adapta a tu nivel actual, ritmo y estilo de aprendizaje individual.',
        },
        {
            icon: '🔒',
            title: 'Privado y Seguro',
            description: 'Tus conversaciones son privadas y seguras. Cumplimos estrictamente con GDPR.',
        },
    ];

    return (
        <section className="py-20 md:py-28 bg-bg/50 border-y border-white/5 overflow-hidden section-spacing subpixel-text">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">
                        Experimenta la <span className="text-primary italic">Mentoría IA</span>
                    </h2>
                    <p className="text-lg text-platinum-dim max-w-2xl mx-auto font-bold leading-relaxed">
                        Resuelve dudas en segundos con nuestra IA entrenada específicamente
                        en ciencias de la computación y metodologías de aprendizaje acelerado.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                    {/* Sidebar / Options */}
                    <div className="lg:col-span-4 space-y-3 order-2 lg:order-1">
                        {scenarios.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveScenario(i)}
                                className={`w-full p-5 md:p-6 rounded-2xl text-left border transition-all duration-300 group ${activeScenario === i
                                    ? 'bg-primary/10 border-primary text-white shadow-lg shadow-primary/10'
                                    : 'bg-white/5 border-white/10 text-platinum-dim hover:bg-white/10 hover:border-white/20'
                                    }`}
                            >
                                <span className={`block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2 transition-colors ${activeScenario === i ? 'text-primary' : 'text-platinum-dim/40 group-hover:text-platinum-dim'}`}>
                                    ESCENARIO 0{i + 1}
                                </span>
                                <span className="text-base md:text-lg font-black block mb-1 italic">{s.title}</span>
                                <p className="text-[10px] md:text-xs font-bold leading-relaxed opacity-70 line-clamp-2">{s.description}</p>
                            </button>
                        ))}
                    </div>

                    {/* Chat Display */}
                    <div className="lg:col-span-8 bg-bg rounded-3xl border border-white/10 overflow-hidden shadow-2xl h-[500px] flex flex-col relative">
                        {/* Header */}
                        <div className="bg-white/5 border-b border-white/10 p-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">🤖</div>
                            <div>
                                <div className="text-sm font-black text-white uppercase tracking-widest leading-none">SINAP MENTOR</div>
                                <div className="text-[10px] font-bold text-primary flex items-center gap-1.5 mt-1">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                                    En línea ahora
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeScenario}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    {scenarios[activeScenario].conversation.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex ${msg.role === 'student' ? 'justify-start' : 'justify-end'}`}
                                        >
                                            <div
                                                className={`max-w-[90%] md:max-w-[85%] px-4 py-3 rounded-2xl text-[13px] md:text-sm font-bold shadow-sm ${msg.role === 'student'
                                                    ? 'bg-white/5 text-gray-300 border border-white/10'
                                                    : 'bg-primary text-white border border-primary shadow-lg shadow-primary/10'
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
                        <div className="p-4 bg-white/5 border-t border-white/10">
                            <div className="bg-bg border border-white/10 rounded-xl px-4 py-2.5 text-gray-500 text-sm font-bold italic">
                                Haz una pregunta sobre el escenario actual...
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 group"
                        >
                            <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[0.1em] mb-3 italic">{feature.title}</h3>
                            <p className="text-xs text-platinum-dim font-bold leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
