'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomeRedirect() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        if (status === 'unauthenticated') {
            // Landing page is static, no redirect needed usually unless we want to force login
            // For now, let them see landing page
        } else if (status === 'authenticated') {
            const role = (session?.user as any)?.role;
            if (role === 'SUPER_ADMIN' || role === 'ADMIN') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        }
    }, [session, status, router]);

    return null; // This component handles redirects based on auth state
}
