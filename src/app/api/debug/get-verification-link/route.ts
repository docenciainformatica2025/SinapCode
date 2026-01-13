import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// TEMPORARY DEBUG ENDPOINT
// Get verification link for an email address
// DELETE THIS FILE AFTER EMAIL SENDING IS FIXED

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json(
            { error: 'Email parameter required' },
            { status: 400 }
        );
    }

    try {
        // Get the most recent verification token for this email
        const token = await prisma.verificationToken.findFirst({
            where: { identifier: email },
            orderBy: { expires: 'desc' }
        });

        if (!token) {
            return NextResponse.json(
                { error: 'No verification token found for this email' },
                { status: 404 }
            );
        }

        // Check if token is expired
        const isExpired = new Date() > token.expires;

        const verificationLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token.token}`;

        return NextResponse.json({
            email,
            token: token.token,
            expires: token.expires,
            isExpired,
            verificationLink,
            message: isExpired
                ? 'Token expired. Please register again to get a new token.'
                : 'Use the verification link below to verify your email.'
        });
    } catch (error) {
        console.error('[DEBUG] Error fetching token:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
