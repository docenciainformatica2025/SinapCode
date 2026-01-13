import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

const registerSchema = z.object({
    name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().trim().toLowerCase().email("Email inválido"),
    password: z.string()
        .min(8, "Mínimo 8 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
        .regex(/[a-z]/, "Debe contener al menos una minúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")
        .regex(/[^A-Za-z0-9]/, "Debe contener al menos un símbolo especial (@$!%*?&)"),
    role: z.enum(['STUDENT', 'TEACHER', 'COMPANY']).default('STUDENT'),
    birthDate: z.string().optional(),
    recaptchaToken: z.string().optional(),
});

export async function POST(request: Request) {
    const requestId = Math.random().toString(36).substring(7);

    try {
        const body = await request.json();

        // Validate input using Zod
        const result = registerSchema.safeParse(body);

        if (!result.success) {
            const errorMessage = result.error.errors[0].message;
            console.error(`[REGISTRATION:${requestId}] Validation failed:`, errorMessage);
            return NextResponse.json(
                { error: errorMessage },
                { status: 400 }
            );
        }

        const { name, email, password, role, recaptchaToken } = result.data;

        // Verify ReCAPTCHA
        if (!recaptchaToken) {
            console.error(`[REGISTRATION:${requestId}] No ReCAPTCHA token`);
            return NextResponse.json(
                { error: 'Token de seguridad requerido' },
                { status: 400 }
            );
        }

        const verification = await verifyRecaptcha(recaptchaToken);

        if (!verification.success) {
            console.error(`[REGISTRATION:${requestId}] ReCAPTCHA failed:`, verification.message);
            return NextResponse.json(
                { error: verification.message || 'Validación de seguridad fallida' },
                { status: 400 }
            );
        }


        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.warn(`[REGISTRATION:${requestId}] Email already registered: ${email}`);
            return NextResponse.json(
                { error: 'Este correo ya está registrado' },
                { status: 400 }
            );
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: role as any,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            }
        });

        // Generate and send verification email
        const verificationToken = await generateVerificationToken(email);
        const emailResult = await sendVerificationEmail(email, verificationToken.token);

        if (!emailResult.success) {
            console.error(`[REGISTRATION:${requestId}] Email send failed:`, emailResult.error);
        }

        console.log(`[REGISTRATION:${requestId}] Registration completed for ${email}`);
        return NextResponse.json({
            success: true,
            message: '¡Cuenta creada! Revisa tu correo para verificar tu email.',
            user: { ...user, emailVerified: null }
        }, { status: 201 });


    } catch (error: any) {
        console.error(`[REGISTRATION:${requestId}] ❌ Error during registration:`, {
            name: error.name,
            message: error.message,
            code: error.code,
            stack: error.stack
        });

        // Specific error handling
        if (error.code === 'P2002') {
            console.error(`[REGISTRATION:${requestId}] Duplicate email constraint violation`);
            return NextResponse.json(
                { error: 'Este correo ya está registrado' },
                { status: 400 }
            );
        }

        if (error.message?.includes('emailVerified')) {
            console.error(`[REGISTRATION:${requestId}] Database schema error - emailVerified field missing`);
            return NextResponse.json(
                { error: 'Error de configuración de base de datos. Por favor contacta soporte.' },
                { status: 500 }
            );
        }

        // Generic error
        console.error(`[REGISTRATION:${requestId}] Unhandled error, returning 500`);
        return NextResponse.json(
            { error: 'Error al crear la cuenta. Por favor, intenta de nuevo.' },
            { status: 500 }
        );
    }
}
