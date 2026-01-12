import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    role: z.enum(['STUDENT', 'TEACHER', 'COMPANY']).default('STUDENT'),
    birthDate: z.string().optional(),
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

        const { name, email, password, role, birthDate } = result.data;

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

        return NextResponse.json({
            success: true,
            user
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Error al crear la cuenta' },
            { status: 500 }
        );
    }
}
