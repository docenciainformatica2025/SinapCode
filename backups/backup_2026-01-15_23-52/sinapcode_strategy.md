# Documentación Estratégica y Arquitectura Técnica - SinapCode

## 1. Estrategia SEO y Palabras Clave (Colombia)
Para maximizar el impacto orgánico sin costo publicitario, nos enfocaremos en términos "Long Tail" específicos para la educación digital en Colombia y la normativa docente actual.

**Top 10 Palabras Clave de Alto Impacto:**
1.  "Curso de programación gratis para niños Colombia"
2.  "Ascenso escalafón docente decreto 1278 cursos"
3.  "Diplomado pensamiento computacional ministerio TIC"
4.  "Aprender Python desde cero con certificación"
5.  "Recursos educativos abiertos Colombia Aprende"
6.  "Becas Talento Tech MinTIC 2026"
7.  "Gamificación en el aula ejemplos prácticos"
8.  "Seguridad digital para colegios ley 1581"
9.  "Proyectos Maker con Micro:bit para estudiantes"
10. "Plataforma LMS gratuita para colegios públicos"

## 2. Protocolo de Seguridad y Habeas Data (Menores de Edad)
Cumplimiento estricto de la Ley 1581 de 2012 y el Decreto 1377 de 2013.

### Arquitectura de Privacidad:
*   **Consentimiento Informado:** Checkbox obligatorio en el registro: *"Soy mayor de 14 años o cuento con autorización de mi acudiente legal (Ley de Infancia y Adolescencia - Ley 1098 de 2006)"*.
*   **Minimización de Datos:** Solo se pide Nombre, Correo Institucional (preferible) y Grado escolar. No recolección de fotos reales ni direcciones físicas de estudiantes.
*   **Encriptación:**
    *   **En tránsito:** Certificado SSL (Let's Encrypt - Gratuito).
    *   **En reposo:** Base de datos Moodle con passwords hasheadas (Bcrypt/Argon2).
*   **Rol de "Acudiente Digital":** Funcionalidad de Moodle ("Parent Role") para que padres/tutores puedan auditar el progreso sin intervenir en las evaluaciones.

## 3. Arquitectura LMS (Moodle) y Pedagogía

### Instalación Gratuita y Optimizada
*   **Hosting recomendado (Free Tier):** Oracle Cloud Always Free (Ampere A1 Compute) o Google Cloud Free Tier.
*   **Software Base:** Ubuntu Server LTS + LAMP Stack (Linux, Apache/Nginx, MySQL/MariaDB, PHP).
*   **Versión Moodle:** Moodle 4.x (LTS) - Enfocado en UX móvil.

### Estrategia de Gamificación (Estilo RPG - "Classcraft & Duolingo")
Usaremos el plugin **"Level Up!"** y **"Stash"** (para inventario de items).

*   **Economía de Fichas (SinapCoins):**
    *   **Inspiración Duolingo:** Sistema de "Rachas" (Streaks) visibles en el dashboard. Si el estudiante entra 3 días seguidos, gana un multiplicador de XP.
    *   **Inspiración Classcraft:**
        *   **Roles:** Los estudiantes eligen ser "Guardianes del Código" (Defensa/Ciberseguridad) o "Arquitectos de Datos" (Constructores/Programación).
        *   **Items:** Al ganar medallas de Ciberseguridad, desbloquean "Escudos Digitales" para su avatar.
*   **Insignias Verificables (Estilo Cisco NetAcad):**
    *   Integración con **Badgr (Canvas Badges)** gratuito en Moodle.
    *   Las insignias no son solo stickers, son evidencia digital de competencias (ej: "Certificación Python Junior") que pueden exportarse a LinkedIn.

### Aprendizaje Adaptativo & Tutoría IA (Estilo Khanmigo & ALEKS)
Configuración avanzada de Moodle:

**1. El Tutor Socrático (Simulado o API):**
*   **Regla de Oro:** La IA nunca da la respuesta.
*   **Prompting del Sistema:** "Actúa como un guía socrático. Si el estudiante pregunta '¿Cuál es la respuesta?', responde con una pista o una pregunta orientadora como '¿Qué crees que pasaría si cambias la variable X?'".

**2. Rutas Personalizadas (Microlearning):**
*   Usar **H5P** (Interactive Content) para crear lecciones de 5 minutos (Estilo Duolingo).
*   **Ramificación:** Si falla en lógica booleana:
    *   *Malo:* Repetir el mismo pdf.
    *   *SinapCode:* Redirigir a un mini-juego interactivo de H5P específico sobre `True/False`.

## 4. Recursos & Zona Docente (Estilo MagicSchool.ai & Oracle Member Hub)
*   **Laboratorio de Rúbricas (IA):**
    *   Implementación de un formulario simple conectado a una API de texto (o pre-prompted links a ChatGPT) que genere rúbricas instantáneas: "Generar rúbrica para proyecto de Scratch grado 6".
*   **Recursos Industriales:**
    *   Enlaces directos curados al **Oracle Academy Member Hub** para descargar Alicer 3 y Greenfoot.
    *   Acceso a simuladores online basados en Packet Tracer (Cisco).
