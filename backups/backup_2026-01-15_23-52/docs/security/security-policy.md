# Política de Seguridad de la Información - SinapCode

**Versión:** 1.0.0  
**Fecha:** 12 de enero de 2026  
**Basado en:** ISO/IEC 27001:2013, OWASP Top 10

## 1. Objetivo

Establecer los lineamientos para proteger la confidencialidad, integridad y disponibilidad de la información de SinapCode y sus usuarios.

## 2. Alcance

Esta política aplica a:
- Todos los sistemas de información de SinapCode
- Datos de usuarios (estudiantes, profesores, administradores)
- Infraestructura de TI (servidores, bases de datos, aplicaciones)
- Personal con acceso a sistemas

## 3. Principios de Seguridad

### 3.1 Confidencialidad
- Acceso basado en el principio de "menor privilegio"
- Cifrado de datos sensibles en reposo y en tránsito
- Autenticación multifactor para accesos administrativos

### 3.2 Integridad
- Validación de entrada en todos los formularios
- Protección contra inyección SQL mediante ORM (Prisma)
- Logs de auditoría inmutables

### 3.3 Disponibilidad
- Uptime objetivo: 99.9%
- Backups diarios automatizados
- Plan de recuperación ante desastres (DRP)

## 4. Controles de Seguridad

### 4.1 Autenticación y Autorización
- **Contraseñas:** Mínimo 8 caracteres, hash bcrypt (10 rounds)
- **Sesiones:** Tokens JWT con expiración de 24 horas
- **OAuth:** Google, GitHub (opcional)
- **Roles:** STUDENT, TEACHER, ADMIN

### 4.2 Protección de Datos

#### Datos en Tránsito
- TLS 1.3 obligatorio
- HSTS (HTTP Strict Transport Security)
- Certificados SSL/TLS renovados automáticamente

#### Datos en Reposo
- Base de datos: Supabase con cifrado AES-256
- Contraseñas: Bcrypt con salt único por usuario
- Tokens: Almacenados en httpOnly cookies

### 4.3 Seguridad de Aplicación (OWASP Top 10)

| Vulnerabilidad | Mitigación |
|----------------|------------|
| **A01: Broken Access Control** | Middleware de autorización en cada ruta protegida |
| **A02: Cryptographic Failures** | TLS 1.3, bcrypt, tokens JWT firmados |
| **A03: Injection** | Prisma ORM, validación con Zod |
| **A04: Insecure Design** | Threat modeling, security by design |
| **A05: Security Misconfiguration** | Variables de entorno, headers de seguridad |
| **A06: Vulnerable Components** | Dependabot, npm audit, actualizaciones regulares |
| **A07: Authentication Failures** | NextAuth, rate limiting, MFA |
| **A08: Software and Data Integrity** | Subresource Integrity (SRI), CSP |
| **A09: Logging Failures** | Logs centralizados, alertas de seguridad |
| **A10: SSRF** | Validación de URLs, whitelist de dominios |

### 4.4 Seguridad de Infraestructura

**Hosting:** Vercel
- Edge Network con DDoS protection
- Automatic scaling
- Zero-downtime deployments

**Base de Datos:** Supabase
- Connection pooling (PgBouncer)
- Row Level Security (RLS)
- Backups automáticos cada 24h

## 5. Gestión de Incidentes

### 5.1 Clasificación de Incidentes

| Nivel | Descripción | Tiempo de Respuesta |
|-------|-------------|---------------------|
| **Crítico** | Brecha de datos, sistema caído | < 1 hora |
| **Alto** | Vulnerabilidad explotable | < 4 horas |
| **Medio** | Degradación de servicio | < 24 horas |
| **Bajo** | Issues menores | < 72 horas |

### 5.2 Proceso de Respuesta

