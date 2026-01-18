# Matriz de Cumplimiento GDPR - SinapCode

**Versión:** 1.0.0  
**Fecha:** 12 de enero de 2026  
**Basado en:** GDPR (EU 2016/679)

## Estado de Cumplimiento

| Artículo | Requisito | Estado | Implementación | Evidencia |
|----------|-----------|--------|----------------|-----------|
| **Art. 5** | Principios de procesamiento | ✅ | Política de Privacidad | `docs/legal/privacy-policy.md` |
| **Art. 6** | Bases legales | ✅ | Consentimiento explícito | `src/app/api/legal/consent/` |
| **Art. 7** | Condiciones para consentimiento | ✅ | Checkboxes + registro | `legal_consents` table |
| **Art. 12** | Información transparente | ✅ | Política de Privacidad accesible | `/privacy` |
| **Art. 13** | Información en recopilación | ✅ | Formulario de registro | `/auth/register` |
| **Art. 15** | Derecho de acceso | 🟡 | En desarrollo | Endpoint `/api/user/data-export` |
| **Art. 16** | Derecho de rectificación | ✅ | Perfil de usuario | `/profile/edit` |
| **Art. 17** | Derecho al olvido | 🟡 | En desarrollo | Endpoint `/api/user/delete` |
| **Art. 18** | Derecho a restricción | 🟡 | Planificado | Q2 2026 |
| **Art. 20** | Portabilidad de datos | 🟡 | En desarrollo | Formato JSON |
| **Art. 25** | Privacy by design | ✅ | Arquitectura del sistema | `docs/architecture/` |
| **Art. 30** | Registro de actividades | ✅ | Logs de auditoría | `legal_consents`, logs |
| **Art. 32** | Seguridad del procesamiento | ✅ | Política de Seguridad | `docs/security/` |
| **Art. 33** | Notificación de brechas (autoridad) | ✅ | Plan de respuesta | `docs/security/incident-response.md` |
| **Art. 34** | Notificación de brechas (usuarios) | ✅ | Plan de respuesta | `docs/security/incident-response.md` |
| **Art. 35** | Evaluación de impacto (DPIA) | ✅ | Completada | `docs/compliance/dpia.md` |
| **Art. 37** | Designación de DPO | 🟡 | Planificado | Q2 2026 |

**Leyenda:**
- ✅ Implementado y funcional
- 🟡 En desarrollo o planificado
- ❌ No implementado

## Derechos de los Interesados

### 1. Derecho de Acceso (Art. 15)

**Estado:** 🟡 En desarrollo

**Implementación Actual:**
- Usuario puede ver su perfil en `/profile`
- Puede ver su historial de actividad

**Pendiente:**
- Exportación completa de datos en formato JSON
- Endpoint: `GET /api/user/data-export`

**Plazo de Respuesta:** 30 días (GDPR)

### 2. Derecho de Rectificación (Art. 16)

**Estado:** ✅ Implementado

**Implementación:**
- Formulario de edición de perfil: `/profile/edit`
- Usuario puede actualizar: nombre, email, preferencias
- Validación de datos con Zod

### 3. Derecho al Olvido (Art. 17)

**Estado:** 🟡 En desarrollo

**Implementación Planificada:**
```typescript
// Endpoint: DELETE /api/user/delete
// 1. Verificar identidad del usuario
// 2. Anonimizar datos en lugar de eliminar (para cumplir retención legal)
// 3. Eliminar datos no sujetos a retención
// 4. Notificar a terceros (Supabase, Vercel)
// 5. Confirmar eliminación al usuario
```

**Excepciones:**
- Obligaciones legales (retención fiscal: 5 años)
- Reclamaciones legales en curso
- Interés público

### 4. Portabilidad de Datos (Art. 20)

**Estado:** 🟡 En desarrollo

**Formato de Exportación:**
```json
{
  "user": {
    "id": "...",
    "email": "...",
    "name": "...",
    "createdAt": "..."
  },
  "consents": [...],
  "activity": [...],
  "progress": [...]
}
```

## Bases Legales para Procesamiento

