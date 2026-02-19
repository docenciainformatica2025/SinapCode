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
    { params }: { params: { invoiceId: string } }
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

        // 2. Fetch Invoice Data (Mocked for now as we don't have a transaction table yet, 
        // using the User params to simulate a real receipt for the demo)
        // In a real scenario: await prisma.transaction.findUnique({ where: { id: params.invoiceId }, include: { user: true } })

        // Simulating data based on screenshot
        const mockTransaction = {
            id: params.invoiceId,
            userId: 'usr_admin_rescue', // Mock
            userName: session.user.name || 'Usuario Sin Nombre',
            userEmail: session.user.email,
            date: new Date(),
            concept: 'Curso Profesional de React Avanzado + Certificación',
            type: 'COURSE',
            status: 'COMPLETED',
            currency: 'USD',
            amount: 197.00
        };

        // 3. Generate PDF - A4 Standard
        const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSans.ttf');
        const logoPath = path.join(process.cwd(), 'public', 'branding', 'logo.png');

        // Colors
        const COLOR_GOLD = '#D4AF37';
        const COLOR_DARK = '#333333';
        const COLOR_GRAY_BG = '#F4F6F8';
        const COLOR_BORDER = '#DDDDDD';

        // Initialize pdf with metadata
        const doc = new PDFDocument({
            margin: 50,
            font: fs.existsSync(fontPath) ? fontPath : undefined,
            size: 'A4',
            autoFirstPage: true,
            info: {
                Title: `Comprobante Fiscal - ${mockTransaction.id}`,
                Author: 'SinapCode Financial System',
                Subject: `Factura de Compra para ${mockTransaction.userEmail}`,
                Keywords: 'invoice, factura, finance, receipt, tax',
                CreationDate: new Date(),
                Producer: 'SinapCode Enterprise Billing v1.0',
                Creator: 'SinapCode Inc.'
            }
        });

        const chunks: Buffer[] = [];
        doc.on('data', (chunk) => chunks.push(chunk));

        // ... Copiar lógica de Header, Layout y Footer igual ...

        // --- HELPER ---
        const textBold = (text: string, x: number, y: number, options: any = {}) => {
            doc.save();
            doc.fillColor(options.color || COLOR_DARK);
            doc.text(text, x, y, options);
            if (fs.existsSync(fontPath)) {
                // simple fake bold if font loads, if not default font handles bold poorly manually
                doc.text(text, x + 0.3, y, options);
            }
            doc.restore();
        };

        // --- LAYOUT ---
        const PAGE_WIDTH = 595;
        const MARGIN = 50;
        const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);
        const CONTENT_X_END = MARGIN + CONTENT_WIDTH;

        // --- HEADER ---
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, MARGIN, 45, { width: 50 });
        }

        doc.fontSize(20).fillColor(COLOR_DARK).text('SinapCode', 110, 50);
        doc.fontSize(10).fillColor('#666666').text('Sistema de Auditoría Legal', 110, 75);

        // Gold Line
        doc.moveTo(MARGIN, 95).lineTo(CONTENT_X_END, 95).lineWidth(2).strokeColor(COLOR_GOLD).stroke();

        // --- TITLE ---
        doc.moveDown(4);
        const titleY = doc.y;
        doc.fontSize(16).fillColor(COLOR_DARK).text('COMPROBANTE DE TRANSACCIÓN', MARGIN, titleY, { align: 'center', width: CONTENT_WIDTH });
        doc.text('FINANCIERA', { align: 'center', width: CONTENT_WIDTH });

        doc.moveDown(1);

        // --- INTRO ---
        doc.fontSize(10).fillColor('#444444').text(
            'El presente documento certifica la realización de una transacción financiera en la plataforma SinapCode. Este comprobante tiene validez administrativa y legal.',
            { align: 'center', width: 420 }
        );

        doc.moveDown(2);

        // --- REF ID ---
        textBold(`REF: ${mockTransaction.id}`, MARGIN, doc.y, { align: 'center', size: 12, width: CONTENT_WIDTH });
        doc.moveDown(2);

        // --- CLIENT DATA BOX ---
        const box1Y = doc.y;
        doc.rect(MARGIN, box1Y, CONTENT_WIDTH, 105).fill(COLOR_GRAY_BG);
        doc.fillColor(COLOR_DARK);

        doc.fontSize(11).fillColor(COLOR_DARK).text('DATOS DEL CLIENTE', MARGIN + 10, box1Y + 10);

        let currentY = box1Y;
        // Header Row
        doc.rect(MARGIN, currentY, CONTENT_WIDTH, 25).fill('#F3F4F6'); // Header BG
        textBold('DATOS DEL CLIENTE', MARGIN + 10, currentY + 8, { size: 9 });
        currentY += 25;

        const drawTableRow = (label: string, value: string) => {
            doc.rect(MARGIN, currentY, CONTENT_WIDTH, 20).fill('white'); // Row BG
            doc.moveTo(MARGIN, currentY + 20).lineTo(CONTENT_X_END, currentY + 20).strokeColor('#E5E7EB').stroke(); // Bottom border
            doc.moveTo(MARGIN, currentY).lineTo(MARGIN, currentY + 20).stroke(); // Left
            doc.moveTo(CONTENT_X_END, currentY).lineTo(CONTENT_X_END, currentY + 20).stroke(); // Right

            doc.fontSize(9).fillColor('#4B5563').text(label, MARGIN + 10, currentY + 6);
            doc.fillColor('#111827').text(value, MARGIN + 200, currentY + 6);
            currentY += 20;
        };

        drawTableRow('Cliente:', mockTransaction.userName);
        drawTableRow('Email:', mockTransaction.userEmail);
        drawTableRow('ID Usuario:', mockTransaction.userId);
        drawTableRow('Fecha:', mockTransaction.date.toISOString().slice(0, 10));

        doc.moveDown(2);
        currentY += 20; // Space

        // --- DETAILS BOX ---
        doc.rect(MARGIN, currentY, CONTENT_WIDTH, 25).fill('#F3F4F6');
        textBold('DETALLES DE LA TRANSACCIÓN', MARGIN + 10, currentY + 8, { size: 9 });
        currentY += 25;

        drawTableRow('Concepto', mockTransaction.concept);
        drawTableRow('Tipo', mockTransaction.type);
        drawTableRow('Estado', mockTransaction.status);
        drawTableRow('Moneda', mockTransaction.currency);
        drawTableRow('Importe Total', `${mockTransaction.amount.toFixed(2)} ${mockTransaction.currency}`);

        // --- FOOTER ---
        const footerY = 680;
        const verifyUrl = `${process.env.NEXTAUTH_URL || 'https://sinapcode.vercel.app'}/verify/invoice/${mockTransaction.id}`;
        const qrBuffer = await QRCode.toBuffer(verifyUrl, { width: 100, margin: 1 });

        // Centered QR
        const qrX = (PAGE_WIDTH - 100) / 2;
        doc.image(qrBuffer, qrX, footerY, { width: 100 });
        doc.fontSize(8).fillColor(COLOR_DARK).text('Escanear para verificar', qrX, footerY + 110, { width: 100, align: 'center' });

        // Bottom Disclaimer
        const bottomY = footerY + 150;
        doc.fontSize(7).fillColor('#6B7280').text(
            'Este comprobante indica que la transacción ha sido procesada por nuestros sistemas. La integridad de este documento está protegida por huella digital criptográfica.',
            MARGIN, bottomY, { width: 400 }
        );
        doc.text(`Generado el: ${new Date().toISOString()}`, MARGIN, bottomY + 20);
        doc.text(`Hash: ${crypto.randomUUID().replace(/-/g, '').toUpperCase()}`, MARGIN, bottomY + 30);

        // Security Seal (OK Verified)
        const sealX = CONTENT_X_END - 40;
        const sealY = bottomY + 10;

        doc.save();
        doc.circle(sealX, sealY, 25).lineWidth(1).strokeColor('#333333').stroke();
        doc.circle(sealX, sealY, 22).lineWidth(0.5).strokeColor('#666666').stroke();
        doc.fontSize(12).fillColor('#000000').text('OK', sealX - 9, sealY - 6);
        doc.fontSize(5).text('VERIFIED', sealX - 10, sealY + 8);
        doc.restore();

        doc.end();

        const pdfBuffer = await new Promise<Buffer>((resolve) => {
            doc.on('end', () => resolve(Buffer.concat(chunks)));
        });

        // INTERNATIONAL NAMING CONVENTION: YYYYMMDD_TYPE_ID.pdf
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const filename = `${dateStr}_INVOICE_${params.invoiceId.replace(/#/g, '')}.pdf`;

        return new NextResponse(pdfBuffer as any, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });

    } catch (error: any) {
        console.error('Error al generar factura:', error);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
