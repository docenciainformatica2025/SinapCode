"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { legalTokens as tokens } from "@/lib/constants/legal-tokens";
import { ConsentTracker } from "@/lib/legal/consent-tracker";

/**
 * Premium Cookie Consent Modal (GDPR & CCPA Compliant)
 * Standardized for SINAPCODE platform.
 */
export function CookieConsent() {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true, // Always true
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        setMounted(true);
        // Check if consent was already given
        const savedConsent = localStorage.getItem("sinapcode_cookie_consent");
        if (!savedConsent) {
            // Delay visibility for better UX/LCP
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = async () => {
        const allAccepted = { essential: true, analytics: true, marketing: true };
        localStorage.setItem("sinapcode_cookie_consent", "full");

        await ConsentTracker.recordConsent({
            documentType: 'cookies',
            documentVersion: 'v2.1.1',
            consentMethod: 'button_click'
        });

        setIsVisible(false);
    };

    const handleSavePreferences = async () => {
        const type = (preferences.analytics && preferences.marketing) ? 'full' :
            (!preferences.analytics && !preferences.marketing) ? 'essential' : 'custom';

        localStorage.setItem("sinapcode_cookie_consent", type);

        await ConsentTracker.recordConsent({
            documentType: 'cookies',
            documentVersion: 'v2.1.1',
            consentMethod: 'button_click'
        });

        setIsVisible(false);
        setShowPreferences(false);
    };

    if (!mounted || !isVisible) return null;

    return (
        <>
            {/* Main Banner */}
            {!showPreferences && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-[480px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-[2.5rem] p-8 z-[100] pointer-events-auto"
                >
                    <div className="flex flex-col gap-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Privacy First</span>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">Preferencias de Cookies</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                                    Utilizamos cookies para mejorar su experiencia cognitiva y analizar el rendimiento en la infraestructura de SINAPCODE.
                                    Acepte todas para habilitar el aprendizaje personalizado por IA.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleAcceptAll}
                                className="w-full py-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:-translate-y-0.5"
                            >
                                Aceptar Todo y Continuar
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setShowPreferences(true)}
                                    className="px-4 py-3 text-sm font-bold border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
                                >
                                    Configurar
                                </button>
                                <button
                                    onClick={async () => {
                                        localStorage.setItem("sinapcode_cookie_consent", "essential");
                                        setIsVisible(false);
                                    }}
                                    className="px-4 py-3 text-sm font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
                                >
                                    Solo Esenciales
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Preferences Modal */}
            <AnimatePresence>
                {showPreferences && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-neutral-950/40 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-[3rem] p-10 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold tracking-tight">Ajustes de Privacidad</h3>
                                <button onClick={() => setShowPreferences(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 hover:scale-110 transition">✕</button>
                            </div>

                            <div className="space-y-8">
                                <ToggleItem
                                    title="Estrictamente Necesarias"
                                    desc="Requeridas para la autenticación, seguridad y estabilidad central de la plataforma."
                                    locked={true}
                                    isOn={preferences.essential}
                                    onToggle={() => { }}
                                />
                                <ToggleItem
                                    title="Analíticas y Personalización"
                                    desc="Ayuda a nuestra IA a entender su ritmo de aprendizaje y optimizar la entrega del currículo."
                                    isOn={preferences.analytics}
                                    onToggle={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                                />
                                <ToggleItem
                                    title="Comunicaciones de Marketing"
                                    desc="Actualizaciones relevantes sobre nuevos cursos, oportunidades de becas y funciones."
                                    isOn={preferences.marketing}
                                    onToggle={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                                />
                            </div>

                            <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-4">
                                <button
                                    onClick={handleSavePreferences}
                                    className="w-full py-4 bg-indigo-600 text-white font-bold text-sm rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none"
                                >
                                    Guardar mis Preferencias
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

function ToggleItem({ title, desc, locked, isOn, onToggle }: { title: string, desc: string, locked?: boolean, isOn: boolean, onToggle: () => void }) {
    return (
        <div className="flex justify-between items-start gap-6">
            <div className="flex-1">
                <h4 className="font-bold text-base mb-1">{title}</h4>
                <p className="text-neutral-500 text-xs leading-relaxed">{desc}</p>
            </div>
            <div
                onClick={() => !locked && onToggle()}
                className={`w-14 h-7 rounded-full p-1 flex items-center cursor-pointer transition-all duration-500 ${isOn ? 'bg-indigo-600' : 'bg-neutral-200 dark:bg-neutral-800'} ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <motion.div
                    layout
                    className="w-5 h-5 bg-white rounded-full shadow-sm"
                    animate={{ x: isOn ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </div>
        </div>
    );
}
