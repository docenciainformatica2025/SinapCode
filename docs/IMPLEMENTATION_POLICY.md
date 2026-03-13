# Protocolo de Implementación y Validación Estricta

Toda modificación al código de SinapCode debe seguir este protocolo de seguridad y calidad. **Incumplir este protocolo es motivo de reversión inmediata del código.**

## 1. Fase de Validación Previa (Entorno Local)

Antes de cualquier `git push` o despliegue, el desarrollador/IA debe asegurar:

1.  **Cero Errores de Compilación:** Ejecutar `npm run build` localmente en la aplicación afectada.
2.  **Validación de Tipos (TypeScript):** No se permiten `any` no justificados ni errores de tipado en archivos nuevos o modificados.
3.  **Auditoría de Lint:** Ejecutar `next lint` y corregir cualquier advertencia de impacto.
4.  **Verificación de Conectividad:** Si el cambio afecta la base de datos, ejecutar scripts de prueba (`testdb.ts` o similares) para confirmar que no hay regresiones en la conexión con Supabase.

## 2. Fase de Diseño y Estilo

Cualquier componente visual debe ser validado contra el [Manual de Marca](file:///c:/WEB-DI/docs/02_design_manual.md) y el **Brand Skill**.

*   **Tokens de Color:** Usar exclusivamente los definidos en `tailwind.config.ts`. No usar colores hexadecimales "sueltos" en el CSS/archivos TSX.
*   **Consistencia:** Si un componente nuevo no "se siente" como SinapCode (Glassmorphism, Cyber-Platinum, Neural Blue), debe ser rediseñado antes de la entrega.

## 3. Fase de Pruebas de Usuario (Manual)

El desarrollador debe verificar manualmente en su navegador (`localhost:3000`):

1.  **Responsive Design:** El cambio debe funcionar en escritorio, tablet y móvil.
2.  **Flujos de Auth:** Si se toca el middleware o componentes compartidos, verificar que el login y registro sigan funcionando.
3.  **Estado Vacío:** Si el cambio afecta a listas o feeds (Blog, Cursos), verificar que el estado sin datos sea estético y no rompa el layout.

## 4. Política de Reversión (Rollback)

**"Si no funciona o degrada la calidad, se devuelve."**

Esta es la política general de SinapCode. Si un cambio:
*   Rompe la construcción en CI/CD.
*   Presenta errores visuales graves.
*   Impacta negativamente el rendimiento.
*   No sigue los lineamientos de marca.

El cambio será **revertido inmediatamente** al último estado estable conocido sin excepciones. La prioridad siempre es la **estabilidad del aplicativo**.
