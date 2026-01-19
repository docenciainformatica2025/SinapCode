# Configuración de Base de Datos - Guía de Despliegue

## 🔧 Configuración Local

### 1. Copiar Variables de Entorno

```bash
cp .env.example .env
```

### 2. Obtener Credenciales de Supabase

1. Ir a [Supabase Dashboard](https://supabase.com/dashboard)
2. Seleccionar tu proyecto
3. Ir a **Settings** > **Database**
4. En **Connection String**, seleccionar:
   - **Type:** URI
   - **Source:** Primary Database
   - **Method:** **Transaction pooler** ⚠️ (NO "Direct connection")

### 3. Actualizar `.env`

Reemplazar en el archivo `.env`:

```bash
# Ejemplo con tus credenciales reales
DATABASE_URL="postgresql://postgres.zwmkrbeojsycdxcnqlmy:TU_PASSWORD@aws-1-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.zwmkrbeojsycdxcnqlmy:TU_PASSWORD@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
```

**⚠️ IMPORTANTE:**
- Usar **puerto 6543** (pooler) para ambas URLs
- **NO usar puerto 5432** (requiere IPv6 o addon de pago)
- El `pool_mode: transaction` es compatible con Prisma migrations

---

## 🚀 Despliegue en Vercel

### Variables de Entorno Requeridas

En Vercel Dashboard > Settings > Environment Variables:

```
DATABASE_URL=postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-us-east-2.pooler.supabase.com:6543/postgres
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=GENERAR_CON_openssl_rand_base64_32
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=TU_SITE_KEY
RECAPTCHA_SECRET_KEY=TU_SECRET_KEY
```

### Ejecutar Migraciones en Producción

Después del primer deploy:

```bash
# Desde tu máquina local con las credenciales de producción
npx prisma db push
```

O configurar en Vercel Build Command:

```bash
npx prisma generate && npx prisma db push && next build
```

---

## 🐛 Troubleshooting

### Error: "Can't reach database server at port 5432"

**Causa:** Estás usando la conexión directa en lugar del pooler.

**Solución:**
1. Verificar que `DIRECT_URL` use puerto **6543** (no 5432)
2. Verificar que el host sea `aws-1-us-east-2.pooler.supabase.com`

### Error: "Tenant or user not found"

**Causa:** Credenciales incorrectas o región equivocada.

**Solución:**
1. Verificar que el host sea `aws-1` (no `aws-0`)
2. Resetear la contraseña en Supabase Dashboard
3. Usar el script de diagnóstico:
   ```bash
   node scripts/db-check.js
   ```

### Error: "password authentication failed"

**Causa:** Contraseña incorrecta o caracteres especiales mal codificados.

**Solución:**
1. Resetear contraseña en Supabase
2. Si la contraseña tiene caracteres especiales (`@`, `#`, etc.), codificarlos:
   - `@` → `%40`
   - `#` → `%23`
   - `&` → `%26`

---

## 📋 Checklist de Configuración

### Desarrollo Local
- [ ] Archivo `.env` creado desde `.env.example`
- [ ] `DATABASE_URL` configurada con pooler (puerto 6543)
- [ ] `DIRECT_URL` configurada con pooler (puerto 6543)
- [ ] `npx prisma db push` ejecutado exitosamente
- [ ] `npx prisma generate` ejecutado
- [ ] Servidor dev reiniciado (`npm run dev`)

### Producción (Vercel)
- [ ] Variables de entorno configuradas en Vercel Dashboard
- [ ] `DATABASE_URL` apunta al pooler de producción
- [ ] `NEXTAUTH_SECRET` generado de forma segura
- [ ] `NEXTAUTH_URL` apunta al dominio de producción
- [ ] Migraciones ejecutadas en la base de datos de producción
- [ ] Build exitoso en Vercel

---

## 🔐 Seguridad

### Variables Sensibles

**NUNCA commitear:**
- `.env` (debe estar en `.gitignore`)
- Contraseñas de base de datos
- API keys

**Sí commitear:**
- `.env.example` (con placeholders)
- Documentación de configuración

### Generar Secrets Seguros

```bash
# NEXTAUTH_SECRET
openssl rand -base64 32

# O en Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📚 Referencias

- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Prisma with Supabase](https://www.prisma.io/docs/guides/database/supabase)
- [NextAuth Environment Variables](https://next-auth.js.org/configuration/options#environment-variables)
