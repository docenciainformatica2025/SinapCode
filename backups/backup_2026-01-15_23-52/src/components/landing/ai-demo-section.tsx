'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function AIDemoSection() {
    const [activeTab, setActiveTab] = useState(0);

    const demos = [
        {
            title: 'Método Socrático',
            description: 'No te da la respuesta, te hace preguntas para que la descubras',
            conversation: [
                { role: 'student', text: '¿Cómo hago un loop en Python?' },
                { role: 'ai', text: '🤔 Buena pregunta. ¿Qué quieres que se repita?' },
                { role: 'student', text: 'Quiero imprimir números del 1 al 10' },
                { role: 'ai', text: '¿Conoces alguna estructura que repita código?' },
                { role: 'student', text: 'Creo que for...' },
                { role: 'ai', text: '¡Exacto! Intenta: for i in range(10)' },
            ],
        },
        {
            title: 'Debugging Inteligente',
            description: 'Analiza tu código y te guía al error',
            conversation: [
                { role: 'student', text: 'Mi código no funciona 😢' },
                { role: 'ai', text: 'Veo un IndentationError en línea 5. ¿Notas algo?' },
                { role: 'student', text: 'Ah, falta la indentación' },
                { role: 'ai', text: '¡Correcto! Python usa espacios para bloques.' },
            ],
        },
    ];

    return (
        <section id="demo" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-neural-blue/5 via-transparent to-synapse-purple/5" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Tu Tutor de IA Personal
                    </h2>
                    <p className="text-xl text-platinum-dim max-w-2xl mx-auto">
                        No es un chatbot común. Es un profesor que te enseña a <span className="text-white font-bold">pensar</span>, no a copiar.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Demo Chat */}
                    <div className="glass-panel p-8 rounded-2xl border border-white/10">
                        {/* Tabs */}
                        <div className="flex gap-2 mb-6">
                            {demos.map((demo, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${activeTab === i
                                        ? 'bg-neural-blue text-white'
                                        : 'bg-white/5 text-platinum-dim hover:bg-white/10'
                                        }`}
                                >
                                    {demo.title}
                                </button>
                            ))}
                        </div>

                        {/* Chat Messages */}
                        <div className="space-y-4 mb-6">
                            {demos[activeTab].conversation.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'student' ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className={`flex ${msg.role === 'student' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === 'student'
                                            ? 'bg-white/10 text-white'
                                            : 'bg-neural-blue text-white'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-sm text-platinum-dim italic">
                            {demos[activeTab].description}
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-6">
                        {[
                            {
                                icon: '🧠',
                                title: 'Aprende a Pensar',
                                description: 'No memorices código. Entiende la lógica detrás de cada concepto.',
                            },
                            {
                                icon: '⚡',
                                title: 'Respuestas Instantáneas',
                                description: 'Disponible 24/7. Sin esperar a que un profesor responda.',
                            },
                            {
                                icon: '🎯',
                                title: 'Personalizado',
                                description: 'Se adapta a tu nivel y estilo de aprendizaje.',
                            },
                            {
                                icon: '🔒',
                                title: 'Privado y Seguro',
                                description: 'Tus conversaciones son privadas. Cumplimos GDPR.',
                            },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-4"
                            >
                                <div className="text-4xl">{feature.icon}</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-platinum-dim">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
