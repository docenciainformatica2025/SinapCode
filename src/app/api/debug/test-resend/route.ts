import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || 'test@example.com';

    const apiKey = 're_ECh6b4DS_Ft8smJZMKuWoZEmDh2pg3Zxq';

    try {
        const resend = new Resend(apiKey);

        const { data, error } = await resend.emails.send({
            from: 'SinapCode <onboarding@resend.dev>',
            to: [email],
            subject: 'Test - SinapCode',
            html: '<h1>Test Email</h1><p>If you see this, Resend works!</p>',
        });

        if (error) {
            return NextResponse.json({ success: false, error }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
