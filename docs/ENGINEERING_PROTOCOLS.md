# 🛡️ PROTOCOLO DE INGENIERÍA SAFE-GUARD (NIVEL STARTUP/ENTERPRISE)

> **Objetivo:** Eliminar riesgos de pérdida de código, duplicidad de versiones y daños irreversibles.  
> **Estándar:** Basado en prácticas de Google, Meta y YC Startups.

## 1. La Regla de Oro: "Single Source of Truth" (SSOT)

**PRINCIPIO:** Solo existe UNA ubicación válida para el código fuente.
- ✅ **Ubicación Sagrada:** `apps/web` (dentro del monorepo)
- ⛔ **Prohibido:** Crear carpetas `src` en la raíz del proyecto.
- ⛔ **Prohibido:** Editar archivos fuera de la estructura designada sin autorización.

**ACCIÓN AUTOMÁTICA:**
Cualquier carpeta `src` detectada en la raíz debe ser auditada y eliminada inmediatamente tras migrar su contenido útil.

---

## 2. Protocolo "Atomic & Reversible" (Git Flow)

**PRINCIPIO:** Ningún cambio es final hasta que se verifica.
- **Commits Atómicos:** Un commit por tarea lógica.
- **Mensajes Semánticos:** Usar [Conventional Commits](https://www.conventionalcommits.org/).
- **Regla del Build:** JAMÁS hacer `git push` sin haber corrido `npm run build` localmente con éxito.

---

## 3. Procedimiento de "Contexto Persistente"

**PRINCIPIO:** El Agente no debe "olvidar" el estado del proyecto.
1. 📖 **Leer `task.md` y `ENGINEERING_PROTOCOLS.md`** al inicio de cada sesión.
2. 🔍 **Escanear estructura** (`list_dir`) para detectar anomalías.
3. 🧠 **Revisar logs anteriores** si hay dudas sobre decisiones pasadas.

---

## 4. Política de "Zero Broken Links"

**PRINCIPIO:** Calidad visual y funcional.
- **Verificación:** Revisar `href` en Navbar/Footer antes de cerrar tareas.
- **Limpieza:** Eliminar enlaces a páginas inexistentes inmediatamente.

---

## 5. Recuperación ante Desastres (Rollback Plan)

Si se detecta un "Daño Irreversible":
1. 🛑 **DETENER** toda escritura.
2. ⏪ **REVERTIR** (`git reset --hard HEAD~1`).
3. 📋 **RE-EVALUAR** estrategia.

---

**Estado:** ACTIVO
**Implementado:** 18 de Enero de 2026
