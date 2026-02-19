'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bell, MessageSquare, Library, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
    const pathname = usePathname();

    const links = [
        {
            href: '/dashboard',
            label: 'Inicio',
            icon: Home
        },
        {
            href: '/notifications',
            label: 'Avisos',
            icon: Bell
        },
        {
            href: '/mentor',
            label: 'Mentor',
            icon: MessageSquare
        },
        {
            href: '/library',
            label: 'Biblio',
            icon: Library
        },
        {
            href: '/evolution',
            label: 'Evolución',
            icon: TrendingUp
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-xl border-t border-white/10 pb-safe md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.5)]">
            <nav className="flex items-center justify-around h-16 px-2">
                {links.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200",
                                isActive
                                    ? "text-primary"
                                    : "text-gray-500 hover:text-primary"
                            )}
                        >
                            <div className={cn(
                                "p-1 rounded-lg transition-colors",
                                isActive && "bg-primary/5"
                            )}>
                                <Icon className={cn(
                                    "w-5 h-5",
                                    isActive && "text-primary shadow-[0_0_8px_rgba(25,127,230,0.2)]"
                                )} />
                            </div>
                            <span className={cn(
                                "text-[10px] font-medium transition-colors",
                                isActive ? "text-primary" : "text-gray-400"
                            )}>
                                {label}
                            </span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    );
}
