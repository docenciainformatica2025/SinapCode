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

        // Map to Schema format (snake_case) for compliance/storage
        const complianceRecord = {
            consent_id: crypto.randomUUID(),
            user_id: 'anonymous-uuid', // Would come from session
            document_id: consentData.documentType,
            document_version: consentData.documentVersion,
            acceptance_method: consentData.consentMethod,
            ip_address: consentData.ipAddress,
            user_agent: consentData.userAgent,
            timestamp: consentData.timestamp,
        };

        // Guardar en Base de Datos (Postgres via Prisma)
        const newConsent = await prisma.legalConsent.create({
            data: {
                userId: body.userId || "anonymous", // Mejorar esto cuando tengamos sesión real
                documentType: consentData.documentType.toUpperCase() as any, // Cast to Enum
                documentVersion: consentData.documentVersion,
                consentMethod: consentData.consentMethod.toUpperCase() as any,
                ipAddress: consentData.ipAddress,
                userAgent: consentData.userAgent,
                // metadata: consentData
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
