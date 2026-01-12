import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Esquema de validación basado en consent_log_schema.json e interfaces
const ConsentSchema = z.object({
    documentType: z.enum(['terms', 'privacy', 'cookies', 'coppa']),
    documentVersion: z.string(),
    consentMethod: z.enum(['checkbox', 'button_click', 'scroll_complete']),
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
    timestamp: z.string(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validar datos
        const result = ConsentSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid consent data', details: result.error.issues },
                { status: 400 }
            );
        }

        const consentData = result.data;

        // Si el usuario es anónimo (pre-registro), solo logueamos
        // El consentimiento real se guardará después del registro exitoso
        if (!body.userId || body.userId === 'anonymous') {
            console.log('📝 [LEGAL API] Anonymous consent recorded (pre-registration)');

            return NextResponse.json({
                success: true,
                consentId: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
                note: 'Consent logged for anonymous user (will be linked post-registration)'
            });
        }

        // Guardar en Base de Datos solo si el usuario ya existe
        const newConsent = await prisma.legalConsent.create({
            data: {
                userId: body.userId,
                documentType: consentData.documentType.toUpperCase() as any,
                documentVersion: consentData.documentVersion,
                consentMethod: consentData.consentMethod.toUpperCase() as any,
                ipAddress: consentData.ipAddress || 'unknown',
                userAgent: consentData.userAgent || 'unknown',
            }
        });

        console.log('✅ [LEGAL API] Consent saved to DB:', newConsent.id);

        return NextResponse.json({
            success: true,
            consentId: newConsent.id,
            timestamp: newConsent.acceptedAt.toISOString()
        });

    } catch (error: any) {
        console.error('❌ Error processing consent:', error);

        // Si falla la DB, no detener el flujo del usuario, pero reportar
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
