import { NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFyjTs-75NrTP'; // Google Test Secret

export async function verifyRecaptcha(token: string) {
    if (!token) {
        return { success: false, message: 'Token de seguridad faltante' };
    }

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
        });

        const data = await response.json();

        if (data.success && data.score >= 0.5) {
            return { success: true, score: data.score };
        } else {
            console.warn('ReCAPTCHA failed:', data);
            return { success: false, message: 'Validación de seguridad fallida. ¿Eres un robot?', score: data.score };
        }
    } catch (error) {
        console.error('ReCAPTCHA verification error:', error);
        return { success: false, message: 'Error al verificar seguridad' };
    }
}
