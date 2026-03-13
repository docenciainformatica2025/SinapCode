import { NewsHeroBanner } from '@/components/landing/news-hero-banner';
import { SocialProofSection } from '@/components/landing/social-proof-section';
import { CTASection } from '@/components/landing/cta-section';
import { LandingFooter } from '@/components/landing/landing-footer';
import { HeatmapTracker } from '@/components/analytics/heatmap-tracker';
import { getLandingContent } from '@/lib/landing-data';
import { NewHeroSection, EcosystemSection } from '@/components/landing/new-landing-blocks';

export default async function HomePage() {
    const landingData = await getLandingContent();

    return (
        <div className="bg-[#F1F0E8] text-clubroom-black font-sans selection:bg-[#A7C1C0] selection:text-white">
            {/* Background Texture Element */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-5 z-[9999]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            <main className="relative pt-[72px]">
                {/* 1. Nuevo Hero "Claridad" */}
                <NewHeroSection />

                {/* 1.5 News Momentum (Vercel Cron 3-Day Rotation) */}
                <NewsHeroBanner />

                {/* 2. Nuevo Ecosistema (Nox, Vitriu, Finder, SaberPro, UTP) */}
                <EcosystemSection />

                <div className="relative z-20">
                    {/* Autoridad: Validación Social y Trust */}
                    <SocialProofSection data={landingData.socialProof} />

                    {/* Conversión: Cierre natural del flujo */}
                    <CTASection data={landingData.cta} />
                </div>
            </main>

            <div className="bg-white">
                <LandingFooter />
            </div>

            <HeatmapTracker />
        </div>
    );
}
