-- ============================================
-- DIAGNÓSTICO Y CORRECCIÓN COMPLETA
-- ============================================

-- 1. Ver TODOS los usuarios con sus datos de autenticación
SELECT 
    id,
    name,
    email,
    role,
    "emailVerified",
    password,
    CASE 
        WHEN "emailVerified" IS NOT NULL AND password IS NOT NULL THEN '✅ Puede iniciar sesión'
        WHEN "emailVerified" IS NULL THEN '❌ Email NO verificado'
        WHEN password IS NULL THEN '❌ Sin contraseña'
        ELSE '❌ Problema desconocido'
    END as estado_login
FROM users
ORDER BY "createdAt" DESC;

-- 2. Verificar específicamente el usuario Antonio
SELECT 
    email,
    role,
    "emailVerified",
    password IS NOT NULL as tiene_password,
    "deletedAt",
    "suspendedAt"
FROM users 
WHERE email LIKE '%antonio%';

-- 3. CORRECCIÓN: Verificar email de TODOS los usuarios ADMIN
UPDATE users 
SET "emailVerified" = NOW()
WHERE role = 'ADMIN' AND "emailVerified" IS NULL;

-- 4. Verificar que se aplicó
SELECT 
    email,
    role,
    "emailVerified",
    CASE 
        WHEN "emailVerified" IS NOT NULL THEN '✅ Verificado'
        ELSE '❌ NO verificado'
    END as estado
FROM users
WHERE role = 'ADMIN';

-- 5. Si el problema persiste, verificar las sesiones
SELECT 
    s.id as session_id,
    s."userId",
    u.email,
    s.expires,
    CASE 
        WHEN s.expires > NOW() THEN '✅ Sesión válida'
        ELSE '❌ Sesión expirada'
    END as estado_sesion
FROM "Session" s
JOIN users u ON s."userId" = u.id
WHERE u.email LIKE '%antonio%';
