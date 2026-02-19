'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface PaymentGateProps {
    isOpen: boolean;
    onClose: () => void; // Optional if we want to force them to upgrade
    courseTitle?: string;
}

export function PaymentGate({ isOpen, onClose, courseTitle = 'este contenido' }: PaymentGateProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-deep-space/90 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative glass-panel max-w-lg w-full mx-4 p-8 rounded-3xl border border-accent-gold/20 shadow-[0_0_50px_rgba(255,215,0,0.1)] overflow-hidden"
                    >
                        {/* Premium Glow Effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />

                        {/* Content */}
                        <div className="relative z-10 text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-accent-gold/10 rounded-full flex items-center justify-center border border-accent-gold/20 shadow-lg shadow-accent-gold/10">
                                <span className="text-3xl">💎</span>
                            </div>

                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                                Desbloquear <span className="text-accent-gold">{courseTitle}</span>
                            </h2>
                            <p className="text-platinum-dim mb-8 text-lg">
                                Este curso es exclusivo para miembros del plan <span className="text-white font-bold">Premium</span>.
                            </p>

                            {/* Features List */}
                            <div className="text-left space-y-4 mb-8 bg-white/5 p-6 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold text-xs">✓</div>
                                    <span className="text-platinum text-sm">Acceso ilimitado a +50 cursos</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold text-xs">✓</div>
                                    <span className="text-platinum text-sm">Certificados verificados en Blockchain</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold text-xs">✓</div>
                                    <span className="text-platinum text-sm">Tutoría con IA personalizada 24/7</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <Link
                                    href="/pricing"
                                    className="block w-full py-4 bg-gradient-to-r from-accent-gold to-yellow-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-accent-gold/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm"
                                >
                                    Actualizar a Premium
                                </Link>
                                <button
                                    onClick={onClose}
                                    className="block w-full py-3 text-platinum-dim hover:text-white transition text-sm font-medium"
                                >
                                    Volver al Dashboard
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
