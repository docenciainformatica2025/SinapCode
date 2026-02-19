import { NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const BYPASS_RECAPTCHA = process.env.BYPASS_RECAPTCHA === 'true';

export async function verifyRecaptcha(token: string) {
    // TEMPORARY: Bypass for testing if environment variable is set
    if (BYPASS_RECAPTCHA) {
        console.warn('[ReCAPTCHA] ⚠️ MODO DE BYPASS ACTIVADO - Saltando validación');
        console.warn('[ReCAPTCHA] Esto SOLO debe usarse para pruebas');
        return { success: true, score: 1.0, bypassed: true };
    }

    if (!token) {
        console.error('[ReCAPTCHA] No se proporcionó ningún token');
        return { success: false, message: 'Token de seguridad faltante' };
    }

    if (!RECAPTCHA_SECRET_KEY) {
        console.error('[ReCAPTCHA] La clave secreta no está configurada');
        return { success: false, message: 'Configuración de seguridad incompleta' };
    }



    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
        });

        if (!response.ok) {
            console.error('[ReCAPTCHA] Error HTTP:', response.status, response.statusText);
            return { success: false, message: 'Error al verificar seguridad' };
        }

        const data = await response.json();


        // Google test keys return: { success: true }
        // Production keys return: { success: true, score: 0.0-1.0, ... }
        // Failed validation: { success: false, error-codes: [...] }

        if (data.success === true) {
            // Success! Check score only if it exists (production keys)
            if (data.score !== undefined) {

                if (data.score < 0.3) {
                    console.warn('[ReCAPTCHA] Puntuación baja detectada:', data.score);
                    return {
                        success: false,
                        message: 'Validación de seguridad fallida. Por favor, intenta de nuevo.',
                        score: data.score
                    };
                }
            } else {

            }


            return { success: true, score: data.score };
        } else {
            // Validation failed
            console.error('[ReCAPTCHA] ❌ La validación falló');
            console.error('[ReCAPTCHA] Códigos de error:', data['error-codes']);

            return {
                success: false,
                message: 'Validación de seguridad fallida. ¿Eres un robot?',
                errors: data['error-codes']
            };
        }
    } catch (error) {
        console.error('[ReCAPTCHA] Excepción durante la verificación:', error);
        return { success: false, message: 'Error al verificar seguridad' };
    }
}
