# Template de Auditoría de Seguridad - SinapCode

**Versión:** 1.0.0  
**Basado en:** OWASP ASVS 4.0, ISO 27001:2013

## 📋 Información de la Auditoría

| Campo | Valor |
|-------|-------|
| **Fecha de Auditoría** | [DD/MM/YYYY] |
| **Auditor** | [Nombre del Auditor] |
| **Tipo de Auditoría** | [ ] Interna  [ ] Externa  [ ] Penetration Test |
| **Alcance** | [ ] Completo  [ ] Parcial (especificar) |
| **Versión de la Aplicación** | [x.y.z] |

---

## 1. Autenticación y Gestión de Sesiones

### 1.1 Contraseñas

| ID | Control | Estado | Notas |
|----|---------|--------|-------|
| AUTH-001 | Longitud mínima de 8 caracteres | [ ] ✅ [ ] ❌ | |
| AUTH-002 | Hash con algoritmo seguro (bcrypt/argon2) | [ ] ✅ [ ] ❌ | |
| AUTH-003 | Salt único por usuario | [ ] ✅ [ ] ❌ | |
| AUTH-004 | Política de complejidad | [ ] ✅ [ ] ❌ | |
| AUTH-005 | Prevención de contraseñas comunes | [ ] ✅ [ ] ❌ | |

### 1.2 Sesiones

| ID | Control | Estado | Notas |
|----|---------|--------|-------|
| SESS-001 | Tokens JWT firmados | [ ] ✅ [ ] ❌ | |
| SESS-002 | Expiración de sesión (< 24h) | [ ] ✅ [ ] ❌ | |
| SESS-003 | httpOnly cookies | [ ] ✅ [ ] ❌ | |
| SESS-004 | Secure flag en cookies | [ ] ✅ [ ] ❌ | |
| SESS-005 | SameSite attribute | [ ] ✅ [ ] ❌ | |

---

## 2. Control de Acceso

### 2.1 Autorización

| ID | Control | Estado | Notas |
|----|---------|--------|-------|
| AUTHZ-001 | Principio de menor privilegio | [ ] ✅ [ ] ❌ | |
| AUTHZ-002 | Verificación de rol en cada endpoint | [ ] ✅ [ ] ❌ | |
| AUTHZ-003 | Prevención de IDOR | [ ] ✅ [ ] ❌ | |
| AUTHZ-004 | Validación server-side | [ ] ✅ [ ] ❌ | |

---

## 3. Validación de Entrada

### 3.1 Inyección

| ID | Control | Estado | Notas |
|----|---------|--------|-------|
| INJ-001 | Uso de ORM (Prisma) | [ ] ✅ [ ] ❌ | |
| INJ-002 | Validación con Zod | [ ] ✅ [ ] ❌ | |
| INJ-003 | Sanitización de HTML | [ ] ✅ [ ] ❌ | |
| INJ-004 | Prevención de XSS | [ ] ✅ [ ] ❌ | |
| INJ-005 | Content Security Policy | [ ] ✅ [ ] ❌ | |

---

## 4. Criptografía

### 4.1 Datos en Tránsito

| ID | Control | Estado | Notas |
|----|---------|--------|-------|
| CRYPTO-001 | TLS 1.3 obligatorio | [ ] ✅ [ ] ❌ | |
| CRYPTO-002 | HSTS habilitado | [ ] ✅ [ ] ❌ | |
| CRYPTO-003 | Certificado SSL válido | [ ] ✅ [ ] ❌ | |

### 4.2 Datos en Reposo

| ID | Control | Estado | Notas |
|----|---------|--------|-------|
| CRYPTO-004 | Cifrado de BD (AES-256) | [ ] ✅ [ ] ❌ | |
| CRYPTO-005 | Contraseñas hasheadas | [ ] ✅ [ ] ❌ | |
| CRYPTO-006 | Tokens firmados | [ ] ✅ [ ] ❌ | |

---

## 5. Gestión de Errores y Logging

### 5.1 Manejo de Errores

| ID | Control | Estado | Notas |
|----|---------|--------|-------|
| ERR-001 | No exponer stack traces | [ ] ✅ [ ] ❌ | |
| ERR-002 | Mensajes genéricos al usuario | [ ] ✅ [ ] ❌ | |
| ERR-003 | Logging detallado server-side | [ ] ✅ [ ] ❌ | |

### 5.2 Logging y Monitoreo

| ID | Control | Estado | Notas |
|----|---------|--------|-------|
| LOG-001 | Logs de autenticación | [ ] ✅ [ ] ❌ | |
| LOG-002 | Logs de acceso a datos sensibles | [ ] ✅ [ ] ❌ | |
| LOG-003 | Logs inmutables | [ ] ✅ [ ] ❌ | |
| LOG-004 | Alertas de seguridad | [ ] ✅ [ ] ❌ | |

