## Descripción

[Descripción clara y concisa del cambio]

## Tipo de Cambio

- [ ] 🐛 Bug fix (cambio que corrige un issue)
- [ ] ✨ Nueva funcionalidad (cambio que agrega funcionalidad)
- [ ] 💥 Breaking change (fix o feature que causa que funcionalidad existente no funcione como antes)
- [ ] 📝 Documentación (cambios solo en documentación)
- [ ] 🎨 Estilo (formato, punto y coma faltante, etc; sin cambio de código)
- [ ] ♻️ Refactoring (cambio de código que no corrige bug ni agrega feature)
- [ ] ⚡ Performance (cambio que mejora performance)
- [ ] ✅ Tests (agregar tests faltantes o corregir tests existentes)
- [ ] 🔧 Chore (cambios en build, CI, etc)

## Checklist

### Código
- [ ] Mi código sigue el style guide del proyecto
- [ ] He realizado self-review de mi código
- [ ] He comentado mi código, especialmente en áreas difíciles
- [ ] He actualizado la documentación correspondiente
- [ ] Mis cambios no generan nuevos warnings
- [ ] He agregado tests que prueban que mi fix es efectivo o que mi feature funciona
- [ ] Tests unitarios nuevos y existentes pasan localmente
- [ ] Cualquier cambio dependiente ha sido mergeado y publicado

### Seguridad
- [ ] No expongo información sensible (contraseñas, tokens, etc)
- [ ] He validado todas las entradas de usuario
- [ ] He considerado casos de edge y errores
- [ ] No hay vulnerabilidades de seguridad introducidas

### Performance
- [ ] He considerado el impacto en performance
- [ ] He optimizado queries de base de datos si aplica
- [ ] He minimizado llamadas a APIs externas

### Documentación
- [ ] He actualizado el CHANGELOG.md
- [ ] He actualizado la documentación de API si aplica
- [ ] He agregado comentarios JSDoc si aplica

## Testing

**Cómo se ha probado:**
[Descripción de las pruebas]

**Configuración de prueba:**
- OS: [ej. macOS 13.0]
- Browser: [ej. Chrome 120]
- Node: [ej. 18.17.0]

## Screenshots (si aplica)

[Agregar screenshots]

## Issues Relacionados

Closes #[issue number]

## Revisores Sugeridos

@usuario1 @usuario2

## Notas Adicionales

[Cualquier información adicional]

---

## Para Revisores

### Qué Revisar

- [ ] Lógica de negocio correcta
- [ ] Manejo de errores adecuado
- [ ] Tests cubren casos edge
- [ ] Documentación clara
- [ ] Sin vulnerabilidades de seguridad
- [ ] Performance aceptable
- [ ] Código mantenible

### Comandos para Probar Localmente

```bash
git fetch origin
git checkout [branch-name]
npm install
npm run dev
```
