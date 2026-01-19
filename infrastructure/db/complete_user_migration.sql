-- ============================================
-- MIGRACIÓN COMPLETA: SINCRONIZAR SCHEMA PRISMA CON SUPABASE
-- ============================================
-- Esta migración agrega TODAS las columnas faltantes a la tabla User

-- PASO 1: Agregar columnas básicas de autenticación
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "name" TEXT,
ADD COLUMN IF NOT EXISTS "password" TEXT,
ADD COLUMN IF NOT EXISTS "emailVerified" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "image" TEXT;

-- PASO 2: Agregar columnas de seguridad
ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "mfaEnabled" BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "mfaSecret" TEXT,
ADD COLUMN IF NOT EXISTS "lastLoginAt" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "lastLoginIp" TEXT,
ADD COLUMN IF NOT EXISTS "failedLoginCount" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "lockedUntil" TIMESTAMP;

-- PASO 3: Agregar columnas de verificación de edad (COPPA)
ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "birthDate" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "isMinor" BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "guardianEmail" TEXT;

-- PASO 4: Agregar columnas de soft delete (GDPR/Ley 1581)
ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "deletedBy" TEXT,
ADD COLUMN IF NOT EXISTS "deletionReason" TEXT;

-- PASO 5: Agregar columnas de suspensión
ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "suspendedAt" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "suspendedBy" TEXT,
ADD COLUMN IF NOT EXISTS "suspensionReason" TEXT;

-- PASO 6: Agregar timestamps
ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP DEFAULT NOW();

-- PASO 7: Crear índices para performance
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");
CREATE INDEX IF NOT EXISTS "User_deletedAt_idx" ON "User"("deletedAt");
CREATE INDEX IF NOT EXISTS "User_suspendedAt_idx" ON "User"("suspendedAt");
CREATE INDEX IF NOT EXISTS "User_role_idx" ON "User"("role");

-- PASO 8: Verificar que todas las columnas se crearon
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'User'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- PASO 9: Contar columnas (debe ser ~25)
SELECT COUNT(*) as total_columnas
FROM information_schema.columns
WHERE table_name = 'User'
AND table_schema = 'public';

-- PASO 10: Ver el usuario actual
SELECT 
    id,
    email,
    role,
    name,
    password IS NOT NULL as tiene_password,
    "emailVerified",
    "createdAt"
FROM "User"
WHERE email = 'antonio_rburgos@msn.com';
