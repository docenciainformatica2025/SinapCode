-- ============================================
-- VERIFICAR EMAIL DE ANTONIO BURGOS PARA ACCESO
-- ============================================

-- Verificar el email del usuario admin
UPDATE users 
SET "emailVerified" = NOW()
WHERE email = 'antonio_rburgos@msn.com';

-- Verificar que se aplicó correctamente
SELECT 
    email, 
    role, 
    "emailVerified",
    CASE 
        WHEN "emailVerified" IS NOT NULL THEN 'Puede iniciar sesión'
        ELSE 'NO puede iniciar sesión'
    END as estado_acceso
FROM users 
WHERE email = 'antonio_rburgos@msn.com';
