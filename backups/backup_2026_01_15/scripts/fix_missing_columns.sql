-- Fix missing columns in legal_consents table
-- This handles the error: "The column `legal_consents.screenResolution` does not exist"

DO $$
BEGIN
    -- Add screenResolution if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'legal_consents' AND column_name = 'screenResolution') THEN
        ALTER TABLE "legal_consents" ADD COLUMN "screenResolution" TEXT;
    END IF;

    -- Add geolocation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'legal_consents' AND column_name = 'geolocation') THEN
        ALTER TABLE "legal_consents" ADD COLUMN "geolocation" JSONB;
    END IF;

    -- Add language if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'legal_consents' AND column_name = 'language') THEN
        ALTER TABLE "legal_consents" ADD COLUMN "language" TEXT;
    END IF;

    -- Add timezone if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'legal_consents' AND column_name = 'timezone') THEN
        ALTER TABLE "legal_consents" ADD COLUMN "timezone" TEXT;
    END IF;

    -- Add documentHash if it doesn't exist (also saw types for this)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'legal_consents' AND column_name = 'documentHash') THEN
        ALTER TABLE "legal_consents" ADD COLUMN "documentHash" TEXT;
    END IF;
END $$;
