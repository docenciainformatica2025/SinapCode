# Documentación de API - SinapCode

**Versión:** 1.1.0  
**Base URL:** `https://sinap-code.vercel.app/api`  
**Formato:** OpenAPI 3.0

## 📋 Índice

1. [Autenticación](#autenticación)
2. [Endpoints de Usuario](#endpoints-de-usuario)
3. [Endpoints Legales](#endpoints-legales)
4. [Códigos de Error](#códigos-de-error)
5. [Rate Limiting](#rate-limiting)

---

## 🔐 Autenticación

Todos los endpoints protegidos requieren autenticación mediante JWT token en cookie httpOnly.

### Obtener Sesión

```http
GET /api/auth/session
```

**Respuesta Exitosa (200):**
```json
{
  "user": {
    "id": "clx123abc",
    "name": "María García",
    "email": "maria@example.com",
    "role": "STUDENT"
  },
  "expires": "2026-01-13T01:00:00.000Z"
}
```

**Sin Sesión (401):**
```json
{
  "error": "Unauthorized"
}
```

---

## 👤 Endpoints de Usuario

### Registrar Usuario

```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "María García",
  "email": "maria@example.com",
  "password": "SecurePass123!"
}
```

**Validaciones:**
- `name`: Opcional, string, max 100 caracteres
- `email`: Requerido, formato email válido, único
- `password`: Requerido, mínimo 8 caracteres

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "user": {
    "id": "clx123abc",
    "email": "maria@example.com",
    "name": "María García",
    "role": "STUDENT"
  }
}
```

**Errores:**

| Código | Mensaje | Descripción |
|--------|---------|-------------|
| 400 | "Email y contraseña son requeridos" | Faltan campos obligatorios |
| 400 | "Este correo ya está registrado" | Email duplicado |
| 500 | "Error al crear la cuenta" | Error del servidor |

### Actualizar Perfil

```http
PUT /api/user/profile
Authorization: Required (Session)
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "María García López",
  "email": "maria.nueva@example.com"
}
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "user": {
    "id": "clx123abc",
    "name": "María García López",
    "email": "maria.nueva@example.com",
    "role": "STUDENT"
  }
}
```

### Exportar Datos (GDPR)

```http
GET /api/user/data-export
Authorization: Required (Session)
```

**Respuesta Exitosa (200):**
```json
{
  "user": {
    "id": "clx123abc",
    "email": "maria@example.com",
    "name": "María García",
    "createdAt": "2026-01-12T00:00:00.000Z",
    "role": "STUDENT"
  },
  "consents": [
    {
      "id": "consent_123",
      "documentType": "TERMS",
      "documentVersion": "1.0.0",
      "acceptedAt": "2026-01-12T00:05:00.000Z"
    }
  ],
  "activity": [],
  "exportedAt": "2026-01-12T01:00:00.000Z"
}
```

### Eliminar Cuenta (GDPR)

```http
DELETE /api/user/delete
Authorization: Required (Session)
Content-Type: application/json
```

**Request Body:**
```json
{
  "password": "SecurePass123!",
  "confirmation": "DELETE"
}
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Cuenta eliminada exitosamente"
}
```

---

## 📜 Endpoints Legales

### Registrar Consentimiento

```http
POST /api/legal/consent
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "anonymous",
  "documentType": "terms",
  "documentVersion": "1.0.0",
  "consentMethod": "checkbox",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2026-01-12T01:00:00.000Z"
}
```

**Validaciones:**
- `documentType`: Enum ["terms", "privacy", "cookies", "coppa"]
- `consentMethod`: Enum ["checkbox", "button_click", "scroll_complete"]
- `documentVersion`: String (formato semver)

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "consentId": "uuid-123-456",
  "timestamp": "2026-01-12T01:00:00.000Z",
  "note": "Consent logged for anonymous user"
}
```

**Errores:**

| Código | Mensaje | Descripción |
|--------|---------|-------------|
| 400 | "Invalid consent data" | Datos de validación incorrectos |
| 500 | "Internal Server Error" | Error del servidor |

---

## ❌ Códigos de Error

### Errores Estándar

| Código HTTP | Tipo | Descripción |
|-------------|------|-------------|
| 400 | Bad Request | Datos de entrada inválidos |
| 401 | Unauthorized | No autenticado |
| 403 | Forbidden | No autorizado (rol insuficiente) |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Conflicto (ej. email duplicado) |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Internal Server Error | Error del servidor |

### Formato de Error

```json
{
  "error": "Mensaje de error legible",
  "details": {
    "field": "email",
    "message": "Email already exists"
  }
}
```

---

## 🚦 Rate Limiting

### Límites por Endpoint

| Endpoint | Límite | Ventana |
|----------|--------|---------|
| `/api/auth/register` | 5 requests | 15 minutos |
| `/api/auth/login` | 10 requests | 15 minutos |
| `/api/legal/consent` | 20 requests | 1 minuto |
| Otros endpoints | 100 requests | 1 minuto |

### Headers de Rate Limit

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1673568000
```

### Respuesta cuando se excede el límite (429)

```json
{
  "error": "Too many requests",
  "retryAfter": 60
}
```

---

## 📝 Ejemplos de Uso

### cURL

**Registro de Usuario:**
```bash
curl -X POST https://sinap-code.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "María García",
    "email": "maria@example.com",
    "password": "SecurePass123!"
  }'
```

**Obtener Sesión:**
```bash
curl https://sinap-code.vercel.app/api/auth/session \
  -H "Cookie: next-auth.session-token=..."
```

### JavaScript (Fetch)

**Registro de Usuario:**
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'María García',
    email: 'maria@example.com',
    password: 'SecurePass123!'
  })
});

const data = await response.json();
console.log(data);
```

### TypeScript (Tipos)

```typescript
// Request
interface RegisterRequest {
  name?: string;
  email: string;
  password: string;
}

// Response
interface RegisterResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
    name: string | null;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  };
}

// Error
interface ApiError {
  error: string;
  details?: Record<string, any>;
}
```

---

## 🔄 Versionamiento

La API sigue versionamiento semántico (SemVer):

- **MAJOR:** Cambios incompatibles
- **MINOR:** Nuevas funcionalidades compatibles
- **PATCH:** Bug fixes compatibles

**Versión Actual:** `1.1.0`

### Changelog

Ver [CHANGELOG.md](../../CHANGELOG.md) para historial completo.

---

## 🛡️ Seguridad

### HTTPS Obligatorio
Todas las requests deben usar HTTPS. HTTP será redirigido automáticamente.

### CORS
```
Access-Control-Allow-Origin: https://sinap-code.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Content Security Policy
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
```

---

**Última Actualización:** 12 de enero de 2026  
**Versión de API:** 1.1.0  
**Contacto:** api@sinapcode.com
