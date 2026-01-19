export const siteConfig = {
    name: 'SinapCode',
    description: 'La primera plataforma de educación tecnológica impulsada por Inteligencia Artificial y validada por Blockchain. Transformamos entusiastas en Tech Builders.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://sinapcode.com',
    ogImage: 'https://sinapcode.com/og-image.jpg',
    links: {
        twitter: 'https://twitter.com/sinapcode',
        github: 'https://github.com/sinapcode',
        linkedin: 'https://linkedin.com/company/sinapcode',
        discord: 'https://discord.gg/sinapcode',
    },
    keywords: [
        'programación',
        'IA',
        'software development',
        'tech career',
        'web3',
        'blockchain certification',
        'react',
        'nextjs',
        'python',
        'data science'
    ]
};

export type SiteConfig = typeof siteConfig;
