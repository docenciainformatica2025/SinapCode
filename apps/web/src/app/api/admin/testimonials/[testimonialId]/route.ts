
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

const isAuthorized = async (session: any) => {
    if (!session?.user?.email) return false;
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { role: true }
    });
    return user && ['SUPER_ADMIN', 'ADMIN'].includes(user.role);
};

export async function PUT(request: Request, { params }: { params: { testimonialId: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { testimonialId } = params;
        const body = await request.json();
        const { authorName, authorRole, authorImage, content, rating, company, companyLogo, status, featured } = body;

        const updatedTestimonial = await prisma.cmsTestimonial.update({
            where: { id: testimonialId },
            data: {
                authorName,
                authorRole,
                authorImage,
                content,
                rating: parseInt(rating) || 5,
                company,
                companyLogo,
                status,
                featured
            }
        });

        return NextResponse.json(updatedTestimonial);
    } catch (error) {
        console.error('Testimonial PUT Error:', error);
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { testimonialId: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { testimonialId } = params;
        await prisma.cmsTestimonial.delete({
            where: { id: testimonialId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Testimonial DELETE Error:', error);
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
