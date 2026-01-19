# Documentación Técnica - Fase 1: Inicialización Monorepo

## 1. Arquitectura de Repositorio (Turborepo)
Se ha implementado una arquitectura de **Monorepo** utilizando `Turborepo` para gestionar múltiples aplicaciones y paquetes compartidos en un solo repositorio de Git. Esto permite:
*   **Gestión Centralizada:** Unificar el Frontend (Next.js) y el Backend (NestJS) en el mismo lugar.
*   **Cache Remoto:** Acelerar los tiempos de build reutilizando cómputo.
*   **Consistencia:** Compartir configuraciones de ESLint, TypeScript y TailwindCSS entre proyectos.

## 2. Estructura de Directorios
```bash
/
├── apps/
│   ├── web/        # Frontend: Next.js 14 (App Router)
│   └── api/        # Backend: NestJS (Microservicios)
├── packages/
│   ├── ui/         # Design System (Componentes React compartidos)
│   └── config/     # Configuraciones compartidas (TSConfig, ESLint)
├── docs/           # Documentación técnica viva
├── turbo.json      # Pipeline de construcción
└── package.json    # Scripts raíz
```

## 3. Tecnologías Base
*   **Gestor de Paquetes:** `pnpm` (por su eficiencia en espacio y velocidad).
*   **Orquestador:** `turbo` (Vercel).
*   **Motor:** Node.js v18+.

## 4. Estado Actual
*   [x] Estructura de carpetas creada.
*   [x] Archivos de configuración raíz definidos (`turbo.json`, `pnpm-workspace.yaml`).
*   [ ] Pendiente: Inicializar app Next.js en `apps/web`.
*   [ ] Pendiente: Inicializar app NestJS en `apps/api`.
