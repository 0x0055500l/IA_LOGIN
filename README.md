# Secure & Interactive AI Login 🧠🔒

Un sistema de inicio de sesión moderno, altamente interactivo y enfocado en la seguridad, construido con **HTML5, CSS3 (Vanilla) y JavaScript** con un backend **Node.js + Express**.

<img src="https://github.com/0x0055500l/IA_LOGIN/blob/main/Screenshot%202026-06-28%20213835.png" alt="Imagen Ilustrativa" width="800"/>

---

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) v16 o superior
- npm (incluido con Node.js)

## 🚀 Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/0x0055500l/IA_LOGIN.git
cd IA_LOGIN

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
node server.js
```

El servidor se levantará en **http://localhost:3000**. Abre esa URL en tu navegador.

> ⚠️ **Nota:** El proyecto requiere el servidor activo para funcionar. No abras `index.html` directamente, ya que la autenticación se realiza contra el backend.

---

## 🔑 Credenciales de Prueba

La autenticación se valida en el **servidor** (no en el navegador). Usa estas credenciales:

| Correo | Contraseña | Rol |
|--------|------------|-----|
| `test@test.com` | `Test1234!` | Usuario Demo |
| `admin@sistema.hn` | `Admin2024!` | Administrador |

*Cualquier otra combinación simulará un fallo de inicio de sesión para que puedas probar las animaciones de error y el sistema de bloqueo.*

---

## 🎨 Características de Diseño (UI/UX)

- **Glassmorphism:** Efectos de cristal esmerilado que brindan profundidad y elegancia a la interfaz.
- **Tipografía Premium:** Uso de la fuente "Outfit" para asegurar una lectura limpia y un aspecto futurista.
- **Scroll Responsivo:** La interfaz se adapta a cualquier tamaño de pantalla con scroll vertical funcional.
- **Interactividad Canvas:** 
  - **Fondo Neuronal Magnético:** Partículas flotantes que se conectan entre sí y reaccionan de manera "magnética" a la posición del cursor, formando una red neuronal dinámica.
  - **Logo IA Giratorio:** Un núcleo geométrico posicionado sobre el mensaje de bienvenida que simula las conexiones de una IA y que se inclina sutilmente siguiendo el movimiento del ratón.
- **Cursor Dinámico (Logo Flotante):** Un núcleo brillante adicional que persigue al cursor del usuario de manera fluida usando interpolación lineal (Lerp).

## 🛡️ Verificación Antifraude (Panel Colapsable)

Debajo del formulario de login se encuentra un panel colapsable **"🛡️ Verificación Antifraude"** que integra:

- **Reconocimiento Facial:** Activa la cámara web del dispositivo para capturar un rostro y verificarlo.
- **Motor de Inferencia:** Evalúa reglas expertas basadas en monto, hora, ubicación y verificación facial.
- **Análisis de Riesgo:** Clasifica la transacción como riesgo bajo, medio o alto.

> Este panel es independiente del login y se abre/cierra con un clic para no interferir con el flujo de inicio de sesión.

## 🔐 Características de Seguridad

### Del lado del Servidor
1. **Autenticación Server-Side:** Las credenciales se validan en el backend, nunca se exponen al navegador.
2. **Rate Limiting por IP:** Después de 5 intentos fallidos, la IP se bloquea durante 60 segundos.
3. **API REST:** Endpoints seguros para login (`POST /api/login`) y verificación antifraude (`POST /api/fraud-check`).

### Del lado del Cliente
4. **Anti-DevTools e Inspector:**
   - Desactiva el clic derecho (Menú contextual).
   - Bloquea atajos de teclado críticos (`F12`, `Ctrl+Shift+I/J/C`, `Ctrl+U`).
   - Implementa un bucle `debugger` que interrumpe la ejecución si se fuerzan las herramientas de desarrollador.
5. **Protección contra Fuerza Bruta (Doble Capa):**
   - Bloqueo server-side por IP (5 intentos → 60s de bloqueo).
   - Bloqueo client-side complementario con `localStorage` (3 intentos → 30s).
6. **Validación Avanzada en Tiempo Real:**
   - **Teléfono Internacional Inteligente:** Campo telefónico con detección automática de país por código de área (ej. `+504` → Honduras). Valida longitud y formato en tiempo real.
   - **Validación Profunda de Correo:** Soporta dominios complejos (`.com.hn`). Simula verificación MX del servidor antes de enviar.
   - Sanitización de entradas contra inyección de código (XSS).
   - Barra de fortaleza de contraseña en tiempo real.
7. **Honeypot Anti-Bot:** Campo oculto que, si un bot lo llena, cancela silenciosamente el envío.
8. **Anti-Clickjacking:** Protección para evitar que la página se incruste en un `iframe` malicioso.
9. **Política de Seguridad de Contenido (CSP):** Controla qué recursos puede cargar el navegador.

---

## 📁 Estructura del Proyecto

```
IA_LOGIN/
├── index.html            # Página de login
├── styles.css            # Estilos (glassmorphism, responsivo)
├── app.js                # Lógica del cliente (validación, animaciones, panel antifraude)
├── server.js             # Backend Express (login, fraud-check, rate limiting)
├── reglas.js             # Base de conocimiento del sistema experto
├── motorInferencia.js    # Motor de inferencia para evaluación de reglas
├── dashboard.html        # Panel post-login
├── dashboard.css         # Estilos del dashboard
├── dashboard.js          # Lógica del dashboard
├── package.json          # Dependencias del proyecto
└── README.md             # Este archivo
```

---

## 🌐 API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/` | Sirve la página de login |
| `POST` | `/api/login` | Autentica usuario (email + password) |
| `POST` | `/api/fraud-check` | Evalúa riesgo antifraude con datos de transacción |
| `GET` | `/health` | Health check del servidor |

---

*Desarrollado para Alejandro (Josseth)*

