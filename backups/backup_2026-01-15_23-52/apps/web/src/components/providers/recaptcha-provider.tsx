'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
    // Production Site Key from environment variable
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
        console.error('[ReCAPTCHA] NEXT_PUBLIC_RECAPTCHA_SITE_KEY not found in environment');
        return <>{children}</>;
    }



    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={siteKey}
            language="es"
            scriptProps={{
                async: true,
                defer: true,
                appendTo: 'head',
            }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}
