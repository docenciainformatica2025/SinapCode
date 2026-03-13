'use client';

import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

interface LogoProps {
    variant?: 'light' | 'dark';
    showText?: boolean;
    className?: string;
}

export function Logo({ variant = 'dark', showText = true, className = '' }: LogoProps) {
    const isLight = variant === 'light';

    // Auth-style colors based on our recent theme refinement
    const bgColor = isLight ? 'bg-[#F1F0E8]' : 'bg-[#1E1E1E]';
    const iconColor = isLight ? 'text-[#1E1E1E]' : 'text-[#F1F0E8]';
    const textColor = isLight ? 'text-[#1E1E1E]' : 'text-[#F1F0E8]';
    const borderColor = isLight ? 'border-[#F1F0E8]/10' : 'border-[#1E1E1E]/10';

    return (
        <Link href="/" className={`inline-block group ${className}`}>
            <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${bgColor} rounded-2xl flex items-center justify-center transition-all border ${borderColor} group-hover:scale-110 group-hover:bg-[#C9A78A] group-hover:border-[#C9A78A]`}>
                    <svg viewBox="0 0 24 24" className={`w-7 h-7 ${iconColor}`} fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                {showText && (
                    <span className={`text-2xl font-black tracking-tighter ${textColor} font-outfit italic uppercase`}>
                        {siteConfig.name}
                    </span>
                )}
            </div>
        </Link>
    );
}
