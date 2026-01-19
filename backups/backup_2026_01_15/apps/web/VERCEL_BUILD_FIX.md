# 🔧 Corrección Final: Build Command para Vercel

## ✅ Prisma Generado Exitosamente

El log muestra:
```
✔ Generated Prisma Client (v5.22.0) to ./node_modules/@prisma/client in 105ms
```

## ❌ Error Actual

```
Error: > Couldn't find any `pages` or `app` directory
```

**Causa:** El comando `cd apps/web` está intentando ir a `apps/web/apps/web` porque el **Root Directory ya está configurado como `apps/web`**.

---

## ✅ Solución Correcta

### Build Command Correcto:

```bash
cd ../.. && npx prisma generate && cd - && next build
```

**Explicación:**
- `cd ../..` → Va a la raíz del proyecto (donde está `/prisma/schema.prisma`)
- `npx prisma generate` → Genera Prisma Client
- `cd -` → Vuelve al directorio anterior (`apps/web`)
- `next build` → Construye Next.js

### Alternativa (más simple):

```bash
npx prisma generate --schema=../../prisma/schema.prisma && next build
```

**Explicación:**
- `npx prisma generate --schema=../../prisma/schema.prisma` → Genera Prisma usando ruta relativa al schema
- `next build` → Construye Next.js

---

## 📋 Configuración Final en Vercel

| Setting | Valor |
|---------|-------|
| Root Directory | `apps/web` |
| Build Command | `cd ../.. && npx prisma generate && cd - && next build` |
| Output Directory | `.next` (default) |

---

## 🎯 Próximo Paso

1. Ve a **Vercel → Settings → Build and Deployment**
2. Cambia el **Build Command** a:
   ```bash
   cd ../.. && npx prisma generate && cd - && next build
   ```
3. Click **"Save"**
4. **Redeploy**

Esto debería funcionar correctamente.
