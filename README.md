# Secure & Interactive AI Login 🧠🔒

Un sistema de inicio de sesión moderno, altamente interactivo y enfocado en la seguridad, construido con **HTML5, CSS3 (Vanilla) y JavaScript**.

<img src="https://github.com/0x0055500l/IA_LOGIN/blob/main/Screenshot%202026-06-28%20213835.png" alt="Imagen Ilustrativa" width="800"/>

## 🎨 Características de Diseño (UI/UX)
- **Glassmorphism:** Efectos de cristal esmerilado que brindan profundidad y elegancia a la interfaz.
- **Tipografía Premium:** Uso de la fuente "Outfit" para asegurar una lectura limpia y un aspecto futurista.
- **Interactividad Canvas:** 
  - **Fondo Neuronal Magnético:** Partículas flotantes que se conectan entre sí y reaccionan de manera "magnética" a la posición del cursor, formando una red neuronal dinámica.
  - **Logo IA Giratorio:** Un núcleo geométrico posicionado sobre el mensaje de bienvenida que simula las conexiones de una IA y que se inclina sutilmente siguiendo el movimiento del ratón.
- **Cursor Dinámico (Logo Flotante):** Un núcleo brillante adicional que persigue al cursor del usuario de manera fluida usando interpolación lineal (Lerp).

## 🛡️ Características de Seguridad y Prevención
Este proyecto incorpora múltiples barreras del lado del cliente para simular e implementar buenas prácticas de seguridad web:

1. **Anti-DevTools e Inspector:**
   - Desactiva el clic derecho (Menú contextual).
   - Bloquea atajos de teclado críticos (`F12`, `Ctrl+Shift+I/J/C`, `Ctrl+U`).
   - Implementa un bucle `debugger` que interrumpe la ejecución y bloquea la interfaz si se fuerza la apertura de las herramientas de desarrollador.
2. **Protección contra Fuerza Bruta (Rate Limiting Simulado):**
   - Sistema de bloqueo por límite de intentos. Si se falla 3 veces, el formulario se bloquea por 30 segundos, guardando el estado temporal en `localStorage`.
3. **Validación Avanzada (Tiempo Real, Anti-XSS & Deep Checks):**
   - **Teléfono Internacional Inteligente:** Campo telefónico que arranca neutral. Al escribir el código de área (ej. `+504`), detecta automáticamente el país, muestra su bandera, y calibra su validación matemática en tiempo real para exigir la longitud exacta de dígitos de esa nación. No permite el ingreso de letras.
   - **Validación Profunda de Correo:** Soporta dominios complejos (`.com.hn`). Incorpora un *loader* asíncrono que simula consultar a un servidor Backend/MX si el buzón existe realmente antes de permitir el submit. (Rechaza `test@error.com` intencionalmente para pruebas).
   - Sanatización estricta de las entradas para prevenir inyección de código (XSS).
   - Barra de progreso que evalúa la fortaleza de la contraseña en tiempo real.
4. **Honeypot para Bots (Anti-Spam):**
   - Campo oculto para engañar a los bots automatizados. Si se llena, la solicitud falla silenciosamente, previniendo ataques de fuerza bruta automatizados o spam.
5. **Anti-Clickjacking:**
   - Script que asegura que la página no pueda ser incrustada dentro de un `iframe` malicioso en otro sitio web para robar credenciales.
6. **Política de Seguridad de Contenido (CSP):**
   - Etiqueta `meta` configurada para controlar qué recursos puede cargar el navegador, previniendo la inyección de scripts externos no deseados.

## 🚀 Cómo probarlo
Simplemente abre el archivo `index.html` en cualquier navegador web moderno.
- **Correo de prueba (Simulación de éxito):** `test@test.com`
- **Contraseña de prueba (Simulación de éxito):** `Test1234!`
*(Cualquier otra combinación simulará un fallo de inicio de sesión para que puedas probar las animaciones de error y el sistema de bloqueo temporal).*

---
*Desarrollado para Alejandro (Josseth)*
