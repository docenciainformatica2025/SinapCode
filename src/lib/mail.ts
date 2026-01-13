import { Resend } from 'resend';
import VerificationEmail from '@/emails/verification-email';

// TEMPORARY: Hardcode API key to test if env var loading is the issue
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_ECh6b4DS_Ft8smJZMKuWoZEmDh2pg3Zxq';

// Lazy initialization to avoid build-time errors
let resendClient: Resend | null = null;

const getResendClient = () => {
    if (!resendClient && RESEND_API_KEY) {
        resendClient = new Resend(RESEND_API_KEY);
    }
    return resendClient;
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`;

    console.log('[EMAIL] ========== EMAIL SERVICE START ==========');
    console.log('[EMAIL] Environment:', process.env.NODE_ENV);
    console.log('[EMAIL] RESEND_API_KEY from env exists:', !!process.env.RESEND_API_KEY);
    console.log('[EMAIL] RESEND_API_KEY constant exists:', !!RESEND_API_KEY);
    console.log('[EMAIL] RESEND_API_KEY length:', RESEND_API_KEY?.length || 0);
    console.log('[EMAIL] NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
    console.log('[EMAIL] Sending to:', email);
    console.log('[EMAIL] Confirm link:', confirmLink);

    // ALWAYS try to send via Resend
    if (!RESEND_API_KEY) {
        console.error('[EMAIL] ❌ RESEND_API_KEY is not set! Falling back to console log.');
        console.log("==========================================");
        console.log(`📧 EMAIL MOCK SERVICE: Sending to ${email}`);
        console.log(`🔑 Verification Link: ${confirmLink}`);
        console.log("==========================================");
        return { success: true };
    }

    // Modo producción: Enviar email real con Resend
    try {
        const resend = getResendClient();

        if (!resend) {
            throw new Error('Resend client not initialized');
        }

        const { data, error } = await resend.emails.send({
            from: 'SinapCode <onboarding@resend.dev>', // Usar dominio de Resend para testing
            to: [email],
            subject: 'Verifica tu correo electrónico - SinapCode',
            react: VerificationEmail({ confirmLink, email }),
        });

        if (error) {
            console.error('[EMAIL] ❌ Resend API error:', error);
            console.error('[EMAIL] Error details:', JSON.stringify(error, null, 2));
            // Fallback a modo desarrollo si falla
            console.log("==========================================");
            console.log(`📧 EMAIL FALLBACK: Sending to ${email}`);
            console.log(`🔑 Verification Link: ${confirmLink}`);
            console.log("==========================================");
            return { success: false, error };
        }

        console.log('[EMAIL] ✅ Email sent successfully!');
        console.log('[EMAIL] Resend response:', JSON.stringify(data, null, 2));
        console.log('[EMAIL] ========== EMAIL SERVICE END ==========');
        return { success: true, data };
    } catch (error) {
        console.error('[EMAIL] ❌ Exception during email sending:', error);
        console.error('[EMAIL] Exception details:', error instanceof Error ? error.message : String(error));
        // Fallback a modo desarrollo
        console.log("==========================================");
        console.log(`📧 EMAIL FALLBACK: Sending to ${email}`);
        console.log(`🔑 Verification Link: ${confirmLink}`);
        console.log("==========================================");
        return { success: false, error };
    }
};
