'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
    useEffect(() => {
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(
                    (registration) => {
                        console.log('SW registrado: ', registration);
                    },
                    (registrationError) => {
                        console.log('Fallo en el registro del SW: ', registrationError);
                    }
                );
            });
        }
    }, []);

    return null;
}
