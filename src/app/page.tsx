import { LandingNavbar } from '@/components/landing/landing-navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { SocialProofSection } from '@/components/landing/social-proof-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { CoursesPreviewSection } from '@/components/landing/courses-preview-section';
import { AIDemoSection } from '@/components/landing/ai-demo-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { LandingFooter } from '@/components/landing/landing-footer';
import { TestimonialsSection } from '@/components/landing/testimonials-section';

import { ProjectsSection } from '@/components/landing/projects-section';
import { CTASection } from '@/components/landing/cta-section';
import { LatestInsightsSection } from '@/components/landing/latest-insights-section';
import { type Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Conviértete en un Tech Builder con IA',
    description: 'Deja de estudiar código. Empieza a construir software. La única plataforma con tutores de IA y certificación blockchain.',
};

export default function HomePage() {
    return (
        <div className="min-h-screen bg-bg">
            <LandingNavbar />

            <main>
                <HeroSection />
                <SocialProofSection />
                <CoursesPreviewSection />
                <HowItWorksSection />
                <ProjectsSection />
                <TestimonialsSection />
                <CTASection />
                <LatestInsightsSection />
            </main>

            <LandingFooter />
        </div>
    );
}
