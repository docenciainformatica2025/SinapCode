'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SinapcodeLogo } from '@/components/brand/sinapcode-logo';

function VerificationContent() {
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
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/5 relative z-10 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A78A]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C9A78A]/10 transition-colors" />

            <div className="text-center relative z-10">
                <SinapcodeLogo theme="dark" className="mb-12 flex justify-center h-10" />

                {status === 'loading' && (
                    <div className="space-y-6 animate-pulse-slow">
                        <div className="w-20 h-20 mx-auto relative">
                            <div className="absolute inset-0 border-4 border-[#C9A78A]/20 rounded-full" />
                            <div className="absolute inset-0 border-4 border-[#C9A78A] border-t-transparent rounded-full animate-spin" />
                        </div>
                        <h1 className="text-3xl font-black text-[#1E1E1E] italic uppercase font-outfit tracking-tighter">
                            Verificando
                        </h1>
                        <p className="text-[#1E1E1E]/40 text-sm font-bold italic tracking-tight">
                            Sincronizando tus credenciales con el núcleo...
                        </p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-700">
                        <div className="w-20 h-20 mx-auto bg-emerald-500/10 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/5">
                            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black text-[#1E1E1E] italic uppercase font-outfit tracking-tighter">
                            ¡Activado!
                        </h1>
                        <p className="text-emerald-600/80 text-sm font-bold italic tracking-tight">
                            {message}
                        </p>
                        <div className="flex justify-center gap-1 pt-4">
                            <div className="w-1 h-1 rounded-full bg-[#C9A78A] animate-bounce" />
                            <div className="w-1 h-1 rounded-full bg-[#C9A78A] animate-bounce delay-100" />
                            <div className="w-1 h-1 rounded-full bg-[#C9A78A] animate-bounce delay-200" />
                        </div>
                        <p className="text-[10px] text-[#1E1E1E]/20 font-black uppercase tracking-[0.3em]">
                            CONFIGURANDO TU ESPACIO...
                        </p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-3xl flex items-center justify-center shadow-lg shadow-red-500/5">
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black text-[#1E1E1E] italic uppercase font-outfit tracking-tighter">
                            Error
                        </h1>
                        <p className="text-red-600/80 text-sm font-bold italic tracking-tight">
                            {message}
                        </p>
                        <div className="pt-8 space-y-4">
                            <Link
                                href="/auth/login"
                                className="block w-full px-6 py-4 bg-[#1E1E1E] text-[#F1F0E8] font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] text-xs uppercase tracking-widest italic"
                            >
                                IR AL LOGIN
                            </Link>
                            <Link
                                href="/auth/register"
                                className="block w-full px-6 py-4 bg-white border border-[#1E1E1E]/10 text-[#1E1E1E]/60 font-black rounded-2xl transition-all hover:bg-[#1E1E1E] hover:text-[#F1F0E8] text-xs uppercase tracking-widest italic"
                            >
                                REGISTRARSE DE NUEVO
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function NewVerificationPage() {
    return (
        <div className="theme-light min-h-screen bg-[#F1F0E8] flex flex-col font-inter selection:bg-[#C9A78A]/30 overflow-x-hidden">
            <div className="flex-grow flex items-center justify-center p-4 relative">
                {/* Ambient Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full bg-grid-black/[0.02] opacity-10" />
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#C9A78A]/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />

                <Suspense fallback={
                    <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/5 relative z-10 text-center">
                        <div className="space-y-6">
                            <div className="w-20 h-20 mx-auto border-4 border-[#C9A78A] border-t-transparent rounded-full animate-spin" />
                            <h1 className="text-3xl font-black text-[#1E1E1E] italic uppercase font-outfit tracking-tighter">
                                Cargando
                            </h1>
                        </div>
                    </div>
                }>
                    <VerificationContent />
                </Suspense>
            </div>
        </div>
    );
}
