# 🛡️ ENGINEERING PROTOCOL (OBLIGATORIO)

Este archivo es de cumplimiento obligatorio. Ningún cambio, build o despliegue está autorizado si este protocolo no se respeta.

## 1️⃣ Identidad del Proyecto

- **Proyecto:** SinapCode - Plataforma de Aprendizaje Tech con IA
- **Repositorio:** `github.com/docenciainformatica2025/SinapCode`
- **Stack principal:** Next.js 14.1.0 (App Router), React 18.2.0, Prisma 5.22.0, Tailwind CSS, NPM Workspaces.
- **Entorno(s):** local / producción (pilar fundamental: Vercel)
- **Responsable técnico:** SinapCode Engineering Team / Antonio R.
- **Fecha de implementación:** 19 de enero de 2026

## 2️⃣ Reglas Inmutables

- ❌ **Prohibido modificar producción directamente** (Hotfixes solo vía Git).
- ❌ **Prohibido eliminar código sin trazabilidad**.
- ✅ **Todo cambio debe poder revertirse** (Rollback Plan).
- ✅ **Todo cambio pasa por Git** (Workflows establecidos).
- ✅ **El proyecto debe compilar en entorno limpio** (Zero hacks locales).

## 3️⃣ Control de Versiones (Git)

### Ramas permitidas
- `main`        → Producción estable.
- `develop`     → Integración y pruebas.
- `feature/*`   → Nuevas funcionalidades.
- `fix/*`       → Correcciones de errores.
- `hotfix/*`    → Incidentes críticos.

### Convención de commits
- `feat`: nueva funcionalidad
- `fix`: corrección de error
- `refactor`: mejora interna sin cambio de lógica
- `chore`: tareas técnicas / mantenimiento
- `docs`: documentación

## 4️⃣ Versionamiento (SemVer)

- **Formato:** MAJOR.MINOR.PATCH
- **MAJOR:** Cambio incompatible (Breaking change).
- **MINOR:** Nueva funcionalidad (Backward compatible).
- **PATCH:** Corrección de error (Backward compatible).

## 5️⃣ Dependencias

- ✅ Todas las dependencias deben estar declaradas en `apps/web/package.json`.
- ✅ Uso obligatorio de **NPM Workspaces** para gestión de hoisting.
- ✅ Uso obligatorio de `package-lock.json`.
- ✅ Prohibido usar dependencias implícitas (fantasmas).
- ✅ Revisar changelog antes de cualquier actualización.

## 6️⃣ Calidad de Código

- 💎 Código legible y **TypeScript estricto**.
- 💎 ESLint activo y sin errores.
- 💎 **Sin hardcodeo de secretos** (Uso de `.env`).
- 💎 Funciones pequeñas, modulares y puras.

## 7️⃣ Testing

- 🧪 Tests unitarios (Jest).
- 🧪 Tests de integración (RTL).
- 🧪 Prueba manual documentada.
- **Regla de Oro:** Si no se puede probar, no se despliega.

## 8️⃣ Build y Despliegue (Checklist)

1. [ ] `npm run lint` sin errores.
2. [ ] `npx tsc --noEmit` exitoso.
3. [ ] `npm run build` en local antes de push.
4. [ ] Variables de entorno en Vercel sincronizadas.

## 9️⃣ Rollback

- ⏪ Versión estable anterior identificada por Commit ID.
- ⏪ Procedimiento documentado en `DEPLOYMENT_HISTORY.md`.
- ⏪ Integridad de datos asegurada.

## 🔟 Seguridad

- 🛡️ Variables sensibles **NUNCA** en el repo.
- 🛡️ Validación de todos los inputs con **Zod**.
- 🛡️ Dependencias auditadas (`npm audit`).
- 🛡️ CSP (Content Security Policy) activa en `headers`.

## 11️⃣ Documentación Viva

- [x] **README.md** actualizado.
- [x] Instrucciones de instalación claras.
- [x] Instrucciones de despliegue en Vercel.
- [x] Registro de decisiones técnicas en `ENGINEERING_DECISIONS.md`.

## 12️⃣ Declaración Final

Todo cambio que viole este protocolo será revertido. Todo despliegue sin checklist aprobado será considerado inválido.

**Responsable técnico:** SinapCode Architect  
**Fecha:** 19 de enero de 2026
