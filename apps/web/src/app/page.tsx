import { NewsHeroBanner } from '@/components/landing/news-hero-banner';
import { CoursesPreviewSection } from '@/components/landing/courses-preview-section';
import { SocialProofSection } from '@/components/landing/social-proof-section';
import { AIDemoSection } from '@/components/landing/ai-demo-section';
import { CTASection } from '@/components/landing/cta-section';
import { LandingFooter } from '@/components/landing/landing-footer';
import { PricingSection } from '@/components/landing/pricing-section';
import { HeatmapTracker } from '@/components/analytics/heatmap-tracker';
import { getLandingContent } from '@/lib/landing-data';

export default async function HomePage() {
    const landingData = await getLandingContent();

    return (
        <div className="min-h-screen bg-black">
            <main>
                {/* 1. Banner de Noticias */}
                <NewsHeroBanner />

                {/* 2. Autoridad: Validación Social y Trust */}
                <SocialProofSection data={landingData.socialProof} />

                {/* 3. Inmersión: La Experiencia (WOW Factor) */}
                <AIDemoSection data={landingData.aiDemo} />

                {/* 4. Valor: Trayectorias de Crecimiento (Protocolos) */}
                <CoursesPreviewSection data={landingData.courses} />

                {/* 5. Compromiso: Membresía y Acceso Elite */}
                <PricingSection />

                {/* 6. Conversión: Cierre natural del flujo */}
                <CTASection data={landingData.cta} />
            </main>
            <LandingFooter />
            <HeatmapTracker />
        </div>
    );
}
