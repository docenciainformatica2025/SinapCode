# 🚨 SOLUCIÓN URGENTE: NextAuth 404 en Producción

## Problema Confirmado
- ✅ Build exitoso en Vercel
- ✅ Usuario creado en base de datos
- ❌ `/api/auth/session` devuelve 404
- ❌ NextAuth NO funciona en producción

## Causa Raíz
Falta variable de entorno crítica: **`AUTH_SECRET`**

NextAuth v5 requiere `AUTH_SECRET` (no solo `NEXTAUTH_SECRET`)

---

## ✅ SOLUCIÓN INMEDIATA

### Paso 1: Generar Secret
En tu terminal local:
```bash
openssl rand -base64 32
```

Copia el resultado (ejemplo): `abc123XYZ789...`

### Paso 2: Agregar Variable en Vercel

Ve a: **Vercel → Settings → Environment Variables**

Agrega esta variable (si no existe):

```
Nombre: AUTH_SECRET
Valor: [el resultado del comando openssl]
Entornos: Production, Preview, Development
```

**IMPORTANTE:** Asegúrate de marcar los 3 entornos

### Paso 3: Verificar Variables Existentes

Confirma que tienes TODAS estas variables:

```env
✅ NEXTAUTH_URL=https://sinap-code.vercel.app
✅ NEXTAUTH_SECRET=[mismo valor que AUTH_SECRET]
✅ AUTH_SECRET=[valor generado con openssl]
✅ DATABASE_URL=postgresql://...
✅ DIRECT_URL=postgresql://...
```

### Paso 4: Redeploy

1. Ve a **Deployments**
2. Click en el último deployment
3. Click en **"Redeploy"**
4. Espera 2-3 minutos

### Paso 5: Verificar

Después del redeploy, abre:
```
https://sinap-code.vercel.app/api/auth/session
```

**✅ Debe devolver:** `{}`
**❌ Si devuelve 404:** Variables aún no aplicadas

---

## 📋 Checklist Rápido

- [ ] Ejecutar `openssl rand -base64 32`
- [ ] Agregar `AUTH_SECRET` en Vercel
- [ ] Verificar que `NEXTAUTH_SECRET` existe
- [ ] Verificar que ambos tienen el mismo valor
- [ ] Marcar los 3 entornos (Production, Preview, Development)
- [ ] Hacer Redeploy
- [ ] Verificar `/api/auth/session` devuelve JSON

---

## 🔍 Diferencia Clave

**NextAuth v4:**
- Solo requiere `NEXTAUTH_SECRET`

**NextAuth v5 / Auth.js:**
- Requiere `AUTH_SECRET` (prioritario)
- `NEXTAUTH_SECRET` como fallback

**Tu código usa:** NextAuth v5 → **NECESITA `AUTH_SECRET`**

---

## ⚡ Una vez que funcione

Podrás hacer login con:
- Email: `antonio_rburgos@msn.com`
- Password: `Admin123!`

Y deberías ver en consola:
- 🔐 `[AUTH] Inicio de autenticación`
- ✅ `[AUTH] Usuario encontrado`
- 🎉 `[AUTH] Login exitoso`
