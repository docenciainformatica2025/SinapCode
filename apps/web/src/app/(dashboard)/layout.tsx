'use client';

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-deep-space selection:bg-emerald-500/30">
            {/* Sidebar (Responsive) */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <main className="flex-1 w-full min-h-screen relative z-10 overflow-hidden">
                {children}
            </main>
        </div>
    );
}
