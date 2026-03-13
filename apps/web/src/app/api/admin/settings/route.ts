import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import fs from 'fs';
import path from 'path';
import { siteConfig } from '@/lib/site-config';

const isAuthorized = async (session: any) => {
    if (!session?.user?.email) return false;
    // Simple check for demo purposes, assume token has role if possible
    return session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN';
};

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        return NextResponse.json({
            platformName: siteConfig.name,
            company: siteConfig.company,
            location: siteConfig.location,
            supportUrl: siteConfig.url,
            maintenanceMessage: '',
            maintenanceMode: false,
            emailAlerts: true,
            pushNotifications: false,
            twoFactorRequired: false,
            publicRegistration: true,
            systemInfo: {
                appVersion: '1.0.0',
                nextVersion: '14.2.0',
                nodeEnv: process.env.NODE_ENV || 'development',
                dbType: 'PostgreSQL (Supabase)'
            }
        });
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const body = await request.json();

        // Define path to site-config.ts
        const configPath = path.join(process.cwd(), 'src', 'lib', 'site-config.ts');

        let fileContent = fs.readFileSync(configPath, 'utf-8');

        // Update variables in string using regex
        if (body.platformName) {
            fileContent = fileContent.replace(/name:\s*['"][^'"]*['"]/, `name: '${body.platformName}'`);
        }
        if (body.company) {
            fileContent = fileContent.replace(/company:\s*['"][^'"]*['"]/, `company: '${body.company}'`);
        }
        if (body.location) {
            fileContent = fileContent.replace(/location:\s*['"][^'"]*['"]/, `location: '${body.location}'`);
        }
        if (body.supportUrl) {
            fileContent = fileContent.replace(/url:\s*(?:process\.env\.NEXT_PUBLIC_APP_URL\s*\|\|\s*)?['"][^'"]*['"]/, `url: process.env.NEXT_PUBLIC_APP_URL || '${body.supportUrl}'`);
        }

        // write changes back
        fs.writeFileSync(configPath, fileContent, 'utf-8');

        return NextResponse.json({ success: true, message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Error al actualizar la configuración' }, { status: 500 });
    }
}
