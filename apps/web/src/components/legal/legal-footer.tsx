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
export function LegalFooter({
    productName = "Plataforma SINAPCODE",
    version = "v1.0.0",
    showPoweredBy = true,
}: LegalFooterProps) {
    const currentYear = new Date().getFullYear();
    const currentPath = usePathname();

    return (
        <footer className={`${tokens.colors.background} ${tokens.colors.border} border-t`}>
            <div className={`${tokens.spacing.container} ${tokens.spacing.footerPadding}`}>

                {/* Top Section: Navigation & Links */}
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between mb-8">
                    <nav className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium">
                        <Link
                            href="/legal/terms"
                            className={`${tokens.colors.textSecondary} ${tokens.colors.hover} ${tokens.transitions.fast}`}
                        >
                            Términos de Uso
                        </Link>
                        <Link
                            href="/legal/privacy"
                            className={`${tokens.colors.textSecondary} ${tokens.colors.hover} ${tokens.transitions.fast}`}
                        >
                            Política de Privacidad
                        </Link>
                        <Link
                            href="/legal/cookies"
                            className={`${tokens.colors.textSecondary} ${tokens.colors.hover} ${tokens.transitions.fast}`}
                        >
                            Política de Cookies
                        </Link>
                        <Link
                            href="/legal/dpa"
                            className={`${tokens.colors.textSecondary} ${tokens.colors.hover} ${tokens.transitions.fast}`}
                        >
                            Acuerdo de Procesamiento de Datos (DPA)
                        </Link>
                        <Link
                            href="/trust"
                            className={`${tokens.colors.textSecondary} ${tokens.colors.hover} ${tokens.transitions.fast}`}
                        >
                            Centro de Confianza
                        </Link>
                    </nav>

                    <Link
                        href="/support"
                        className={`text-sm font-medium ${tokens.colors.textSecondary} ${tokens.colors.hover} flex items-center gap-2`}
                    >
                        <span>Centro de Ayuda y Soporte</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
                            <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                {/* Divider */}
                <div className={`h-px w-full ${tokens.colors.border} mb-8 opacity-50`} />

                {/* Bottom Section: Branding & Compliance */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-sm">
                    <div className="flex flex-col gap-2">
                        <p className={tokens.colors.textSecondary}>
                            © {currentYear} <span className={`font-semibold ${tokens.colors.textPrimary}`}>{productName}</span>.
                            Todos los derechos reservados.
                        </p>
                        <p className={tokens.colors.textMuted}>
                            Registrada en <span className="font-medium">{siteConfig.location} 🇪🇪</span> · {siteConfig.company}
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2 text-xs md:text-sm">
                        {showPoweredBy && (
                            <p className={tokens.colors.textMuted}>
                                Desarrollado por <span className={`font-semibold ${tokens.colors.textSecondary}`}>{siteConfig.name}</span>
                            </p>
                        )}
                        <p className="font-mono text-neutral-400">
                            {productName.split(' ')[0]} <span className="tabular-nums opacity-75">{version}</span>
                        </p>
                    </div>
                </div>

                {/* Legal Disclaimer for EU Compliance */}
                <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-900">
                    <p className="text-[10px] md:text-xs leading-relaxed text-neutral-400 max-w-4xl">
                        SINAPCODE está comprometido con su privacidad. El uso de este producto está sujeto a nuestros Términos de Uso y Política de Privacidad.
                        La información sobre sus derechos bajo el GDPR (Reglamento General de Protección de Datos) se puede encontrar en nuestro Centro de Privacidad.
                        Todo el procesamiento de datos se realiza de acuerdo con los estándares europeos.
                    </p>
                </div>
            </div>
        </footer>
    );
}
