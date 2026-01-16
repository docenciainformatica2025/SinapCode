# Runbook: Restauración de Emergencia

**Última Actualización:** 12 de enero de 2026  
**Versión:** 1.0.0

---

## 🚨 CONTACTOS DE EMERGENCIA

| Rol | Nombre | Teléfono | Email | Disponibilidad |
|-----|--------|----------|-------|----------------|
| **CTO** | [Nombre] | +57 XXX XXX XXXX | cto@sinapcode.com | 24/7 |
| **DevOps Lead** | [Nombre] | +57 XXX XXX XXXX | devops@sinapcode.com | 24/7 |
| **Backup Admin** | [Nombre] | +57 XXX XXX XXXX | backup@sinapcode.com | Horario laboral |

**Servicios de Soporte:**
- **Supabase:** support@supabase.io
- **Vercel:** support@vercel.com
- **AWS:** 1-877-SUPPORT

---

## 📋 ESCENARIOS DE EMERGENCIA

### Escenario 1: Corrupción de Datos

**Síntomas:**
- Errores de integridad en la base de datos
- Datos inconsistentes
- Queries fallando

**Acción Inmediata:**
1. Poner aplicación en modo mantenimiento
2. Identificar alcance de la corrupción
3. Restaurar desde último backup válido

**Procedimiento:** Ver [Restauración de Base de Datos](#restauración-de-base-de-datos)

### Escenario 2: Eliminación Accidental

**Síntomas:**
- Datos faltantes
- Tablas eliminadas
- Usuarios reportan pérdida de información

**Acción Inmediata:**
1. **NO** hacer más cambios en la base de datos
2. Identificar qué se eliminó y cuándo
3. Restaurar desde backup anterior al incidente

**Procedimiento:** Ver [Restauración Selectiva](#restauración-selectiva)

### Escenario 3: Ataque Ransomware

**Síntomas:**
- Archivos cifrados
- Mensaje de rescate
- Acceso denegado a sistemas

**Acción Inmediata:**
1. **DESCONECTAR** todos los sistemas de la red
2. **NO** pagar el rescate
3. Contactar autoridades (Policía Cibernética)
4. Activar plan de disaster recovery

**Procedimiento:** Ver [Recuperación Total](#recuperación-total)

---

## 🔧 PROCEDIMIENTOS DE RESTAURACIÓN

### Restauración de Base de Datos

**Tiempo Estimado:** 2-4 horas  
**RPO:** < 24 horas  
**RTO:** < 4 horas

#### Paso 1: Preparación

```bash
# 1. Acceder al servidor de backups
ssh backup-server

# 2. Listar backups disponibles
aws s3 ls s3://sinapcode-backups/database/ --recursive | tail -20

# 3. Identificar el backup a restaurar
# Formato: backup_YYYYMMDD_HHMMSS.dump.enc
BACKUP_FILE="backup_20260112_020000.dump.enc"
```

#### Paso 2: Descargar Backup

```bash
# Crear directorio temporal
mkdir -p /tmp/restore
cd /tmp/restore

# Descargar backup de S3
aws s3 cp \
  "s3://sinapcode-backups/database/${BACKUP_FILE}" \
  .

# Descargar checksum
aws s3 cp \
  "s3://sinapcode-backups/database/${BACKUP_FILE%.enc}.sha256" \
  .
```

#### Paso 3: Verificar Integridad

```bash
# Descifrar backup
openssl enc -aes-256-cbc -d \
  -pbkdf2 \
  -in "${BACKUP_FILE}" \
  -out "restore.dump" \
  -pass "pass:${BACKUP_ENCRYPTION_KEY}"

# Verificar checksum
sha256sum -c "${BACKUP_FILE%.enc}.sha256"
```

#### Paso 4: Restaurar en Staging

```bash
# Ejecutar script de restauración
RESTORE_MODE=staging \
DATABASE_URL="${STAGING_DATABASE_URL}" \
BACKUP_ENCRYPTION_KEY="${BACKUP_ENCRYPTION_KEY}" \
./scripts/restore-database.sh "${BACKUP_FILE}"
```

#### Paso 5: Verificar Datos

```bash
# Conectar a staging
psql "${STAGING_DATABASE_URL}"

# Verificar conteo de usuarios
SELECT COUNT(*) FROM users;

# Verificar último registro
SELECT * FROM users ORDER BY "createdAt" DESC LIMIT 5;

# Verificar integridad referencial
SELECT COUNT(*) FROM legal_consents WHERE "userId" NOT IN (SELECT id FROM users);
```

#### Paso 6: Restaurar en Producción

```bash
# Poner aplicación en modo mantenimiento
vercel env add MAINTENANCE_MODE true

# Ejecutar restauración
RESTORE_MODE=production \
DATABASE_URL="${DATABASE_URL}" \
BACKUP_ENCRYPTION_KEY="${BACKUP_ENCRYPTION_KEY}" \
./scripts/restore-database.sh "${BACKUP_FILE}"

# Verificar producción
psql "${DATABASE_URL}" -c "SELECT COUNT(*) FROM users;"

# Desactivar modo mantenimiento
vercel env rm MAINTENANCE_MODE
```

#### Paso 7: Comunicación

```bash
# Enviar notificación a usuarios
curl -X POST https://api.sendgrid.com/v3/mail/send \
  -H "Authorization: Bearer ${SENDGRID_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "personalizations": [{"to": [{"email": "users@sinapcode.com"}]}],
    "from": {"email": "noreply@sinapcode.com"},
    "subject": "Servicio Restaurado",
    "content": [{"type": "text/plain", "value": "El servicio ha sido restaurado..."}]
  }'
```

---

### Restauración Selectiva

**Cuando usar:** Solo necesitas restaurar datos específicos (ej. una tabla)

```bash
# 1. Restaurar backup completo en BD temporal
createdb sinapcode_temp
pg_restore -d sinapcode_temp restore.dump

# 2. Exportar tabla específica
pg_dump sinapcode_temp -t users > users_backup.sql

# 3. Restaurar solo esa tabla en producción
psql "${DATABASE_URL}" < users_backup.sql

# 4. Limpiar
dropdb sinapcode_temp
```

---

### Recuperación Total

**Cuando usar:** Desastre completo (ransomware, fallo de hardware, etc.)

#### Fase 1: Evaluación (0-30 min)

- [ ] Identificar alcance del desastre
- [ ] Determinar último backup válido
- [ ] Notificar equipo de emergencia
- [ ] Activar plan de comunicación

#### Fase 2: Preparación (30-60 min)

- [ ] Provisionar nueva infraestructura (si es necesario)
- [ ] Descargar todos los backups necesarios
- [ ] Verificar integridad de backups
- [ ] Preparar ambiente de restauración

#### Fase 3: Restauración (1-4 horas)

- [ ] Restaurar base de datos
- [ ] Restaurar código fuente
- [ ] Restaurar configuración
- [ ] Restaurar archivos estáticos

#### Fase 4: Verificación (30-60 min)

- [ ] Verificar integridad de datos
- [ ] Ejecutar tests de humo
- [ ] Verificar funcionalidades críticas
- [ ] Confirmar con stakeholders

#### Fase 5: Activación (15-30 min)

- [ ] Actualizar DNS (si cambió infraestructura)
- [ ] Activar aplicación
- [ ] Monitorear métricas
- [ ] Comunicar a usuarios

---

## 📝 CHECKLIST DE VERIFICACIÓN

### Pre-Restauración

- [ ] Backup identificado y descargado
- [ ] Checksum verificado
- [ ] Equipo notificado
- [ ] Modo mantenimiento activado
- [ ] Backup de BD actual creado

### Post-Restauración

- [ ] Conteo de registros correcto
- [ ] Integridad referencial verificada
- [ ] Funcionalidades críticas probadas
- [ ] Logs revisados
- [ ] Modo mantenimiento desactivado
- [ ] Usuarios notificados

---

## 🔐 CREDENCIALES DE ACCESO

**Ubicación:** 1Password Vault "Emergency Access"

**Credenciales Necesarias:**
- AWS Access Keys (S3)
- Database URLs (Staging, Production)
- Backup Encryption Key
- Vercel Access Token
- Supabase API Keys

**Acceso de Emergencia:**
- Vault compartido con CTO y DevOps Lead
- Requiere MFA
- Audit trail completo

---

## 📊 MÉTRICAS DE ÉXITO

| Métrica | Objetivo | Medición |
|---------|----------|----------|
| **RTO** | < 4 horas | Tiempo desde incidente hasta servicio restaurado |
| **RPO** | < 24 horas | Máxima pérdida de datos |
| **Downtime** | < 2 horas | Tiempo de inactividad total |
| **Data Loss** | 0% | Porcentaje de datos perdidos |

---

## 📞 ESCALACIÓN

### Nivel 1: DevOps (0-30 min)
- Intento inicial de restauración
- Diagnóstico del problema

### Nivel 2: CTO (30-60 min)
- Si DevOps no puede resolver
- Decisiones técnicas críticas

### Nivel 3: CEO + Legal (60+ min)
- Si hay pérdida de datos significativa
- Comunicación externa requerida
- Implicaciones legales (GDPR)

---

**Última Prueba:** Pendiente  
**Próxima Prueba:** 19 de enero de 2026  
**Mantenedor:** DevOps Team
