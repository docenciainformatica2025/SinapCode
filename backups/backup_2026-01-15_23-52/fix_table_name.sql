-- ============================================
-- DIAGNÓSTICO CRÍTICO: VERIFICAR NOMBRE DE TABLA
-- ============================================

-- PASO 1: Ver TODAS las tablas en la base de datos
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- PASO 2: Si la tabla es "User" (singular), usar esta query:
SELECT 
    id,
    name,
    email,
    role,
    "emailVerified"
FROM "User"
LIMIT 10;

-- PASO 3: Si la tabla es "users" (plural minúscula), usar esta query:
SELECT 
    id,
    name,
    email,
    role,
    "emailVerified"
FROM users
LIMIT 10;

-- PASO 4: Una vez que identifiques el nombre correcto, ejecuta esto:
-- (Reemplaza "NOMBRE_CORRECTO_TABLA" con el nombre real)

-- Para tabla "User":
UPDATE "User" 
SET "emailVerified" = NOW()
WHERE email = 'antonio_rburgos@msn.com';

SELECT email, role, "emailVerified" 
FROM "User" 
WHERE email = 'antonio_rburgos@msn.com';

-- O para tabla "users":
UPDATE users 
SET "emailVerified" = NOW()
WHERE email = 'antonio_rburgos@msn.com';

SELECT email, role, "emailVerified" 
FROM users 
WHERE email = 'antonio_rburgos@msn.com';
