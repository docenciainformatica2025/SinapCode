'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            expand={false}
            richColors
            closeButton
            theme="dark"
            toastOptions={{
                style: {
                    background: 'rgba(10, 14, 39, 0.95)',
                    border: '1px solid rgba(96, 165, 250, 0.2)',
                    color: '#fff',
                    backdropFilter: 'blur(12px)',
                },
                className: 'glass-panel',
            }}
        />
    );
}
