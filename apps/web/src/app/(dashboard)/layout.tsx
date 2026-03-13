'use client';

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-[#F1F0E8] selection:bg-[#C9A78A]/30">
            {/* Sidebar (Responsive) */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <main className="flex-1 w-full min-h-screen relative z-10 overflow-hidden bg-white shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.05)] rounded-l-[40px] mt-2 lg:mt-4 mb-2 lg:mb-4">
                <div className="h-full overflow-y-auto px-4 lg:px-8 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
