import { LandingNavbar } from '@/components/landing/landing-navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { SocialProofSection } from '@/components/landing/social-proof-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';

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

import { prisma } from '@/lib/prisma';

async function getCMSData() {
    try {
        const [heroSection, statsSection, companiesSection, testimonials] = await Promise.all([
            prisma.pageSection.findUnique({ where: { page_key: { page: 'home', key: 'hero' } } }),
            prisma.pageSection.findUnique({ where: { page_key: { page: 'home', key: 'stats' } } }),
            prisma.pageSection.findUnique({ where: { page_key: { page: 'home', key: 'companies' } } }),
            prisma.testimonial.findMany({
                where: { isVisible: true },
                orderBy: { orderIndex: 'asc' }
            })
        ]);
        return {
            heroContent: heroSection?.content as any || null,
            statsContent: statsSection?.content as any || null,
            companiesContent: companiesSection?.content as any || null,
            testimonials
        };
    } catch (e) {
        console.error('CMS Fetch Error:', e);
        return { heroContent: null, testimonials: [] };
    }
}

export default async function HomePage() {
    const { heroContent, statsContent, companiesContent, testimonials } = await getCMSData();

    return (
        <div className="min-h-screen bg-bg">
            <LandingNavbar />

            <main>
                <HeroSection content={heroContent} />
                <SocialProofSection stats={statsContent} companies={companiesContent} />

                <HowItWorksSection />
                <ProjectsSection />
                <TestimonialsSection initialTestimonials={testimonials} />
                <CTASection />
                <LatestInsightsSection />
            </main>

            <LandingFooter />
        </div>
    );
}
