# SinapCode - Plataforma de Aprendizaje de Programación

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748)](https://www.prisma.io/)
[![Protocol](https://img.shields.io/badge/Protocol-SAFE--GUARD-gold)](https://sinapcode.com)

Plataforma educativa para aprender programación con IA, diseñada para estudiantes colombianos.

## 🚀 Características

- ✅ **Autenticación Segura** - NextAuth v4 con hash de contraseñas bcrypt
- ✅ **Base de Datos** - PostgreSQL con Supabase
- ✅ **ORM** - Prisma para consultas type-safe
- ✅ **Cumplimiento Legal** - Sistema de consentimientos GDPR/COPPA
- ✅ **UI Moderna** - Tailwind CSS + Framer Motion
- ✅ **TypeScript** - 100% type-safe

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm o pnpm
- Cuenta de Supabase (para base de datos)

## 🛠️ Instalación

```bash
# Clonar repositorio
git clone https://github.com/docenciainformatica2025/SinapCode.git
cd SinapCode

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma db push

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Database (Supabase)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="tu-secret-aleatorio-muy-largo"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (opcional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_ID="..."
GITHUB_SECRET="..."
```

## 📁 Estructura del Proyecto (Monorepo)

El proyecto utiliza una arquitectura de monorepo gestionada por **NPM Workspaces** y siguiendo el protocolo **SAFE-GUARD**:

```
SinapCode/ (Root - Capa de Orquestación)
├── apps/
│   └── web/ (SSOT - Aplicación Principal)
│       ├── src/
│       │   ├── app/           # App Router (Next.js 14)
│       │   ├── components/    # Componentes UI/UX
│       │   ├── lib/           # Utilidades y configs
│       │   └── contexts/      # Proveedores de estado
│       ├── prisma/            # Esquema y migraciones
│       ├── public/            # Assets estáticos
│       └── content/           # MDX y docs legales
├── package.json               # Workspaces y scripts puente
├── vercel.json                # Configuración de despliegue
└── CHANGELOG.md               # Historial de cambios SemVer
```

## 🗄️ Base de Datos

El proyecto utiliza PostgreSQL a través de Supabase con el siguiente esquema:

- **users** - Información de usuarios
- **accounts** - Cuentas OAuth
- **sessions** - Sesiones de NextAuth
- **legal_consents** - Registro de consentimientos

Ver `prisma/schema.prisma` para el esquema completo.

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- Validación de entrada con Zod
- Protección CSRF con NextAuth
- Registro de consentimientos para cumplimiento legal
- Variables de entorno para secretos

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter de código
```

## 🚀 Despliegue

El proyecto está configurado para desplegarse en Vercel:

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno en Vercel
3. Vercel desplegará automáticamente en cada push a `main`

## 📄 Licencia

Este proyecto es privado y propietario.

## 👥 Equipo

- **Docencia Informática 2025** - Desarrollo y mantenimiento

## 📞 Soporte

Para soporte, contacta a: [email de soporte]

---

**Versión:** 2.2.0  
**Última actualización:** 2026-01-19
