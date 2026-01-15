import { NextResponse } from 'next/server';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import PDFDocument from 'pdfkit';

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        // 1. Auth & Permissions
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { role: true }
        });

        const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR']; // Moderators might need to verify users
        if (!currentUser || !allowedRoles.includes(currentUser.role)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        // 2. Fetch User & Consents
        const targetUser = await prisma.user.findUnique({
            where: { id: params.userId },
            include: {
                legalConsents: {
                    orderBy: { acceptedAt: 'desc' }
                }
            }
        });

        if (!targetUser) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // 3. Generate PDF
        const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSans.ttf');

        // Initialize with explicit default font to avoid Helvetica loading attempt
        const doc = new PDFDocument({
            margin: 50,
            font: fontPath // Set the file path directly as the default font
        });

        const chunks: Buffer[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));

        // -- Document Header --
        doc.fontSize(20).text('CERTIFICADO DE ACEPTACIÓN LEGAL', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text('Este documento certifica la aceptación de términos y condiciones y políticas de privacidad por parte del usuario.', { align: 'center' });
        doc.moveDown(2);

        // -- User Details --
        doc.fillColor('black').fontSize(14).text('Datos del Usuario');
        doc.fontSize(10).text(`ID de Usuario: ${targetUser.id}`);
        doc.text(`Nombre: ${targetUser.name || 'N/A'}`);
        doc.text(`Email: ${targetUser.email}`);
        doc.text(`Fecha de Registro: ${targetUser.createdAt.toISOString()}`);
        doc.moveDown(2);

        // -- Consent Log --
        doc.fontSize(14).text('Historial de Aceptación (Evidencia Forense)');
        doc.moveDown();

        // Table Header
        const tableTop = doc.y;
        doc.fontSize(9);
        doc.text('Documento', 50, tableTop);
        doc.text('Versión', 150, tableTop);
        doc.text('Fecha (UTC)', 220, tableTop);
        doc.text('IP Origen', 350, tableTop);
        doc.text('Método', 450, tableTop);

        doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

        // Table Rows
        let yPosition = tableTop + 25;

        if (targetUser.legalConsents.length === 0) {
            doc.text('No se encontraron registros de consentimiento.', 50, yPosition);
        }

        targetUser.legalConsents.forEach((consent) => {
            if (yPosition > 700) { // Add page if near bottom
                doc.addPage();
                yPosition = 50;
            }

            doc.text(consent.documentType, 50, yPosition);
            doc.text(consent.documentVersion, 150, yPosition);
            doc.text(consent.acceptedAt.toISOString(), 220, yPosition);
            doc.text(consent.ipAddress || 'Unknown', 350, yPosition);
            doc.text(consent.consentMethod, 450, yPosition);

            yPosition += 20;
        });

        // -- Footer / Signature --
        doc.moveDown(4);
        doc.fillColor('gray').fontSize(8).text(`Certificado generado el: ${new Date().toISOString()}`, { align: 'center' });
        doc.fillColor('black').text('SinapCode - Sistema de Auditoría Legal', { align: 'center' });

        doc.end();

        // 4. Return Stream response
        const pdfBuffer = await new Promise<Buffer>((resolve) => {
            doc.on('end', () => resolve(Buffer.concat(chunks)));
        });

        return new NextResponse(pdfBuffer as any, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="legal_cert_${targetUser.email}.pdf"`,
            },
        });

    } catch (error: any) {
        console.error('Error generating legal certificate:', error);
        return NextResponse.json({
            error: 'Error interno al generar certificado',
            details: error.message,
            stack: error.stack,
            debug_info: 'Check server logs for PDFKit issues'
        }, { status: 500 });
    }
}
