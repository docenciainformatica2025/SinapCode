import { Resend } from 'resend';
import VerificationEmail from '@/emails/verification-email';

// Lazy initialization to avoid build-time errors when RESEND_API_KEY is not set
let resendClient: Resend | null = null;

const getResendClient = () => {
    if (!resendClient && process.env.RESEND_API_KEY) {
        resendClient = new Resend(process.env.RESEND_API_KEY);
    }
    return resendClient;
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`;

    console.log('[EMAIL] Environment:', process.env.NODE_ENV);
    console.log('[EMAIL] RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('[EMAIL] NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
    console.log('[EMAIL] Sending to:', email);
    console.log('[EMAIL] Confirm link:', confirmLink);

    // Modo desarrollo: Log en consola
    if (process.env.NODE_ENV === 'development' || !process.env.RESEND_API_KEY) {
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
            console.error('Resend error:', error);
            // Fallback a modo desarrollo si falla
            console.log("==========================================");
            console.log(`📧 EMAIL FALLBACK: Sending to ${email}`);
            console.log(`🔑 Verification Link: ${confirmLink}`);
            console.log("==========================================");
            return { success: false, error };
        }

        console.log('✅ Email sent successfully:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Email sending error:', error);
        // Fallback a modo desarrollo
        console.log("==========================================");
        console.log(`📧 EMAIL FALLBACK: Sending to ${email}`);
        console.log(`🔑 Verification Link: ${confirmLink}`);
        console.log("==========================================");
        return { success: false, error };
    }
};
