'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewVerificationPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Token de verificación no encontrado');
            return;
        }

        // Llamar a API de verificación
        fetch('/api/auth/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStatus('success');
                    setMessage('¡Email verificado exitosamente!');
                    // Redirigir a login después de 3 segundos
                    setTimeout(() => router.push('/auth/login'), 3000);
                } else {
                    setStatus('error');
                    setMessage(data.error || 'Error al verificar email');
                }
            })
            .catch(() => {
                setStatus('error');
                setMessage('Error de conexión. Por favor, intenta de nuevo.');
            });
    }, [token, router]);

    return (
        <div className="min-h-screen bg-deep-space flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neural-blue/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-synapse-purple/20 rounded-full blur-[120px]" />

            <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative z-10">
                <div className="text-center">
                    <Link href="/" className="text-3xl font-bold bg-brain-spark bg-clip-text text-transparent inline-block mb-8">
                        SinapCode
                    </Link>

                    {status === 'loading' && (
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto border-4 border-neural-blue border-t-transparent rounded-full animate-spin" />
                            <h1 className="text-2xl font-bold text-white">
                                Verificando tu email...
                            </h1>
                            <p className="text-platinum-dim">
                                Por favor espera un momento
                            </p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-white">
                                ¡Email Verificado!
                            </h1>
                            <p className="text-platinum-dim">
                                {message}
                            </p>
                            <p className="text-sm text-platinum-dim">
                                Redirigiendo al login...
                            </p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-white">
                                Error de Verificación
                            </h1>
                            <p className="text-platinum-dim">
                                {message}
                            </p>
                            <div className="pt-4 space-y-2">
                                <Link
                                    href="/auth/login"
                                    className="block w-full px-4 py-2 bg-neural-blue hover:bg-neural-blue/80 text-white rounded-lg transition-colors"
                                >
                                    Ir al Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="block w-full px-4 py-2 border border-white/10 hover:border-white/20 text-platinum rounded-lg transition-colors"
                                >
                                    Registrarse de Nuevo
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
