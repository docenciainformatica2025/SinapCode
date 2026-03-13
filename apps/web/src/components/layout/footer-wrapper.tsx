'use client';

import { usePathname } from 'next/navigation';
import { LandingFooter } from '@/components/landing/landing-footer';

export function FooterWrapper() {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');
    const isAdmin = pathname?.startsWith('/admin');

    if (isDashboard || isAdmin) return null;

    return <LandingFooter />;
}
