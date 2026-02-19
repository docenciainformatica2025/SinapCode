'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { HeatmapStore } from '@/lib/heatmap-store';

export function HeatmapTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // No rastrear clics en el propio admin para evitar ruido
            if (pathname.startsWith('/admin')) return;

            // Calcular posición porcentual para que sea responsive al tamaño de pantalla
            const x = (e.pageX / document.documentElement.scrollWidth) * 100;
            const y = (e.pageY / document.documentElement.scrollHeight) * 100;

            HeatmapStore.saveClick({
                x,
                y,
                path: pathname
            });
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [pathname]);

    return null; // Componente puramente funcional/invisible
}
