'use client';

import Link from 'next/link';

export function LandingFooter() {
    const sections = [
        {
            title: 'Producto',
            links: [
                { label: 'Cursos', href: '/courses' },
                { label: 'Precios', href: '#pricing' },
                { label: 'Para Empresas', href: '/empresas' },
                { label: 'Para Profesores', href: '/profesores' },
            ],
        },
        {
            title: 'Recursos',
            links: [
                { label: 'Blog', href: '/blog' },
                { label: 'Guías Descargables', href: '#' }, // TODO: Create /recursos
                { label: 'Comunidad Discord', href: 'https://discord.gg/sinapcode', external: true },
                { label: 'Centro de Ayuda', href: '#' }, // TODO: Create /ayuda
            ],
        },
        {
            title: 'Empresa',
            links: [
                { label: 'Nosotros', href: '/nosotros' },
                { label: 'Carreras', href: '#' }, // TODO: Create /carreras
                { label: 'Prensa', href: '#' }, // TODO: Create /prensa
                { label: 'Contacto', href: '/contacto' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Términos de Servicio', href: '/legal/terms' },
                { label: 'Política de Privacidad', href: '/privacy' },
                { label: 'Cookies', href: '#' }, // TODO: Create /legal/cookies
                { label: 'GDPR', href: '#' }, // TODO: Create /legal/gdpr
            ],
        },
    ];

    return (
        <footer className="border-t border-white/10 bg-black/20" role="contentinfo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 sm:col-span-3 md:col-span-1">
                        <Link
                            href="/"
                            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neural-blue to-synapse-purple mb-4 block hover:opacity-80 transition"
                            aria-label="SinapCode - Volver al inicio"
                        >
                            SinapCode
                        </Link>
                        <p className="text-sm text-[#B8BFC9] mb-4">
                            Aprende a programar con IA. Gratis para siempre.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://twitter.com/sinapcode"
                                className="text-[#B8BFC9] hover:text-white transition"
                                aria-label="Síguenos en Twitter"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                            </a>
                            <a
                                href="https://github.com/sinapcode"
                                className="text-[#B8BFC9] hover:text-white transition"
                                aria-label="Visítanos en GitHub"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                            <a
                                href="https://linkedin.com/company/sinapcode"
                                className="text-[#B8BFC9] hover:text-white transition"
                                aria-label="Conéctate en LinkedIn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    {sections.map((section, i) => (
                        <nav key={i} aria-labelledby={`footer-${section.title.toLowerCase()}`}>
                            <h3 id={`footer-${section.title.toLowerCase()}`} className="text-white font-bold mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        {link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-[#B8BFC9] hover:text-white transition"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-sm text-[#B8BFC9] hover:text-white transition"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#B8BFC9]">
                    <p>© 2026 SinapCode. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <span>🇨🇴 Hecho en Colombia</span>
                        <span>🌍 Disponible globalmente</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
