import Providers from "./providers";
import { RecaptchaProvider } from '@/components/providers/recaptcha-provider';
import type { Metadata } from 'next';
import './globals.css';
import { CookieConsent } from '@/components/legal/cookie-consent';
import { ErrorBoundary } from '@/components/error-boundary';
import { ToastProvider } from '@/components/ui/toast-provider';
import { GlobalHeader } from '@/components/layout/global-header';
import { GlobalOrganizationSchema, WebSiteSchema } from '@/components/seo/json-ld';
import { SimulationIndicator } from '@/components/admin/simulation-indicator';
import AIConcierge from '@/components/ai/ai-concierge';

import { siteConfig } from '@/lib/site-config';

// Helper to ensure valid URL for metadataBase
const getBaseUrl = () => {
    const url = siteConfig.url || 'https://sinapcode.com';
    return url.startsWith('http') ? url : `https://${url}`;
};

export const metadata: Metadata = {
    metadataBase: new URL(getBaseUrl()),
    title: {
        default: 'SinapCode | Forjando la próxima generación de Tech Builders',
        template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: 'SinapCode Team', url: siteConfig.url }],
    creator: 'SinapCode',
    openGraph: {
        type: 'website',
        locale: 'es_CO',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@sinapcode',
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: '@sinapcode',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
            <body className="bg-bg text-text antialiased font-sans" suppressHydrationWarning>
                <Providers>
                    <RecaptchaProvider>
                        <ErrorBoundary>
                            <ToastProvider />
                            <GlobalHeader />
                            <GlobalOrganizationSchema />
                            <WebSiteSchema />
                            <CookieConsent />
                            <SimulationIndicator />
                            {children}
                            <AIConcierge />
                        </ErrorBoundary>
                    </RecaptchaProvider>
                </Providers>
            </body>
        </html>
    );
}
