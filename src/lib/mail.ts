import { Resend } from 'resend';
import VerificationEmail from '@/emails/verification-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`;

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
        const { data, error } = await resend.emails.send({
            from: 'SinapCode <noreply@sinapcode.com>',
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
