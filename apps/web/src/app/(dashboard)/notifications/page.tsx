'use client';

import Link from 'next/link';
import { BottomNav } from '@/components/ui/bottom-nav';

export default function NotificationsPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 pb-20 md:pb-0">
            <main className="max-w-7xl mx-auto p-4 md:p-8 pt-20">
                <h1 className="text-3xl font-bold mb-6">Avisos</h1>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-500">No tienes nuevas notificaciones por el momento.</p>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
