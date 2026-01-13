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
    console.log(`[REGISTRATION:${requestId}] Starting registration process`);

    try {
        const body = await request.json();
        console.log(`[REGISTRATION:${requestId}] Request body received`, { email: body.email, role: body.role });

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
        console.log(`[REGISTRATION:${requestId}] Input validated successfully`);

        // Verify ReCAPTCHA
        if (!recaptchaToken) {
            console.error(`[REGISTRATION:${requestId}] No ReCAPTCHA token provided`);
            return NextResponse.json(
                { error: 'Token de seguridad requerido' },
                { status: 400 }
            );
        }

        console.log(`[REGISTRATION:${requestId}] Verifying ReCAPTCHA token (length: ${recaptchaToken.length})`);
        const verification = await verifyRecaptcha(recaptchaToken);

        if (!verification.success) {
            console.error(`[REGISTRATION:${requestId}] ReCAPTCHA verification failed:`, verification.message);
            return NextResponse.json(
                { error: verification.message || 'Validación de seguridad fallida' },
                { status: 400 }
            );
        }

        console.log(`[REGISTRATION:${requestId}] ReCAPTCHA verified successfully`);
        if (verification.score !== undefined) {
            console.log(`[REGISTRATION:${requestId}] ReCAPTCHA score: ${verification.score}`);
        }


        // Check if user already exists
        console.log(`[REGISTRATION:${requestId}] Checking if user exists: ${email}`);
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.warn(`[REGISTRATION:${requestId}] User already exists: ${email}`);
            return NextResponse.json(
                { error: 'Este correo ya está registrado' },
                { status: 400 }
            );
        }

        console.log(`[REGISTRATION:${requestId}] User does not exist, proceeding with creation`);


        // Hash password
        console.log(`[REGISTRATION:${requestId}] Hashing password`);
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        console.log(`[REGISTRATION:${requestId}] Creating user in database`);
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
        console.log(`[REGISTRATION:${requestId}] User created successfully with ID: ${user.id}`);

        // Generate Verification Token
        console.log(`[REGISTRATION:${requestId}] Generating verification token`);
        const verificationToken = await generateVerificationToken(email);
        console.log(`[REGISTRATION:${requestId}] Verification token generated`);

        // Send Verification Email
        console.log(`[REGISTRATION:${requestId}] Sending verification email`);
        const emailResult = await sendVerificationEmail(email, verificationToken.token);

        if (!emailResult.success) {
            console.error(`[REGISTRATION:${requestId}] Failed to send verification email:`, emailResult.error);
            // User is created but email failed - log warning but don't fail registration
            console.warn(`[REGISTRATION:${requestId}] User registered but email sending failed. User can request resend.`);
        } else {
            console.log(`[REGISTRATION:${requestId}] Verification email sent successfully`);
        }

        console.log(`[REGISTRATION:${requestId}] Registration completed successfully`);
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
