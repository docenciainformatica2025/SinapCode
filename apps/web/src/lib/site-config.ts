export const siteConfig = {
    name: 'SINAPCODE',
    company: 'SINAPCODE OÜ',
    location: 'Tallinn, Estonia',
    description: 'La plataforma global para el desarrollo SaaS escalable y educación optimizada con IA. Impulsa Saber Pro, UTP Control y F5 Sport. Cumplimiento con GDPR, con sede en la UE.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://sinapcode.com',
    supportEmail: 'hola@sinapcode.com',
    ogImage: '/og-image.jpg',
    links: {
        twitter: 'https://twitter.com/sinapcode',
        github: 'https://github.com/sinapcode',
        linkedin: 'https://linkedin.com/company/sinapcode',
        discord: 'https://discord.gg/sinapcode',
    },
    keywords: [
        'Desarrollo SaaS',
        'Educación con IA',
        'Aplicaciones con cumplimiento GDPR',
        'Ecosistema Startup de Estonia',
        'Saber Pro Suite',
        'UTP Control Platform',
        'F5 Sport Tech',
        'Next.js Supabase SaaS',
        'Software educativo de grado institucional'
    ]
};

export type SiteConfig = typeof siteConfig;
