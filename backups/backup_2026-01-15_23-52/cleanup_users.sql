-- ============================================
-- LIMPIEZA Y NORMALIZACIÓN DE DATOS DE USUARIOS
-- Fecha: 2026-01-14
-- Descripción: Actualiza usuarios con valores NULL para evitar errores
-- ============================================

-- 1. Actualizar usuarios sin rol (NULL) a STUDENT por defecto
UPDATE users 
SET role = 'STUDENT' 
WHERE role IS NULL;

-- 2. Actualizar usuarios sin nombre a un valor por defecto basado en email
UPDATE users 
SET name = SPLIT_PART(email, '@', 1)
WHERE name IS NULL OR name = '';

-- 3. Asegurar que emailVerified tenga un valor para usuarios activos
-- (Usuarios sin emailVerified se consideran "pendientes de verificación")
-- No hacemos nada aquí, NULL es válido para usuarios no verificados

-- 4. Asegurar que los campos de soft delete estén NULL para usuarios activos
UPDATE users 
SET 
    "deletedAt" = NULL,
    "deletedBy" = NULL,
    "deletionReason" = NULL
WHERE "deletedAt" IS NULL;

-- 5. Asegurar que los campos de suspensión estén NULL para usuarios no suspendidos
UPDATE users 
SET 
    "suspendedAt" = NULL,
    "suspendedBy" = NULL,
    "suspensionReason" = NULL
WHERE "suspendedAt" IS NULL;

-- 6. Confirmar que Antonio Burgos es ADMIN
UPDATE users 
SET role = 'ADMIN' 
WHERE email = 'antonio_rburgos@msn.com';

-- ============================================
-- VERIFICACIÓN FINAL
-- ============================================

-- Ver todos los usuarios con sus roles
SELECT 
    id,
    name,
    email,
    role,
    CASE 
        WHEN "emailVerified" IS NOT NULL THEN 'Verificado'
        ELSE 'Pendiente'
    END as estado_verificacion,
    CASE 
        WHEN "deletedAt" IS NOT NULL THEN 'Eliminado'
        WHEN "suspendedAt" IS NOT NULL THEN 'Suspendido'
        ELSE 'Activo'
    END as estado,
    "createdAt"
FROM users
ORDER BY "createdAt" DESC;

-- Contar usuarios por rol
SELECT 
    role,
    COUNT(*) as total
FROM users
WHERE "deletedAt" IS NULL
GROUP BY role
ORDER BY total DESC;

-- Verificar que no hay valores NULL problemáticos
SELECT 
    COUNT(*) FILTER (WHERE role IS NULL) as sin_rol,
    COUNT(*) FILTER (WHERE name IS NULL OR name = '') as sin_nombre,
    COUNT(*) FILTER (WHERE email IS NULL) as sin_email,
    COUNT(*) as total_usuarios
FROM users;
