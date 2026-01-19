'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('¡Mensaje enviado!', {
            description: 'Te responderemos en menos de 24 horas.',
        });

        setFormData({ name: '', email: '', subject: '', message: '' });
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-deep-space">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-neural-blue hover:text-white transition text-sm mb-4 inline-block">
                        ← Volver al inicio
                    </Link>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Contáctanos
                    </h1>
                    <p className="text-[#B8BFC9] text-lg">
                        ¿Tienes preguntas? Estamos aquí para ayudarte.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">Envíanos un mensaje</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                                    Nombre completo
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-2 focus:ring-neural-blue focus:ring-offset-2 focus:ring-offset-deep-space transition"
                                    placeholder="María García"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-2 focus:ring-neural-blue focus:ring-offset-2 focus:ring-offset-deep-space transition"
                                    placeholder="maria@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
                                    Asunto
                                </label>
                                <select
                                    id="subject"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-2 focus:ring-neural-blue focus:ring-offset-2 focus:ring-offset-deep-space transition"
                                >
                                    <option value="">Selecciona un asunto</option>
                                    <option value="soporte">Soporte técnico</option>
                                    <option value="ventas">Ventas y precios</option>
                                    <option value="empresas">Soluciones para empresas</option>
                                    <option value="profesores">Convertirme en profesor</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                                    Mensaje
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-2 focus:ring-neural-blue focus:ring-offset-2 focus:ring-offset-deep-space transition resize-none"
                                    placeholder="Cuéntanos cómo podemos ayudarte..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-neural-blue text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition shadow-neon-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Enviando...</span>
                                    </>
                                ) : (
                                    'Enviar mensaje'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="glass-panel p-6 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4">Información de contacto</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="text-neural-blue text-xl">📧</div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Email</p>
                                        <a href="mailto:hola@sinapcode.com" className="text-[#B8BFC9] hover:text-white transition">
                                            hola@sinapcode.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="text-neural-blue text-xl">💬</div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Discord</p>
                                        <a href="https://discord.gg/sinapcode" target="_blank" rel="noopener noreferrer" className="text-[#B8BFC9] hover:text-white transition">
                                            Únete a nuestra comunidad
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="text-neural-blue text-xl">🐦</div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Twitter</p>
                                        <a href="https://twitter.com/sinapcode" target="_blank" rel="noopener noreferrer" className="text-[#B8BFC9] hover:text-white transition">
                                            @sinapcode
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4">Horario de atención</h3>
                            <div className="space-y-2 text-[#B8BFC9]">
                                <p><strong className="text-white">Lunes - Viernes:</strong> 9:00 AM - 6:00 PM (COT)</p>
                                <p><strong className="text-white">Sábado:</strong> 10:00 AM - 2:00 PM (COT)</p>
                                <p><strong className="text-white">Domingo:</strong> Cerrado</p>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4">Tiempo de respuesta</h3>
                            <p className="text-[#B8BFC9]">
                                Respondemos todos los mensajes en menos de <strong className="text-white">24 horas</strong> durante días laborales.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
