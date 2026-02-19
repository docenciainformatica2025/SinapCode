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
    title: "DOMINA EL CÓDIGO",
    subtitle: "PROTOCOLOS DE INGENIERÍA IA",
    description: "Ingeniería de élite para mentes que buscan trascender. Despliegue puro, sin límites.",
    primaryCtaText: "COMENZAR EVOLUCIÓN",
    primaryCtaLink: "/auth/register",
    secondaryCtaText: "EXPLORAR INGENIERÍA",
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
        title: 'Define tu Objetivo',
        description: 'Identifica tu meta técnica. Nuestro ecosistema te asigna el protocolo de ingeniería exacto para tu nivel actual.',
        icon: '🎯',
        color: 'from-primary to-blue-600',
    },
    {
        number: '02',
        title: 'Construye con IA',
        description: 'No estás solo. Tu Arquitecto IA te guía en el desarrollo de soluciones reales, optimizando cada línea de código.',
        icon: '⚡',
        color: 'from-blue-600 to-indigo-600',
    },
    {
        number: '03',
        title: 'Valida tu Talento',
        description: 'Tus logros se graban en la infraestructura inmutable de nuestro protocolo, listos para ser verificados por la industria.',
        icon: '🛡️',
        color: 'from-indigo-600 to-primary',
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
