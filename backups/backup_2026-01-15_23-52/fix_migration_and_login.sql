-- ============================================
-- PASO 1: EJECUTAR MIGRACIÓN (PRIMERO)
-- ============================================
-- Estas columnas NO existen aún, debemos crearlas primero

ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "deletedBy" TEXT,
ADD COLUMN IF NOT EXISTS "deletionReason" TEXT,
ADD COLUMN IF NOT EXISTS "suspendedAt" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "suspendedBy" TEXT,
ADD COLUMN IF NOT EXISTS "suspensionReason" TEXT;

-- Crear índices para performance
CREATE INDEX IF NOT EXISTS "User_deletedAt_idx" ON "User"("deletedAt");
CREATE INDEX IF NOT EXISTS "User_suspendedAt_idx" ON "User"("suspendedAt");

-- ============================================
-- PASO 2: VERIFICAR Y CORREGIR USUARIO
-- ============================================

-- Ver estado actual
SELECT 
    id,
    name,
    email,
    role,
    "emailVerified",
    password IS NOT NULL as tiene_password
FROM "User"
WHERE email = 'antonio_rburgos@msn.com';

-- Corregir usuario
UPDATE "User"
SET 
    "emailVerified" = COALESCE("emailVerified", NOW()),
    role = 'ADMIN'
WHERE email = 'antonio_rburgos@msn.com';

-- Verificar resultado
SELECT 
    email,
    role,
    "emailVerified",
    password IS NOT NULL as tiene_password,
    CASE 
        WHEN "emailVerified" IS NOT NULL AND password IS NOT NULL 
        THEN '✅ LISTO PARA LOGIN'
        WHEN "emailVerified" IS NULL THEN '❌ Email no verificado'
        WHEN password IS NULL THEN '❌ Sin contraseña - necesita resetear'
        ELSE '❌ Problema desconocido'
    END as estado
FROM "User"
WHERE email = 'antonio_rburgos@msn.com';
