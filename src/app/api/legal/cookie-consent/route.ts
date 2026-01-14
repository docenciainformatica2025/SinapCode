import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const body = await req.json();

        const { preferences, policyVersion, userAgent, timestamp } = body;

        // Get IP address
        const ipAddress = req.headers.get('x-forwarded-for') ||
            req.headers.get('x-real-ip') ||
            'unknown';

        // Get user ID safely
        const userId = session?.user ? (session.user as { id: string }).id : null;

        // Create consent record
        const consent = await prisma.cookieConsent.create({
            data: {
                userId,
                preferences: JSON.stringify(preferences),
                policyVersion,
                ipAddress,
                userAgent,
                acceptedAt: new Date(timestamp)
            }
        });

        return NextResponse.json({
            success: true,
            consentId: consent.id,
            timestamp: consent.acceptedAt
        });

    } catch (error) {
        console.error('Cookie consent error:', error);
        return NextResponse.json(
            { error: 'Failed to record cookie consent' },
            { status: 500 }
        );
    }
}

// GET - Retrieve user's cookie consent history
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const userId = (session.user as { id: string }).id;

        const consents = await prisma.cookieConsent.findMany({
            where: { userId },
            orderBy: { acceptedAt: 'desc' },
            take: 10
        });

        return NextResponse.json({
            consents: consents.map(c => ({
                id: c.id,
                preferences: JSON.parse(c.preferences as string),
                policyVersion: c.policyVersion,
                acceptedAt: c.acceptedAt
            }))
        });

    } catch (error) {
        console.error('Get cookie consent error:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve cookie consents' },
            { status: 500 }
        );
    }
}
