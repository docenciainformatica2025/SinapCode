'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

export function Breadcrumbs() {
    const pathname = usePathname();

    const getBreadcrumbs = (): BreadcrumbItem[] => {
        const paths = pathname.split('/').filter(Boolean);
        const breadcrumbs: BreadcrumbItem[] = [];

        // Always start with home
        breadcrumbs.push({ label: 'Admin', href: '/admin' });

        // Build breadcrumbs from path
        let currentPath = '';
        for (let i = 1; i < paths.length; i++) {
            currentPath += `/${paths[i]}`;
            const label = paths[i]
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Last item doesn't need href
            if (i === paths.length - 1) {
                breadcrumbs.push({ label });
            } else {
                breadcrumbs.push({ label, href: currentPath });
            }
        }

        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                    {index > 0 && (
                        <span className="text-platinum-dim">/</span>
                    )}
                    {crumb.href ? (
                        <Link
                            href={crumb.href}
                            className="text-platinum-dim hover:text-white transition"
                        >
                            {crumb.label}
                        </Link>
                    ) : (
                        <span className="text-white font-medium">{crumb.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
