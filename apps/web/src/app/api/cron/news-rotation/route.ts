import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { generateAINews } from "@/lib/ai-news-service";
import { generateImage } from "@/lib/ai/image-generator";

// Vercel Cron will call this with a secret header
const CRON_SECRET = process.env.CRON_SECRET;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const TOPIC_VECTORS = [
    "Soberanía Digital y la Nube Soberana en Europa",
    "El impacto de la Computación Cuántica en el cifrado bancario",
    "Interfaces Cerebro-Computadora: Más allá de Neuralink",
    "Sistemas Operativos Autónomos y el fin de la intervención humana",
    "La ética de los Agentes de IA en la toma de decisiones críticas",
    "Simulación de Realidad y el impacto en el diseño de productos",
    "Biohacking y el monitoreo constante de la salud vía SinapCode",
    "Despliegues Edge: Llevando la IA al límite de la red",
];

export async function GET(req: Request) {
    // 1. Validar Autorización de Cron
    const authHeader = req.headers.get('authorization');
    if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        // 2. Elegir un tema aleatorio de alto impacto
        const topic = TOPIC_VECTORS[Math.floor(Math.random() * TOPIC_VECTORS.length)];
        console.log('Cron News Rotator - Iniciando para:', topic);

        // 3. Generar Contenido (Llamada al servicio ya humanizado)
        const newsData = await generateAINews(topic, GOOGLE_API_KEY || '');

        if (!newsData.title || !newsData.content) {
            throw new Error('Fallo en síntesis de contenido para el cron');
        }

        // 4. Generar Imagen Coherente
        let coverImage = 'https://picsum.photos/seed/sinap/1280/720';
        try {
            const genImage = await generateImage({
                prompt: newsData.visual_prompt || topic,
                aspectRatio: '16:9',
                style: 'cyberpunk'
            });
            coverImage = genImage.url;
        } catch (imgError) {
            console.error('Cron News Rotator - Error de imagen:', imgError);
        }

        // 5. Persistencia
        const baseSlug = newsData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 5)}`;

        const [post] = await prisma.$transaction([
            prisma.cmsPost.create({
                data: {
                    title: newsData.title,
                    excerpt: newsData.excerpt || '',
                    content: newsData.content,
                    category: newsData.category || 'Innovación',
                    tags: Array.isArray(newsData.tags) ? newsData.tags : [],
                    slug: slug,
                    coverImage: coverImage,
                    status: 'PUBLISHED',
                    featured: true,
                    publishedAt: new Date(),
                }
            }),
            // Desactivar banners anteriores del mismo tipo y crear el nuevo
            prisma.cmsBanner.updateMany({
                where: { position: 'HOME_HERO', isActive: true },
                data: { isActive: false }
            }),
            prisma.cmsBanner.create({
                data: {
                    title: newsData.title,
                    description: newsData.excerpt || '',
                    imageUrl: coverImage,
                    linkUrl: `/blog/${slug}`,
                    position: 'HOME_HERO',
                    isActive: true,
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Rotación de 3 días
                }
            })
        ]);

        console.log('Cron News Rotator - Transmisión completada exitosamente:', slug);
        return NextResponse.json({ success: true, slug: post.slug });

    } catch (error: any) {
        console.error('Cron News Rotator - Falla crítica:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
