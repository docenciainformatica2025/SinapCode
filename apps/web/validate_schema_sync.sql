-- ============================================
-- VALIDACIÓN COMPLETA: PRISMA SCHEMA vs SUPABASE
-- ============================================
-- Este script verifica que TODAS las columnas del schema de Prisma
-- existan en la base de datos de Supabase

-- PASO 1: Ver la estructura REAL de la tabla User en Supabase
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'User'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- PASO 2: Verificar específicamente las columnas de soft delete
SELECT 
    column_name,
    CASE 
        WHEN column_name IN ('deletedAt', 'deletedBy', 'deletionReason', 
                             'suspendedAt', 'suspendedBy', 'suspensionReason')
        THEN '✅ Columna de soft delete existe'
        ELSE 'Columna estándar'
    END as tipo
FROM information_schema.columns
WHERE table_name = 'User'
AND table_schema = 'public'
AND column_name IN (
    'id', 'name', 'email', 'password', 'role', 'emailVerified',
    'deletedAt', 'deletedBy', 'deletionReason',
    'suspendedAt', 'suspendedBy', 'suspensionReason'
)
ORDER BY column_name;

-- PASO 3: Contar columnas esperadas vs existentes
SELECT 
    'Columnas esperadas' as tipo,
    12 as cantidad
UNION ALL
SELECT 
    'Columnas encontradas' as tipo,
    COUNT(*) as cantidad
FROM information_schema.columns
WHERE table_name = 'User'
AND table_schema = 'public'
AND column_name IN (
    'id', 'name', 'email', 'password', 'role', 'emailVerified',
    'deletedAt', 'deletedBy', 'deletionReason',
    'suspendedAt', 'suspendedBy', 'suspensionReason'
);

-- PASO 4: Listar columnas FALTANTES (si hay)
SELECT 
    col.column_name as columna_faltante
FROM (
    VALUES 
        ('deletedAt'),
        ('deletedBy'),
        ('deletionReason'),
        ('suspendedAt'),
        ('suspendedBy'),
        ('suspensionReason')
) AS col(column_name)
WHERE NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'User' 
    AND table_schema = 'public'
    AND column_name = col.column_name
);

-- PASO 5: Ver datos del usuario para verificar
SELECT 
    id,
    email,
    role,
    "emailVerified",
    password IS NOT NULL as tiene_password,
    -- Estas columnas pueden no existir aún
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'User' AND column_name = 'deletedAt'
        ) THEN 'Columnas soft delete existen'
        ELSE '❌ Columnas soft delete NO EXISTEN - ejecutar migración'
    END as estado_migracion
FROM "User"
WHERE email = 'antonio_rburgos@msn.com';

-- ============================================
-- SI LAS COLUMNAS NO EXISTEN, EJECUTAR ESTO:
-- ============================================
/*
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "deletedBy" TEXT,
ADD COLUMN IF NOT EXISTS "deletionReason" TEXT,
ADD COLUMN IF NOT EXISTS "suspendedAt" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "suspendedBy" TEXT,
ADD COLUMN IF NOT EXISTS "suspensionReason" TEXT;

CREATE INDEX IF NOT EXISTS "User_deletedAt_idx" ON "User"("deletedAt");
CREATE INDEX IF NOT EXISTS "User_suspendedAt_idx" ON "User"("suspendedAt");
*/
