import { LandingNavbar } from '@/components/landing/landing-navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { SocialProofSection } from '@/components/landing/social-proof-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { CoursesPreviewSection } from '@/components/landing/courses-preview-section';
import { AIDemoSection } from '@/components/landing/ai-demo-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { LandingFooter } from '@/components/landing/landing-footer';
import HomeRedirect from '@/components/auth/home-redirect';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
    // Buscar banner activo para la posición 'hero'
    const banner = await prisma.banner.findFirst({
        where: {
            isActive: true,
            // position: 'hero', // Si decides filtrar por posición
            OR: [
                { startDate: null },
                { startDate: { lte: new Date() } }
            ],
            AND: [
                {
                    OR: [
                        { endDate: null },
                        { endDate: { gte: new Date() } }
                    ]
                }
            ]
        },
        orderBy: {
            priority: 'desc' // Mayor prioridad primero
        }
    });

    return (
        <div className="min-h-screen bg-deep-space">
            <HomeRedirect />
            <LandingNavbar />
            <HeroSection banner={banner} />
            <SocialProofSection />
            <HowItWorksSection />
            <CoursesPreviewSection />
            <AIDemoSection />
            <PricingSection />
            <LandingFooter />
        </div>
    );
}
