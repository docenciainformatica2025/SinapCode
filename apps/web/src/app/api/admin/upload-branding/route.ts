import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Allowed MIME types for image uploads
const ALLOWED_MIME_TYPES = new Set([
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/svg+xml',
]);

// Allowed branding types (whitelist)
const ALLOWED_TYPES = new Set(['logo', 'banner', 'favicon']);

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
    try {
        // 🔒 AUTH CHECK: Only ADMIN / SUPER_ADMIN can upload branding
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const userRole = (session.user as any).role;
        if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'Acceso denegado. Se requiere rol de administrador.' }, { status: 403 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const type = formData.get('type') as string;

        // 🔒 VALIDATE: type must be from whitelist
        if (!type || !ALLOWED_TYPES.has(type)) {
            return NextResponse.json({ error: 'Tipo de archivo no válido' }, { status: 400 });
        }

        if (!file) {
            return NextResponse.json({ error: 'No se proporcionó archivo' }, { status: 400 });
        }

        // 🔒 VALIDATE: File size limit
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: 'El archivo excede el límite de 5MB' }, { status: 400 });
        }

        // 🔒 VALIDATE: MIME type whitelist
        if (!ALLOWED_MIME_TYPES.has(file.type)) {
            return NextResponse.json(
                { error: `Tipo de archivo no permitido: ${file.type}. Solo se aceptan PNG, JPG, WebP y SVG.` },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 🔒 VALIDATE: Check magic bytes to prevent MIME spoofing
        if (!isValidImageBuffer(buffer)) {
            return NextResponse.json({ error: 'El archivo no es una imagen válida' }, { status: 400 });
        }

        // 🔒 SAFE PATHS: Use hardcoded paths only — no user input in file paths
        const publicDir = path.join(process.cwd(), 'public');
        const brandingDir = path.join(publicDir, 'branding');
        await mkdir(brandingDir, { recursive: true });

        if (type === 'favicon') {
            await writeFile(path.join(publicDir, 'favicon.png'), buffer);
            await writeFile(path.join(publicDir, 'apple-touch-icon.png'), buffer);
            return NextResponse.json({
                success: true,
                message: 'Favicon actualizado exitosamente',
                path: '/favicon.png'
            });
        }

        // Logo or Banner — filenames are hardcoded, never from user input
        const filename = type === 'banner' ? 'hero-banner.png' : 'Logo.png';
        await writeFile(path.join(brandingDir, filename), buffer);

        return NextResponse.json({
            success: true,
            message: `${type === 'banner' ? 'Banner' : 'Logo'} actualizado exitosamente`,
            path: `/branding/${filename}`
        });
    } catch (error) {
        console.error('Upload branding error:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

/**
 * Validates image buffer by checking magic bytes.
 * Prevents MIME type spoofing attacks.
 */
function isValidImageBuffer(buffer: Buffer): boolean {
    if (buffer.length < 4) return false;

    // PNG: 89 50 4E 47
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) return true;

    // JPEG: FF D8 FF
    if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) return true;

    // WebP: 52 49 46 46 ... 57 45 42 50
    if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
        buffer.length > 11 && buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) return true;

    // SVG: starts with < (text-based)
    const head = buffer.subarray(0, 256).toString('utf-8').trim();
    if (head.startsWith('<?xml') || head.startsWith('<svg')) return true;

    return false;
}
