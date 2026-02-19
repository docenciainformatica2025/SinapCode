export const siteConfig = {
    name: 'SinapCode',
    description: 'Aprende programación desde cero con Tutores de IA y certifica tus habilidades en Blockchain. Cursos de Python, Pensamiento Computacional y Ascenso Docente en Colombia.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://sinapcode.com',
    ogImage: '/og-image.jpg',
    links: {
        twitter: 'https://twitter.com/sinapcode',
        github: 'https://github.com/sinapcode',
        linkedin: 'https://linkedin.com/company/sinapcode',
        discord: 'https://discord.gg/sinapcode',
    },
    keywords: [
        'Curso de programación gratis para niños Colombia',
        'Ascenso escalafón docente decreto 1278 cursos',
        'Diplomado pensamiento computacional ministerio TIC',
        'Aprender Python desde cero con certificación',
        'Recursos educativos abiertos Colombia Aprende',
        'Becas Talento Tech MinTIC 2026',
        'Gamificación en el aula ejemplos prácticos',
        'Seguridad digital para colegios ley 1581',
        'Proyectos Maker con Micro:bit para estudiantes',
        'Plataforma LMS gratuita para colegios públicos',
        'Inteligencia Artificial en educación',
        'Certificación Blockchain educativa'
    ]
};

export type SiteConfig = typeof siteConfig;
