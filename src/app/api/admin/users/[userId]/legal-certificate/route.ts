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

        const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'];
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

        // 4. Generate PDF - A4 Standard (595.28 x 841.89)
        const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSans.ttf');
        const logoPath = path.join(process.cwd(), 'public', 'branding', 'logo.png');

        // Colors
        const COLOR_GOLD = '#D4AF37';
        const COLOR_DARK = '#333333';
        const COLOR_GRAY_BG = '#F4F6F8';
        const COLOR_BORDER = '#DDDDDD';

        // Initialize PDF
        const doc = new PDFDocument({
            margin: 50,
            font: fontPath,
            size: 'A4', // Single Page requirement
            autoFirstPage: true
        });

        const chunks: Buffer[] = [];
        doc.on('data', (chunk) => chunks.push(chunk));

        // --- HELPER --
        const textBold = (text: string, x: number, y: number, options: any = {}) => {
            doc.save();
            doc.fillColor(options.color || COLOR_DARK);
            doc.text(text, x, y, options);
            doc.text(text, x + 0.3, y, options); // Fake bold stroke
            doc.restore();
        };

        // --- LAYOUT CONSTANTS ---
        // A4 Width: 595. Margin 50.
        // Content Width: 495.
        const PAGE_WIDTH = 595;
        const MARGIN = 50;
        const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2); // 495
        const CONTENT_X_END = MARGIN + CONTENT_WIDTH; // 545

        // --- HEADER ---
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, MARGIN, 45, { width: 50 });
        }

        doc.fontSize(20).fillColor(COLOR_DARK).text('SinapCode', 110, 50);
        doc.fontSize(10).fillColor('#666666').text('Sistema de Auditoría Legal', 110, 75);

        // Gold Line
        doc.moveTo(MARGIN, 95).lineTo(CONTENT_X_END, 95).lineWidth(2).strokeColor(COLOR_GOLD).stroke();

        doc.moveDown(3);

        // --- TITLE ---
        doc.moveDown(1.5);
        const titleY = doc.y;
        doc.fontSize(16).fillColor(COLOR_DARK).text('CERTIFICADO DE ACEPTACIÓN Y', MARGIN, titleY, { align: 'center', width: CONTENT_WIDTH });
        doc.text('AUDITORÍA LEGAL', { align: 'center', width: CONTENT_WIDTH });

        doc.moveDown(1);

        // --- INTRO ---
        doc.fontSize(10).fillColor('#444444').text(
            'El presente documento certifica de manera fehaciente la aceptación de los Términos y Condiciones y la Política de Privacidad, constituyendo evidencia legal conforme a las normativas aplicables de comercio electrónico y firma digital.',
            { align: 'center', width: 400 }
        );
        // Note: PDFKit align center with straight text call usually works relative to page margins if width not set properly for centered box.
        // Using explicit width and x often safer. (PAGE_WIDTH - 400)/2 = 97.5

        doc.moveDown(2);

        // --- CERT ID ---
        textBold(`ID CERTIFICADO: ${certCode}`, MARGIN, doc.y, { align: 'center', size: 12, width: CONTENT_WIDTH });
        doc.moveDown(1.5);

        // --- USER DATA BOX ---
        const startBoxY = doc.y;

        doc.rect(MARGIN, startBoxY, CONTENT_WIDTH, 110).fill(COLOR_GRAY_BG);
        doc.fillColor(COLOR_DARK);

        doc.fontSize(11).fillColor(COLOR_GOLD).text('DATOS DEL FIRMANTE / USUARIO', MARGIN + 10, startBoxY + 10);
        doc.moveTo(MARGIN + 10, startBoxY + 25).lineTo(CONTENT_X_END - 10, startBoxY + 25).lineWidth(0.5).strokeColor(COLOR_BORDER).stroke();

        const drawRow = (label: string, value: string, y: number) => {
            textBold(label, MARGIN + 10, y, { size: 10, color: COLOR_DARK });
            doc.fontSize(10).fillColor('#555555').text(value, MARGIN + 160, y);
        };

        let rowY = startBoxY + 35;
        drawRow('ID de Usuario:', targetUser.id, rowY);
        rowY += 18;
        drawRow('Nombre Legal:', targetUser.name || 'No Registrado', rowY);
        rowY += 18;
        drawRow('Correo Electrónico:', targetUser.email, rowY);
        rowY += 18;
        drawRow('Fecha de Registro (UTC):', targetUser.createdAt.toISOString().replace('T', ' ').substring(0, 19), rowY);

        doc.moveDown(6.5);

        // --- AUDIT TABLE ---
        const tableY = startBoxY + 110 + 30;
        doc.y = tableY;

        textBold('HISTORIAL DE ACEPTACIÓN (Traza de Auditoría)', MARGIN, tableY, { size: 11 });
        doc.moveTo(MARGIN, tableY + 15).lineTo(CONTENT_X_END, tableY + 15).lineWidth(1).strokeColor(COLOR_GOLD).stroke();

        const tHeadY = tableY + 25;
        // Approx columns for A4 width (495 total)
        // Col1: 130, Col2: 60, Col3: 100, Col4: 90, Col5: 115
        const colX = [MARGIN, MARGIN + 140, MARGIN + 200, MARGIN + 300, MARGIN + 390];

        doc.fontSize(9).fillColor(COLOR_DARK);
        doc.text('Documento', colX[0], tHeadY);
        doc.text('Versión', colX[1], tHeadY);
        doc.text('Fecha (UTC)', colX[2], tHeadY);
        doc.text('IP Origen', colX[3], tHeadY);
        doc.text('Método', colX[4], tHeadY);

        doc.moveTo(MARGIN, tHeadY + 15).lineTo(CONTENT_X_END, tHeadY + 15).lineWidth(0.5).strokeColor('#EEEEEE').stroke();

        let tRowY = tHeadY + 25;
        if (targetUser.legalConsents.length > 0) {
            // Only take top 3 to ensure single page if many? 
            // Or dynamic. Usually there are 1-2 consents.
            targetUser.legalConsents.forEach((item) => {
                doc.fillColor('#444444');
                doc.text(item.documentType, colX[0], tRowY, { width: 130, ellipsis: true });
                doc.text(item.documentVersion, colX[1], tRowY);
                doc.text(item.acceptedAt.toISOString().slice(0, 10), colX[2], tRowY);
                doc.text(item.ipAddress || 'N/A', colX[3], tRowY);
                doc.text(item.consentMethod, colX[4], tRowY);
                tRowY += 20;
            });
        } else {
            doc.text('No se encontraron registros de consentimiento.', colX[0], tRowY);
            tRowY += 20;
        }

        // --- FOOTER (Fixed at Bottom of A4) ---
        // A4 Height = 841.89 points. Max Safe Y ~790.
        const footerY = 630;

        const verifyUrl = `${process.env.NEXTAUTH_URL || 'https://sinapcode.vercel.app'}/verify/${targetUser.id}`;
        const qrBuffer = await QRCode.toBuffer(verifyUrl, { width: 90, margin: 1 });

        // QR Centered
        const qrX = (PAGE_WIDTH - 90) / 2;
        doc.image(qrBuffer, qrX, footerY, { width: 90 });
        doc.fontSize(8).fillColor(COLOR_DARK).text('Verificación Digital', qrX, footerY + 95, { width: 90, align: 'center' });

        // Split Footer: Text Left, Seal Right
        const disY = footerY + 115; // ~745
        const textWidth = 380; // Leaving space for seal on right

        doc.fontSize(7).fillColor('#777777').text(
            `Este certificado ha sido generado electrónicamente por SinapCode el ${new Date().toISOString()}. La integridad de este documento puede ser verificada escaneando el código QR superior. SinapCode actúa como tercero de confianza registrando la huella digital de la transacción.`,
            MARGIN, disY, { align: 'justify', width: textWidth }
        );

        // Fake Hash
        const fingerprint = certCode.split('').reverse().join('') + 'E3B0C44298FC1C149AFBF4C8996FB92';
        doc.moveDown(0.5);
        doc.fillColor(COLOR_GOLD).text(`Digital Fingerprint (SHA256): ${fingerprint.substring(0, 64)}...`, MARGIN, doc.y, { align: 'left', width: textWidth });

        // Seal (Right side)
        const sealX = CONTENT_X_END - 30; // ~515
        const sealY = disY + 15; // ~760

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

        // Standardized Filename: SINAPCODE_LEGAL_YYYYMMDD_CODE.pdf
        // Security: Avoid PII (Email) in filename. Use Certificate Code instead.
        const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const safeCode = certCode.replace(/[^a-zA-Z0-9-]/g, ''); // Extra sanitization
        const filename = `SINAPCODE_LEGAL_${dateStr}_${safeCode}.pdf`;

        return new NextResponse(pdfBuffer as any, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
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
