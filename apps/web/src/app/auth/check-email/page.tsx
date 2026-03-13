'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, CheckCircle, Clock, RefreshCw, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';
import { SinapcodeLogo } from '@/components/brand/sinapcode-logo';
import { siteConfig } from '@/lib/site-config';

function CheckEmailContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || 'tu correo';

    return (
        <div className="theme-light min-h-screen bg-[#F1F0E8] flex items-center justify-center p-4 relative overflow-hidden font-inter selection:bg-[#C9A78A]/30">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-black/[0.02] opacity-10" />
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#C9A78A]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#A7C1C0]/5 rounded-full blur-[120px]" />

            <div className="w-full max-w-lg bg-white p-8 sm:p-14 rounded-[3rem] border border-black/5 shadow-2xl shadow-black/5 relative z-10 transition-all hover:shadow-black/10">

                <div className="flex justify-center mb-12">
                    <SinapcodeLogo theme="dark" className="scale-110" />
                </div>

                {/* Success Icon */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#C9A78A]/20 blur-2xl rounded-full" />
                        <div className="relative bg-[#C9A78A]/10 p-6 rounded-full border border-[#C9A78A]/20">
                            <Mail className="w-12 h-12 text-[#C9A78A]" />
                        </div>
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl font-black text-[#1E1E1E] text-center mb-4 italic uppercase font-outfit tracking-tighter">
                    ¡Revisa tu correo!
                </h1>

                {/* Subheading */}
                <p className="text-[#1E1E1E]/40 text-center text-lg mb-10 font-bold italic tracking-tight">
                    Te hemos enviado un email de verificación
                </p>

                {/* Email Display */}
                <div className="bg-[#F1F0E8] border border-[#1E1E1E]/5 rounded-2xl p-6 mb-10">
                    <p className="text-[10px] text-[#1E1E1E]/30 text-center mb-2 font-black uppercase tracking-widest">
                        Email enviado a:
                    </p>
                    <p className="text-[#1E1E1E] font-black text-center break-all text-sm uppercase italic">
                        {email}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <Link
                        href="/auth/login"
                        className="w-full bg-[#1E1E1E] hover:bg-[#C9A78A] text-white font-black py-5 px-8 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 group text-[10px] uppercase tracking-[0.3em] italic shadow-xl shadow-black/10 active:scale-95"
                    >
                        Ya verifiqué mi email
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>

                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-white border border-[#1E1E1E]/5 hover:border-[#C9A78A]/30 text-[#1E1E1E]/50 hover:text-[#C9A78A] font-black py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] italic"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reenviar email
                    </button>
                </div>

                <div className="mt-12 pt-8 border-t border-[#1E1E1E]/5">
                    <p className="text-[#1E1E1E]/30 text-[10px] text-center font-black uppercase tracking-widest leading-loose">
                        ¿No ves el email? Revisa Spam o Promociones.<br />
                        ¿Problemas? <a href={`mailto:${siteConfig.supportEmail}`} className="text-[#C9A78A] hover:underline">CONTÁCTANOS</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function CheckEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F1F0E8] flex items-center justify-center">
                <div className="text-[#1E1E1E] font-black italic uppercase tracking-widest animate-pulse">Cargando Protocolos...</div>
            </div>
        }>
            <CheckEmailContent />
        </Suspense>
    );
}
