# Sistema de Diseño: SinapCODE
**ID del Proyecto:** projects/14315644748498424018

## 1. Tema Visual y Atmósfera
La estética de SinapCODE es **"Tecnología Futurista Premium"**. Evoca una sensación de espacio profundo e innovación de alta tecnología, utilizando un fondo oscuro e inmersivo ("Espacio Profundo") acentuado por brillos de neón vibrantes y toques dorados metálicos. El estado de ánimo es serio, profesional, pero dinámico y en evolución. Depende en gran medida del glassmorphism (`backdrop-blur`), bordes sutiles y gradientes ricos para crear profundidad sin desorden.

## 2. Paleta de Colores y Roles

### Fondos
*   **Deep Space (#0B0F14):** El color de fondo principal. Muy oscuro, casi negro, gris azulado.
*   **Surface (#111827):** Utilizado para tarjetas y secciones elevadas.
*   **Surface Soft (#0F172A):** Una alternativa ligeramente más suave para superficies.
*   **Glass Panel (rgba(255, 255, 255, 0.05)):** Utilizado para superposiciones y tarjetas con `backdrop-blur-lg`.

### Primarios y Acentos
*   **Neural Blue (#22D3EE):** Color de acción principal, resaltados y estados de foco. Cian eléctrico.
*   **Synapse Purple (#A78BFA):** Acento secundario. Púrpura digital suave. Utilizado en gradientes con Neural Blue.
*   **Brain Spark Gradient (linear-gradient(135deg, #22D3EE 0%, #A78BFA 100%)):** Gradiente característico de la marca. Usar para botones primarios y énfasis en texto de héroe.

### Acentos Premium
*   **Metallic Gold (#D4AF37):** Utilizado con moderación para indicadores "Premium" o "Nivel Alto".
*   **Champagne Gold (#F3E5AB):** Oro más claro para gradientes o resaltados sutiles.

### Tipografía y Texto
*   **Platinum (#E5E7EB):** Color de texto principal. Alto contraste contra Deep Space pero más suave que el blanco puro.
*   **Platinum Dim (#9CA3AF):** Texto secundario, marcas de tiempo y texto descriptivo.
*   **Muted (#9CA3AF):** Texto deshabilitado o etiquetas de baja prioridad.

## 3. Reglas de Tipografía
*   **Fuente Principal:** `Inter` (Sans-serif). Utilizada para todos los encabezados y texto del cuerpo. Limpia, moderna y altamente legible.
*   **Fuente Monospace:** `JetBrains Mono`. Utilizada para fragmentos de código, datos técnicos o etiquetas decorativas "tech".

## 4. Estilos de Componentes

### Botones
*   **Primario:** `rounded-xl`, usa **Brain Spark Gradient**, texto en `#0B0F14` (Color de fondo) para contraste. Peso de fuente: Semibold. Hover: Opacidad 90%.
*   **Secundario:** `rounded-xl`, `border border-rgba(34, 211, 238, 0.15)`, texto en **Neural Blue**. Fondo transparente o ligeramente teñido al pasar el ratón.

### Tarjetas y Superficies
*   **Glass Panel:** `bg-white/5` con `backdrop-blur-lg` y `border border-white/10`. Estilo de tarjeta estándar.
*   **Esquinas Redondeadas:** `rounded-xl` es el estándar para tarjetas y contenedores más grandes.
*   **Bordes:** Sutiles, generalmente `white/10` o `primary/15`.

### Sombras y Brillos
*   **Neon Blue Glow:** `box-shadow: 0 0 20px rgba(59, 130, 246, 0.3)`. Utilizado para elementos activos o resaltados principales.
*   **Neon Purple Glow:** `box-shadow: 0 0 20px rgba(168, 85, 247, 0.3)`.
*   **Gold Glow:** `box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.25), 0 20px 40px rgba(212, 175, 55, 0.15)`.

## 5. Principios de Diseño
*   **Contenedor:** Centrado, `max-w-7xl`, con `px-4 md:px-8`.
*   **Espaciado:** Espacio en blanco generoso para transmitir lujo y claridad.
*   **Responsive:** Enfoque mobile-first. La navegación cambia a `BottomNav` en dispositivos móviles.
