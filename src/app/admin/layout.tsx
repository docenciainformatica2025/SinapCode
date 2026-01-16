'use client';

import { AdminLayoutPro } from '@/components/admin/layout-pro';
import { AdminAuthGuard } from '@/components/admin/auth-guard';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminAuthGuard>
            <AdminLayoutPro>
                {children}
            </AdminLayoutPro>
        </AdminAuthGuard>
    );
}
