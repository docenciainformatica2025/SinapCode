-- Create CertificateType enum if not exists (simulated with check constraint or text)
-- In Postgres we can use native ENUMs or just text constraints. Let's use generic text for flexibility but consistent with Prisma.

CREATE TABLE IF NOT EXISTS "certificates" (
    "id" TEXT NOT NULL, -- UUID
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'LEGAL', -- 'LEGAL', 'COURSE'
    "code" TEXT NOT NULL, -- Unique Human Readable Code e.g., SC-2026-L-A1B2C
    "status" TEXT NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'REVOKED'
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "metadata" JSONB, -- Snapshot of data at time of issue (consents, course name, etc.)
    "fileUrl" TEXT, -- Optional: if we store the PDF later
    
    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- Create Index for lookup
CREATE UNIQUE INDEX IF NOT EXISTS "certificates_code_key" ON "certificates"("code");
CREATE INDEX IF NOT EXISTS "certificates_userId_idx" ON "certificates"("userId");

-- Add foreign key
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'certificates_userId_fkey') THEN
        ALTER TABLE "certificates" ADD CONSTRAINT "certificates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
