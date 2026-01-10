import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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

        // Aquí conectaríamos con la base de datos (Firestore/Postgres)
        console.log('📝 [LEGAL API] Consent recorded (Schema Compliant):', {
            ...complianceRecord,
            serverReceivedAt: new Date().toISOString()
        });

        return NextResponse.json({
            success: true,
            consentId: crypto.randomUUID(),
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error processing consent:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
