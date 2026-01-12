import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password, birthDate, guardianEmail } = body;

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email y contraseña son requeridos' },
                { status: 400 }
            );
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

        // Determine if user is a minor
        const isMinor = birthDate ? calculateIsMinor(birthDate) : false;

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                name: name || null,
                password: hashedPassword,
                birthDate: birthDate ? new Date(birthDate) : null,
                isMinor,
                guardianEmail: isMinor && guardianEmail ? guardianEmail : null,
                role: 'STUDENT', // Default role
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

function calculateIsMinor(birthDate: string): boolean {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        return age - 1 < 18;
    }

    return age < 18;
}
