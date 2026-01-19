'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Runtime Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-deep-space flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[120px] animate-pulse duration-[4000ms]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-neural-blue/10 rounded-full blur-[120px] animate-pulse duration-[5000ms]" />

            <div className="text-center relative z-10 max-w-lg mx-auto">
                {/* Error Glitch Effect Placeholder */}
                <h1 className="text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-synapse-purple leading-none select-none opacity-20 blur-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                    500
                </h1>

                <h1 className="text-8xl font-black text-white tracking-tighter mb-4 drop-shadow-neon-purple">
                    Error
                </h1>

                <h2 className="text-2xl font-bold text-white mb-4">
                    Algo Salió Mal
                </h2>

                <p className="text-[#B8BFC9] text-base mb-8 max-w-sm mx-auto">
                    Nuestros sistemas neuronales encontraron una interferencia inesperada. No te preocupes, ya estamos reconectando las sinapsis.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="group flex items-center gap-2 px-6 py-3 bg-brain-spark text-white rounded-lg shadow-neon-blue hover:shadow-neon-purple hover:scale-[1.02] transition-all w-full sm:w-auto justify-center font-semibold"
                    >
                        <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                        <span>Reintentar</span>
                    </button>

                    <Link
                        href="/"
                        className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all w-full sm:w-auto justify-center"
                    >
                        <Home className="w-4 h-4 text-[#B8BFC9] group-hover:text-white transition-colors" />
                        <span>Ir al Inicio</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
