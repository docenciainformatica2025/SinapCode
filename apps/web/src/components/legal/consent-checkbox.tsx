'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ConsentTracker } from '@/lib/legal/consent-tracker';

interface ConsentCheckboxProps {
    documentType: 'terms' | 'privacy' | 'cookies';
    documentVersion: string;
    required?: boolean;
    onChange?: (accepted: boolean) => void;
    className?: string;
}

export function ConsentCheckbox({
    documentType,
    documentVersion,
    required = false,
    onChange,
    className = '',
}: ConsentCheckboxProps) {
    const [accepted, setAccepted] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isAccepted = e.target.checked;
        setAccepted(isAccepted);

        if (isAccepted) {
            setIsRecording(true);

            // Registrar consentimiento con evidencia completa
            await ConsentTracker.recordConsent({
                documentType,
                documentVersion,
                consentMethod: 'checkbox',
            });

            setIsRecording(false);
        }

        onChange?.(isAccepted);
    };

    const labels = {
        terms: 'Términos de Servicio',
        privacy: 'Política de Privacidad',
        cookies: 'Política de Cookies',
    };

    const links = {
        terms: '/legal/terms',
        privacy: '/privacy',
        cookies: '/legal/cookies',
    };

    return (
        <div className={`flex items-start gap-3 ${className}`}>
            <input
                type="checkbox"
                id={`consent-${documentType}`}
                checked={accepted}
                onChange={handleChange}
                required={required}
                disabled={isRecording}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-deep-space/50 text-neural-blue focus:ring-2 focus:ring-neural-blue focus:ring-offset-2 focus:ring-offset-deep-space transition disabled:opacity-50"
            />
            <label
                htmlFor={`consent-${documentType}`}
                className="text-sm text-[#B8BFC9] flex-1"
            >
                Acepto los{' '}
                <Link
                    href={links[documentType]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neural-blue hover:text-white transition underline"
                >
                    {labels[documentType]}
                </Link>
                {' '}
                <span className="text-xs text-[#B8BFC9]/60">(v{documentVersion})</span>
                {required && <span className="text-red-500 ml-1">*</span>}
                {isRecording && (
                    <span className="text-xs text-neural-blue ml-2">
                        📝 Guardando evidencia...
                    </span>
                )}
            </label>
        </div>
    );
}
