# Standard Operating Procedure (SOP): Mantenimiento de Ciclo de Vida del Software

**Versión:** 1.0.0
**Última Actualización:** 2026-01-15
**Responsable:** Equipo de Desarrollo SinapCode

---

## 1. El Qué (Objetivo y Alcance)

Este procedimiento define el estándar obligatorio para el cierre de ciclos de desarrollo y despliegue de modificaciones en el aplicativo SinapCode.

**Objetivo:** Garantizar la integridad del código, la seguridad de la información (previniendo fugas de logs de depuración) y la disponibilidad de puntos de restauración (respaldos) antes de cualquier fusión o despliegue.

**Alcance:** Aplica a **TODA** modificación realizada en el código fuente (`apps/web/src`) antes de ser considerada "terminada" o lista para producción.

---

## 2. El Cómo (Procedimiento de Ejecución)

El proceso ha sido automatizado para reducir el error humano. El desarrollador debe ejecutar el siguiente comando desde la raíz del proyecto para iniciar el protocolo de mantenimiento.

### Comando Maestro
```bash
npm run maintenance
```

Este comando ejecuta secuencialmente:
1.  **Code Quality Gate**: Ejecuta `next lint` para asegurar el cumplimiento de estándares de código. Si falla, el proceso se detiene.
2.  **Security Sanitization Scan**: Escanea recursivamente en busca de `console.log` olvidados que puedan exponer datos sensibles.
3.  **Secure Backup Protocol**: Genera una copia espejo incremental segura usando `robocopy` en el directorio local de respaldos, excluyendo artefactos generados y secretos (`.env`).

### Pasos Manuales Adicionales
-   **Actualizar Changelog**: Si la automatización es exitosa, el desarrollador **DEBE** registrar los cambios en `CHANGELOG.md` siguiendo el formato SemVer.
-   **Verificar Respaldo**: Confirmar visualmente que la carpeta de respaldo fue creada en `C:\WEB-DI\backups\`.

---

## 3. El Final (Entregables y Criterios de Éxito)

El procedimiento se considera completado exitosamente cuando se cumplen las siguientes condiciones ("Definition of Done"):

1.  **Consola Verde**: El script de mantenimiento finaliza con el mensaje `✨ MAINTENANCE COMPLETED SUCCESSFULLY!`.
2.  **Backup Verificable**: Existe una carpeta con timestamp reciente (ej. `backup_2026-01-15_23-50`) conteniendo los archivos fuente.
3.  **Código Limpio**: No existen errores de linting ni logs de depuración críticos en la rama.
4.  **Documentación Actualizada**: El `CHANGELOG.md` refleja fielmente el trabajo realizado.

**Resultado Esperado:** Un aplicativo estable, seguro y respaldado, listo para la siguiente fase del ciclo de vida (QA o Producción).
