---
name: sinapcode-brand
description: Global Brand Identity and Design Guidelines for SinapCode. Use this skill to ensure all UI/UX modifications and new features adhere to the premium "Metallic RGB Psychology" aesthetic.
---

# SinapCode Brand & Design Skill

Este skill define los lineamientos estéticos y de marca obligatorios para todas las intervenciones en el aplicativo de SinapCode.

## 1. Identidad Visual (Brand Heart)
SinapCode es una plataforma de ingeniería de élite. Su estética debe ser **Premium, Futurista y Limpia**.

- **Arquetipo:** El Mago / Desarrollador de Élite.
- **Tono:** Profesional, técnico, inspirador.

## 2. Sistema de Color (Metallic RGB)
Usamos exclusivamente los tokens definidos en `tailwind.config.ts`. No se permiten colores "manuales" si existe un token equivalente.

### Colores de Fondo
- `bg`: `#0B0B0F` (Fondo base)
- `bg-surface`: `#16161A` (Tarjetas y paneles)
- `bg-hover`: `#1C1C20` (Estados hover de superficies)

### Colores de Marca (Acentos)
- `primary` / `neural-blue`: `#0A84FF` (Referencia Apple Blue)
- `secondary`: `#4F46E5` (Índigo para profundidad)
- `terracotta`: `#C9A78A` (Acento elegante para bordes y detalles premium)
- `gold`: `#F59E0B` (Para estados destacados o logros)

## 3. Tipografía
- **Principal:** `Outfit` (Headings y cuerpo principal).
- **Técnica:** `JetBrains Mono` (Para código y detalles de ingeniería).
- **Fallback:** `-apple-system`, `BlinkMacSystemFont`.

## 4. Componentes y Estilos UI
### Glassmorphism Metálico
Todas las superficies elevadas deben usar el concepto de vidrio:
- Fondo: `rgba(22, 22, 26, 0.7)` o `bg-surface/70`.
- Blur: `backdrop-filter: blur(20px)`.
- Borde: `1px solid rgba(255, 255, 255, 0.1)` o `border-white/10`.

### Botones
- **Primary:** `bg-primary text-white rounded-full hover:bg-primary-dim transition-all shadow-glow`.
- **Secondary:** `bg-white/5 border border-white/10 text-white hover:border-primary/40 rounded-full`.

## 5. Política de Implementación
- **Validación Automática:** Todo cambio debe probarse ejecutando el proceso de build local.
- **Reversión:** Si un cambio rompe el estilo o la función, se revierte inmediatamente.
- **Cero Placeholders:** Usar imágenes generadas o de alta calidad (Unsplash).

---
*Para más detalles, consultar el [Manual de Diseño](file:///c:/WEB-DI/docs/02_design_manual.md) y la [Política de Implementación](file:///c:/WEB-DI/docs/IMPLEMENTATION_POLICY.md).*
