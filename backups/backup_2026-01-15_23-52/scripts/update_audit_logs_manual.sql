-- ==============================================================================
-- MANUAL SCHEMA UPDATE FOR AUDIT LOGS
-- ==============================================================================
-- Ejecuta este script en Supabase SQL Editor para corregir el error:
-- column "eventType" does not exist

-- 1. Crear el ENUM 'EventCategory' si no existe
DO $$ BEGIN
    CREATE TYPE "EventCategory" AS ENUM ('LEGAL', 'SECURITY', 'DATA', 'TRANSACTION');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Agregar columnas faltantes a la tabla 'audit_logs'
ALTER TABLE "audit_logs" 
ADD COLUMN IF NOT EXISTS "eventType" TEXT,
ADD COLUMN IF NOT EXISTS "eventCategory" "EventCategory",
ADD COLUMN IF NOT EXISTS "eventData" JSONB,
ADD COLUMN IF NOT EXISTS "ipAddress" TEXT,
ADD COLUMN IF NOT EXISTS "userAgent" TEXT,
ADD COLUMN IF NOT EXISTS "sessionId" TEXT,
ADD COLUMN IF NOT EXISTS "hash" TEXT,
ADD COLUMN IF NOT EXISTS "previousHash" TEXT,
ADD COLUMN IF NOT EXISTS "metadata" JSONB;

-- 3. Crear índices para optimizar búsquedas
CREATE INDEX IF NOT EXISTS "audit_logs_eventType_idx" ON "audit_logs"("eventType");
CREATE INDEX IF NOT EXISTS "audit_logs_action_idx" ON "audit_logs"("action");
CREATE INDEX IF NOT EXISTS "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- 4. Verificación inmediata
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'audit_logs';
