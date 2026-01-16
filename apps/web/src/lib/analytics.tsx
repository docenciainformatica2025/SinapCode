// This would wrap 'posthog-js' in production
'use client';

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname) {
            // Mock tracking event
            // Analytics tracked
            // posthog.capture('$pageview')
        }
    }, [pathname, searchParams]);

    return <>{children}</>;
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Event tracked
    // posthog.capture(eventName, properties);
};
