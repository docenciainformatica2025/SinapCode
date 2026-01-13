import { Resend } from 'resend';

// Use hardcoded API key as fallback
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_ECh6b4DS_Ft8smJZMKuWoZEmDh2pg3Zxq';

// Lazy initialization
let resendClient: Resend | null = null;

const getResendClient = () => {
    if (!resendClient && RESEND_API_KEY) {
        resendClient = new Resend(RESEND_API_KEY);
    }
    return resendClient;
};

// Generate HTML email template
const getVerificationEmailHTML = (confirmLink: string, email: string) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifica tu correo - SinapCode</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0e1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0e1a; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; margin: 0 auto;">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center;">
                            <h1 style="color: #1a1a1a; font-size: 24px; font-weight: bold; margin: 0;">
                                ¡Bienvenido a SinapCode! 🚀
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 0 40px;">
                            <p style="color: #404040; font-size: 14px; line-height: 24px; margin: 16px 0;">
                                Hola,
                            </p>
                            <p style="color: #404040; font-size: 14px; line-height: 24px; margin: 16px 0;">
                                Gracias por registrarte en <strong>SinapCode</strong>, la plataforma de aprendizaje del futuro.
                                Para completar tu registro y comenzar tu viaje de aprendizaje, por favor verifica tu correo
                                electrónico haciendo clic en el botón de abajo:
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Button -->
                    <tr>
                        <td style="padding: 27px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <a href="${confirmLink}" style="background-color: #3b82f6; border-radius: 6px; color: #ffffff; display: inline-block; font-size: 16px; font-weight: bold; padding: 14px 20px; text-decoration: none; text-align: center; max-width: 200px;">
                                            Verificar Email
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Link -->
                    <tr>
                        <td style="padding: 0 40px;">
                            <p style="color: #404040; font-size: 14px; line-height: 24px; margin: 16px 0;">
                                O copia y pega este enlace en tu navegador:
                            </p>
                            <p style="color: #3b82f6; font-size: 12px; word-break: break-all; margin: 16px 0;">
                                <a href="${confirmLink}" style="color: #3b82f6; text-decoration: underline;">${confirmLink}</a>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 32px 40px 40px; text-align: center;">
                            <p style="color: #8898aa; font-size: 12px; line-height: 20px; margin: 0;">
                                <strong>Este enlace expirará en 1 hora.</strong><br>
                                Si no creaste esta cuenta, puedes ignorar este email de forma segura.
                            </p>
                            <p style="color: #8898aa; font-size: 12px; line-height: 20px; margin: 16px 0 0;">
                                ¿Tienes problemas? Contáctanos en 
                                <a href="mailto:soporte@sinapcode.com" style="color: #3b82f6; text-decoration: underline;">soporte@sinapcode.com</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`;

    console.log('[EMAIL] ========== EMAIL SERVICE START ==========');
    console.log('[EMAIL] Environment:', process.env.NODE_ENV);
    console.log('[EMAIL] RESEND_API_KEY exists:', !!RESEND_API_KEY);
    console.log('[EMAIL] Sending to:', email);
    console.log('[EMAIL] Confirm link:', confirmLink);

    if (!RESEND_API_KEY) {
        console.error('[EMAIL] ❌ RESEND_API_KEY is not set!');
        return { success: false, error: 'API key not configured' };
    }

    try {
        const resend = getResendClient();

        if (!resend) {
            throw new Error('Resend client not initialized');
        }

        const htmlContent = getVerificationEmailHTML(confirmLink, email);

        const { data, error } = await resend.emails.send({
            from: 'SinapCode <onboarding@resend.dev>',
            to: [email],
            subject: 'Verifica tu correo electrónico - SinapCode',
            html: htmlContent,
        });

        if (error) {
            console.error('[EMAIL] ❌ Resend API error:', error);
            return { success: false, error };
        }

        console.log('[EMAIL] ✅ Email sent successfully!');
        console.log('[EMAIL] Email ID:', data?.id);
        console.log('[EMAIL] ========== EMAIL SERVICE END ==========');
        return { success: true, data };
    } catch (error) {
        console.error('[EMAIL] ❌ Exception during email sending:', error);
        return { success: false, error };
    }
};
