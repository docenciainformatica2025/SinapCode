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
    try {
        const body = await request.json();

        // Validate input using Zod
        const result = registerSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.errors[0].message },
                { status: 400 }
            );
        }

        const { name, email, password, role, recaptchaToken } = result.data;

        // TEMPORARY: Bypass ReCAPTCHA validation to unblock registration
        // TODO: Fix ReCAPTCHA validation after investigating Google API response
        // Verify ReCAPTCHA
        /* 
        if (recaptchaToken) {
            const verification = await verifyRecaptcha(recaptchaToken);
            if (!verification.success) {
                return NextResponse.json(
                    { error: verification.message },
                    { status: 400 }
                );
            }
        }
        */

        // Log that we're bypassing ReCAPTCHA for now
        console.log('[REGISTRATION] ReCAPTCHA validation temporarily bypassed');
        if (recaptchaToken) {
            console.log('[REGISTRATION] Token received (length):', recaptchaToken.length);
        }


        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Este correo ya está registrado' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: role as any,
                // Store additional metadata if needed, e.g. birthDate in a profile table
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            }
        });

        // Generate Verification Token
        const verificationToken = await generateVerificationToken(email);

        // Send Verification Email
        await sendVerificationEmail(email, verificationToken.token);

        return NextResponse.json({
            success: true,
            message: 'Correo de confirmación enviado',
            user: { ...user, emailVerified: null } // Explicitly show it's unverified
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Error al crear la cuenta' },
            { status: 500 }
        );
    }
}
