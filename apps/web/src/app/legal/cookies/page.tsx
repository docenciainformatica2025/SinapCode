import Link from 'next/link';

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-deep-space">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-neural-blue hover:text-white transition text-sm mb-4 inline-block">
                        ← Volver al inicio
                    </Link>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Política de Cookies
                    </h1>
                    <p className="text-platinum-dim">
                        Última actualización: 18 de enero de 2026 | Cumplimiento: GDPR, ePrivacy Directive
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8">

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. ¿Qué son las Cookies?</h2>
                            <p className="text-platinum-dim leading-relaxed">
                                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web.
                                Nos ayudan a mejorar su experiencia, recordar sus preferencias y entender cómo usa nuestra plataforma.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Tipos de Cookies que Utilizamos</h2>

                            <div className="space-y-6">
                                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <span className="text-blue-400">🔒</span> Cookies Esenciales (Obligatorias)
                                    </h3>
                                    <p className="text-platinum-dim mb-3">
                                        Necesarias para el funcionamiento básico de la plataforma. No pueden desactivarse.
                                    </p>
                                    <ul className="list-disc list-inside text-platinum-dim space-y-1 ml-4">
                                        <li><strong className="text-white">Sesión de usuario:</strong> Mantienen su sesión activa mientras navega</li>
                                        <li><strong className="text-white">Autenticación:</strong> Verifican su identidad y permisos</li>
                                        <li><strong className="text-white">Seguridad:</strong> Protegen contra ataques CSRF y XSS</li>
                                        <li><strong className="text-white">Balanceo de carga:</strong> Distribuyen el tráfico entre servidores</li>
                                    </ul>
                                    <p className="text-sm text-platinum-dim mt-3">
                                        <strong>Duración:</strong> Sesión (se eliminan al cerrar el navegador) o 30 días
                                    </p>
                                </div>

                                <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-4">
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <span className="text-purple-400">⚙️</span> Cookies Funcionales (Opcionales)
                                    </h3>
                                    <p className="text-platinum-dim mb-3">
                                        Mejoran su experiencia recordando sus preferencias.
                                    </p>
                                    <ul className="list-disc list-inside text-platinum-dim space-y-1 ml-4">
                                        <li><strong className="text-white">Tema:</strong> Modo oscuro/claro</li>
                                        <li><strong className="text-white">Idioma:</strong> Preferencia de idioma</li>
                                        <li><strong className="text-white">Configuración:</strong> Tamaño de fuente, accesibilidad</li>
                                        <li><strong className="text-white">Progreso:</strong> Última lección visitada</li>
                                    </ul>
                                    <p className="text-sm text-platinum-dim mt-3">
                                        <strong>Duración:</strong> 1 año
                                    </p>
                                </div>

                                <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <span className="text-green-400">📊</span> Cookies Analíticas (Opcionales)
                                    </h3>
                                    <p className="text-platinum-dim mb-3">
                                        Nos ayudan a entender cómo usa la plataforma para mejorarla.
                                    </p>
                                    <ul className="list-disc list-inside text-platinum-dim space-y-1 ml-4">
                                        <li><strong className="text-white">Google Analytics:</strong> Estadísticas de uso (IP anonimizada)</li>
                                        <li><strong className="text-white">Métricas de rendimiento:</strong> Tiempo de carga, errores</li>
                                        <li><strong className="text-white">Patrones de navegación:</strong> Páginas más visitadas</li>
                                        <li><strong className="text-white">Tasa de conversión:</strong> Registro, completación de cursos</li>
                                    </ul>
                                    <p className="text-sm text-platinum-dim mt-3">
                                        <strong>Duración:</strong> 2 años | <strong>Proveedor:</strong> Google LLC
                                    </p>
                                </div>

                                <div className="bg-gray-700/20 border border-gray-600 rounded-lg p-4 opacity-60">
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <span className="text-gray-400">🚫</span> Cookies de Marketing (No Utilizadas)
                                    </h3>
                                    <p className="text-platinum-dim">
                                        Actualmente <strong>NO</strong> utilizamos cookies de marketing, publicidad o retargeting.
                                        Si esto cambia en el futuro, solicitaremos su consentimiento explícito.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Base Legal para el Uso de Cookies</h2>
                            <div className="space-y-3 text-platinum-dim">
                                <p><strong className="text-white">Cookies Esenciales:</strong> Interés legítimo (necesarias para proporcionar el servicio)</p>
                                <p><strong className="text-white">Cookies Funcionales y Analíticas:</strong> Consentimiento explícito (puede aceptar o rechazar)</p>
                                <p className="text-sm mt-4">
                                    Cumplimos con el Reglamento General de Protección de Datos (GDPR) y la Directiva ePrivacy de la UE.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Gestionar sus Preferencias de Cookies</h2>
                            <div className="space-y-4 text-platinum-dim">
                                <p>Puede gestionar sus preferencias de cookies en cualquier momento:</p>

                                <div className="bg-white/5 rounded-lg p-4 space-y-3">
                                    <p><strong className="text-white">Opción 1: Centro de Preferencias</strong></p>
                                    <p className="text-sm">
                                        Haga clic en el botón de configuración de cookies en la parte inferior de cualquier página
                                        para abrir el panel de preferencias.
                                    </p>
                                </div>

                                <div className="bg-white/5 rounded-lg p-4 space-y-3">
                                    <p><strong className="text-white">Opción 2: Configuración del Navegador</strong></p>
                                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                                        <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                                        <li><strong>Firefox:</strong> Preferencias → Privacidad y seguridad → Cookies</li>
                                        <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                                        <li><strong>Edge:</strong> Configuración → Privacidad → Cookies</li>
                                    </ul>
                                </div>

                                <p className="text-sm text-yellow-400">
                                    ⚠️ <strong>Nota:</strong> Bloquear cookies esenciales puede afectar la funcionalidad de la plataforma
                                    (no podrá iniciar sesión o acceder a cursos).
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Cookies de Terceros</h2>
                            <div className="space-y-3 text-platinum-dim">
                                <p>Utilizamos servicios de terceros que pueden establecer sus propias cookies:</p>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-2 text-white">Servicio</th>
                                                <th className="text-left py-2 text-white">Propósito</th>
                                                <th className="text-left py-2 text-white">Política</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-white/5">
                                                <td className="py-2">Google Analytics</td>
                                                <td className="py-2">Análisis de uso</td>
                                                <td className="py-2">
                                                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-neural-blue hover:text-white transition">
                                                        Ver política
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-white/5">
                                                <td className="py-2">Vercel</td>
                                                <td className="py-2">Hosting y CDN</td>
                                                <td className="py-2">
                                                    <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-neural-blue hover:text-white transition">
                                                        Ver política
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Duración de las Cookies</h2>
                            <ul className="list-disc list-inside text-platinum-dim space-y-2 ml-4">
                                <li><strong className="text-white">Cookies de sesión:</strong> Se eliminan automáticamente al cerrar el navegador</li>
                                <li><strong className="text-white">Cookies persistentes:</strong> Permanecen entre 30 días y 2 años, según el tipo</li>
                                <li><strong className="text-white">Renovación:</strong> Algunas cookies se renuevan automáticamente con cada visita</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Actualizaciones de esta Política</h2>
                            <p className="text-platinum-dim">
                                Podemos actualizar esta política ocasionalmente para reflejar cambios en nuestras prácticas o requisitos legales.
                                Los cambios significativos se notificarán mediante un banner en la plataforma.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Contacto</h2>
                            <div className="text-platinum-dim space-y-2">
                                <p>Para preguntas sobre cookies o privacidad:</p>
                                <p><strong className="text-white">Email:</strong>{' '}
                                    <a href="mailto:sinapcodeia@gmail.com" className="text-neural-blue hover:text-white transition">
                                        sinapcodeia@gmail.com
                                    </a>
                                </p>
                                <p className="text-sm mt-4">
                                    También puede consultar nuestra{' '}
                                    <Link href="/privacy" className="text-neural-blue hover:text-white transition">
                                        Política de Privacidad
                                    </Link>
                                    {' '}completa.
                                </p>
                            </div>
                        </section>

                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <Link href="/" className="inline-block px-6 py-3 bg-neural-blue text-white rounded-lg font-bold hover:bg-blue-600 transition">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
