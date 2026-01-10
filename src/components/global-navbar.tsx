'use client';

import Link from 'next/link';
import { UserGamificatonStats } from '@/components/gamification/user-stats';
import { VerifiedBadge } from '@/components/badges/verified-badge';

export function GlobalNavbar() {
    return (
        <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-6 py-3 flex items-center justify-between">
            {/* Logo Area */}
            <div className="flex items-center gap-8">
                <Link href="/" className="text-xl font-bold bg-brain-spark bg-clip-text text-transparent hover:opacity-80 transition">
                    SinapCode
                </Link>

                <div className="hidden md:flex gap-6 text-sm font-medium text-platinum-dim">
                    <Link href="/courses" className="hover:text-white transition">Cursos</Link>
                    <Link href="/teacher" className="hover:text-white transition">Profesores</Link>
                    <Link href="/admin" className="hover:text-white transition">Admin</Link>
                </div>
            </div>

            {/* Right Side: Badges & Gamification */}
            <div className="flex items-center gap-6">

                {/* Verified Badges (Visible on larger screens) */}
                <div className="hidden lg:flex items-center gap-2">
                    <VerifiedBadge type="cisco" title="NetAcad Algo" date="2025-12" />
                    <VerifiedBadge type="oracle" title="Java Fnd" date="2026-01" />
                </div>

                {/* Separator */}
                <div className="hidden lg:block w-px h-6 bg-white/10"></div>

                {/* Gamification Stats */}
                <UserGamificatonStats />

                {/* User Profile */}
                <Link href="/profile">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 border border-white/20 cursor-pointer hover:scale-105 transition" />
                </Link>
            </div>
        </nav>
    );
}
