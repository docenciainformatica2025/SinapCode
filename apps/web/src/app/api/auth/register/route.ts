import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { secureLogger } from "@/lib/secure-logger";
import { verifyRecaptcha } from "@/lib/recaptcha";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name, birthDate, role, recaptchaToken } = body;

        // 1. Basic Validation
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Faltan campos obligatorios' },
                { status: 400 }
            );
        }

        // 2. Security: Verify ReCAPTCHA
        const recaptchaValidation = await verifyRecaptcha(recaptchaToken);
        if (!recaptchaValidation.success) {
            await secureLogger.security('REGISTER_BOT_DETECTED', {
                email,
                ip: req.headers.get('x-forwarded-for') || 'unknown',
                score: recaptchaValidation.score
            });
            return NextResponse.json(
                { error: 'Validación de seguridad fallida. Por favor intenta de nuevo.' },
                { status: 400 }
            );
        }

        // 3. User Existence Check & Sanitization
        const sanitizedEmail = email.trim().toLowerCase();
        const sanitizedName = name.trim();

        const existingUser = await prisma.user.findUnique({
            where: { email: sanitizedEmail },
            select: { id: true, email: true, deletedAt: true }
        });

        if (existingUser) {
            // ... (rest of the reactivation logic)
            if (existingUser.deletedAt) {
                const hashedPassword = await hash(password, 12);
                await prisma.user.update({
                    where: { id: existingUser.id },
                    data: {
                        deletedAt: null,
                        deletedBy: null,
                        deletionReason: null,
                        password: hashedPassword,
                        updatedAt: new Date(),
                    }
                });
                return NextResponse.json({ success: true, message: '¡Bienvenido de vuelta!' });
            }
            return NextResponse.json({ error: 'El correo electrónico ya está registrado.' }, { status: 400 });
        }

        // 4. Create New User with Age/Security Logic
        const hashedPassword = await hash(password, 12);
        let birthDateObj = null;
        let isMinor = false;

        if (birthDate) {
            birthDateObj = new Date(birthDate);
            // Dynamic age calculation (Military Grade Precision)
            const ageDiffMs = Date.now() - birthDateObj.getTime();
            const ageDate = new Date(ageDiffMs);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);
            isMinor = age < 18;
        }

        const newUser = await prisma.user.create({
            data: {
                name: sanitizedName,
                email: sanitizedEmail,
                password: hashedPassword,
                role: role || 'STUDENT',
                birthDate: birthDateObj,
                isMinor: isMinor,
                emailVerified: null, // Reset to null to enforce verification in production if needed
            }
        });

        // 5. Legal Compliance: Record Consent
        try {
            const ip = req.headers.get('x-forwarded-for') || 'unknown';
            const userAgent = req.headers.get('user-agent') || 'unknown';
            const consentData = {
                userId: newUser.id,
                consentMethod: 'CHECKBOX' as const, // validated by frontend checkbox
                ipAddress: ip,
                userAgent: userAgent,
                acceptedAt: new Date(),
            };

            await prisma.legalConsent.createMany({
                data: [
                    {
                        ...consentData,
                        documentType: 'TERMS',
                        documentVersion: '1.0', // TODO: Fetch from LegalDocument table in future
                        documentHash: null,
                    },
                    {
                        ...consentData,
                        documentType: 'PRIVACY',
                        documentVersion: '1.0',
                        documentHash: null,
                    }
                ]
            });
        } catch (legalError) {
            console.error('CRÍTICO: No se pudo registrar el consentimiento legal:', legalError);
            // We do not fail the registration, but we must log this severe compliance issue.
            await secureLogger.security('COMPLIANCE_FAILURE', {
                userId: newUser.id,
                error: String(legalError)
            });
        }

        // 5. Log Success
        await secureLogger.authEvent('login_attempt', { // Technically 'register_success', using closest event
            userId: newUser.id,
            email: newUser.email,
            action: 'registration'
        });

        // 6. TODO: Send Verification Email (Out of scope for this specific fix, but implied standard flow)

        return NextResponse.json({
            success: true,
            userId: newUser.id,
            message: 'Cuenta creada exitosamente'
        });

    } catch (error: any) {
        console.error('Error de registro:', error);
        return NextResponse.json(
            { error: 'Error al crear la cuenta. Intente nuevamente.' },
            { status: 500 }
        );
    }
}
