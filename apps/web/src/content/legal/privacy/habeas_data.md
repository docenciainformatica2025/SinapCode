# 🛡️ Política de Privacidad y Protección de Datos (Data Privacy Charter)

**Entidad Responsable:** SinapCode / Ing. Antonio Rodriguez  
**Alcance:** Global (Colombia + Internacional)

## 1. Manifiesto de Privacidad
En SinapCode, entendemos que los datos de aprendizaje son una extensión de la mente del estudiante. Tratamos la información con el mismo rigor técnico y ético con el que enseñamos a programar. **No vendemos datos a terceros.**

## 2. Responsable del Tratamiento
- **Identidad:** Ing. Antonio Rodriguez (actuando como SinapCode).
- **Domicilio:** Pasto, Nariño, Colombia.
- **Canal de Privacidad:** sinapcodeia@gmail.com

## 3. Tipología de Datos Recolectados
Para que nuestra IA educativa funcione, clasificamos los datos en tres niveles de seguridad:

### 3.1 Nivel 1: Datos de Identidad (Acceso)
- Nombres y apellidos.
- Correo electrónico institucional o personal.
- Fecha de nacimiento (para verificación de edad).
- Datos del Acudiente/Tutor (si el usuario es menor de 16 años).

### 3.2 Nivel 2: Telemetría Cognitiva (Funcionamiento de la IA)
*Esta es la data que alimenta al "Tutor Sinap".*
- **Patrones de código:** Errores de sintaxis frecuentes, velocidad de escritura y lógica de resolución de problemas.
- **Interacciones:** Preguntas realizadas al chat de IA.
- **Progreso:** Tiempos de lectura y completitud de módulos.
*Nota: Estos datos se seudonimizan (se separan de la identidad real) para el análisis estadístico.*

### 3.3 Nivel 3: Datos Técnicos
- Dirección IP, tipo de navegador y dispositivo (para seguridad y auditoría).

## 4. Finalidad del Tratamiento
- **Personalización Pedagógica:** El algoritmo ajusta la dificultad de los ejercicios basándose en el historial de errores del estudiante.
- **Certificación:** Emitir los certificados de completitud del curso con validez académica.
- **Seguridad:** Detectar intentos de hacking, fraude o suplantación de identidad.
- **Comunicación:** Enviar reportes de progreso al estudiante (y a sus padres, si aplica).

## 5. Tratamiento de Datos de Menores de Edad
*Cumplimiento estricto del Artículo 7 de la Ley 1581 y Art. 8 del RGPD.*

El tratamiento de datos de menores asegura el respeto a sus derechos fundamentales.
- Se requiere autorización previa, expresa e informada del Representante Legal (Padre/Madre).
- SinapCode implementa un proceso de **"Doble Verificación"**: El menor se registra, pero la cuenta permanece en "Estado de Espera" hasta que el acudiente confirma vía correo electrónico.

## 6. Inteligencia Artificial y Privacidad
- **Entrenamiento de Modelos:** El código escrito por los estudiantes puede ser utilizado para re-entrenar modelos de IA internos para mejorar la detección de errores. **NUNCA se utilizan datos personales identificables (PII) para este fin.**
- **Proveedores de IA:** Si SinapCode utiliza APIs de terceros (ej. OpenAI, Anthropic), los datos se envían anonimizados y bajo acuerdos de "Zero Data Retention" (no retención de datos) para entrenamiento externo, garantizando que el código del estudiante no se filtre públicamente.

## 7. Derechos del Titular (ARCO)
El estudiante (o su acudiente) tiene derecho a:
- **Acceso:** Conocer qué datos tenemos.
- **Rectificación:** Corregir datos erróneos (ej. nombre mal escrito).
- **Cancelación (Derecho al Olvido):** Solicitar la eliminación total de la cuenta y sus registros, salvo los que deban conservarse por ley.
- **Oposición:** Negarse a recibir correos no esenciales o a que sus datos se usen para analítica.
- **Portabilidad:** Solicitar la descarga de todo su historial y proyectos en formato abierto (JSON/ZIP).

## 8. Medidas de Seguridad
Aplicamos estándares de la industria "High Tech":
- **Cifrado en tránsito:** Protocolo TLS 1.3 para todas las comunicaciones.
- **Cifrado en reposo:** Las bases de datos están encriptadas (AES-256).
- **Control de Acceso:** Solo personal técnico autorizado (bajo acuerdo de confidencialidad) tiene acceso al backend.

## 9. Transferencias Internacionales
Los datos pueden ser procesados en servidores ubicados en EE.UU. o Europa (ej. AWS, Vercel, Supabase). SinapCode asegura que estos proveedores cumplen con el Data Privacy Framework (DPF) o Cláusulas Contractuales Tipo (SCC) de la UE.
