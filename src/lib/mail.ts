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

// Generate HTML email template with SinapCode brand manual design
const getVerificationEmailHTML = (confirmLink: string, email: string) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido al ecosistema SinapCode</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="580" cellpadding="0" cellspacing="0" style="background-color: #0A0B10; border: 1px solid #333; border-radius: 8px; margin: 0 auto;">
                    
                    <!-- Logo -->
                    <tr>
                        <td style="padding: 30px 0; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 2px;">
                                SinapCode
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Tagline -->
                    <tr>
                        <td style="padding: 0 30px; text-align: center;">
                            <h2 style="color: #E0E0E0; font-size: 20px; font-weight: 600; margin: 0 0 20px;">
                                Conecta tu mente. Codifica el futuro.
                            </h2>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 0 40px;">
                            <p style="color: #9CA3AF; font-size: 16px; line-height: 26px; margin: 16px 0;">
                                Hola,
                            </p>
                            <p style="color: #9CA3AF; font-size: 16px; line-height: 26px; margin: 16px 0;">
                                Tu solicitud de acceso ha sido aprobada. Ahora eres parte de una nueva generación de creadores que no solo consumen tecnología, sino que la <strong style="color: #E0E0E0;">construyen</strong>.
                            </p>
                            <p style="color: #9CA3AF; font-size: 16px; line-height: 26px; margin: 16px 0;">
                                Para activar tu entorno de aprendizaje adaptativo con IA, verifica tu correo electrónico:
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Button -->
                    <tr>
                        <td style="padding: 32px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <a href="${confirmLink}" style="background-color: #2E5CFF; border-radius: 5px; color: #ffffff; display: inline-block; font-size: 16px; font-weight: bold; padding: 12px 24px; text-decoration: none; text-align: center; box-shadow: 0 0 15px rgba(46, 92, 255, 0.4);">
                                            INICIAR SINAPSIS
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Alternative Link -->
                    <tr>
                        <td style="padding: 0 40px;">
                            <p style="color: #9CA3AF; font-size: 14px; line-height: 24px; margin: 16px 0;">
                                O copia y pega este enlace en tu navegador:
                            </p>
                            <p style="color: #2E5CFF; font-size: 12px; word-break: break-all; margin: 16px 0;">
                                <a href="${confirmLink}" style="color: #2E5CFF; text-decoration: underline;">${confirmLink}</a>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Divider -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <hr style="border: none; border-top: 1px solid #333; margin: 0;">
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; text-align: center;">
                            <p style="color: #666; font-size: 12px; line-height: 18px; margin: 0;">
                                <strong style="color: #9CA3AF;">Este enlace expirará en 1 hora.</strong><br>
                                Si no creaste esta cuenta, puedes ignorar este email de forma segura.
                            </p>
                            <p style="color: #666; font-size: 12px; line-height: 18px; margin: 16px 0 0;">
                                © 2026 SinapCode Platform.<br>
                                Desarrollado por Antonio Rodriguez para el ecosistema SinapCode.<br>
                                Todos los derechos reservados.
                            </p>
                            <p style="margin: 10px 0 0;">
                                <a href="https://sinapcode.com/terminos" style="color: #666; text-decoration: underline; font-size: 12px;">Términos</a>
                                <span style="color: #666; font-size: 12px;"> • </span>
                                <a href="https://sinapcode.com/privacidad" style="color: #666; text-decoration: underline; font-size: 12px;">Privacidad</a>
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
            subject: 'Bienvenido al ecosistema SinapCode',
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
