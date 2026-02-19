# 🧠 ENGINEERING_DECISIONS.md

Este archivo registra las decisiones arquitectónicas clave y la justificación técnica detrás de ellas.

---

## [2026-01-19] Migración a Monorepo Profesional (SAFE-GUARD)

### Contexto
El proyecto presentaba rutas de activos rotas, errores 500 por incompatibilidad de dependencias y una estructura de carpetas inconsistente que dificultaba el despliegue estable en Vercel.

### Decisión
Migrar toda la lógica de negocio y activos a `apps/web` y habilitar **NPM Workspaces** en la raíz.

### Justificación
- **SSOT (Single Source of Truth):** Elimina la ambigüedad de dónde reside el código productivo.
- **Nativo de Vercel:** Al usar `workspaces`, Vercel puede gestionar el hoisting de dependencias de forma eficiente.
- **Escalabilidad:** Permite añadir futuros paquetes (ej. `packages/ui`, `packages/db`) sin romper la aplicación principal.

---

## [2026-01-19] Upgrade a Next.js 14.1.0 y Pinning de React 18.2.0

### Contexto
Conflictos entre el `jsx-runtime` de React 18.3.1 y Next.js 13.5.6 causaban fallos en producción.

### Decisión
Pinning estricto de **React 18.2.0** y actualización a **Next.js 14.1.0**.

### Justificación
- **Estabilidad:** React 18.2.0 es la versión más estable para el ecosistema actual de librerías utilizadas.
- **Resolución de Bugs:** Next.js 14.1.0 corrige problemas de rutas de manifiesto y ofrece mejor soporte para Server Components en monorepos.

---

## [2026-01-19] Implementación de vercel.json Declarativo

### Contexto
Vercel no localizaba automáticamente los artefactos de construcción en la subcarpeta `apps/web/.next`.

### Decisión
Añadir `vercel.json` en la raíz definiendo explícitamente el `outputDirectory`.

### Justificación
- **Zero-Hack Policy:** Evita mover archivos manualmente en scripts de build, manteniendo el flujo de trabajo estándar del framework.
