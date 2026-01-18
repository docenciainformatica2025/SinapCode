# Política de Cookies - SinapCode

**Versión:** 1.0.0  
**Fecha de Vigencia:** 12 de enero de 2026  
**Última Actualización:** 12 de enero de 2026

---

## 1. ¿QUÉ SON LAS COOKIES?

Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten que el sitio web recuerde sus acciones y preferencias durante un período de tiempo.

**Tecnologías Similares:**
- **Local Storage:** Almacenamiento local en el navegador
- **Session Storage:** Almacenamiento temporal de sesión
- **IndexedDB:** Base de datos local del navegador

---

## 2. ¿CÓMO USAMOS LAS COOKIES?

Utilizamos cookies para:
- ✅ Mantener su sesión activa (autenticación)
- ✅ Recordar sus preferencias (idioma, tema)
- ✅ Analizar cómo usa la Plataforma (Google Analytics)
- ✅ Mejorar su experiencia de usuario

---

## 3. TIPOS DE COOKIES QUE USAMOS

### 3.1 Cookies Esenciales (Siempre Activas)

**No requieren consentimiento** - Son necesarias para el funcionamiento básico.

| Cookie | Propósito | Duración | Proveedor |
|--------|-----------|----------|-----------|
| `next-auth.session-token` | Autenticación de usuario | Sesión | SinapCode |
| `next-auth.csrf-token` | Protección CSRF | Sesión | SinapCode |
| `next-auth.callback-url` | Redirección post-login | Sesión | SinapCode |

**Base Legal:** Interés legítimo (GDPR Art. 6(1)(f))

### 3.2 Cookies Funcionales

**Requieren consentimiento** - Mejoran la funcionalidad.

| Cookie | Propósito | Duración | Proveedor |
|--------|-----------|----------|-----------|
| `theme` | Preferencia de tema (claro/oscuro) | 1 año | SinapCode |
| `language` | Idioma preferido | 1 año | SinapCode |
| `sidebar-collapsed` | Estado de sidebar | 1 año | SinapCode |
| `cookie-consent` | Registro de consentimiento | 1 año | SinapCode |

**Base Legal:** Consentimiento (GDPR Art. 6(1)(a))

### 3.3 Cookies Analíticas

**Requieren consentimiento** - Nos ayudan a entender cómo usa la Plataforma.

| Cookie | Propósito | Duración | Proveedor |
|--------|-----------|----------|-----------|
| `_ga` | Identificador único de usuario | 2 años | Google Analytics |
| `_ga_*` | Estado de sesión | 2 años | Google Analytics |
| `_gid` | Identificador de sesión | 24 horas | Google Analytics |
| `_gat` | Limitar tasa de solicitudes | 1 minuto | Google Analytics |

**Datos Recopilados:**
- Páginas visitadas
- Tiempo en el sitio
- Fuente de tráfico
- Dispositivo y navegador
- Ubicación aproximada (país/ciudad)

**Anonimización:** IP anonimizada, sin datos personales identificables.

**Base Legal:** Consentimiento (GDPR Art. 6(1)(a))

**Opt-out:** Puede desactivar Google Analytics instalando [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout)

### 3.4 Cookies de Marketing

**Requieren consentimiento** - Usadas para publicidad personalizada.

**Estado Actual:** ❌ **NO UTILIZAMOS** cookies de marketing.

**Futuro:** Si implementamos publicidad, le notificaremos y solicitaremos consentimiento explícito.

---

## 4. GESTIÓN DE COOKIES

### 4.1 Centro de Preferencias de Cookies

Puede gestionar sus preferencias en cualquier momento:

1. **Banner de Cookies** (primera visita)
   - Aceptar todas
   - Rechazar opcionales
   - Personalizar

2. **Configuración de Cuenta** → Privacidad → Cookies
   - Ver cookies activas
   - Cambiar preferencias
   - Eliminar cookies

3. **Footer** → "Configuración de Cookies"

### 4.2 Configuración del Navegador

**Chrome:**
1. Configuración → Privacidad y seguridad → Cookies
2. Seleccionar "Bloquear cookies de terceros"

**Firefox:**
1. Opciones → Privacidad y seguridad
2. Protección contra rastreo mejorada

**Safari:**
1. Preferencias → Privacidad
2. Bloquear todas las cookies

**Edge:**
1. Configuración → Cookies y permisos del sitio
2. Administrar cookies

**⚠️ Advertencia:** Bloquear cookies esenciales puede afectar la funcionalidad de la Plataforma.

### 4.3 Eliminar Cookies

**Navegador:**
- Chrome: Ctrl+Shift+Del → Cookies
- Firefox: Ctrl+Shift+Del → Cookies
- Safari: Preferencias → Privacidad → Administrar datos

