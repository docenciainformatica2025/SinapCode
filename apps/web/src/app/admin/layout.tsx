import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F1F0E8] flex relative overflow-hidden font-sans selection:bg-[#C9A78A]/30 selection:text-[#1E1E1E]">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#C9A78A]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#A7C1C0]/10 rounded-full blur-[150px]" />
            </div>
            <AdminSidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8 overflow-y-auto h-screen bg-white/40 backdrop-blur-xl shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.03)] rounded-l-[40px] mt-4 mb-4 border-l border-white/20 z-10 transition-all duration-500">
                {children}
            </main>
        </div>
    );
}
