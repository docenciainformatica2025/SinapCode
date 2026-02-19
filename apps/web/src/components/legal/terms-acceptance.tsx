'use client';

import { useState, useEffect } from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

interface TermsAcceptanceProps {
    onAccept: () => void;
    onDecline?: () => void;
    termsVersion?: string;
}

export default function TermsAcceptance({
    onAccept,
    onDecline,
    termsVersion = '1.0.0'
}: TermsAcceptanceProps) {
    const [hasRead, setHasRead] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const handleAccept = async () => {
        if (!hasRead || !accepted) {
            alert('Por favor, lee los términos y marca la casilla de aceptación.');
            return;
        }

        // Record acceptance
        try {
            await fetch('/api/legal/accept-terms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    termsVersion,
                    acceptedAt: new Date().toISOString()
                })
            });

            onAccept();
        } catch (error) {
            console.error('Error al aceptar los términos:', error);
            alert('Error al registrar la aceptación. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Términos de Servicio
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Versión {termsVersion} • Última actualización: 12 de enero de 2026
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Por favor, lee cuidadosamente nuestros Términos de Servicio antes de usar SinapCode.
                        </p>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                📋 Resumen de Términos Clave
                            </h3>
                            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                                <li>✓ Debes tener al menos 13 años para usar la plataforma</li>
                                <li>✓ Menores de 18 años requieren consentimiento parental</li>
                                <li>✓ Tus datos están protegidos según GDPR y Ley 1581 de 2012</li>
                                <li>✓ Puedes eliminar tu cuenta en cualquier momento</li>
                                <li>✓ No compartimos tus datos con terceros sin tu consentimiento</li>
                            </ul>
                        </div>

                        <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                            <section>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    1. Aceptación de los Términos
                                </h3>
                                <p>
                                    Al acceder y utilizar SinapCode, usted acepta estar legalmente vinculado por estos
                                    Términos de Servicio. Si no está de acuerdo, no debe utilizar la Plataforma.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    2. Uso Aceptable
                                </h3>
                                <p>
                                    Puede utilizar la Plataforma para aprender programación y tecnología. Está prohibido:
                                    realizar actividades ilegales, acosar a otros usuarios, o intentar acceder a cuentas
                                    de terceros.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    3. Privacidad y Datos
                                </h3>
                                <p>
                                    Sus datos personales están protegidos según nuestra{' '}
                                    <a href="/privacy" target="_blank" className="text-blue-600 hover:underline">
                                        Política de Privacidad
                                    </a>
                                    . Tiene derecho a acceder, rectificar y eliminar sus datos en cualquier momento.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    4. Propiedad Intelectual
                                </h3>
                                <p>
                                    Todo el contenido de la Plataforma es propiedad de SinapCode. Le otorgamos una
                                    licencia limitada para uso educativo personal.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    5. Limitación de Responsabilidad
                                </h3>
                                <p>
                                    La Plataforma se proporciona "tal cual". No garantizamos disponibilidad ininterrumpida
                                    ni resultados específicos de aprendizaje.
                                </p>
                            </section>
                        </div>

                        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                <strong>Importante:</strong> Para ver los términos completos, visita{' '}
                                <a
                                    href="/legal/terms"
                                    target="_blank"
                                    className="underline hover:text-yellow-900 dark:hover:text-yellow-100"
                                >
                                    Términos de Servicio Completos
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="mt-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-300"
                                style={{ width: hasRead ? '100%' : '0%' }}
                            />
                        </div>
                        {hasRead ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                            <span className="text-xs">Desplázate para continuar</span>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-3 mb-4">
                        <input
                            type="checkbox"
                            id="accept-terms"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="accept-terms" className="text-sm text-gray-700 dark:text-gray-300">
                            He leído y acepto los{' '}
                            <a href="/legal/terms" target="_blank" className="text-blue-600 hover:underline">
                                Términos de Servicio
                            </a>
                            {' '}y la{' '}
                            <a href="/privacy" target="_blank" className="text-blue-600 hover:underline">
                                Política de Privacidad
                            </a>
                            {' '}de SinapCode.
                        </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleAccept}
                            disabled={!hasRead || !accepted}
                            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                        >
                            Aceptar y Continuar
                        </button>

                        {onDecline && (
                            <button
                                onClick={onDecline}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
                            >
                                Rechazar
                            </button>
                        )}
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                        Al aceptar, confirmas que tienes al menos 13 años de edad y, si eres menor de 18 años,
                        cuentas con el consentimiento de tus padres o tutores legales.
                    </p>
                </div>
            </div>
        </div>
    );
}

// Hook to detect scroll to bottom
function useScrollToBottom(ref: React.RefObject<HTMLDivElement>, callback: () => void) {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = element;
            const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;

            if (isNearBottom) {
                callback();
            }
        };

        element.addEventListener('scroll', handleScroll);
        return () => element.removeEventListener('scroll', handleScroll);
    }, [ref, callback]);
}
