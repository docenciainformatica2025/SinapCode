'use client';

import { Sparkles, Info } from 'lucide-react';

interface EducationalDisclaimerProps {
    className?: string;
}

/**
 * Componente de Transparencia Legal para IA y Educación.
 * Cumple con la EU AI Act de proporcionar avisos claros al interactuar con IA.
 */
export function EducationalDisclaimer({ className = "" }: EducationalDisclaimerProps) {
    return (
        <div className={`p-6 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border border-indigo-100 dark:border-indigo-900/30 rounded-[2rem] ${className}`}>
            <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        Transparencia Algorítmica y Educativa
                        <Info className="w-3 h-3 opacity-40" />
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed max-w-2xl">
                        Estás interactuando con <strong>Sinap Tutor (IA)</strong>. El contenido generado es de carácter estrictamente educativo y puede contener inexactitudes técnicas ("alucinaciones").
                        No garantizamos resultados académicos específicos ni empleabilidad futura. Al usar esta herramienta, reconoces que la IA es un copiloto y no una fuente de verdad absoluta.
                    </p>
                    <div className="pt-2">
                        <a
                            href="/legal/terms#ia-transparency"
                            className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline tracking-tighter uppercase"
                        >
                            Leer más sobre el protocolo de IA →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
