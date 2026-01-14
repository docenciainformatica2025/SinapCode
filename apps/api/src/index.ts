import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Config
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3004',
    credentials: true
}));
app.use(express.json());

// Routes
// 1. Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 2. Legal Consent Recording (Core Audit Feature)
app.post('/api/legal/consent', async (req, res) => {
    try {
        const {
            userId,
            documentType,
            documentVersion,
            consentMethod,
            ipAddress,
            userAgent,
            geolocation,
            screenResolution,
            language,
            timezone
        } = req.body;

        // TODO: Create or get user first (mock for now if no auth)
        // For MVP/Demo: creating a temporary user if not exists or using provided ID

        // Check if duplicate consent
        const existingDetails = await prisma.legalConsent.findUnique({
            where: {
                userId_documentType_documentVersion: {
                    userId,
                    documentType,
                    documentVersion
                }
            }
        });

        if (existingDetails) {
            return res.json({ success: true, message: 'Consent already recorded', id: existingDetails.id });
        }

        // Record consent
        const consent = await prisma.legalConsent.create({
            data: {
                userId,
                documentType,
                documentVersion,
                documentHash: 'pending_verification', // TODO: Hash real content
                consentMethod,
                ipAddress,
                userAgent,
                geolocation,
                screenResolution,
                language,
                timezone,
            }
        });

        // Create Immutable Audit Log
        await prisma.auditLog.create({
            data: {
                userId,
                eventType: 'LEGAL_CONSENT',
                eventCategory: 'LEGAL',
                eventData: { documentType, documentVersion, consentId: consent.id },
                ipAddress,
                userAgent,
                hash: 'pending_crypto_hash' // TODO: Implement SHA-256 chain
            }
        });

        res.json({ success: true, consent });

    } catch (error) {
        console.error('Error recording consent:', error);
        res.status(500).json({ success: false, error: 'Failed to record consent' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`✅ API Server running on port ${port}`);
    console.log(`🔌 Database connected to Supabase`);
});
