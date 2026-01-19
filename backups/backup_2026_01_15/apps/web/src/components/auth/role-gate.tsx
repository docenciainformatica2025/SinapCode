'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface RoleGateProps {
    children: React.ReactNode;
    allowedRoles?: ('ADMIN' | 'TEACHER' | 'STUDENT')[];
}

interface UserWithRole {
    role?: string;
}

export function RoleGate({ children, allowedRoles = ['ADMIN'] }: RoleGateProps) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            router.push('/auth/login?callbackUrl=/admin');
            return;
        }

        const user = session?.user as UserWithRole;
        const userRole = user?.role;

        if (!userRole || !allowedRoles.includes(userRole as any)) {
            toast.error('Acceso Denegado: No tienes permisos suficientes.');
            router.push('/'); // Redirect to home
        } else {
            setIsAuthorized(true);
        }
    }, [session, status, router, allowedRoles]);

    // Show nothing while checking (or a loading spinner)
    if (status === 'loading' || !isAuthorized) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-deep-space">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-neural-blue border-t-transparent"></div>
                    <p className="text-platinum-dim text-sm animate-pulse">Verificando credenciales de seguridad...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
