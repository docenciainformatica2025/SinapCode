import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
import './globals.css';
import { CookieConsent } from '@/components/legal/cookie-consent';
import { ErrorBoundary } from '@/components/error-boundary';
import { ToastProvider } from '@/components/ui/toast-provider';
import { GlobalOrganizationSchema, WebSiteSchema } from '@/components/seo/json-ld';

export const metadata: Metadata = {
    metadataBase: new URL('https://sinapcode.com'),
    title: {
        default: 'SinapCode - Aprende a Programar con IA | Cursos Gratis',
        template: '%s | SinapCode'
    },
    description: 'Plataforma educativa con tutor de IA personal. Aprende Python, JavaScript, Hacking Ético y más. 100% gratis para siempre. Certificados verificados con blockchain.',
    keywords: ['programación', 'IA', 'educación', 'coding', 'Python', 'JavaScript', 'cursos gratis', 'tutor IA', 'certificados blockchain'],
    authors: [{ name: 'SinapCode', url: 'https://sinapcode.com' }],
    creator: 'SinapCode',
    publisher: 'SinapCode',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        url: 'https://sinapcode.com',
        siteName: 'SinapCode',
        title: 'SinapCode - Aprende a Programar con IA',
        description: 'Plataforma educativa con tutor de IA personal. Cursos gratis de programación.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'SinapCode - Aprende a Programar con IA',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@sinapcode',
        creator: '@sinapcode',
        title: 'SinapCode - Aprende a Programar con IA',
        description: 'Plataforma educativa con tutor de IA personal. Cursos gratis de programación.',
        images: ['/og-image.jpg'],
    },
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
    // verification: {
    //     google: 'google-site-verification-code',
    // },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className="bg-deep-space text-platinum antialiased" suppressHydrationWarning>
                <SessionProvider>
                    <ErrorBoundary>
                        <ToastProvider />
                        <GlobalOrganizationSchema />
                        <WebSiteSchema />
                        <CookieConsent />
                        {children}
                    </ErrorBoundary>
                </SessionProvider>
            </body>
        </html>
    );
}