| Tipo de Dato | Base Legal | Justificación |
|--------------|------------|---------------|
| Email, nombre | Contrato | Necesario para prestar servicio |
| Contraseña (hash) | Contrato | Autenticación del usuario |
| IP, logs | Interés legítimo | Seguridad y prevención de fraude |
| Cookies esenciales | Contrato | Funcionalidad del sitio |
| Cookies analíticas | Consentimiento | Mejora de servicios |
| Progreso educativo | Contrato | Personalización del aprendizaje |

## Registro de Actividades de Procesamiento (Art. 30)

### Actividad 1: Registro de Usuarios

- **Responsable:** SinapCode
- **Finalidad:** Crear cuenta de usuario
- **Categorías de datos:** Email, nombre, contraseña (hash)
- **Categorías de interesados:** Estudiantes, profesores
- **Destinatarios:** Supabase (hosting BD)
- **Transferencias:** EE.UU. (Supabase)
- **Plazos de supresión:** 2 años desde última actividad
- **Medidas de seguridad:** TLS 1.3, bcrypt, validación

### Actividad 2: Registro de Consentimientos

- **Responsable:** SinapCode
- **Finalidad:** Cumplimiento GDPR Art. 7
- **Categorías de datos:** IP, user agent, timestamp, tipo de documento
- **Categorías de interesados:** Todos los usuarios
- **Destinatarios:** Supabase
- **Transferencias:** EE.UU.
- **Plazos de supresión:** Permanente (evidencia legal)
- **Medidas de seguridad:** Logs inmutables, cifrado

## Transferencias Internacionales (Art. 44-50)

### Supabase (EE.UU.)

- **Mecanismo:** Cláusulas Contractuales Estándar (SCC)
- **Garantías:** Cifrado AES-256, acceso restringido
- **Evaluación:** Riesgo bajo (empresa certificada)

### Vercel (EE.UU.)

- **Mecanismo:** Cláusulas Contractuales Estándar (SCC)
- **Garantías:** Edge Network, DDoS protection
- **Evaluación:** Riesgo bajo (SOC 2 Type II)

## Evaluación de Impacto de Privacidad (DPIA)

**Fecha:** 12 de enero de 2026  
**Resultado:** Riesgo BAJO

**Factores Evaluados:**
- ✅ No procesamos datos sensibles (salud, religión, etc.)
- ✅ No hacemos perfilado automatizado
- ✅ No monitoreamos sistemáticamente
- ✅ Medidas de seguridad robustas implementadas

**Riesgos Identificados:**
1. **Brecha de datos** - Mitigado con cifrado y auditorías
2. **Acceso no autorizado** - Mitigado con autenticación fuerte
3. **Pérdida de datos** - Mitigado con backups diarios

**Documento Completo:** `docs/compliance/dpia.md`

## Plan de Acción

### Q1 2026 (Enero - Marzo)
- [x] Implementar registro de consentimientos
- [x] Crear política de privacidad
- [x] Implementar cifrado de contraseñas
- [ ] Desarrollar endpoint de exportación de datos
- [ ] Desarrollar endpoint de eliminación de cuenta

### Q2 2026 (Abril - Junio)
- [ ] Designar Data Protection Officer (DPO)
- [ ] Implementar derecho a restricción
- [ ] Auditoría externa de cumplimiento GDPR
- [ ] Certificación ISO 27001 (inicio)

### Q3 2026 (Julio - Septiembre)
- [ ] Implementar sistema de gestión de consentimientos granular
- [ ] Mejorar transparencia de procesamiento
- [ ] Capacitación GDPR para todo el equipo

## Contacto

**Data Protection Officer (DPO):**
- Email: dpo@sinapcode.com
- Responsable: [Nombre del DPO]

**Autoridad de Supervisión:**
- Superintendencia de Industria y Comercio (SIC) - Colombia
- Agencia Española de Protección de Datos (AEPD) - UE

---

**Última Actualización:** 12 de enero de 2026  
**Próxima Revisión:** 12 de abril de 2026  
**Versión:** 1.0.0
