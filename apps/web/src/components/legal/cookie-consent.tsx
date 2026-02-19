'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieConsent() {
    const [mounted, setMounted] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const [showPreferences, setShowPreferences] = React.useState(false);

    // State for preferences
    const [preferences, setPreferences] = React.useState({
        essential: true, // Always true and locked
        analytics: false,
        marketing: false,
    });

    React.useEffect(() => {
        setMounted(true);
        const consent = localStorage.getItem('sinap_cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const saveConsentToApi = async (method: 'button_click' | 'scroll_complete', type: 'full' | 'essential' | 'custom', prefs: typeof preferences) => {
        try {
            await fetch('/api/legal/consent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    documentType: 'COOKIES',
                    documentVersion: '1.0', // Este debería venir de config
                    consentMethod: method,
                    timestamp: new Date().toISOString(),
                    metadata: {
                        preferences: prefs,
                        type: type
                    }
                    // ipAddress & userAgent are handled by server
                })
            });
        } catch (error) {
            console.error('Error al guardar el rastro del consentimiento:', error);
        }
    };

    const handleAcceptAll = () => {
        const allPrefs = { essential: true, analytics: true, marketing: true };
        setPreferences(allPrefs);
        localStorage.setItem('sinap_cookie_consent', 'full');
        saveConsentToApi('button_click', 'full', allPrefs);
        setIsVisible(false);
    };

    const handleRejectNonEssential = () => {
        const essentialPrefs = { essential: true, analytics: false, marketing: false };
        setPreferences(essentialPrefs);
        localStorage.setItem('sinap_cookie_consent', 'essential');
        saveConsentToApi('button_click', 'essential', essentialPrefs);
        setIsVisible(false);
    };

    const handleSavePreferences = () => {
        // Determine type based on selection
        const type = (preferences.analytics && preferences.marketing) ? 'full' :
            (!preferences.analytics && !preferences.marketing) ? 'essential' : 'custom';

        localStorage.setItem('sinap_cookie_consent', type);
        saveConsentToApi('button_click', type, preferences);
        setIsVisible(false);
        setShowPreferences(false);
    };

    const togglePreference = (key: keyof typeof preferences) => {
        if (key === 'essential') return; // Cannot toggle essential
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };


    if (!mounted || !isVisible) return null;

    return (
        <>
            {/* Main Banner */}
            {!showPreferences && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-[450px] glass-panel-nexus p-8 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
                >
                    <div className="flex flex-col gap-6">
                        <div>
                            <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-3 tracking-tight text-balance">
                                Trazabilidad & Privacidad
                                <span className="text-[10px] bg-primary/20 border border-primary/20 px-2 py-0.5 rounded-full text-primary font-bold uppercase tracking-widest">GDPR</span>
                            </h3>
                            <p className="text-platinum-dim text-sm leading-relaxed opacity-80 text-pretty font-medium">
                                Utilizamos cookies y tecnologías de análisis cognitivo para optimizar el rendimiento de la plataforma y adaptar la IA a tu ritmo de aprendizaje. Respetamos tu soberanía de datos.
                            </p>
                            <button
                                onClick={() => setShowPreferences(true)}
                                className="text-xs text-primary font-bold mt-4 hover:underline transition-all duration-300"
                            >
                                Configurar Preferencias
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleAcceptAll}
                                className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95"
                            >
                                Aceptar todas y continuar
                            </button>
                            <button
                                onClick={handleRejectNonEssential}
                                className="w-full py-3.5 bg-white/[0.03] border border-white/10 text-platinum hover:bg-white/5 font-bold text-sm rounded-xl transition-all duration-300"
                            >
                                Rechazar no esenciales
                            </button>
                            <div className="text-[10px] text-center text-platinum-dim opacity-40 font-medium mt-1">
                                Habilita la personalización completa con IA
                            </div>
                        </div>
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
                                    isOn={preferences.essential}
                                    onToggle={() => togglePreference('essential')}
                                />
                                <ToggleItem
                                    title="Aprendizaje Adaptativo (Analíticas)"
                                    desc="Permite que la IA recuerde tus errores pasados para personalizar las futuras lecciones. Sin esto, el tutor será genérico."
                                    isOn={preferences.analytics}
                                    onToggle={() => togglePreference('analytics')}
                                />
                                <ToggleItem
                                    title="Marketing y Comunicación"
                                    desc="Nos permite mostrarte oportunidades de becas o nuevos cursos basados en tus intereses."
                                    isOn={preferences.marketing}
                                    onToggle={() => togglePreference('marketing')}
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
                                    onClick={handleSavePreferences}
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

interface ToggleItemProps {
    title: string;
    desc: string;
    locked?: boolean;
    isOn: boolean;
    onToggle: () => void;
}

function ToggleItem({ title, desc, locked, isOn, onToggle }: ToggleItemProps) {
    return (
        <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
                <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
                <p className="text-platinum-dim text-xs leading-relaxed">{desc}</p>
            </div>
            <div
                onClick={() => !locked && onToggle()}
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
