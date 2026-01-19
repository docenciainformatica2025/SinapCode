-- ============================================
-- MIGRACIÓN: Soft Delete y Suspensión de Usuarios
-- Fecha: 2026-01-14
-- Descripción: Agrega campos para soft delete y tracking de suspensiones
-- Cumplimiento: GDPR Art. 17, Ley 1581 de 2012 (Colombia)
-- ============================================

-- 1. Agregar campos de soft delete
ALTER TABLE "users" 
ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "deletedBy" TEXT,
ADD COLUMN IF NOT EXISTS "deletionReason" TEXT;

-- 2. Agregar campos de suspensión
ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "suspendedAt" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "suspendedBy" TEXT,
ADD COLUMN IF NOT EXISTS "suspensionReason" TEXT;

-- 3. Crear índices para mejorar performance en queries
CREATE INDEX IF NOT EXISTS "users_deletedAt_idx" ON "users"("deletedAt");
CREATE INDEX IF NOT EXISTS "users_suspendedAt_idx" ON "users"("suspendedAt");

-- 4. Crear índice compuesto para filtrar usuarios activos (no eliminados ni suspendidos)
CREATE INDEX IF NOT EXISTS "users_active_idx" ON "users"("deletedAt", "suspendedAt") 
WHERE "deletedAt" IS NULL AND "suspendedAt" IS NULL;

-- 5. Agregar comentarios para documentación
COMMENT ON COLUMN "users"."deletedAt" IS 'Fecha de soft delete. NULL = usuario activo';
COMMENT ON COLUMN "users"."deletedBy" IS 'ID del admin que eliminó el usuario';
COMMENT ON COLUMN "users"."deletionReason" IS 'Razón de eliminación (obligatoria para cumplimiento legal)';
COMMENT ON COLUMN "users"."suspendedAt" IS 'Fecha de suspensión. NULL = usuario no suspendido';
COMMENT ON COLUMN "users"."suspendedBy" IS 'ID del admin que suspendió el usuario';
COMMENT ON COLUMN "users"."suspensionReason" IS 'Razón de suspensión (obligatoria para cumplimiento legal)';

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Verificar que las columnas se crearon correctamente
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'users' 
AND column_name IN ('deletedAt', 'deletedBy', 'deletionReason', 'suspendedAt', 'suspendedBy', 'suspensionReason')
ORDER BY column_name;

-- Verificar índices creados
SELECT 
    indexname, 
    indexdef
FROM pg_indexes
WHERE tablename = 'users'
AND indexname LIKE '%deleted%' OR indexname LIKE '%suspended%';

-- ============================================
-- QUERIES ÚTILES POST-MIGRACIÓN
-- ============================================

-- Contar usuarios por estado
SELECT 
    CASE 
        WHEN "deletedAt" IS NOT NULL THEN 'Eliminado'
        WHEN "suspendedAt" IS NOT NULL THEN 'Suspendido'
        WHEN "emailVerified" IS NULL THEN 'Pendiente'
        ELSE 'Activo'
    END as estado,
    COUNT(*) as total
FROM "users"
GROUP BY estado;

-- Ver usuarios eliminados (últimos 30 días)
SELECT 
    id,
    name,
    email,
    "deletedAt",
    "deletedBy",
    "deletionReason"
FROM "users"
WHERE "deletedAt" IS NOT NULL
AND "deletedAt" > NOW() - INTERVAL '30 days'
ORDER BY "deletedAt" DESC;

-- Ver usuarios suspendidos
SELECT 
    id,
    name,
    email,
    "suspendedAt",
    "suspendedBy",
    "suspensionReason"
FROM "users"
WHERE "suspendedAt" IS NOT NULL
AND "deletedAt" IS NULL
ORDER BY "suspendedAt" DESC;

-- ============================================
-- FUNCIÓN: Purgar usuarios eliminados hace más de 90 días
-- (Ejecutar manualmente o programar con pg_cron)
-- ============================================

CREATE OR REPLACE FUNCTION purge_deleted_users()
RETURNS TABLE(purged_count INTEGER) AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    -- Eliminar físicamente usuarios eliminados hace más de 90 días
    DELETE FROM "users"
    WHERE "deletedAt" IS NOT NULL
    AND "deletedAt" < NOW() - INTERVAL '90 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RETURN QUERY SELECT deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso (NO ejecutar automáticamente):
-- SELECT * FROM purge_deleted_users();

-- ============================================
-- ROLLBACK (Solo si necesitas revertir)
-- ============================================

-- ADVERTENCIA: Esto eliminará los datos de soft delete
-- Solo ejecutar si necesitas revertir la migración

/*
DROP INDEX IF EXISTS "users_deletedAt_idx";
DROP INDEX IF EXISTS "users_suspendedAt_idx";
DROP INDEX IF EXISTS "users_active_idx";

ALTER TABLE "users"
DROP COLUMN IF EXISTS "deletedAt",
DROP COLUMN IF EXISTS "deletedBy",
DROP COLUMN IF EXISTS "deletionReason",
DROP COLUMN IF EXISTS "suspendedAt",
DROP COLUMN IF EXISTS "suspendedBy",
DROP COLUMN IF EXISTS "suspensionReason";

DROP FUNCTION IF EXISTS purge_deleted_users();
*/
