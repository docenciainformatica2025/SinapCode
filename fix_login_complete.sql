-- ============================================
-- SOLUCIÓN DEFINITIVA: Verificar y Corregir Usuario
-- ============================================
-- Este script verifica TODOS los aspectos del usuario y los corrige

-- PASO 1: Verificar el estado actual del usuario
SELECT 
    id,
    name,
    email,
    role,
    "emailVerified",
    password IS NOT NULL as tiene_password,
    "deletedAt",
    "suspendedAt",
    "createdAt"
FROM "User"
WHERE email = 'antonio_rburgos@msn.com';

-- PASO 2: Corregir TODOS los problemas potenciales
UPDATE "User"
SET 
    -- Verificar email (CRÍTICO para login)
    "emailVerified" = COALESCE("emailVerified", NOW()),
    
    -- Asegurar que tiene rol ADMIN
    role = 'ADMIN',
    
    -- Limpiar cualquier soft delete
    "deletedAt" = NULL,
    "deletedBy" = NULL,
    "deletionReason" = NULL,
    
    -- Limpiar cualquier suspensión
    "suspendedAt" = NULL,
    "suspendedBy" = NULL,
    "suspensionReason" = NULL
    
WHERE email = 'antonio_rburgos@msn.com';

-- PASO 3: Verificar que se aplicaron los cambios
SELECT 
    email,
    role,
    "emailVerified",
    CASE 
        WHEN "emailVerified" IS NOT NULL 
             AND password IS NOT NULL 
             AND "deletedAt" IS NULL 
             AND "suspendedAt" IS NULL 
        THEN '✅ LISTO PARA LOGIN'
        WHEN "emailVerified" IS NULL THEN '❌ Email no verificado'
        WHEN password IS NULL THEN '❌ Sin contraseña'
        WHEN "deletedAt" IS NOT NULL THEN '❌ Usuario eliminado'
        WHEN "suspendedAt" IS NOT NULL THEN '❌ Usuario suspendido'
        ELSE '❌ Problema desconocido'
    END as estado_login
FROM "User"
WHERE email = 'antonio_rburgos@msn.com';

-- PASO 4: Ver todas las sesiones activas (para debug)
SELECT 
    s.id,
    s."userId",
    s.expires,
    CASE 
        WHEN s.expires > NOW() THEN '✅ Válida'
        ELSE '❌ Expirada'
    END as estado
FROM "Session" s
JOIN "User" u ON s."userId" = u.id
WHERE u.email = 'antonio_rburgos@msn.com'
ORDER BY s.expires DESC;

-- PASO 5: Si necesitas resetear la contraseña (OPCIONAL - solo si es necesario)
-- Descomenta y ejecuta solo si el usuario no puede hacer login por contraseña incorrecta
/*
-- Esta contraseña es: "Admin123!"
-- Hash generado con bcrypt (10 rounds)
UPDATE "User"
SET password = '$2a$10$YourBcryptHashHere'
WHERE email = 'antonio_rburgos@msn.com';
*/

-- ============================================
-- VERIFICACIÓN FINAL
-- ============================================

-- Ver TODOS los usuarios ADMIN para comparar
SELECT 
    email,
    role,
    "emailVerified" IS NOT NULL as email_ok,
    password IS NOT NULL as password_ok,
    "deletedAt" IS NULL as no_eliminado,
    "suspendedAt" IS NULL as no_suspendido
FROM "User"
WHERE role = 'ADMIN'
ORDER BY "createdAt" DESC;
