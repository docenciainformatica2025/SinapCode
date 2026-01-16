# 🎯 Configuración Correcta de Vercel para Monorepo + Prisma

## Problema Identificado

**Error:** `Could not find Prisma Schema`

**Causa:** El schema de Prisma está en `/prisma/schema.prisma` (raíz del proyecto), pero Vercel intenta ejecutar `npx prisma generate` desde `apps/web`.

---

## ✅ Solución: Configurar Vercel Correctamente

### Paso 1: Configurar Root Directory

1. Ve a **Vercel Dashboard** → tu proyecto → **Settings** → **General**
2. Busca **"Root Directory"**
3. Configura: `apps/web`
4. Click **"Save"**

### Paso 2: Configurar Build Command

1. En la misma página, busca **"Build & Development Settings"**
2. Click en **"Override"** en **Build Command**
3. Usa este comando:

```bash
cd ../.. && npx prisma generate && npx prisma db push && cd apps/web && next build
```

**Explicación:**
- `cd ../..` → Va a la raíz del proyecto (donde está `/prisma/schema.prisma`)
- `npx prisma generate` → Genera el Prisma Client
- `npx prisma db push` → **IMPORTANTE:** Sincroniza la base de datos con el nuevo schema (crea columas faltantes como `eventType`)
- `cd apps/web` → Vuelve a la carpeta de la app
- `next build` → Construye Next.js

4. Click **"Save"**

### Paso 3: Verificar Output Directory

- **Output Directory:** `.next` (default, déjalo así)

### Paso 4: Redeploy

1. Ve a **Deployments**
2. Click en el último deployment
3. Click **"Redeploy"**

---

## 🔍 Verificación

Después del redeploy:

1. **Build debe ser exitoso** (sin errores de Prisma)
2. **Verifica:** `https://sinap-code.vercel.app/api/auth/session`
   - ✅ Debe devolver: `{}`
   - ❌ Si devuelve 404: Problema con NextAuth (diferente)

---

## 📋 Resumen de Configuración

| Setting | Valor |
|---------|-------|
| Root Directory | `apps/web` |
| Build Command | `cd ../.. && npx prisma generate && cd apps/web && next build` |
| Output Directory | `.next` |
| Install Command | `npm install` (default) |

---

## 🚨 Si Sigue Fallando

**Alternativa 1:** Mover schema a `apps/web/prisma/`

```bash
mkdir -p apps/web/prisma
cp prisma/schema.prisma apps/web/prisma/
```

Luego usar build command simple:
```bash
npx prisma generate && next build
```

**Alternativa 2:** Usar `--schema` flag

```bash
npx prisma generate --schema=../../prisma/schema.prisma && next build
```

---

## 🎯 Próximo Paso

Configura el Build Command en Vercel con el comando correcto y haz redeploy.
