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
                        className="bg-white border border-[#1E1E1E]/10 rounded-xl px-2 py-3 text-[#1E1E1E] focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 transition appearance-none text-center cursor-pointer hover:border-[#1E1E1E]/20 font-medium"
                    >
                        <option value="" disabled>Día</option>
                        {days.map(d => (
                            <option key={d} value={d} className="bg-white">{d}</option>
                        ))}
                    </select>

                    <select
                        aria-label="Mes de nacimiento"
                        value={month}
                        onChange={(e) => handleDateUpdate(day, e.target.value, year)}
                        className="bg-white border border-[#1E1E1E]/10 rounded-xl px-2 py-3 text-[#1E1E1E] focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 transition appearance-none text-center cursor-pointer hover:border-[#1E1E1E]/20 font-medium"
                    >
                        <option value="" disabled>Mes</option>
                        {months.map((m, i) => (
                            <option key={m} value={i + 1} className="bg-white">{m}</option>
                        ))}
                    </select>

                    <select
                        aria-label="Año de nacimiento"
                        value={year}
                        onChange={(e) => handleDateUpdate(day, month, e.target.value)}
                        className="bg-white border border-[#1E1E1E]/10 rounded-xl px-2 py-3 text-[#1E1E1E] focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 transition appearance-none text-center cursor-pointer hover:border-[#1E1E1E]/20 font-medium"
                    >
                        <option value="" disabled>Año</option>
                        {years.map(y => (
                            <option key={y} value={y} className="bg-white">{y}</option>
                        ))}
                    </select>
                </div>
                <p className="text-xs text-platinum-dim mt-2">
                    Requerido para cumplir con COPPA y GDPR
                </p>
            </div>

            {/* Guardian Email (if minor) */}
            {showGuardianField && (
                <div className="bg-[#C9A78A]/5 border border-[#C9A78A]/20 p-4 rounded-2xl">
                    <div className="flex items-start gap-3 mb-3">
                        <span className="text-xl">⚠️</span>
                        <div>
                            <h4 className="text-[#C9A78A] font-black text-xs uppercase tracking-widest mb-1">
                                Consentimiento Parental Requerido_
                            </h4>
                            <p className="text-[10px] text-[#1E1E1E]/60 font-medium">
                                Detectamos que eres menor de 16 años. Por seguridad, requerimos la autorización del tutor legal registrado.
                            </p>
                        </div>
                    </div>

                    <label className="block text-[10px] font-black text-[#C9A78A] uppercase tracking-[0.2em] mb-2">
                        CORREO DEL TUTOR LEGAL
                    </label>
                    <input
                        type="email"
                        value={guardianEmail}
                        onChange={(e) => setGuardianEmail(e.target.value)}
                        placeholder="tutor@email.com"
                        required
                        className="w-full bg-white border border-[#C9A78A]/20 rounded-xl px-4 py-3 text-[#1E1E1E] focus:outline-none focus:border-[#C9A78A] transition font-bold text-sm"
                    />
                    <p className="text-[10px] text-[#C9A78A]/60 mt-2 font-medium italic">
                        * Emitiremos una clave de autorización a este terminal.
                    </p>
                </div>
            )}
        </div>
    );
}
