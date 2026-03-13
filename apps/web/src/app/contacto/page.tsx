'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ConsentCheckbox } from '@/components/legal/consent-checkbox';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!privacyAccepted) {
            toast.error('Debes aceptar la política de privacidad para continuar.');
            return;
        }

        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('¡Mensaje enviado!', {
            description: 'Te responderemos en menos de 24 horas.',
        });

        setFormData({ name: '', email: '', subject: '', message: '' });
        setPrivacyAccepted(false);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#F1F0E8] text-[#1E1E1E] selection:bg-[#C9A78A]/30 pt-20">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#C9A78A]/10 via-transparent to-transparent rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#1E1E1E]/5 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
                {/* Header */}
                <div className="mb-20">
                    <Link href="/" className="inline-flex items-center gap-2 text-[#1E1E1E]/40 hover:text-[#1E1E1E] transition group mb-8 font-black text-[10px] uppercase tracking-[0.3em]">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        VOLVER AL INICIO
                    </Link>
                    <h1 className="text-5xl md:text-8xl font-black text-[#1E1E1E] mb-6 tracking-tighter leading-none italic uppercase">
                        Contáctanos<span className="text-[#C9A78A]"></span>
                    </h1>
                    <p className="text-[#1E1E1E]/60 text-xl md:text-2xl font-medium italic">
                        Desbloquea el próximo nivel de tu ecosistema digital.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Contact Form */}
                    <div className="lg:col-span-7 bg-white p-10 md:p-16 rounded-[3.5rem] border border-[#1E1E1E]/5 shadow-2xl shadow-[#1E1E1E]/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A78A]/5 rounded-full blur-[100px] group-hover:bg-[#C9A78A]/10 transition-all duration-700" />

                        <h2 className="text-3xl font-black text-[#1E1E1E] mb-10 tracking-tighter italic uppercase">Enviar Protocolo</h2>

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.2em] ml-2">
                                        Nombre completo
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-[#F1F0E8]/50 border border-[#1E1E1E]/5 rounded-2xl px-6 py-4 text-[#1E1E1E] focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 transition-all font-bold"
                                        placeholder="ALEX MURPHY"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.2em] ml-2">
                                        Correo electrónico
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-[#F1F0E8]/50 border border-[#1E1E1E]/5 rounded-2xl px-6 py-4 text-[#1E1E1E] focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 transition-all font-bold"
                                        placeholder="MURPHY@SINAPCODE.IO"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="subject" className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.2em] ml-2">
                                    Asunto del Mensaje
                                </label>
                                <select
                                    id="subject"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-[#F1F0E8]/50 border border-[#1E1E1E]/5 rounded-2xl px-6 py-4 text-[#1E1E1E] focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 transition-all font-black uppercase tracking-widest text-xs"
                                >
                                    <option value="">SELECCIONA CATEGORÍA</option>
                                    <option value="soporte">SOPORTE TÉCNICO</option>
                                    <option value="ventas">VENTAS Y PRECIOS</option>
                                    <option value="empresas">SOLUCIONES ENTERPRISE</option>
                                    <option value="profesores">MODO PROFESOR</option>
                                    <option value="otro">CONSULTA GENERAL</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.2em] ml-2">
                                    Contenido del Mensaje
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-[#F1F0E8]/50 border border-[#1E1E1E]/5 rounded-2xl px-6 py-4 text-[#1E1E1E] focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 transition-all font-medium resize-none leading-relaxed"
                                    placeholder="DETALLA TU REQUERIMIENTO TÉCNICO..."
                                />
                            </div>

                            {/* Privacy Checkbox */}
                            <div className="bg-[#F1F0E8] p-6 rounded-2xl border border-[#1E1E1E]/5">
                                <ConsentCheckbox
                                    documentType="privacy"
                                    documentVersion="2.2.0"
                                    required
                                    onChange={setPrivacyAccepted}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !privacyAccepted}
                                className="w-full bg-[#1E1E1E] text-[#F1F0E8] font-black text-xs uppercase tracking-[0.3em] py-6 rounded-2xl hover:-translate-y-1 transition-all shadow-2xl shadow-[#1E1E1E]/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-4 italic"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-[#F1F0E8]/20 border-t-[#F1F0E8] rounded-full animate-spin" />
                                        <span>PROCESANDO</span>
                                    </>
                                ) : (
                                    <>
                                        EJECUTAR ENVÍO →
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info Grid */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="bg-white p-10 rounded-[3rem] border border-[#1E1E1E]/5 shadow-sm">
                            <h3 className="text-xl font-black text-[#1E1E1E] mb-8 tracking-tighter italic uppercase">Datos de Contacto</h3>
                            <div className="space-y-8">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-[#F1F0E8] rounded-2xl flex items-center justify-center text-xl grayscale hover:grayscale-0 transition-all">📧</div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-widest mb-1">Email</span>
                                        <a href="mailto:sinapcodeia@gmail.com" className="text-lg font-black text-[#1E1E1E] hover:text-[#C9A78A] transition-colors italic">
                                            sinapcodeia@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-[#F1F0E8] rounded-2xl flex items-center justify-center text-xl grayscale hover:grayscale-0 transition-all">💬</div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-widest mb-1">Comunidad</span>
                                        <a href="https://discord.gg/sinapcode" target="_blank" rel="noopener noreferrer" className="text-lg font-black text-[#1E1E1E] hover:text-[#C9A78A] transition-colors italic">
                                            discord.gg/sinapcode
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-[#F1F0E8] rounded-2xl flex items-center justify-center text-xl grayscale hover:grayscale-0 transition-all">🐦</div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-widest mb-1">X / Twitter</span>
                                        <a href="https://twitter.com/sinapcode" target="_blank" rel="noopener noreferrer" className="text-lg font-black text-[#1E1E1E] hover:text-[#C9A78A] transition-colors italic">
                                            @SINAPCODE
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] border border-[#1E1E1E]/5 shadow-sm">
                            <h3 className="text-xl font-black text-[#1E1E1E] mb-6 tracking-tighter italic uppercase">Disponibilidad</h3>
                            <div className="space-y-4">
                                {[
                                    { day: 'LUNES - VIERNES', hours: '09:00 - 18:00 COT' },
                                    { day: 'SÁBADOS', hours: '10:00 - 14:00 COT' },
                                    { day: 'DOMINGOS', hours: 'MODO OFFLINE' }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-[#1E1E1E]/5 last:border-0">
                                        <span className="text-[10px] font-black text-[#1E1E1E]/40 tracking-widest">{item.day}</span>
                                        <span className="text-xs font-black text-[#1E1E1E] italic">{item.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#1E1E1E] p-10 rounded-[3rem] text-[#F1F0E8] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A78A]/10 rounded-full blur-2xl" />
                            <h3 className="text-xl font-black mb-4 tracking-tighter italic uppercase relative z-10">Tiempo de Respuesta</h3>
                            <p className="text-[#F1F0E8]/60 font-medium leading-relaxed relative z-10 italic">
                                Ejecutamos respuestas en menos de <span className="text-[#C9A78A] font-black">24 horas</span> durante periodos operativos
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
