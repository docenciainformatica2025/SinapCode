# Manual de Marca: SinapCode Enterprise
**Versión:** 2.0 (Marzo 2026)
**Concepto:** Neuro-tecnología Educativa de Alto Valor
**Filosofía:** "Metallic RGB Psychology"

## 1. El ADN de la Marca
*   **Misión:** Democratizar la educación tecnológica de élite usando IA adaptativa.
*   **Arquetipo:** "El Mago Innovador" (Transformador, Visionario, Premium).
*   **Slogan Global:** "Connect your mind. Code the future."

## 2. Identidad Visual (Logotipo)
*   **Isotipo:** Neurona abstracta conectada a circuito digital (Hexágono sutil).
*   **Tipografía Logotipo:**
    *   *Sinap*: **Outfit** (Sans-Serif, Medium) - Lo humano.
    *   *Code*: **JetBrains Mono** (Monospaced, Bold) - Lo técnico.

## 3. Universo Cromático Digital (Tokens de Ingeniería)
Los colores deben referenciarse siempre por sus nombres de token en Tailwind.

### 3.1 Paleta de Fondo (Deep Systems)
*   `bg`: `#0B0B0F` (Fondo principal ultra-oscuro)
*   `bg-surface`: `#16161A` (Superficies de UI, tarjetas)
*   `bg-hover`: `#1C1C20` (Interacciones táctiles/mouse)

### 3.2 Paleta de Identidad (Neural Accents)
*   `neural-blue` (`primary`): `#0A84FF` (Efecto Apple Blue - Lógica y Claridad)
*   `terracotta`: `#C9A78A` (Premium Gold-Beige - Elegancia y Valor)
*   `banana-yellow`: `#F9E795` (Alerta positiva, atención)

### 3.3 Colores de Soporte (Pastel Palette 2026)
Usar para badges o elementos de baja jerarquía:
- `apple-pink`: `#FFCCE7`
- `apple-mint`: `#CCF6E3`
- `apple-blue`: `#C8E8FF`

## 4. Tipografía y Jerarquía
*   **Encabezados (Headings):** `Outfit` variable. Espaciado tracking-tight.
*   **Cuerpo (Body):** `Outfit` light/regular.
*   **Código/Metadatos:** `JetBrains Mono`.

## 5. El Sistema Glassmorphism
Efecto obligatorio para paneles y modales.
```tsx
const GlassPanel = "bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl";
```
Todo elemento flotante debe tener `shadow-soft` y, si es interactivo, un ligero resplandor de `shadow-glow`.

## 6. Política de Validación Obligatoria
**NO SE IMPLEMENTA NADA SIN PRUEBA.** Toda modificación debe:
1.  **Heredar el Estilo:** Validar contra este manual y el Global Brand Skill.
2.  **Prueba de Construcción:** Ejecutar `npm run build` local antes de subir.
3.  **Cero Regresiones:** El código no debe afectar flujos críticos (Auth, Blog, DB).
4.  **Reversión:** Si la implementación tiene errores visuales o lógicos, se devuelve al estado estable anterior automáticamente.

---
*Este manual es el único lineamiento oficial. Cualquier desviación debe ser consultada con el lead de arquitectura.*
