# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-01-19

### Added
- **Arquitectura Monorepo Profesional**: Migración de todo el código fuente y activos a `apps/web` siguiendo el protocolo SAFE-GUARD.
- **NPM Workspaces**: Implementación de espacios de trabajo en la raíz para una gestión de dependencias centralizada y eficiente.
- **Vercel Native Deployment**: Archivo `vercel.json` para configuración de despliegue sin hacks de consola.
- **Syllabus Placeholder**: Nueva página `/syllabus` para mejorar la experiencia del usuario y evitar errores 404.

### Changed
- **Upgrade a Next.js 14.1.0**: Salto a versión 14 estable para resolver problemas de `jsx-runtime` y optimizar el App Router.
- **Estandarización de React**: Forzado de versión 18.2.0 en todo el árbol de dependencias para garantizar consistencia en hooks y renderizado.
- **Configuración de Imágenes**: Transición a `remotePatterns` para Unsplash, cumpliendo con los últimos estándares de seguridad de Next.js.
- **Estructura de Directorios**: Limpieza total de la raíz; `src/`, `public/` y `prisma/` ahora residen exclusivamente en `apps/web`.

### Fixed
- **Internal Server Error (500)**: Resuelto conflicto de versiones entre React 18.3 y Next.js 13.
- **Console Errors (404)**: Corregidos errores de carga de imágenes de Unsplash en producción.
- **Legal Consent API**: Fix en error 400 para usuarios anónimos y estandarización del esquema Prisma.
- **Build Warnings**: Silenciado de `DynamicServerError` ruidosos durante la generación estática.

## [2.1.1] - 2026-01-18

### Fixed
- Downgrade temporal a Next.js 13.5.6 para depuración de dependencias.
- Ajustes de `metadataBase` en el layout raíz.
- Conexión proxy del backend en `next.config.js`.
