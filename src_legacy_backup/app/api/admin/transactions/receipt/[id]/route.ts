import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import PDFDocument from 'pdfkit';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import QRCode from 'qrcode';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || ((session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN')) {
            return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
        }

        const { id } = params;

        // 1. Fetch Transaction Data
        const transaction = await prisma.transaction.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!transaction) {
            return new NextResponse(JSON.stringify({ error: "Transaction not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        // 2. Prepare Assets (Font & Logo)
        const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSans.ttf');
        const logoPath = path.join(process.cwd(), 'public', 'branding', 'logo.png');

        // Fallback font logic just in case, though NotoSans is preferred
        const fontToUse = fs.existsSync(fontPath) ? fontPath : 'Helvetica';

        // 3. Prepare Digital Signature
        const amountStr = parseFloat(transaction.amount.toString()).toFixed(2);
        const dataToHash = `${transaction.id}|${amountStr}|${transaction.currency}|${transaction.status}|${transaction.createdAt.toISOString()}|SINAPCODE_SECRET`;
        const verificationHash = crypto.createHash('sha256').update(dataToHash).digest('hex').toUpperCase();

        // 3.1 AUDIT: Register Generation in Certificates Table
        const currentYear = new Date().getFullYear();
        const randomSuffix = Math.floor(Math.random() * 0xFFFFF).toString(16).toUpperCase().padStart(5, '0');
        const certCode = `SC-${currentYear}-FIN-${randomSuffix}`;

        try {
            // @ts-ignore: Dynamic model access
            await (prisma as any).certificate.create({
                data: {
                    userId: transaction.userId,
                    type: 'FINANCIAL',
                    code: certCode,
                    status: 'ACTIVE',
                    metadata: {
                        transactionId: transaction.id,
                        amount: amountStr,
                        currency: transaction.currency,
                        verificationHash,
                        generatedBy: (session.user as any)?.email,
                        userAgent: req.headers.get('user-agent'),
                        ip: req.headers.get('x-forwarded-for') || '127.0.0.1'
                    }
                }
            });
        } catch (auditError) {
            // Silently fail audit logging to not block receipt generation
        }

        // 4. Initialize PDF Document (A4 Format)
        const doc = new PDFDocument({
            size: 'A4',
            margin: 40,
            font: fontToUse
        });

        // 5. Stream Handling
        const buffers: Buffer[] = [];
        const bufferPromise = new Promise<Buffer>((resolve, reject) => {
            doc.on('data', chunk => buffers.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.on('error', reject);
        });

        // --- HELPER: Draw Table ---
        const drawTable = (y: number, title: string, rows: string[][], colWidths: number[]) => {
            const tableWidth = 515; // A4 width (595) - margins roughly
            const rowHeight = 20;
            const x = 40;

            // Section Header
            doc.rect(x, y, tableWidth, rowHeight).fill('#f3f3f3').stroke();
            doc.fillColor('#000000').fontSize(10).text(title, x + 5, y + 5, { width: tableWidth, align: 'left' });
            y += rowHeight;

            // Content Rows
            rows.forEach((row, i) => {
                let currentX = x;
                doc.rect(x, y, tableWidth, rowHeight).strokeColor('#e5e5e5').stroke();
                doc.fillColor('#333333').fontSize(9);
                row.forEach((cell, colIndex) => {
                    const width = colWidths[colIndex];
                    doc.text(cell, currentX + 5, y + 5, { width: width - 10, align: 'left', lineBreak: false, ellipsis: true });
                    currentX += width;
                });
                y += rowHeight;
            });
            return y + 10;
        };

        // --- CONTENT DRAWING ---

        // 1. Logo
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 40, 30, { width: 60 });
        }
        doc.moveDown(0.5);

        // 2. Title
        doc.fontSize(16).text('COMPROBANTE DE TRANSACCIÓN', { align: 'center' });
        doc.text('FINANCIERA', { align: 'center' });
        doc.moveDown();

        // 3. Intro
        doc.fontSize(10).text(
            'El presente documento certifica la realización de una transacción financiera en la plataforma SinapCode. Este comprobante tiene validez administrativa y legal.',
            { align: 'center', width: 450 }
        );
        doc.moveDown();

        // 4. Transaction Code
        doc.fontSize(12).text(`REF: ${transaction.id.slice(0, 8).toUpperCase()}`, { align: 'center' });
        doc.moveDown(2);

        // 5. User Data Table
        let currentY = doc.y;
        const userDataRows = [
            ['Cliente:', transaction.user?.name || 'Cliente sin registrar'],
            ['Email:', transaction.user?.email || 'N/A'],
            ['ID Usuario:', transaction.userId || 'N/A'],
            ['Fecha:', transaction.createdAt.toISOString().split('T')[0]]
        ];
        // Table layout: Label(150), Value(365)
        currentY = drawTable(currentY, 'DATOS DEL CLIENTE', userDataRows, [150, 365]);

        // 6. Transaction Details Table
        const txDetailsRows = [
            ['Concepto', transaction.description || 'Producto Digital'],
            ['Tipo', transaction.productType || 'SERVICIO'],
            ['Medio de Pago', transaction.provider || 'N/A'],
            ['Estado', transaction.status],
            ['Moneda', transaction.currency],
            ['Importe Total', `${amountStr} ${transaction.currency}`]
        ];
        currentY = drawTable(currentY, 'DETALLES DE LA TRANSACCIÓN', txDetailsRows, [150, 365]);

        currentY += 20;

        // 7. QR Code (Verification Linking)
        const verifyUrl = `${process.env.NEXTAUTH_URL || 'https://sinapcode.vercel.app'}/admin/transactions?search=${transaction.id}`;
        const qrBuffer = await QRCode.toBuffer(verifyUrl, { width: 100, margin: 1 });

        // Center QR on A4 (595 width) -> (595 - 100) / 2 = 247.5
        const qrY = currentY + 10;
        doc.image(qrBuffer, 247, qrY, { width: 100 });
        doc.fontSize(9).text('Escanear para verificar', 247, qrY + 105, { width: 100, align: 'center' });

        // 8. Footer (Seal & Hash)
        const bottomY = 750; // A4 height is roughly 841, so 750 is good for footer

        // Disclaimer
        doc.fontSize(7).text(
            'Este comprobante indica que la transacción ha sido procesada por nuestros sistemas. La integridad de este documento está protegida por huella digital criptográfica.',
            40, bottomY, { width: 350, align: 'justify' }
        );
        doc.text(`Generado el: ${new Date().toISOString()}`, 40, bottomY + 20);
        doc.text(`Hash: ${verificationHash}`, 40, bottomY + 30, { width: 500, align: 'left' });

        // Seal Graphic (Right Side)
        const sealX = 500;
        const sealY = bottomY + 20;
        doc.save();
        doc.circle(sealX, sealY, 25).lineWidth(1).strokeColor('#333333').stroke();
        doc.circle(sealX, sealY, 23).lineWidth(0.5).strokeColor('#666666').stroke();
        doc.fontSize(14).fillColor('#000000').text('OK', sealX - 10, sealY - 6);
        doc.fontSize(5).text('VERIFIED', sealX - 12, sealY + 8);
        doc.restore();

        doc.end();

        // Finalize Response
        const pdfBuffer = await bufferPromise;

        // Standardized Filename: SINAPCODE_RECEIPT_YYYYMMDD_REF.pdf
        // ISO 8601 Date for sorting + Truncated ID for reference + No PII
        const dateStr = transaction.createdAt.toISOString().split('T')[0].replace(/-/g, '');
        const refStr = transaction.id.slice(0, 8).toUpperCase();
        const filename = `SINAPCODE_RECEIPT_${dateStr}_${refStr}.pdf`;

        return new NextResponse(pdfBuffer as any, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });

    } catch (error: any) {
        console.error('[PDF_FATAL_ERROR]', error);
        return new NextResponse(JSON.stringify({
            error: "Error generating PDF Receipt",
            message: error.message,
            stack: error.stack
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
