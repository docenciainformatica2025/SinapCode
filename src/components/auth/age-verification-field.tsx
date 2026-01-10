'use client';

import { useState } from 'react';

interface AgeVerificationFieldProps {
    onAgeVerified: (isAdult: boolean, birthDate: string) => void;
}

export function AgeVerificationField({ onAgeVerified }: AgeVerificationFieldProps) {
    const [birthDate, setBirthDate] = useState('');
    const [showGuardianField, setShowGuardianField] = useState(false);
    const [guardianEmail, setGuardianEmail] = useState('');

    const handleDateChange = (date: string) => {
        setBirthDate(date);

        if (date) {
            const birth = new Date(date);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }

            if (age < 16) {
                setShowGuardianField(true);
                onAgeVerified(false, date);
            } else {
                setShowGuardianField(false);
                onAgeVerified(true, date);
            }
        }
    };

    return (
        <div className="space-y-4">
            {/* Birth Date Field */}
            <div>
                <label className="block text-xs font-semibold text-platinum uppercase tracking-wider mb-2">
                    Fecha de Nacimiento
                </label>
                <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    required
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-base text-white focus:outline-none focus:border-neural-blue focus:ring-1 focus:ring-neural-blue transition [color-scheme:dark]"
                />
                <p className="text-xs text-platinum-dim mt-2">
                    Requerido para cumplir con COPPA y GDPR
                </p>
            </div>

            {/* Guardian Email (if minor) */}
            {showGuardianField && (
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl">
                    <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">⚠️</span>
                        <div>
                            <h4 className="text-amber-400 font-bold text-sm mb-1">
                                Consentimiento Parental Requerido
                            </h4>
                            <p className="text-xs text-amber-200">
                                Detectamos que eres menor de 16 años. Necesitamos el consentimiento de tu tutor legal.
                            </p>
                        </div>
                    </div>

                    <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                        Correo del Tutor Legal
                    </label>
                    <input
                        type="email"
                        value={guardianEmail}
                        onChange={(e) => setGuardianEmail(e.target.value)}
                        placeholder="tutor@email.com"
                        required
                        className="w-full bg-black/50 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                    />
                    <p className="text-xs text-amber-200 mt-2">
                        Enviaremos un enlace de autorización a este correo
                    </p>
                </div>
            )}
        </div>
    );
}
