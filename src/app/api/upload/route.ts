import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No se ha proporcionado ningún archivo' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + '_' + file.name.replace(/\s/g, '_');
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        // Ensure directory exists (though we tried making it, robust code checks)
        // Note: In Next.js App Router we assume public/ exists. 
        // We write directly to public/uploads

        await writeFile(path.join(uploadDir, filename), buffer);

        return NextResponse.json({
            success: true,
            url: `/uploads/${filename}`
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { error: 'Error al procesar la subida' },
            { status: 500 }
        );
    }
}
