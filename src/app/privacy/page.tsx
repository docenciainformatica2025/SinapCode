import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-deep-space">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-neural-blue hover:text-white transition text-sm mb-4 inline-block">
                        ← Volver al inicio
                    </Link>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="text-platinum-dim">
                        Última actualización: 9 de enero de 2026 | Cumplimiento: GDPR, COPPA, Ley 1581/2012
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8">

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Introducción</h2>
                            <p className="text-platinum-dim leading-relaxed">
                                En SinapCode, respetamos su privacidad y nos comprometemos a proteger sus datos personales.
                                Esta política explica qué información recopilamos, cómo la usamos y sus derechos sobre ella.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Información que Recopilamos</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">2.1 Información de Registro</h3>
                                    <ul className="list-disc list-inside text-platinum-dim space-y-1 ml-4">
                                        <li>Nombre completo</li>
                                        <li>Correo electrónico</li>
                                        <li>Fecha de nacimiento (verificación de edad)</li>
                                        <li>Contraseña (encriptada con bcrypt)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">2.2 Información de Uso</h3>
                                    <ul className="list-disc list-inside text-platinum-dim space-y-1 ml-4">
                                        <li>Progreso en cursos y lecciones</li>
                                        <li>Interacciones con el tutor de IA</li>
                                        <li>Tiempo de estudio y patrones de aprendizaje</li>
                                        <li>Certificados obtenidos</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">2.3 Información Técnica</h3>
                                    <ul className="list-disc list-inside text-platinum-dim space-y-1 ml-4">
                                        <li>Dirección IP</li>
                                        <li>Tipo de navegador y dispositivo</li>
                                        <li>Sistema operativo</li>
                                        <li>Cookies y tecnologías similares</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Cómo Usamos su Información</h2>
                            <ul className="list-disc list-inside text-platinum-dim space-y-2 ml-4">
                                <li>Proporcionar y mejorar nuestros servicios educativos</li>
                                <li>Personalizar su experiencia de aprendizaje con IA</li>
                                <li>Emitir certificados y verificar su identidad</li>
                                <li>Enviar notificaciones sobre su progreso y nuevos contenidos</li>
                                <li>Analizar el uso de la plataforma para mejoras</li>
                                <li>Cumplir con obligaciones legales y regulatorias</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Base Legal (GDPR)</h2>
                            <div className="space-y-3 text-platinum-dim">
                                <p><strong className="text-white">Consentimiento:</strong> Al registrarse, usted consiente el procesamiento de sus datos.</p>
                                <p><strong className="text-white">Ejecución de Contrato:</strong> Necesitamos sus datos para proporcionar el servicio educativo.</p>
                                <p><strong className="text-white">Interés Legítimo:</strong> Mejoramos la plataforma basándonos en análisis de uso anónimo.</p>
                                <p><strong className="text-white">Obligación Legal:</strong> Cumplimos con leyes de protección al menor (COPPA).</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Protección de Menores (COPPA)</h2>
                            <div className="space-y-3 text-platinum-dim">
                                <p>No recopilamos intencionalmente datos de menores de 13 años sin consentimiento parental.</p>
                                <p><strong className="text-white">Menores de 16 años:</strong> Requieren autorización de un tutor legal para crear una cuenta.</p>
                                <p><strong className="text-white">Verificación:</strong> Solicitamos la fecha de nacimiento durante el registro.</p>
                                <p><strong className="text-white">Consentimiento Parental:</strong> Enviamos un email al tutor legal para autorización.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Compartir Información</h2>
                            <p className="text-platinum-dim mb-4">NO vendemos sus datos personales. Compartimos información solo con:</p>
                            <ul className="list-disc list-inside text-platinum-dim space-y-2 ml-4">
                                <li><strong className="text-white">Proveedores de Servicios:</strong> Stripe (pagos), SendGrid (emails), Google Cloud (hosting)</li>
                                <li><strong className="text-white">Requisitos Legales:</strong> Si la ley lo requiere o para proteger nuestros derechos</li>
                                <li><strong className="text-white">Con su Consentimiento:</strong> Si usted autoriza explícitamente compartir con terceros</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Sus Derechos (GDPR & Ley 1581)</h2>
                            <div className="space-y-3 text-platinum-dim">
                                <p><strong className="text-white">Acceso:</strong> Solicitar una copia de sus datos personales</p>
                                <p><strong className="text-white">Rectificación:</strong> Corregir datos inexactos o incompletos</p>
                                <p><strong className="text-white">Supresión:</strong> Solicitar la eliminación de sus datos ("derecho al olvido")</p>
                                <p><strong className="text-white">Portabilidad:</strong> Recibir sus datos en formato estructurado (JSON/CSV)</p>
                                <p><strong className="text-white">Oposición:</strong> Oponerse al procesamiento de sus datos</p>
                                <p><strong className="text-white">Limitación:</strong> Restringir el procesamiento en ciertos casos</p>
                            </div>
                            <p className="text-platinum-dim mt-4">
                                Para ejercer estos derechos, contáctenos en:{' '}
                                <a href="mailto:privacy@sinapcode.com" className="text-neural-blue hover:text-white transition">
                                    privacy@sinapcode.com
                                </a>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Seguridad de Datos</h2>
                            <ul className="list-disc list-inside text-platinum-dim space-y-2 ml-4">
                                <li>Encriptación SSL/TLS para todas las comunicaciones</li>
                                <li>Contraseñas hasheadas con bcrypt (factor 12)</li>
                                <li>Autenticación de dos factores (2FA) disponible</li>
                                <li>Backups diarios encriptados</li>
                                <li>Acceso restringido a datos personales (principio de mínimo privilegio)</li>
                                <li>Auditorías de seguridad periódicas</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. Cookies y Tecnologías de Rastreo</h2>
                            <div className="space-y-3 text-platinum-dim">
                                <p><strong className="text-white">Cookies Esenciales:</strong> Necesarias para el funcionamiento (sesión, autenticación)</p>
                                <p><strong className="text-white">Cookies Analíticas:</strong> Google Analytics (anónimas) para mejorar la plataforma</p>
                                <p><strong className="text-white">Cookies de Preferencias:</strong> Guardan su configuración (idioma, tema)</p>
                                <p className="mt-4">Puede gestionar las cookies desde nuestro{' '}
                                    <button className="text-neural-blue hover:text-white transition">
                                        Centro de Preferencias
                                    </button>
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">10. Retención de Datos</h2>
                            <p className="text-platinum-dim">
                                Conservamos sus datos mientras su cuenta esté activa. Si solicita la eliminación,
                                borramos sus datos en un plazo de 30 días, excepto información requerida por ley (registros fiscales: 5 años).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">11. Transferencias Internacionales</h2>
                            <p className="text-platinum-dim">
                                Sus datos pueden ser procesados en servidores ubicados en Estados Unidos y Europa (Google Cloud).
                                Garantizamos protección equivalente a GDPR mediante cláusulas contractuales estándar.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">12. Cambios a esta Política</h2>
                            <p className="text-platinum-dim">
                                Podemos actualizar esta política ocasionalmente. Los cambios significativos se notificarán por email
                                con 30 días de anticipación. La versión actualizada siempre estará disponible en esta página.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">13. Contacto y Quejas</h2>
                            <div className="text-platinum-dim space-y-2">
                                <p><strong className="text-white">Email:</strong> <a href="mailto:privacy@sinapcode.com" className="text-neural-blue hover:text-white transition">privacy@sinapcode.com</a></p>
                                <p><strong className="text-white">Autoridad de Control (Colombia):</strong> Superintendencia de Industria y Comercio (SIC)</p>
                                <p><strong className="text-white">Autoridad de Control (EU):</strong> Puede presentar una queja ante su autoridad local de protección de datos</p>
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
