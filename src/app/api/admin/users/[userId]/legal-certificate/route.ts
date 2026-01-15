import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import QRCode from 'qrcode';
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

        // 3. Generate Certificate Record (Audit Trail)
        const currentYear = new Date().getFullYear();
        // Generate a secure random suffix (5 chars hex)
        const randomSuffix = Math.floor(Math.random() * 0xFFFFF).toString(16).toUpperCase().padStart(5, '0');
        const certCode = `SC-${currentYear}-LEG-${randomSuffix}`;

        // Create Persistent Record
        await prisma.certificate.create({
            data: {
                userId: targetUser.id,
                type: 'LEGAL',
                code: certCode,
                metadata: {
                    userAgent: request.headers.get('user-agent') || 'Unknown',
                    ip: request.headers.get('x-forwarded-for') || 'Unknown',
                    generatedAt: new Date().toISOString()
                }
            }
        });

        // 4. Generate PDF
        const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSans.ttf');
        const logoPath = path.join(process.cwd(), 'public', 'branding', 'logo.png');

        // Initialize with explicit default font
        const doc = new PDFDocument({
            margin: 40,
            font: fontPath,
            size: 'LETTER'
        });

        const chunks: Buffer[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));

        // --- HELPER FUNCTIONS ---
        const drawTable = (y: number, title: string, rows: string[][], colWidths: number[]) => {
            const tableWidth = 530; // 612 - 40 - 40 roughly
            const rowHeight = 20;
            const x = 40;

            // Section Header
            doc.rect(x, y, tableWidth, rowHeight).fill('#f3f3f3').stroke();
            doc.fillColor('#000000').fontSize(10).text(title, x + 5, y + 5, { width: tableWidth, align: 'left' });

            y += rowHeight;

            // Content Rows
            rows.forEach((row, i) => {
                let currentX = x;

                // Border only
                doc.rect(x, y, tableWidth, rowHeight).strokeColor('#e5e5e5').stroke();

                doc.fillColor('#333333').fontSize(9);

                row.forEach((cell, colIndex) => {
                    const width = colWidths[colIndex];
                    // Vertical borders could be added here if strict grid needed
                    doc.text(cell, currentX + 5, y + 5, { width: width - 10, align: 'left', lineBreak: false, ellipsis: true });
                    currentX += width;
                });

                y += rowHeight;
            });

            return y + 10; // Return new Y position with padding
        };

        // --- CONTENT GENERATION ---

        // 1. Logo
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 40, 30, { width: 60 }); // Small, top-left (slightly above margin)
        }

        // Ensure title starts at a good position (aligned with logo or slightly below)
        // Since logo is absolute, we just ensure normal flow starts well.
        doc.moveDown(0.5);

        // 2. Title
        doc.fontSize(16).text('CERTIFICADO DE ACEPTACIÓN Y', { align: 'center' });
        doc.text('AUDITORÍA LEGAL', { align: 'center' });
        doc.moveDown();

        // 3. Intro
        doc.fontSize(10).text(
            'El presente documento certifica de manera fehaciente la aceptación de los Términos y Condiciones y la Política de Privacidad, constituyendo evidencia legal conforme a las normativas aplicables.',
            { align: 'center', width: 450 }
        );
        doc.moveDown();

        // 4. Certificate ID
        doc.fontSize(12).text(`ID CERTIFICADO: ${certCode}`, { align: 'center' });
        doc.moveDown(2);

        // 5. User Data Table
        let currentY = doc.y;
        const userDataRows = [
            ['ID de Usuario:', targetUser.id],
            ['Nombre:', targetUser.name || 'N/A'],
            ['Email:', targetUser.email],
            ['Fecha de Registro:', targetUser.createdAt.toISOString()]
        ];
        // Col widths: label 30%, value 70% of 530
        currentY = drawTable(currentY, 'DATOS DEL USUARIO', userDataRows, [150, 380]);

        // 6. Evidence Table
        // Draw Header Row for Evidence
        const evidenceHeaders = ['Documento', 'Versión', 'Fecha (UTC)', 'IP Origen', 'Método'];
        const evColWidths = [100, 60, 120, 100, 150];

        doc.rect(40, currentY, 530, 20).fill('#f3f3f3').stroke();
        doc.fillColor('#000000').fontSize(9).text('EVIDENCIA FORENSE DE ACEPTACIÓN', 45, currentY + 5);
        currentY += 20;

        // Sub-headers
        doc.rect(40, currentY, 530, 20).fill('#e5e5e5').stroke();
        let hX = 40;
        evidenceHeaders.forEach((h, i) => {
            doc.fillColor('#000000').fontSize(8).text(h, hX + 5, currentY + 5, { width: evColWidths[i] });
            hX += evColWidths[i];
        });
        currentY += 20;

        // Rows
        if (targetUser.legalConsents.length === 0) {
            doc.fontSize(9).text('No se encontraron registros de consentimiento.', 45, currentY + 5);
            currentY += 20;
        } else {
            targetUser.legalConsents.forEach((consent) => {
                if (currentY > 700) { doc.addPage(); currentY = 50; }

                doc.rect(40, currentY, 530, 20).stroke(); // Row border

                let rX = 40;
                const rowData = [
                    consent.documentType,
                    consent.documentVersion,
                    consent.acceptedAt.toISOString(),
                    consent.ipAddress || 'Unknown',
                    consent.consentMethod
                ];

                rowData.forEach((d, i) => {
                    doc.text(d, rX + 5, currentY + 5, { width: evColWidths[i] - 10, ellipsis: true });
                    rX += evColWidths[i];
                });

                currentY += 20;
            });
        }

        currentY += 30; // Space before QR

        // 7. QR Code
        // Use User ID for verification URL to ensure the /verify/[id] page finds the record
        const verifyUrl = `${process.env.NEXTAUTH_URL || 'https://sinapcode.vercel.app'}/verify/${targetUser.id}`;
        const qrBuffer = await QRCode.toBuffer(verifyUrl, { width: 100, margin: 1 });

        // Center QR (Page width 612) -> (612 - 100) / 2 = 256
        const qrY = currentY + 10;
        doc.image(qrBuffer, 256, qrY, { width: 100 });
        doc.fontSize(9).text('Verificación Digital', 256, qrY + 105, { width: 100, align: 'center' });

        // 8. Footer (Bottom of page)
        const bottomY = 700;

        // Disclaimer (Left side, width 350)
        doc.fontSize(7).text(
            'Este certificado es generado electrónicamente y posee validez legal. El SinapCode garantiza que esta aceptación constituye evidencia legal conforme a las normativas aplicables.',
            40, bottomY, { width: 350, align: 'justify' }
        );
        doc.text(`Generado el: ${new Date().toISOString()}`, 40, bottomY + 20);
        doc.text('Todos los derechos reservados © SinapCode', 40, bottomY + 30);

        // Seal (Right side) - Mimicking the seal in the image
        const sealX = 500;
        const sealY = bottomY + 20;

        doc.save();
        doc.circle(sealX, sealY, 25).lineWidth(1).strokeColor('#333333').stroke();
        doc.circle(sealX, sealY, 23).lineWidth(0.5).strokeColor('#666666').stroke();
        doc.fontSize(14).fillColor('#000000').text('SC', sealX - 10, sealY - 6);
        doc.fontSize(5).text('VALIDATED', sealX - 12, sealY + 8);
        doc.restore();

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
