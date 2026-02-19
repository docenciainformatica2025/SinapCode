'use client';

import Link from 'next/link';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';

export function LandingFooter() {
    const sections = [
        {
            title: 'Plataforma',
            links: [
                { label: 'Cursos & Skills', href: '/courses' },
                { label: 'El Método Elite', href: '/#methodology' },
                { label: 'Membresía Premium', href: '/pricing' },
                { label: 'Proyectos Reales', href: '/projects' },
            ],
        },
        {
            title: 'Comunidad',
            links: [
                { label: 'Ser Arquitecto', href: '/teach' },
                { label: 'Impacto Builders', href: '#historias' },
                { label: 'Blog & Insights', href: '/blog' },
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
        <footer className="bg-black pt-0 pb-16 relative overflow-hidden" role="contentinfo">
            {/* Sutil brillo de fondo para coherencia */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="container-page relative z-10 px-6 sm:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-12 lg:gap-8 mb-32">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-4 lg:col-span-2 lg:pr-12">
                        <Link href="/" className="inline-block mb-10 group">
                            <img
                                src="/branding/Logo.png"
                                alt="SinapCode"
                                className="h-8 md:h-10 lg:h-12 w-auto max-w-[160px] md:max-w-[200px] lg:max-w-[240px] object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                        <p className="text-[#EBEBF5] text-[14px] leading-relaxed mb-8 max-w-sm font-medium opacity-50 text-pretty">
                            Plataforma de ingeniería de élite impulsada por IA. Validamos el talento mediante protocolos integrados y computación neuronal.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { id: 'twitter', icon: Twitter },
                                { id: 'github', icon: Github },
                                { id: 'linkedin', icon: Linkedin },
                                { id: 'instagram', icon: Instagram }
                            ].map((social) => (
                                <a
                                    key={social.id}
                                    href={`https://${social.id}.com/sinapcode`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/50 hover:bg-primary/20 hover:text-white hover:border-primary/40 transition-all duration-500 group shadow-xl"
                                    aria-label={`Síguenos en ${social.id}`}
                                >
                                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {sections.map((section, i) => (
                        <div key={i} className="col-span-1">
                            <h3 className="text-white text-[9px] font-bold uppercase tracking-[0.2em] mb-8 opacity-20">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        <a
                                            href={link.href}
                                            target={link.external ? "_blank" : undefined}
                                            rel={link.external ? "noreferrer" : undefined}
                                            className="text-[13px] text-platinum-dim/60 hover:text-apple-blue transition-all duration-200 font-medium group flex items-center gap-2"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar Tracking Elite */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] text-platinum-dim/30 font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-8">
                        <p>© 2026 SinapCode Engineering</p>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
                        <Link href="/legal/terms" className="hover:text-white transition-colors">Términos</Link>
                    </div>

                    <div className="flex items-center gap-4 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                        <span className="text-white/50 text-[11px] font-bold uppercase tracking-[0.15em]">Sistemas Operativos: Estables</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
