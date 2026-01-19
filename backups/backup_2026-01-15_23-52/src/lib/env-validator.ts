import { z } from 'zod';

const envSchema = z.object({
    // Authentication
    AUTH_SECRET: z.string().min(32, "AUTH_SECRET debe tener al menos 32 caracteres para seguridad criptográfica"),
    NEXTAUTH_URL: z.string().url("NEXTAUTH_URL debe ser una URL válida"),

    // Database - Optional for now as we are strictly validating connection in next phase
    // But schema should exist
    DATABASE_URL: z.string().optional(),

    // Recaptcha - If used
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().optional(),

    // Node Environment
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const validateEnv = () => {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
        console.error("❌ FATAL: Errores de Validación de Entorno:");
        result.error.issues.forEach((issue) => {
            console.error(`   -> ${issue.path.join('.')}: ${issue.message}`);
        });
        // In strict mode, we might want to throw. For diagnosis, we return success status.
        return { success: false, errors: result.error.format() };
    }

    console.log("✅ Entorno Validado Correctamente");
    return { success: true, data: result.data };
};
