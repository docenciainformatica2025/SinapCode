import { HeroSection } from '@/components/landing/hero-section';
import { NewsHeroBanner } from '@/components/landing/news-hero-banner';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { CoursesPreviewSection } from '@/components/landing/courses-preview-section';
import { SocialProofSection } from '@/components/landing/social-proof-section';
import { ProjectsSection } from '@/components/landing/projects-section';
import { AIDemoSection } from '@/components/landing/ai-demo-section';
import { CTASection } from '@/components/landing/cta-section';
import { LandingFooter } from '@/components/landing/landing-footer';
import { HeatmapTracker } from '@/components/analytics/heatmap-tracker';
import { getLandingContent } from '@/lib/landing-data';

const MOCK_PROJECTS = [
    {
        id: '1',
        title: 'Nexus IA Dashboard',
        description: 'Despliegue operativo de análisis predictivo con redes neuronales y visualización de alta densidad.',
        thumbnail: '/images/projects/project1.png',
        tags: ['IA', 'Next.js', '4K'],
        author: { name: 'Protocolo Alpha', image: null },
        repoUrl: '#',
        liveUrl: '#'
    },
    {
        id: '2',
        title: 'Identity Blockchain',
        description: 'Infraestructura de certificación inmutable para sistemas de identidad soberana y seguridad descentralizada.',
        thumbnail: '/images/projects/project2.png',
        tags: ['Web3', 'Security', 'Rust'],
        author: { name: 'Protocolo Beta', image: null },
        repoUrl: '#',
        liveUrl: '#'
    },
    {
        id: '3',
        title: 'Cyber Security Shield',
        description: 'Sistema defensivo autónomo contra amenazas persistentes basadas en modelos de lenguaje avanzados.',
        thumbnail: '/images/projects/project3.png',
        tags: ['Security', 'Python', 'Elite'],
        author: { name: 'Protocolo Gamma', image: null },
        repoUrl: '#',
        liveUrl: '#'
    }
];

export default async function HomePage() {
    const sinapCodeEngineering = MOCK_PROJECTS;
    const landingData = await getLandingContent();

    return (
        <div className="min-h-screen bg-black">
            <main>
                {/* 1. Momentum: Actualidad y Liderazgo */}
                <NewsHeroBanner />
                <HeroSection data={landingData.hero} />

                {/* 2. Seguridad: Validación por terceros y métricas */}
                <SocialProofSection data={landingData.socialProof} />

                {/* 3. Evidencia: Resultados de Ingeniería Realizados por SinapCode */}
                <ProjectsSection projects={sinapCodeEngineering} />

                {/* 4. Valor: Trayectorias de Crecimiento */}
                <CoursesPreviewSection data={landingData.courses} />

                {/* 5. Simplicidad: El proceso reducido a su mínima expresión cognitiva */}
                <HowItWorksSection steps={landingData.process} />

                {/* New section: AI Demo */}
                <AIDemoSection data={landingData.aiDemo} />

                {/* 6. Conversión: Cierre natural del flujo */}
                <CTASection data={landingData.cta} />
            </main>
            <LandingFooter />
            <HeatmapTracker />
        </div>
    );
}
