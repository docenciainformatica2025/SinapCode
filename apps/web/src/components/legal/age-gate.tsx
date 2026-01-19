'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AgeGate() {
    const [isVisible, setIsVisible] = useState(true);
    const [step, setStep] = useState<'date' | 'guardian'>('date');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [guardianEmail, setGuardianEmail] = useState('');

    // Check if previously verified
    useEffect(() => {
        const verified = localStorage.getItem('sinap_age_verified');
        if (verified) setIsVisible(false);
    }, []);

    const handleVerify = () => {
        const birthDate = new Date(`${year}-${month}-${day}`);
        const today = new Date();
        // Calculate age precisely
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age >= 16) {
            localStorage.setItem('sinap_age_verified', 'true');
            setIsVisible(false);
        } else {
            setStep('guardian');
        }
    };

    const handleGuardianSubmit = () => {
        // In a real app, send email here
        localStorage.setItem('sinap_age_verified', 'pending_guardian');
        setIsVisible(false);
        alert(`Solicitud enviada a ${guardianEmail}. Acceso provisional concedido.`);
    };

    const isFormValid = day.length === 2 && month.length === 2 && year.length === 4;

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-[40px]">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-[500px] glass-panel border border-neural-blue/50 p-10 rounded-3xl relative overflow-hidden shadow-neon-blue"
            >
                {/* Pulsing Neuron Icon */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-neural-blue to-cyan-400 blur-xl absolute top-10"
                    />
                    <div className="w-16 h-16 rounded-full bg-black border border-neural-blue flex items-center justify-center z-10 text-3xl">
                        🧠
                    </div>
                </div>

                <h2 className="text-center font-bold text-2xl text-white mb-2 tracking-wider">
                    PROTOCOLO DE ACCESO
                </h2>
                <p className="text-center text-neural-blue text-sm font-mono mb-8 uppercase tracking-[0.2em]">
                    SinapCode Ecosystem
                </p>

                <AnimatePresence mode='wait'>
                    {step === 'date' ? (
                        <motion.div
                            key="date"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <p className="text-platinum-dim text-center mb-8 text-sm leading-relaxed">
                                Bienvenido al ecosistema. Para personalizar tu experiencia de aprendizaje y cumplir con las normativas internacionales de protección al menor, necesitamos verificar tu perfil.
                            </p>

                            <div className="flex gap-4 justify-center mb-10">
                                <input
                                    type="text" placeholder="DD" maxLength={2} value={day} onChange={e => setDay(e.target.value)}
                                    className="w-20 h-16 bg-black/50 border border-white/20 rounded-xl text-center text-2xl font-bold text-white focus:border-neural-blue focus:shadow-neon-blue outline-none transition"
                                />
                                <input
                                    type="text" placeholder="MM" maxLength={2} value={month} onChange={e => setMonth(e.target.value)}
                                    className="w-20 h-16 bg-black/50 border border-white/20 rounded-xl text-center text-2xl font-bold text-white focus:border-neural-blue focus:shadow-neon-blue outline-none transition"
                                />
                                <input
                                    type="text" placeholder="AAAA" maxLength={4} value={year} onChange={e => setYear(e.target.value)}
                                    className="w-32 h-16 bg-black/50 border border-white/20 rounded-xl text-center text-2xl font-bold text-white focus:border-neural-blue focus:shadow-neon-blue outline-none transition"
                                />
                            </div>

                            <button
                                disabled={!isFormValid}
                                onClick={handleVerify}
                                className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest transition-all duration-300 ${isFormValid ? 'bg-neural-blue text-white shadow-neon-blue hover:scale-[1.02]' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
                            >
                                [ INICIAR SINAPSIS ]
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="guardian"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl mb-6">
                                <h3 className="text-amber-400 font-bold mb-1">⚠️ Mente Joven Detectada</h3>
                                <p className="text-xs text-amber-200">Detectamos una mente joven en entrenamiento.</p>
                            </div>

                            <p className="text-platinum-dim text-center mb-6 text-sm">
                                Para activar tu cuenta, requerimos la autorización de un tutor legal (Padre/Madre/Acudiente). Por favor, ingresa su correo electrónico para enviar el enlace de consentimiento.
                            </p>

                            <input
                                type="email" placeholder="Correo del Tutor" value={guardianEmail} onChange={e => setGuardianEmail(e.target.value)}
                                className="w-full mb-8 bg-black/50 border border-white/20 rounded-xl px-4 py-4 text-white focus:border-amber-400 outline-none transition"
                            />

                            <button
                                onClick={handleGuardianSubmit}
                                className="w-full py-4 rounded-xl font-bold text-sm tracking-widest bg-amber-500 text-black hover:bg-amber-400 transition-all shadow-lg"
                            >
                                [ SOLICITAR ACCESO ]
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
}
