import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { z } from 'zod';

const subscribeSchema = z.object({
    email: z.string().email('Email inválido')
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validation
        const result = subscribeSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: result.error.errors[0].message },
                { status: 400 }
            );
        }

        const { email } = result.data;

        // Check if already subscribed
        const existing = await prisma.newsletterSubscriber.findUnique({
            where: { email }
        });

        if (existing) {
            // If inactive, reactivate
            if (!existing.isActive) {
                await prisma.newsletterSubscriber.update({
                    where: { email },
                    data: { isActive: true }
                });
                return NextResponse.json({ message: '¡Bienvenido de vuelta! Tu suscripción ha sido reactivada.' });
            }
            return NextResponse.json({ message: 'Ya estás suscrito al newsletter.' }, { status: 409 });
        }

        // Create subscriber
        await prisma.newsletterSubscriber.create({
            data: { email }
        });

        return NextResponse.json({ message: '¡Suscripción exitosa!' }, { status: 201 });

    } catch (error) {
        console.error('Newsletter Subscription Error:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
