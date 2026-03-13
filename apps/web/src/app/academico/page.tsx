import { AIDemoSection } from '@/components/landing/ai-demo-section';
import { CoursesPreviewSection } from '@/components/landing/courses-preview-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { getLandingContent } from '@/lib/landing-data';
import { LandingFooter } from '@/components/landing/landing-footer';
import { HeatmapTracker } from '@/components/analytics/heatmap-tracker';

export const metadata = {
    title: 'Cursos y Metodologías | SinapCode'
};

export default async function ProgramasPage() {
    const landingData = await getLandingContent();

    return (
        <div className="bg-[#F1F0E8] text-clubroom-black font-sans selection:bg-[#A7C1C0] selection:text-white min-h-screen">
            {/* Noise Overlay */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-5 z-[9999]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            <main className="relative z-20 pt-20">
                <AIDemoSection data={landingData.aiDemo} />
                <CoursesPreviewSection data={landingData.courses} />
                <PricingSection />
            </main>

            <div className="bg-white">
                <LandingFooter />
            </div>

            <HeatmapTracker />
        </div>
    );
}
