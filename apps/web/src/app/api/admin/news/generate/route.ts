import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { generateAINews } from "@/lib/ai-news-service";
import { generateImage } from "@/lib/ai/image-generator";

const apiKey = process.env.GOOGLE_API_KEY;

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'ADMIN' && (session.user as any).role !== 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const { topic } = await req.json();
        console.log('Nexus News Gen - Iniciando para tema:', topic);

        // 1. Generar Contenido con la Utilidad
        const newsData = await generateAINews(topic, apiKey || '');
        console.log('Nexus News Gen - Contenido generado:', newsData.title);

        if (!newsData.title || !newsData.content) {
            throw new Error('Contenido incompleto generado por la IA');
        }

        // 2. Generar Imagen con Imagen 3
        let coverImage = 'https://picsum.photos/seed/sinap/1280/720';

        try {
            console.log('Nexus News Gen - Proyectando imagen...');
            const genImage = await generateImage({
                prompt: newsData.nanobanana_visual_prompt || topic,
                aspectRatio: '16:9',
                style: 'cyberpunk'
            });
            coverImage = genImage.url;
            console.log('Nexus News Gen - Imagen proyectada exitosamente');
        } catch (imgError) {
            console.error('Nexus News Gen - Error proyectando imagen:', imgError);
        }

        // 3. Persistencia en Base de Datos Real
        const baseSlug = newsData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;

        console.log('Nexus News Gen - Persistiendo en Base de Datos:', slug);

        const post = await prisma.cmsPost.create({
            data: {
                title: newsData.title,
                excerpt: newsData.excerpt || '',
                content: newsData.content,
                category: newsData.category || 'IA',
                tags: Array.isArray(newsData.tags) ? newsData.tags : [],
                slug: slug,
                coverImage: coverImage,
                status: 'PUBLISHED',
                featured: true,
                publishedAt: new Date(),
            }
        });

        // 4. Inyección en el Banner de Inicio
        await prisma.cmsBanner.create({
            data: {
                title: newsData.title,
                description: newsData.excerpt || '',
                imageUrl: coverImage,
                linkUrl: `/blog/${slug}`,
                position: 'HOME_HERO',
                isActive: true,
                startDate: new Date(),
                endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Vence en 3 días
            }
        });

        console.log('Nexus News Gen - Transmisión finalizada con éxito');
        return NextResponse.json({ success: true, post });

    } catch (error: any) {
        console.error('CRITICAL: Error en generación automática:', error);
        return NextResponse.json({
            error: 'Fallo en la generación de noticias',
            details: error.message || 'Error desconocido'
        }, { status: 500 });
    }
}
