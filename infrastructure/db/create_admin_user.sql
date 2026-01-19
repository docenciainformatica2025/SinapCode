-- ============================================
-- CREAR USUARIO ADMIN CON PASSWORD
-- ============================================

-- PASO 1: Generar hash bcrypt para password "Admin123!"
-- Usa: https://bcrypt-generator.com/ con 10 rounds
-- O ejecuta en Node.js: bcrypt.hash('Admin123!', 10)

-- PASO 2: Crear/Actualizar usuario admin
INSERT INTO "User" (
    id,
    email,
    name,
    password,
    role,
    "emailVerified",
    "mfaEnabled",
    "failedLoginCount",
    "isMinor",
    "createdAt",
    "updatedAt"
) VALUES (
    'admin_' || gen_random_uuid()::text,
    'antonio_rburgos@msn.com',
    'Antonio Burgos',
    -- Reemplaza este hash con el generado en bcrypt-generator.com
    -- Este es el hash de "Admin123!" con 10 rounds
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'ADMIN',
    NOW(),
    false,
    0,
    false,
    NOW(),
    NOW()
)
ON CONFLICT (email) DO UPDATE SET
    password = EXCLUDED.password,
    "emailVerified" = EXCLUDED."emailVerified",
    role = EXCLUDED.role,
    name = EXCLUDED.name,
    "updatedAt" = NOW();

-- PASO 3: Verificar que se creó correctamente
SELECT 
    id,
    email,
    name,
    role,
    "emailVerified",
    password IS NOT NULL as tiene_password,
    LENGTH(password) as longitud_hash,
    "createdAt"
FROM "User"
WHERE email = 'antonio_rburgos@msn.com';

-- PASO 4: Verificar que puede hacer login
-- El resultado debe mostrar:
-- ✅ tiene_password: true
-- ✅ longitud_hash: 60 (bcrypt siempre genera 60 caracteres)
-- ✅ emailVerified: timestamp actual
-- ✅ role: ADMIN