1. **Detección:** Monitoreo automático, reportes de usuarios
2. **Contención:** Aislar sistemas afectados
3. **Erradicación:** Eliminar causa raíz
4. **Recuperación:** Restaurar servicios
5. **Lecciones Aprendidas:** Post-mortem, mejoras

### 5.3 Notificación de Brechas (GDPR)

- **Autoridad:** Notificar a SIC (Colombia) o AEPD (UE) en 72 horas
- **Usuarios:** Notificar sin demora si hay alto riesgo
- **Documentación:** Registro detallado del incidente

## 6. Gestión de Accesos

### 6.1 Acceso a Producción
- Solo personal autorizado (DevOps, CTO)
- Autenticación con SSH keys + MFA
- Logs de todos los accesos

### 6.2 Acceso a Base de Datos
- Conexiones cifradas (SSL)
- Credenciales rotadas cada 90 días
- Acceso de solo lectura para análisis

### 6.3 Revisión de Accesos
- Auditoría trimestral de permisos
- Revocación inmediata al terminar contrato

## 7. Desarrollo Seguro

### 7.1 Ciclo de Vida de Desarrollo (SDLC)

```
Diseño → Code Review → Testing → Security Scan → Deploy
   ↓         ↓            ↓            ↓           ↓
Threat    Peer       Unit/E2E    SAST/DAST    Monitoring
Modeling  Review      Tests       Scans        & Alerts
```

### 7.2 Herramientas de Seguridad

- **SAST:** ESLint con reglas de seguridad
- **Dependency Scanning:** Dependabot, npm audit
- **Secrets Detection:** GitGuardian
- **Container Scanning:** Trivy (si aplica)

### 7.3 Code Review

Todos los cambios requieren:
- ✅ Revisión de al menos 1 desarrollador senior
- ✅ Aprobación de security champion (cambios críticos)
- ✅ Tests automatizados pasando
- ✅ Sin vulnerabilidades de severidad alta

## 8. Backups y Recuperación

### 8.1 Estrategia de Backup

- **Frecuencia:** Diaria (automática)
- **Retención:** 30 días
- **Ubicación:** Región geográfica diferente
- **Cifrado:** AES-256

### 8.2 Plan de Recuperación ante Desastres (DRP)

| Escenario | RTO* | RPO** | Procedimiento |
|-----------|------|-------|---------------|
| Caída de servidor | 1h | 15min | Failover automático |
| Corrupción de BD | 4h | 24h | Restaurar desde backup |
| Ataque ransomware | 8h | 24h | Restaurar desde backup aislado |

*RTO: Recovery Time Objective  
**RPO: Recovery Point Objective

## 9. Capacitación y Concienciación

### 9.1 Personal Técnico
- Capacitación anual en OWASP Top 10
- Simulacros de respuesta a incidentes
- Certificaciones recomendadas: CEH, CISSP

### 9.2 Usuarios
- Guías de seguridad en la plataforma
- Alertas de phishing y fraudes
- Recomendaciones de contraseñas seguras

## 10. Cumplimiento y Auditorías

### 10.1 Auditorías Internas
- **Frecuencia:** Trimestral
- **Alcance:** Logs, accesos, configuraciones
- **Responsable:** Security Officer

### 10.2 Auditorías Externas
- **Frecuencia:** Anual
- **Alcance:** Penetration testing, code review
- **Certificación:** ISO 27001 (objetivo 2026)

### 10.3 Métricas de Seguridad

- Tiempo promedio de detección de incidentes
- Tiempo promedio de resolución
- Número de vulnerabilidades críticas abiertas
- Cobertura de tests de seguridad

## 11. Revisión y Actualización

Esta política será revisada:
- Anualmente (mínimo)
- Después de incidentes de seguridad mayores
- Cuando cambien regulaciones aplicables

**Próxima revisión:** 12 de enero de 2027

---

**Aprobado por:** [CTO/CISO]  
**Fecha de Aprobación:** 12 de enero de 2026  
**Versión:** 1.0.0
