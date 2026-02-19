import { prisma } from './prisma';

export interface HeroData {
    title: string;
    subtitle: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
}

export const FALLBACK_HERO: HeroData = {
    title: "Diseña el futuro de la tecnología",
    subtitle: "Ingeniería de Élite con IA",
    description: "Únete a la nueva generación de ingenieros que dominan la IA, el desarrollo de software moderno y la arquitectura de sistemas. Una evolución real, diseñada para mentes ambiciosas.",
    primaryCtaText: "Comienza tu formación",
    primaryCtaLink: "/auth/register",
    secondaryCtaText: "Ver Cursos",
    secondaryCtaLink: "/courses"
};

export interface ProcessStep {
    number: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

export const FALLBACK_PROCESS: ProcessStep[] = [
    {
        number: '01',
        title: 'Traza tu camino',
        description: 'Define tus metas técnicas. Nuestro sistema analiza tu perfil y te asigna el protocolo de aprendizaje perfecto para tu nivel actual.',
        icon: '🎯',
        color: 'from-blue-500 to-indigo-600',
    },
    {
        number: '02',
        title: 'Crea con propósito',
        description: 'Aprende construyendo soluciones reales. Tu mentor IA te acompaña en cada paso, optimizando tu lógica y tu código.',
        icon: '⚡',
        color: 'from-indigo-600 to-purple-600',
    },
    {
        number: '03',
        title: 'Certifica tu maestría',
        description: 'Tus habilidades se graban en la red. Obtén validación real y demostrable, respaldada por la infraestructura de SinapCode.',
        icon: '🛡️',
        color: 'from-purple-600 to-blue-500',
    },
];

/**
 * Recupera la configuración de la Home desde SiteConfig.
 * Si no existe o fallan campos, devuelve el fallback Nanobanana.
 */
export async function getLandingContent() {
    try {
        const config = await prisma.siteConfig.findUnique({
            where: { id: 'global' }
        });

        // Mapeo dinámico desde el campo metadata o campos específicos de SiteConfig
        // Asumimos que guardamos los datos extendidos en un campo JSON por ahora 
        // para evitar migraciones fallidas en Windows.
        const metadata = (config?.socialLinks as any) || {}; // Usamos socialLinks como contenedor temporal si es necesario, pero mejor metadata si existiera

        return {
            hero: {
                ...FALLBACK_HERO,
                ...(metadata.hero || {})
            },
            process: metadata.process || FALLBACK_PROCESS,
            courses: metadata.courses || null,
            aiDemo: metadata.aiDemo || null,
            socialProof: metadata.socialProof || null,
            cta: metadata.cta || null,
            siteName: config?.siteName || 'SINAPCODE',
        };
    } catch (error) {
        console.error('Error fetching landing content:', error);
        return {
            hero: FALLBACK_HERO,
            process: FALLBACK_PROCESS,
            courses: null,
            aiDemo: null,
            cta: null,
            siteName: 'SINAPCODE'
        };
    }
}
