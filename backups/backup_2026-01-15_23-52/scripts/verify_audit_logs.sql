-- ================================================
-- VERIFICACIÓN DE AUDIT LOGS
-- ================================================
-- Este script consulta la tabla de logs de auditoría para verificar
-- que los eventos de seguridad se están registrando correctamente.

-- 1. Ver últimos 20 eventos de seguridad/autenticación
SELECT 
    id,
    "userId", 
    "eventType",
    "eventCategory",
    action,
    metadata->>'message' as message,
    "createdAt"
FROM audit_logs
ORDER BY "createdAt" DESC
LIMIT 20;

-- 2. Contar eventos por categoría
SELECT "eventCategory", COUNT(*) 
FROM audit_logs 
GROUP BY "eventCategory";

-- 3. Ver detalles JSON de un evento específico (reemplazar ID)
-- SELECT "eventData" FROM audit_logs WHERE id = 'YOUR_LOG_ID';
