'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('sinap_cookie_consent');
        if (!consent) setIsVisible(true);
    }, []);

    const saveConsentToApi = async (method: 'button_click' | 'scroll_complete', type: 'full' | 'essential') => {
        try {
            await fetch('/api/legal/consent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    documentType: 'cookies',
                    documentVersion: '1.0', // Este debería venir de config
                    consentMethod: method,
                    timestamp: new Date().toISOString(),
                    // ipAddress & userAgent are handled by server
                })
            });
        } catch (error) {
            console.error('Failed to save consent trace:', error);
        }
    };

    const handleAcceptAll = () => {
        localStorage.setItem('sinap_cookie_consent', 'full');
        saveConsentToApi('button_click', 'full');
        setIsVisible(false);
    };

    const handleRejectNonEssential = () => {
        localStorage.setItem('sinap_cookie_consent', 'essential');
        saveConsentToApi('button_click', 'essential');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Main Banner */}
            {!showPreferences && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-[#1A1B20] border border-white/10 rounded-2xl p-6 shadow-2xl z-50 flex flex-col md:flex-row gap-6 items-center"
                >
                    <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            Traazabilidad & Privacidad <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-platinum">GDPR</span>
                        </h3>
                        <p className="text-platinum-dim text-xs leading-relaxed">
                            Utilizamos cookies y tecnologías de análisis cognitivo para optimizar el rendimiento de la plataforma y adaptar la Inteligencia Artificial a tu ritmo de aprendizaje. Respetamos tu soberanía de datos bajo estándares internacionales.
                        </p>
                        <button
                            onClick={() => setShowPreferences(true)}
                            className="text-xs text-neural-blue underline mt-2 hover:text-white transition"
                        >
                            Configurar Preferencias
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[250px]">
                        <button
                            onClick={handleAcceptAll}
                            className="w-full py-3 bg-neural-blue hover:bg-blue-600 text-white font-bold text-xs rounded-lg shadow-neon-blue transition-all"
                        >
                            [ ACEPTAR TODAS Y CONTINUAR ]
                        </button>
                        <div className="text-[9px] text-center text-platinum-dim opacity-60">Habilita la personalización completa con IA</div>

                        <button
                            onClick={handleRejectNonEssential}
                            className="w-full py-3 bg-transparent border border-white/30 text-platinum hover:bg-white/5 hover:border-white font-bold text-xs rounded-lg transition-all"
                        >
                            [ RECHAZAR NO ESENCIALES ]
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Preferences Modal */}
            <AnimatePresence>
                {showPreferences && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-[600px] bg-[#1A1B20] border border-white/10 rounded-2xl p-8 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                                <h3 className="text-xl font-bold text-white">Configuración de Privacidad</h3>
                                <button onClick={() => setShowPreferences(false)} className="text-platinum hover:text-white">✕</button>
                            </div>

                            <div className="space-y-6">
                                <ToggleItem
                                    title="Estrictamente Necesarias"
                                    desc="Esenciales para el login seguro, la prevención de fraudes y la ejecución de código en tiempo real."
                                    locked={true}
                                    active={true}
                                />
                                <ToggleItem
                                    title="Aprendizaje Adaptativo (Analíticas)"
                                    desc="Permite que la IA recuerde tus errores pasados para personalizar las futuras lecciones. Sin esto, el tutor será genérico."
                                    active={false} // Default OFF for EU
                                />
                                <ToggleItem
                                    title="Marketing y Comunicación"
                                    desc="Nos permite mostrarte oportunidades de becas o nuevos cursos basados en tus intereses."
                                    active={false}
                                />
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-4">
                                <button
                                    onClick={() => setShowPreferences(false)}
                                    className="px-6 py-2 text-platinum text-sm hover:text-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleAcceptAll} // In real app would save specific prefs
                                    className="px-6 py-2 bg-white text-black font-bold text-sm rounded-lg hover:bg-platinum transition"
                                >
                                    Guardar Preferencias
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

function ToggleItem({ title, desc, locked, active }: any) {
    const [isOn, setIsOn] = useState(active);

    return (
        <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
                <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
                <p className="text-platinum-dim text-xs leading-relaxed">{desc}</p>
            </div>
            <div
                onClick={() => !locked && setIsOn(!isOn)}
                className={`w-12 h-6 rounded-full p-1 flex items-center cursor-pointer transition-colors ${isOn ? 'bg-neural-blue' : 'bg-white/10'} ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <motion.div
                    layout
                    className="w-4 h-4 bg-white rounded-full"
                    animate={{ x: isOn ? 24 : 0 }}
                />
            </div>
        </div>
    )
}
