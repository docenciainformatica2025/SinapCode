import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-deep-space">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-neural-blue hover:text-white transition text-sm mb-4 inline-block">
                        ← Volver al inicio
                    </Link>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Términos de Servicio
                    </h1>
                    <p className="text-platinum-dim">
                        Última actualización: 18 de enero de 2026 | Versión 2.1.1
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8">

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
                            <p className="text-platinum-dim leading-relaxed">
                                Al acceder y utilizar SinapCode ("la Plataforma"), usted acepta estar sujeto a estos Términos de Servicio.
                                Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Descripción del Servicio</h2>
                            <p className="text-platinum-dim leading-relaxed mb-4">
                                SinapCode es una plataforma educativa que ofrece:
                            </p>
                            <ul className="list-disc list-inside text-platinum-dim space-y-2 ml-4">
                                <li>Cursos de programación y tecnología</li>
                                <li>Tutor de inteligencia artificial (IA) personalizado</li>
                                <li>Certificados digitales verificados con blockchain</li>
                                <li>Herramientas para profesores y creadores de contenido</li>
                                <li>Panel administrativo para instituciones educativas</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Registro y Cuenta de Usuario</h2>
                            <div className="space-y-4 text-platinum-dim">
                                <p><strong className="text-white">3.1 Elegibilidad:</strong> Debe tener al menos 16 años para crear una cuenta. Los menores de 16 años requieren consentimiento parental.</p>
                                <p><strong className="text-white">3.2 Información Veraz:</strong> Usted se compromete a proporcionar información precisa y actualizada durante el registro.</p>
                                <p><strong className="text-white">3.3 Seguridad:</strong> Es responsable de mantener la confidencialidad de su contraseña y cuenta.</p>
                                <p><strong className="text-white">3.4 Uso Personal:</strong> Su cuenta es personal e intransferible.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Uso Aceptable</h2>
                            <p className="text-platinum-dim mb-4">Usted se compromete a NO:</p>
                            <ul className="list-disc list-inside text-platinum-dim space-y-2 ml-4">
                                <li>Compartir su cuenta con terceros</li>
                                <li>Utilizar la plataforma para actividades ilegales</li>
                                <li>Intentar acceder a áreas restringidas del sistema</li>
                                <li>Distribuir malware o contenido dañino</li>
                                <li>Hacer ingeniería inversa de la plataforma</li>
                                <li>Realizar scraping o extracción automatizada de datos</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Propiedad Intelectual</h2>
                            <div className="space-y-4 text-platinum-dim">
                                <p><strong className="text-white">5.1 Contenido de SinapCode:</strong> Todo el contenido (cursos, videos, textos, código) es propiedad de SinapCode o sus licenciantes.</p>
                                <p><strong className="text-white">5.2 Licencia de Uso:</strong> Le otorgamos una licencia limitada, no exclusiva, no transferible para acceder al contenido con fines educativos personales.</p>
                                <p><strong className="text-white">5.3 Contenido del Usuario:</strong> Usted retiene los derechos sobre el contenido que crea, pero nos otorga una licencia para mostrarlo en la plataforma.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Planes y Pagos</h2>
                            <div className="space-y-4 text-platinum-dim">
                                <p><strong className="text-white">6.1 Plan Gratuito:</strong> Acceso limitado a 3 cursos completos, sin costo.</p>
                                <p><strong className="text-white">6.2 Plan Pro:</strong> $19 USD/mes, acceso a todos los cursos, facturación mensual.</p>
                                <p><strong className="text-white">6.3 Reembolsos:</strong> Garantía de 30 días en el primer pago. Cancelaciones posteriores no son reembolsables.</p>
                                <p><strong className="text-white">6.4 Cancelación:</strong> Puede cancelar en cualquier momento desde su panel de usuario.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Privacidad y Datos</h2>
                            <p className="text-platinum-dim">
                                El tratamiento de sus datos personales se rige por nuestra{' '}
                                <Link href="/privacy" className="text-neural-blue hover:text-white transition">
                                    Política de Privacidad
                                </Link>
                                , que cumple con GDPR, COPPA y la Ley 1581 de 2012 (Colombia).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Certificados</h2>
                            <div className="space-y-4 text-platinum-dim">
                                <p><strong className="text-white">8.1 Emisión:</strong> Los certificados se emiten al completar el 100% de un curso y aprobar las evaluaciones.</p>
                                <p><strong className="text-white">8.2 Verificación:</strong> Los certificados Pro están verificados en blockchain (Ethereum/Polygon).</p>
                                <p><strong className="text-white">8.3 Validez:</strong> Los certificados son válidos indefinidamente y pueden ser verificados por terceros.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. Limitación de Responsabilidad</h2>
                            <p className="text-platinum-dim">
                                SinapCode se proporciona "tal cual". No garantizamos resultados específicos de aprendizaje o empleabilidad.
                                No somos responsables por daños indirectos, incidentales o consecuentes derivados del uso de la plataforma.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">10. Modificaciones</h2>
                            <p className="text-platinum-dim">
                                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios significativos
                                se notificarán por email con 30 días de anticipación.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">11. Ley Aplicable</h2>
                            <p className="text-platinum-dim">
                                Estos términos se rigen por las leyes de Colombia. Cualquier disputa se resolverá en los tribunales de Bogotá, Colombia.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">12. Contacto</h2>
                            <p className="text-platinum-dim">
                                Para preguntas sobre estos términos, contáctenos en:{' '}
                                <a href="mailto:sinapcodeia@gmail.com" className="text-neural-blue hover:text-white transition">
                                    sinapcodeia@gmail.com
                                </a>
                            </p>
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
