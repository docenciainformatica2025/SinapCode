'use client';

import { useState, useEffect } from 'react';
import { cookieConsent } from '@/lib/legal/cookie-consent-manager';
import { X, Cookie, Settings } from 'lucide-react';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true,
        functional: false,
        analytics: false,
        marketing: false
    });

    useEffect(() => {
        // Check if user has already given consent
        const hasConsent = cookieConsent.hasConsent();
        const needsUpdate = cookieConsent.needsUpdate();

        if (!hasConsent || needsUpdate) {
            // Show banner after a short delay
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const handleAcceptAll = async () => {
        await cookieConsent.acceptAll();
        setIsVisible(false);
    };

    const handleRejectOptional = async () => {
        await cookieConsent.rejectOptional();
        setIsVisible(false);
    };

    const handleSavePreferences = async () => {
        await cookieConsent.savePreferences(preferences);
        setIsVisible(false);
        setShowPreferences(false);
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 z-40" />

            {/* Banner */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
                <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
                    {!showPreferences ? (
                        // Main Banner
                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Cookie className="w-8 h-8 text-blue-600" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        🍪 Usamos Cookies
                                    </h3>

                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        Utilizamos cookies esenciales para el funcionamiento del sitio y cookies opcionales
                                        para mejorar tu experiencia. Puedes personalizar tus preferencias o aceptar todas.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            onClick={handleAcceptAll}
                                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                        >
                                            Aceptar Todas
                                        </button>

                                        <button
                                            onClick={handleRejectOptional}
                                            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
                                        >
                                            Solo Esenciales
                                        </button>

                                        <button
                                            onClick={() => setShowPreferences(true)}
                                            className="px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <Settings className="w-4 h-4" />
                                            Personalizar
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                                        Al continuar navegando, aceptas nuestra{' '}
                                        <a href="/privacy" className="underline hover:text-blue-600">
                                            Política de Cookies
                                        </a>
                                        {' '}y{' '}
                                        <a href="/privacy" className="underline hover:text-blue-600">
                                            Política de Privacidad
                                        </a>
                                        .
                                    </p>
                                </div>

                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    aria-label="Cerrar"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Preferences Panel
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Preferencias de Cookies
                                </h3>
                                <button
                                    onClick={() => setShowPreferences(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Essential Cookies */}
                                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <input
                                        type="checkbox"
                                        checked={true}
                                        disabled
                                        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                Cookies Esenciales
                                            </h4>
                                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                                                Siempre Activas
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                            Necesarias para el funcionamiento básico del sitio (autenticación, sesión).
                                        </p>
                                    </div>
                                </div>

                                {/* Functional Cookies */}
                                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <input
                                        type="checkbox"
                                        checked={preferences.functional}
                                        onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                                        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                            Cookies Funcionales
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                            Recordar tus preferencias (tema, idioma, configuración).
                                        </p>
                                    </div>
                                </div>

                                {/* Analytics Cookies */}
                                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <input
                                        type="checkbox"
                                        checked={preferences.analytics}
                                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                            Cookies Analíticas
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                            Nos ayudan a entender cómo usas el sitio (Google Analytics, IP anonimizada).
                                        </p>
                                    </div>
                                </div>

                                {/* Marketing Cookies */}
                                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50">
                                    <input
                                        type="checkbox"
                                        checked={false}
                                        disabled
                                        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                Cookies de Marketing
                                            </h4>
                                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded">
                                                No Utilizadas
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                            Actualmente no utilizamos cookies de marketing o publicidad.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                <button
                                    onClick={handleSavePreferences}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                >
                                    Guardar Preferencias
                                </button>

                                <button
                                    onClick={() => setShowPreferences(false)}
                                    className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
