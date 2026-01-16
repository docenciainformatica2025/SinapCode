# 🔧 Diagnóstico: NextAuth v4 vs Variables de Entorno

## Descubrimiento Importante

**Versión instalada:** `next-auth@4.24.7`

**Problema:** NextAuth v4 y v5 usan diferentes variables:

| Versión | Variable Principal | Variable Fallback |
|---------|-------------------|-------------------|
| NextAuth v4 | `NEXTAUTH_SECRET` | - |
| NextAuth v5 / Auth.js | `AUTH_SECRET` | `NEXTAUTH_SECRET` |

**Tu proyecto usa:** NextAuth v4 → **Requiere `NEXTAUTH_SECRET`**

---

## ✅ Solución Correcta

### Verificar en Vercel

Ve a: **Settings → Environment Variables**

**Debe existir:**
```
NEXTAUTH_SECRET=OYsJFXLy57xi4Xm85MUu+VVd+IC0p+4LmAvTQEyb/Uw=
```

**Si no existe o tiene un valor diferente:**

1. Agregar/Actualizar `NEXTAUTH_SECRET`
2. Usar el mismo valor que `AUTH_SECRET`
3. Marcar los 3 entornos
4. Redeploy

---

## 🔍 Verificación Rápida

**Checklist de variables en Vercel:**

- [ ] `NEXTAUTH_URL=https://sinap-code.vercel.app`
- [ ] `NEXTAUTH_SECRET=[mismo valor que AUTH_SECRET]`
- [ ] `AUTH_SECRET=OYsJFXLy57xi4Xm85MUu+VVd+IC0p+4LmAvTQEyb/Uw=`
- [ ] `DATABASE_URL=postgresql://...`
- [ ] `DIRECT_URL=postgresql://...`

**IMPORTANTE:** Para NextAuth v4, `NEXTAUTH_SECRET` es la variable crítica.

---

## 🎯 Próximo Paso

1. Verifica que `NEXTAUTH_SECRET` existe en Vercel
2. Si no existe o es diferente, actualízala
3. Redeploy
4. Prueba `/api/auth/session`

Si después de esto sigue fallando, el problema puede ser:
- Ruta de archivo incorrecta (poco probable, ya verificamos)
- Problema con el build de Vercel
- Caché de Vercel no limpiado
