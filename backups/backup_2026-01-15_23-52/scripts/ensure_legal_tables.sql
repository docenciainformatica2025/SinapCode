-- Create Enum for Document Type if not exists
DO $$ BEGIN
    CREATE TYPE "DocumentType" AS ENUM ('TERMS', 'PRIVACY', 'COOKIES', 'COPPA');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create Enum for Consent Method if not exists
DO $$ BEGIN
    CREATE TYPE "ConsentMethod" AS ENUM ('CHECKBOX', 'BUTTON_CLICK', 'SCROLL_COMPLETE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create LegalConsent table if not exists
CREATE TABLE IF NOT EXISTS "legal_consents" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "documentVersion" TEXT NOT NULL,
    "documentHash" TEXT,
    "consentMethod" "ConsentMethod" NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "geolocation" JSONB,
    "screenResolution" TEXT,
    "language" TEXT,
    "timezone" TEXT,
    "metadata" JSONB,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "legal_consents_pkey" PRIMARY KEY ("id")
);

-- Add Foreign Key
DO $$ BEGIN
    ALTER TABLE "legal_consents" ADD CONSTRAINT "legal_consents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create Indexes for performance
CREATE UNIQUE INDEX IF NOT EXISTS "legal_consents_userId_documentType_documentVersion_key" ON "legal_consents"("userId", "documentType", "documentVersion");
CREATE INDEX IF NOT EXISTS "legal_consents_userId_idx" ON "legal_consents"("userId");
CREATE INDEX IF NOT EXISTS "legal_consents_documentType_idx" ON "legal_consents"("documentType");
CREATE INDEX IF NOT EXISTS "legal_consents_acceptedAt_idx" ON "legal_consents"("acceptedAt");

-- Grant permissions (Adjust 'authenticated' or 'service_role' as needed)
GRANT ALL ON TABLE "legal_consents" TO postgres;
GRANT ALL ON TABLE "legal_consents" TO service_role;
