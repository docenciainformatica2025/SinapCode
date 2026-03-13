"use client";

import Link from "next/link";
import { legalTokens as tokens } from "@/lib/constants/legal-tokens";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

interface LegalFooterProps {
    productName?: string;
    version?: string;
    showPoweredBy?: boolean;
}

/**
 * Premium Legal Footer component for SINAPCODE SaaS products.
 * Follows Silicon Valley / Apple design quality.
 * Centralized for all SINAPCODE apps (Saber Pro, UTP Control, F5 Sport).
 */
import { useEffect, useState } from "react";
import { SinapcodeLogo } from "@/components/brand/sinapcode-logo";

interface LegalFooterProps {
    productName?: string;
    version?: string;
    showPoweredBy?: boolean;
}

export function LegalFooter({
    productName = siteConfig.name,
    version = "v1.2.4",
    showPoweredBy = true,
}: LegalFooterProps) {
    const currentYear = new Date().getFullYear();
    const [footerLinks, setFooterLinks] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/navigation')
            .then(res => res.json())
            .then(data => {
                if (data.menus?.footer) setFooterLinks(data.menus.footer);
            })
            .catch(() => { });
    }, []);

    const links = footerLinks.length > 0 ? footerLinks : [
        { href: "/legal/terms", label: "Términos de Uso" },
        { href: "/legal/privacy", label: "Política de Privacidad" },
        { href: "/legal/cookies", label: "Política de Cookies" },
        { href: "/legal/dpa", label: "Acuerdo de Procesamiento de Datos (DPA)" },
        { href: "/trust", label: "Centro de Confianza" },
    ];

    return (
        <footer className={`${tokens.colors.background} ${tokens.colors.border} border-t relative overflow-hidden`}>
            {/* Ambient Background Effect */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A78A]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className={`${tokens.spacing.container} ${tokens.spacing.footerPadding} relative z-10`}>
                {/* Branding Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
                    <SinapcodeLogo variant="full" theme="color" className="h-8 md:h-10 opacity-80" />
                    <div className="text-right">
                        <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${tokens.colors.textMuted} italic mb-2`}>
                            ESTÁNDAR DE CALIDAD
                        </p>
                        <div className="flex items-center gap-4">
                            <span className={`text-[10px] font-bold ${tokens.colors.textSecondary} italic`}>CUMPLIMIENTO UE</span>
                            <div className="w-1 h-1 rounded-full bg-[#C9A78A]" />
                            <span className={`text-[10px] font-bold ${tokens.colors.textSecondary} italic`}>BASE ENCRIPTADA</span>
                        </div>
                    </div>
                </div>

                {/* Top Section: Navigation & Links */}
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between mb-12">
                    <nav className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] font-black uppercase tracking-widest italic">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${tokens.colors.textSecondary} hover:text-[#C9A78A] ${tokens.transitions.fast}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <Link
                        href="/support"
                        className={`text-[11px] font-black uppercase tracking-widest italic ${tokens.colors.textSecondary} hover:text-[#C9A78A] flex items-center gap-2 group`}
                    >
                        <span>CENTRO DE SOPORTE</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Divider */}
                <div className={`h-px w-full ${tokens.colors.border} mb-12 opacity-50`} />

                {/* Bottom Section: Branding & Compliance */}
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between text-[11px] font-bold italic tracking-tight">
                    <div className="flex flex-col gap-3">
                        <p className={tokens.colors.textSecondary}>
                            © {currentYear} <span className={`font-black uppercase tracking-tighter ${tokens.colors.textPrimary}`}>{siteConfig.name}</span>.
                            TODOS LOS DERECHOS RESERVADOS
                        </p>
                        <p className={tokens.colors.textMuted}>
                            REGISTRADA EN <span className="text-[#1E1E1E]">{siteConfig.location} 🇪🇪</span> · {siteConfig.company}
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3 transition-all">
                        {showPoweredBy && (
                            <p className={tokens.colors.textMuted}>
                                DESARROLLADO POR <span className={`font-black uppercase text-[#1E1E1E]`}>{siteConfig.name} ENGINE</span>
                            </p>
                        )}
                        <p className="font-mono text-[10px] text-[#C9A78A] bg-[#1E1E1E]/5 px-3 py-1 rounded-full">
                            NÚCLEO {version}
                        </p>
                    </div>
                </div>

                {/* Legal Disclaimer for EU Compliance */}
                <div className="mt-16 pt-8 border-t border-black/5">
                    <p className="text-[9px] md:text-[10px] leading-relaxed text-[#1E1E1E]/30 max-w-5xl uppercase font-black tracking-widest italic">
                        {siteConfig.name} está comprometido con su privacidad radical. El uso de este producto está sujeto a nuestros protocolos legales mundiales.
                        Todo el procesamiento de datos se realiza bajo estándares militares europeos (GDPR).
                    </p>
                </div>
            </div>
        </footer>
    );
}
