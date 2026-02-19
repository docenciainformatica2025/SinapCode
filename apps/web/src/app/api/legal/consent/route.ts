import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { secureLogger } from "@/lib/secure-logger";
import { headers } from 'next/headers';

// POST - Registrar consentimiento legal
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const headersList = headers();

        // El body puede venir de un usuario autenticado o durante el registro (sin sesión aún)
        const body = await request.json();
        const { documentType, documentVersion, consentMethod, metadata, userId } = body;

        // Si hay sesión, usamos el ID de la sesión. Si no, esperamos el userId del body (flujo registro)
        const effectiveUserId = (session?.user as any)?.id || userId;

        // WORLD CLASS LOGIC: Si es para cookies y no hay usuario, usamos el modelo CookieConsent (que permite anonimato)
        if (documentType === 'COOKIES' && !effectiveUserId) {
            const consent = await prisma.cookieConsent.create({
                data: {
                    userId: null,
                    preferences: JSON.stringify(metadata?.preferences || { essential: true }),
                    policyVersion: documentVersion,
                    ipAddress: headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '0.0.0.0',
                    userAgent: headersList.get('user-agent') || 'anonymous',
                    acceptedAt: new Date()
                }
            });

            return NextResponse.json({ success: true, id: consent.id, anonymous: true });
        }

        if (!effectiveUserId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        if (!documentType || !documentVersion || !consentMethod) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Crear registro de consentimiento formal (requiere usuario)
        const consent = await prisma.legalConsent.create({
            data: {
                userId: effectiveUserId,
                documentType,
                documentVersion,
                consentMethod,
                ipAddress: headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || undefined,
                userAgent: headersList.get('user-agent') || undefined,
                metadata,
                acceptedAt: new Date()
            }
        });

        // Audit Log
        await secureLogger.info(`LEGAL_CONSENT_ACCEPTED: ${documentType} v${documentVersion}`, {
            userId: effectiveUserId,
            documentType,
            version: documentVersion
        });

        return NextResponse.json({ success: true, id: consent.id });

    } catch (error: any) {
        // WORLD CLASS FIX: Allow DynamicServerError to bubble up. 
        if (error.digest === 'DYNAMIC_SERVER_USAGE') {
            throw error;
        }

        console.error('Error al registrar consentimiento:', error);

        // Manejar duplicados (usuario ya aceptó)
        if (error.code === 'P2002') {
            return NextResponse.json({ success: true, message: 'Already accepted' });
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
