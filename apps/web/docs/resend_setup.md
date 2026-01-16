# Configuración de Resend para Email Verification

## 📧 ¿Qué es Resend?

Resend es un servicio moderno de email transaccional diseñado para desarrolladores. Ofrece:
- ✅ API simple y limpia
- ✅ Free tier generoso (100 emails/día, 3,000/mes)
- ✅ Soporte nativo para React Email
- ✅ Excelente deliverability
- ✅ No requiere verificación de dominio para testing

---

## 🚀 Setup Rápido

### 1. Crear Cuenta en Resend

1. Ir a https://resend.com
2. Click en "Sign Up"
3. Registrarse con email o GitHub
4. Verificar email

### 2. Obtener API Key

1. Una vez logueado, ir a https://resend.com/api-keys
2. Click en "Create API Key"
3. Nombre: "SinapCode Development" (o "Production" según el caso)
4. Permisos: "Sending access" (default)
5. Click en "Add"
6. **COPIAR LA KEY INMEDIATAMENTE** (solo se muestra una vez)

### 3. Configurar Variables de Entorno

#### Desarrollo Local

Agregar a `.env`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Producción (Vercel)

1. Ir a Vercel Dashboard
2. Tu Proyecto > Settings > Environment Variables
3. Agregar:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Environments:** Production, Preview, Development
4. Click "Save"
5. Redeploy la aplicación

---

## 📝 Verificación de Dominio (Opcional)

### ¿Por Qué Verificar un Dominio?

- ✅ Emails desde `noreply@tudominio.com` en lugar de `onboarding@resend.dev`
- ✅ Mejor deliverability (menos probabilidad de spam)
- ✅ Branding profesional

### Pasos para Verificar Dominio

1. En Resend Dashboard, ir a "Domains"
2. Click "Add Domain"
3. Ingresar tu dominio (ej: `sinapcode.com`)
4. Agregar los registros DNS que Resend proporciona:
   - **SPF:** TXT record
   - **DKIM:** TXT record
   - **DMARC:** TXT record (opcional pero recomendado)

5. Esperar propagación DNS (5-30 minutos)
6. Click "Verify" en Resend

### Registros DNS Ejemplo

```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT
Name: resend._domainkey
Value: [valor proporcionado por Resend]

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@sinapcode.com
```

---

## 🧪 Testing

### Modo Desarrollo (Sin API Key)

Si `RESEND_API_KEY` no está configurado o `NODE_ENV=development`:

```typescript
// src/lib/mail.ts automáticamente usa modo mock
console.log("📧 EMAIL MOCK SERVICE: Sending to user@example.com");
console.log("🔑 Verification Link: http://localhost:3000/auth/new-verification?token=xxx");
```

### Modo Producción (Con API Key)

```typescript
// Envía email real vía Resend
const { data, error } = await resend.emails.send({
  from: 'SinapCode <noreply@sinapcode.com>',
  to: ['user@example.com'],
  subject: 'Verifica tu correo electrónico',
  react: VerificationEmail({ confirmLink, email }),
});
```

### Probar Localmente con API Key

1. Agregar `RESEND_API_KEY` a `.env`
2. Comentar temporalmente la condición de desarrollo:

```typescript
// En src/lib/mail.ts
// if (process.env.NODE_ENV === 'development' || !process.env.RESEND_API_KEY) {
if (false) { // Forzar modo producción para testing
```

3. Registrar usuario con tu email real
4. Verificar que el email llega a tu inbox

---

## 📊 Monitoreo

### Dashboard de Resend

Ver emails enviados:
1. Ir a https://resend.com/emails
2. Ver lista de emails enviados
3. Click en un email para ver detalles:
   - Estado (sent, delivered, bounced, etc.)
   - Timestamp
   - Destinatario
   - Preview del contenido

### Logs en Aplicación

```bash
# Desarrollo
✅ Email sent successfully: { id: 're_abc123...' }

# Producción (Vercel)
# Ver en: Vercel Dashboard > Functions > Runtime Logs
```

---

## 🚨 Troubleshooting

### Error: "API key is invalid"

**Causa:** API key incorrecta o expirada

**Solución:**
1. Verificar que la key en `.env` es correcta
2. Generar nueva API key en Resend
3. Actualizar variables de entorno
4. Reiniciar servidor (`npm run dev`)

### Error: "Domain not verified"

**Causa:** Intentando enviar desde dominio no verificado

**Solución:**
1. Usar `onboarding@resend.dev` para testing
2. O verificar tu dominio (ver sección arriba)

**Temporal:** Cambiar en `src/lib/mail.ts`:

```typescript
from: 'SinapCode <onboarding@resend.dev>', // Dominio de Resend para testing
```

### Emails van a Spam

**Causas:**
- Dominio no verificado
- Falta configuración SPF/DKIM
- Contenido sospechoso

**Soluciones:**
1. Verificar dominio con SPF/DKIM
2. Evitar palabras spam ("gratis", "urgente", etc.)
3. Incluir link de unsubscribe
4. Usar dominio reputado

### Rate Limit Exceeded

**Free Tier Limits:**
- 100 emails/día
- 3,000 emails/mes

**Solución:**
1. Upgrade a plan de pago
2. Implementar queue para emails
3. Agregar rate limiting en registro

---

## 💰 Pricing

### Free Tier
- ✅ 100 emails/día
- ✅ 3,000 emails/mes
- ✅ Todos los features
- ✅ Sin tarjeta de crédito

### Pro Plan ($20/mes)
- ✅ 50,000 emails/mes
- ✅ $1 por cada 1,000 emails adicionales
- ✅ Soporte prioritario

**Recomendación:** Empezar con Free tier, upgrade cuando superes 3,000 emails/mes

---

## 📚 Recursos

- **Documentación:** https://resend.com/docs
- **API Reference:** https://resend.com/docs/api-reference
- **React Email:** https://react.email
- **Status Page:** https://status.resend.com
- **Soporte:** support@resend.com

---

## ✅ Checklist de Configuración

### Desarrollo
- [ ] Cuenta creada en Resend
- [ ] API key generada
- [ ] `RESEND_API_KEY` agregado a `.env`
- [ ] Servidor reiniciado
- [ ] Email de prueba enviado exitosamente

### Producción
- [ ] `RESEND_API_KEY` configurado en Vercel
- [ ] Dominio verificado (opcional)
- [ ] SPF/DKIM configurados (si dominio verificado)
- [ ] Testing con email real completado
- [ ] Monitoreo configurado

---

**Última actualización:** 2026-01-12
