-- Migration: Add cookie_consents table
-- Date: 2026-01-12
-- Description: Creates table for GDPR-compliant cookie consent tracking

-- Create cookie_consents table
CREATE TABLE IF NOT EXISTS "cookie_consents" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "preferences" TEXT NOT NULL,
    "policyVersion" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cookie_consents_pkey" PRIMARY KEY ("id")
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "cookie_consents_userId_idx" ON "cookie_consents"("userId");
CREATE INDEX IF NOT EXISTS "cookie_consents_acceptedAt_idx" ON "cookie_consents"("acceptedAt");

-- Add comment
COMMENT ON TABLE "cookie_consents" IS 'Stores user cookie consent preferences for GDPR compliance';