**Plataforma:**
- Configuración → Privacidad → "Eliminar todas las cookies"

---

## 5. COOKIES DE TERCEROS

### 5.1 Proveedores Actuales

| Proveedor | Servicio | Cookies | Política de Privacidad |
|-----------|----------|---------|------------------------|
| **Google Analytics** | Analítica web | _ga, _gid, _gat | [Ver política](https://policies.google.com/privacy) |
| **Vercel** | Hosting | __vercel_* | [Ver política](https://vercel.com/legal/privacy-policy) |

### 5.2 Futuras Integraciones

Si agregamos nuevos proveedores:
- ✅ Actualizaremos esta política
- ✅ Solicitaremos nuevo consentimiento
- ✅ Notificaremos por email

---

## 6. DURACIÓN DE LAS COOKIES

### 6.1 Cookies de Sesión

**Duración:** Se eliminan al cerrar el navegador

**Ejemplos:**
- Tokens de autenticación
- Carrito de compras (futuro)
- Estado de formularios

### 6.2 Cookies Persistentes

**Duración:** Permanecen hasta su fecha de expiración o eliminación manual

| Duración | Propósito |
|----------|-----------|
| **1 minuto** | Rate limiting (_gat) |
| **24 horas** | Identificador de sesión (_gid) |
| **1 año** | Preferencias de usuario |
| **2 años** | Analítica (_ga) |

---

## 7. TRANSFERENCIAS INTERNACIONALES

### 7.1 Google Analytics

**Ubicación:** Servidores en Estados Unidos

**Protección:**
- Cláusulas Contractuales Estándar (SCC)
- Anonimización de IP
- Acuerdo de Procesamiento de Datos (DPA)

**Más información:** [Google Privacy Shield](https://privacy.google.com/businesses/compliance/)

### 7.2 Vercel

**Ubicación:** Edge Network global (EE.UU., Europa, Asia)

**Protección:**
- Cláusulas Contractuales Estándar (SCC)
- Certificación SOC 2 Type II
- GDPR compliant

---

## 8. SUS DERECHOS

### 8.1 Derechos GDPR

Tiene derecho a:
- **Acceder** a información sobre cookies almacenadas
- **Rectificar** preferencias de cookies
- **Eliminar** cookies en cualquier momento
- **Oponerse** al uso de cookies opcionales
- **Revocar** consentimiento sin afectar legalidad previa

### 8.2 Ejercer Derechos

**Email:** privacy@sinapcode.com  
**Plazo de Respuesta:** 30 días  
**Sin Costo:** Gratuito

---

## 9. COOKIES Y MENORES

### 9.1 Protección COPPA

Para usuarios menores de 13 años:
- ❌ **NO** usamos cookies de marketing
- ❌ **NO** usamos cookies de terceros (excepto esenciales)
- ✅ Solo cookies esenciales para funcionalidad básica

### 9.2 Usuarios entre 13-18 Años

**Consentimiento Parental:**
- Padre/tutor debe aprobar uso de cookies opcionales
- Notificación clara de qué cookies se usan
- Derecho a revocar en cualquier momento

---

## 10. ACTUALIZACIONES DE ESTA POLÍTICA

### 10.1 Cambios

Podemos actualizar esta política para:
- Reflejar nuevas tecnologías
- Cumplir con cambios legales
- Mejorar claridad

### 10.2 Notificación

**Cambios Menores:**
- Actualización de la fecha "Última Actualización"
- Aviso en la Plataforma

**Cambios Materiales:**
- Email a usuarios registrados
- Nuevo consentimiento requerido
- 30 días de anticipación

### 10.3 Historial

Versiones anteriores disponibles en:
- [Changelog de Política de Cookies](./cookie-policy-changelog.md)

---

## 11. MÁS INFORMACIÓN

### 11.1 Recursos Útiles

- **GDPR:** [gdpr.eu](https://gdpr.eu/)
- **COPPA:** [ftc.gov/coppa](https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/childrens-online-privacy-protection-rule)
- **Ley 1581 de 2012:** [sic.gov.co](https://www.sic.gov.co/)

### 11.2 Herramientas

- **Ghostery:** Bloqueador de rastreadores
- **Privacy Badger:** Protección de privacidad
- **uBlock Origin:** Bloqueador de anuncios y rastreadores

---

## 12. CONTACTO

**Para preguntas sobre cookies:**

- **Email:** privacy@sinapcode.com
- **DPO:** sinapcodeia@gmail.com
- **Soporte:** sinapcodeia@gmail.com

**Autoridad de Control:**
- **Colombia:** Superintendencia de Industria y Comercio (SIC)
- **UE:** Agencia de Protección de Datos de su país

---

**Versión:** 1.0.0  
**Fecha de Vigencia:** 12 de enero de 2026  
**Idiomas Disponibles:** Español, Inglés
