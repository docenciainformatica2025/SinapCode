import { LandingNavbar } from '@/components/landing/landing-navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { SocialProofSection } from '@/components/landing/social-proof-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { CoursesPreviewSection } from '@/components/landing/courses-preview-section';
import { AIDemoSection } from '@/components/landing/ai-demo-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { LandingFooter } from '@/components/landing/landing-footer';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-deep-space">
            <LandingNavbar />
            <HeroSection />
            <SocialProofSection />
            <HowItWorksSection />
            <CoursesPreviewSection />
            <AIDemoSection />
            <PricingSection />
            <LandingFooter />
        </div>
    );
}
