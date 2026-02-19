'use client';

import { useState } from 'react';

interface AgeVerificationFieldProps {
    onAgeVerified: (isAdult: boolean, birthDate: string) => void;
}

export function AgeVerificationField({ onAgeVerified }: AgeVerificationFieldProps) {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [showGuardianField, setShowGuardianField] = useState(false);
    const [guardianEmail, setGuardianEmail] = useState('');

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const handleDateUpdate = (d: string, m: string, y: string) => {
        setDay(d);
        setMonth(m);
        setYear(y);

        if (d && m && y) {
            const dateString = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
            verifyAge(dateString);
        }
    };

    const verifyAge = (dateString: string) => {
        const birth = new Date(dateString);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        if (age < 16) {
            setShowGuardianField(true);
            onAgeVerified(false, dateString);
        } else {
            setShowGuardianField(false);
            onAgeVerified(true, dateString);
        }
    };

    return (
        <div className="space-y-4">
            {/* Custom Birth Date Selectors */}
            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Fecha de Nacimiento
                </label>
                <div className="grid grid-cols-3 gap-2">
                    <select
                        aria-label="Día de nacimiento"
                        value={day}
                        onChange={(e) => handleDateUpdate(e.target.value, month, year)}
                        className="bg-deep-space/50 border border-white/10 rounded-lg px-2 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-1 focus:ring-neural-blue transition appearance-none text-center cursor-pointer hover:bg-white/5"
                    >
                        <option value="" disabled>Día</option>
                        {days.map(d => (
                            <option key={d} value={d} className="bg-slate-900">{d}</option>
                        ))}
                    </select>

                    <select
                        aria-label="Mes de nacimiento"
                        value={month}
                        onChange={(e) => handleDateUpdate(day, e.target.value, year)}
                        className="bg-deep-space/50 border border-white/10 rounded-lg px-2 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-1 focus:ring-neural-blue transition appearance-none text-center cursor-pointer hover:bg-white/5"
                    >
                        <option value="" disabled>Mes</option>
                        {months.map((m, i) => (
                            <option key={m} value={i + 1} className="bg-slate-900">{m}</option>
                        ))}
                    </select>

                    <select
                        aria-label="Año de nacimiento"
                        value={year}
                        onChange={(e) => handleDateUpdate(day, month, e.target.value)}
                        className="bg-deep-space/50 border border-white/10 rounded-lg px-2 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-1 focus:ring-neural-blue transition appearance-none text-center cursor-pointer hover:bg-white/5"
                    >
                        <option value="" disabled>Año</option>
                        {years.map(y => (
                            <option key={y} value={y} className="bg-slate-900">{y}</option>
                        ))}
                    </select>
                </div>
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

                    <label className="block text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">
                        Correo del Tutor Legal
                    </label>
                    <input
                        type="email"
                        value={guardianEmail}
                        onChange={(e) => setGuardianEmail(e.target.value)}
                        placeholder="tutor@email.com"
                        required
                        className="w-full bg-white/5 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition font-bold"
                    />
                    <p className="text-xs text-amber-200 mt-2">
                        Enviaremos un enlace de autorización a este correo
                    </p>
                </div>
            )}
        </div>
    );
}
