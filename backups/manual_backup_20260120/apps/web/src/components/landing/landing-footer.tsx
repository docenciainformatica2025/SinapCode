'use client';

import Link from 'next/link';

export function LandingFooter() {
    const sections = [
        {
            title: 'Plataforma',
            links: [
                { label: 'Cursos & Skills', href: '/courses' },
                { label: 'Metodología IA', href: '#como-funciona' },
                { label: 'Precios', href: '#pricing' },
                { label: 'Para Empresas', href: '/empresas' },
            ],
        },
        {
            title: 'Comunidad',
            links: [
                { label: 'Ser Tech Lead', href: '/teach' },
                { label: 'Historias de Builders', href: '#historias' },
                { label: 'Blog de Tecnología', href: '/blog' },
                { label: 'Discord Oficial', href: 'https://discord.gg/sinapcode', external: true },
            ],
        },
        {
            title: 'Soporte',
            links: [
                { label: 'Centro de Ayuda', href: '/help' },
                { label: 'Estado del Sistema', href: '/status' },
                { label: 'Contacto', href: '/contacto' },
                { label: 'Reclamos', href: '/reclamos' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Términos de Servicio', href: '/legal/terms' },
                { label: 'Habeas Data', href: '/privacy' },
                { label: 'Cookies', href: '/legal/cookies' },
            ],
        },
    ];

    return (
        <footer className="bg-[#05070A] border-t border-white/5 pt-20 pb-10" role="contentinfo">
            <div className="container-page">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 gap-y-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2 pr-8">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-2xl font-bold text-white tracking-tight">
                                SINAP<span className="text-primary">CODE</span>
                            </span>
                        </Link>
                        <p className="text-muted text-sm leading-relaxed mb-6 max-w-xs">
                            La primera plataforma de educación tecnológica impulsada por Inteligencia Artificial y validada por Blockchain.
                        </p>
                        <div className="flex gap-4">
                            {['twitter', 'github', 'linkedin', 'instagram'].map((social) => (
                                <a
                                    key={social}
                                    href={`https://${social}.com/sinapcode`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted hover:bg-primary hover:text-bg transition-all duration-300"
                                    aria-label={`Síguenos en ${social}`}
                                >
                                    <span className="capitalize text-xs">{social[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {sections.map((section, i) => (
                        <div key={i} className="col-span-1">
                            <h3 className="text-white font-bold mb-6">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        <a
                                            href={link.href}
                                            target={link.external ? "_blank" : undefined}
                                            rel={link.external ? "noreferrer" : undefined}
                                            className="text-sm text-muted hover:text-gold transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted/60">
                    <p>© 2026 SinapCode Inc. Todos los derechos reservados. • v2.1.1</p>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <span className="block w-2 h-2 rounded-full bg-green-500"></span>
                            Systems Normal
                        </span>
                        <span>Made with ☕ & AI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
