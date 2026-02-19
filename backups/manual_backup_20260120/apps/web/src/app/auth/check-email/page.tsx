'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, CheckCircle, Clock, RefreshCw, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

function CheckEmailContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || 'tu correo';

    return (
        <div className="min-h-screen bg-deep-space flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neural-blue/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-synapse-purple/20 rounded-full blur-[120px]" />

            <div className="w-full max-w-lg glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 shadow-2xl relative z-10">

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-neural-blue/30 blur-xl rounded-full" />
                        <div className="relative bg-neural-blue/20 p-6 rounded-full border border-neural-blue/30">
                            <Mail className="w-12 h-12 text-neural-blue" />
                        </div>
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl font-bold text-white text-center mb-3">
                    ¡Revisa tu correo!
                </h1>

                {/* Subheading */}
                <p className="text-platinum text-center text-lg mb-8">
                    Te hemos enviado un email de verificación
                </p>

                {/* Email Display */}
                <div className="bg-black/30 border border-white/10 rounded-lg p-4 mb-8">
                    <p className="text-sm text-[#B8BFC9] text-center mb-1">
                        Email enviado a:
                    </p>
                    <p className="text-white font-medium text-center break-all">
                        {email}
                    </p>
                </div>

                {/* Instructions */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                            <div className="w-6 h-6 rounded-full bg-neural-blue/20 flex items-center justify-center">
                                <span className="text-neural-blue text-sm font-bold">1</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-white font-medium mb-1">Abre tu bandeja de entrada</p>
                            <p className="text-[#B8BFC9] text-sm">
                                Busca un email de <span className="text-white font-mono text-xs">SinapCode</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                            <div className="w-6 h-6 rounded-full bg-neural-blue/20 flex items-center justify-center">
                                <span className="text-neural-blue text-sm font-bold">2</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-white font-medium mb-1">Haz clic en "INICIAR SINAPSIS"</p>
                            <p className="text-[#B8BFC9] text-sm">
                                Esto verificará tu cuenta y activará tu acceso
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                            <div className="w-6 h-6 rounded-full bg-neural-blue/20 flex items-center justify-center">
                                <span className="text-neural-blue text-sm font-bold">3</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-white font-medium mb-1">Inicia sesión y comienza</p>
                            <p className="text-[#B8BFC9] text-sm">
                                Tu entorno de aprendizaje estará listo
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    <div className="bg-black/20 border border-white/5 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-neural-blue" />
                            <p className="text-white text-sm font-medium">Tiempo de llegada</p>
                        </div>
                        <p className="text-[#B8BFC9] text-xs">
                            Normalmente en menos de 1 minuto
                        </p>
                    </div>

                    <div className="bg-black/20 border border-white/5 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-neural-blue" />
                            <p className="text-white text-sm font-medium">Válido por</p>
                        </div>
                        <p className="text-[#B8BFC9] text-xs">
                            El enlace expira en 1 hora
                        </p>
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
                    <p className="text-amber-200 text-sm font-medium mb-2">
                        ¿No ves el email?
                    </p>
                    <ul className="text-amber-100/80 text-xs space-y-1">
                        <li>• Revisa tu carpeta de <strong>Spam</strong> o <strong>Promociones</strong></li>
                        <li>• Asegúrate de que el email sea correcto</li>
                        <li>• Espera unos minutos y actualiza tu bandeja</li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link
                        href="/auth/login"
                        className="w-full bg-neural-blue hover:bg-neural-blue/90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                        Ya verifiqué mi email
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border border-white/10"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reenviar email
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-[#B8BFC9] text-xs text-center">
                        ¿Problemas? Contáctanos en{' '}
                        <a href="mailto:sinapcodeia@gmail.com" className="text-neural-blue hover:underline">
                            sinapcodeia@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function CheckEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-deep-space flex items-center justify-center">
                <div className="text-white">Cargando...</div>
            </div>
        }>
            <CheckEmailContent />
        </Suspense>
    );
}
