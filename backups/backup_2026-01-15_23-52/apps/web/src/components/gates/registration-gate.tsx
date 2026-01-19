'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface RegistrationGateProps {
    isOpen: boolean;
    onClose: () => void;
    reason: 'video_limit' | 'lesson_limit' | 'ai_limit' | 'feature_locked';
    onRegister?: () => void;
}

export function RegistrationGate({ isOpen, onClose, reason, onRegister }: RegistrationGateProps) {
    const [email, setEmail] = useState('');

    const messages = {
        video_limit: {
            title: '¡Te enganchaste! 🎉',
            description: 'Has visto los primeros 2 minutos. Regístrate gratis para ver la lección completa.',
            benefit: 'Acceso a 3 cursos completos',
        },
        lesson_limit: {
            title: '¡Vas muy bien! 🚀',
            description: 'Has completado 3 lecciones. Crea tu cuenta para desbloquear más contenido.',
            benefit: 'Progreso guardado automáticamente',
        },
        ai_limit: {
            title: 'Tutor IA Ilimitado 🤖',
            description: 'Has usado tus 3 preguntas de prueba. Regístrate para acceso ilimitado.',
            benefit: 'IA disponible 24/7',
        },
        feature_locked: {
            title: 'Función Premium 💎',
            description: 'Esta función está disponible para usuarios registrados.',
            benefit: 'Certificados verificados',
        },
    };

    const message = messages[reason];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative glass-panel max-w-md w-full mx-4 p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-platinum-dim hover:text-white transition"
                        >
                            ✕
                        </button>

                        {/* Content */}
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-white mb-3">{message.title}</h2>
                            <p className="text-platinum-dim mb-4">{message.description}</p>
                            <div className="inline-block px-4 py-2 bg-neural-blue/20 rounded-lg border border-neural-blue/30">
                                <span className="text-sm text-neural-blue font-bold">✓ {message.benefit}</span>
                            </div>
                        </div>

                        {/* Quick Register Form */}
                        <div className="space-y-4 mb-6">
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-neural-blue outline-none transition"
                            />
                            <button
                                onClick={() => {
                                    onRegister?.();
                                    // Redirect to register with email pre-filled
                                    window.location.href = `/auth/register?email=${email}`;
                                }}
                                className="w-full py-4 bg-neural-blue text-white rounded-xl font-bold hover:bg-blue-600 transition shadow-neon-blue"
                            >
                                Continuar Gratis →
                            </button>
                        </div>

                        {/* Social Login */}
                        <div className="space-y-3">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-2 bg-deep-space text-platinum-dim">O continúa con</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition border border-white/20 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                    Google
                                </button>
                                <button className="py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition border border-white/20 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12" /></svg>
                                    GitHub
                                </button>
                            </div>
                        </div>

                        {/* Already have account */}
                        <div className="mt-6 text-center text-sm text-platinum-dim">
                            ¿Ya tienes cuenta?{' '}
                            <Link href="/auth/login" className="text-neural-blue hover:text-white transition font-medium">
                                Inicia sesión
                            </Link>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
