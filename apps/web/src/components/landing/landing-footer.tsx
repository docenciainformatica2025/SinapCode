'use client';

import Link from 'next/link';

export function LandingFooter() {
    const sections = [
        {
            title: 'Plataforma',
            links: [
                { label: 'Trayectorias & Skills', href: '/courses' },
                { label: 'El Método SINAPCODE', href: '#como-funciona' },
                { label: 'Acceso Premium', href: '#pricing' },
                { label: 'Protocolos Empresa', href: '/empresas' },
            ],
        },
        {
            title: 'Comunidad',
            links: [
                { label: 'Ser Arquitecto', href: '/teach' },
                { label: 'Impacto Builders', href: '#historias' },
                { label: 'Insights de Ingeniería', href: '/blog' },
                { label: 'Discord Oficial', href: 'https://discord.gg/sinapcode', external: true },
            ],
        },
        {
            title: 'Soporte',
            links: [
                { label: 'Centro de Ayuda', href: '/support' },
                { label: 'Estado del Sistema', href: '/status' },
                { label: 'Contacto', href: '/contacto' },
                { label: 'Privacidad', href: '/privacy' },
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
        <footer className="bg-black pt-0 pb-10 relative overflow-hidden" role="contentinfo">
            {/* Sutil brillo de fondo para coherencia */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="container-page relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 gap-y-20 mb-32">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2 pr-12">
                        <Link href="/" className="inline-block mb-10 group">
                            <span className="text-3xl font-black text-white tracking-tighter italic flex items-center">
                                SINAP<span className="text-primary group-hover:text-blue-400 transition-colors uppercase">CODE</span>
                            </span>
                        </Link>
                        <p className="text-platinum-dim text-sm leading-relaxed mb-10 max-w-xs font-medium opacity-70">
                            Plataforma de ingeniería de élite impulsada por IA. Validamos el talento mediante protocolos integrados y computación neuronal.
                        </p>
                        <div className="flex gap-4">
                            {['twitter', 'github', 'linkedin', 'instagram'].map((social) => (
                                <a
                                    key={social}
                                    href={`https://${social}.com/sinapcode`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-11 h-11 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-primary/20 hover:text-white hover:border-primary/50 transition-all duration-700 group shadow-2xl"
                                    aria-label={`Síguenos en ${social}`}
                                >
                                    <span className="capitalize text-[10px] font-black group-hover:scale-125 transition-transform italic">{social[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {sections.map((section, i) => (
                        <div key={i} className="col-span-1">
                            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10 italic opacity-90">{section.title}</h3>
                            <ul className="space-y-6">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        <a
                                            href={link.href}
                                            target={link.external ? "_blank" : undefined}
                                            rel={link.external ? "noreferrer" : undefined}
                                            className="text-sm text-platinum-dim hover:text-primary transition-all duration-300 font-bold group flex items-center gap-2"
                                        >
                                            <div className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar Tracking Elite */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-platinum-dim/40 font-black uppercase tracking-[0.3em]">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p>© 2026 SINAPCODE</p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-primary opacity-100 italic font-black uppercase tracking-widest">Protocol Status: Validated</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
