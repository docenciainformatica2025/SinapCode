'use client';

import { SinapcodeLogo } from '@/components/brand/sinapcode-logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LegalNavbar() {
    const pathname = usePathname();
    const isMainLegal = pathname === '/legal';

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F1F0E8]/80 backdrop-blur-xl border-b border-black/5 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <SinapcodeLogo variant="full" theme="color" className="h-8 md:h-10" />

                <div className="flex items-center gap-8">
                    {!isMainLegal && (
                        <Link
                            href="/legal"
                            className="text-[10px] font-black text-[#1E1E1E]/40 hover:text-[#C9A78A] uppercase tracking-[0.3em] transition-colors italic"
                        >
                            ← CENTRO LEGAL
                        </Link>
                    )}
                    <Link
                        href="/auth/login"
                        className="px-6 py-2 bg-[#1E1E1E] text-[#F1F0E8] text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-[#C9A78A] hover:text-[#1E1E1E] transition-all italic"
                    >
                        ACCEDER
                    </Link>
                </div>
            </div>
        </nav>
    );
}