---

## 6. Configuración de Seguridad

### 6.1 Headers de Seguridad

| ID | Control | Estado | Notas |
|----|---------|--------|-------|
| CONF-001 | X-Frame-Options | [ ] ✅ [ ] ❌ | |
| CONF-002 | X-Content-Type-Options | [ ] ✅ [ ] ❌ | |
| CONF-003 | Referrer-Policy | [ ] ✅ [ ] ❌ | |
| CONF-004 | Permissions-Policy | [ ] ✅ [ ] ❌ | |

### 6.2 Dependencias

| ID | Control | Estado | Notas |
|----|---------|--------|-------|
| DEP-001 | Sin vulnerabilidades críticas | [ ] ✅ [ ] ❌ | |
| DEP-002 | Dependencias actualizadas | [ ] ✅ [ ] ❌ | |
| DEP-003 | Dependabot habilitado | [ ] ✅ [ ] ❌ | |

---

## 7. Protección de Datos (GDPR)

### 7.1 Cumplimiento

| ID | Control | Estado | Notas |
|----|---------|--------|-------|
| GDPR-001 | Política de privacidad publicada | [ ] ✅ [ ] ❌ | |
| GDPR-002 | Registro de consentimientos | [ ] ✅ [ ] ❌ | |
| GDPR-003 | Derecho de acceso implementado | [ ] ✅ [ ] ❌ | |
| GDPR-004 | Derecho al olvido implementado | [ ] ✅ [ ] ❌ | |
| GDPR-005 | Portabilidad de datos | [ ] ✅ [ ] ❌ | |

---

## 8. Infraestructura

### 8.1 Hosting y Despliegue

| ID | Control | Estado | Notas |
|----|---------|--------|-------|
| INFRA-001 | Backups automáticos | [ ] ✅ [ ] ❌ | |
| INFRA-002 | DDoS protection | [ ] ✅ [ ] ❌ | |
| INFRA-003 | Firewall configurado | [ ] ✅ [ ] ❌ | |
| INFRA-004 | Monitoreo de uptime | [ ] ✅ [ ] ❌ | |

---

## 9. Vulnerabilidades Encontradas

### Críticas (CVSS 9.0-10.0)

| ID | Descripción | Ubicación | Recomendación | Estado |
|----|-------------|-----------|---------------|--------|
| VULN-C-001 | | | | [ ] Abierta [ ] Cerrada |

### Altas (CVSS 7.0-8.9)

| ID | Descripción | Ubicación | Recomendación | Estado |
|----|-------------|-----------|---------------|--------|
| VULN-H-001 | | | | [ ] Abierta [ ] Cerrada |

### Medias (CVSS 4.0-6.9)

| ID | Descripción | Ubicación | Recomendación | Estado |
|----|-------------|-----------|---------------|--------|
| VULN-M-001 | | | | [ ] Abierta [ ] Cerrada |

### Bajas (CVSS 0.1-3.9)

| ID | Descripción | Ubicación | Recomendación | Estado |
|----|-------------|-----------|---------------|--------|
| VULN-L-001 | | | | [ ] Abierta [ ] Cerrada |

---

## 10. Resumen Ejecutivo

### Puntuación General

| Categoría | Puntuación | Máximo |
|-----------|------------|--------|
| Autenticación | __/10 | 10 |
| Control de Acceso | __/10 | 10 |
| Validación de Entrada | __/10 | 10 |
| Criptografía | __/10 | 10 |
| Logging | __/10 | 10 |
| Configuración | __/10 | 10 |
| GDPR | __/10 | 10 |
| Infraestructura | __/10 | 10 |
| **TOTAL** | **__/80** | **80** |

### Clasificación de Riesgo

- **80-70:** ✅ Excelente
- **69-60:** 🟢 Bueno
- **59-50:** 🟡 Aceptable
- **49-40:** 🟠 Requiere Mejoras
- **<40:** 🔴 Crítico

### Recomendaciones Prioritarias

1. [Recomendación 1]
2. [Recomendación 2]
3. [Recomendación 3]

### Plan de Acción

| Acción | Responsable | Fecha Límite | Estado |
|--------|-------------|--------------|--------|
| | | | [ ] Pendiente [ ] En Progreso [ ] Completada |

---

## 11. Firmas

**Auditor:**
- Nombre: ___________________________
- Firma: ___________________________
- Fecha: ___________________________

**Responsable de Seguridad:**
- Nombre: ___________________________
- Firma: ___________________________
- Fecha: ___________________________

---

**Próxima Auditoría:** [DD/MM/YYYY]  
**Versión del Template:** 1.0.0
