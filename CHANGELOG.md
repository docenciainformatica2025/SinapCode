# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

## [1.1.0] - 2026-01-12

### Agregado
- Sistema completo de registro de usuarios (`/api/auth/register`)
- Hash de contraseñas con bcrypt (10 rounds)
- Validación de emails duplicados
- Endpoint de consentimientos legales (`/api/legal/consent`)
- Soporte para usuarios anónimos durante registro
- Cliente Prisma singleton para optimización de conexiones
- Dependencia bcryptjs para seguridad de contraseñas

### Corregido
- Error 500 en endpoint de consentimientos legales
- Violación de integridad referencial en tabla `legal_consents`
- Errores de build por módulos faltantes
- Errores de TypeScript por campos inexistentes en schema
- Configuración de `.gitignore` para excluir archivos temporales

### Cambiado
- Simplificado modelo de User (removidos campos no utilizados)
- Actualizado `.gitignore` siguiendo mejores prácticas de Next.js
- Mejorada documentación del sistema de autenticación

### Seguridad
- Implementado hashing de contraseñas con bcrypt
- Validación de entrada con Zod
- Protección contra inyección SQL con Prisma

## [1.0.0] - 2026-01-10

### Agregado
- Estructura inicial del proyecto Next.js 14
- Configuración de NextAuth para autenticación
- Integración con Supabase PostgreSQL
- Esquema de Prisma para base de datos
- Sistema de consentimientos legales (GDPR/COPPA)
- Páginas de login y registro (UI)
- Configuración de Tailwind CSS
- Configuración de TypeScript

### Notas
- Primera versión funcional del sistema
- Base de datos configurada en Supabase
- Autenticación con NextAuth v4

---

## Tipos de Cambios

- `Agregado` para nuevas funcionalidades
- `Cambiado` para cambios en funcionalidades existentes
- `Obsoleto` para funcionalidades que serán removidas
- `Removido` para funcionalidades removidas
- `Corregido` para corrección de bugs
- `Seguridad` para vulnerabilidades corregidas
