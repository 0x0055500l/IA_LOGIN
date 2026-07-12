import re

with open('README.md', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Requisitos Previos
new_reqs = """## 📋 Requisitos Previos

### Entorno de Desarrollo Local (Node.js)
- [Node.js](https://nodejs.org/) v16 o superior
- npm (incluido con Node.js)

### Entorno de Producción VPS (Python)
- Python 3.8 o superior
- Gunicorn
- pip"""
content = re.sub(r'## 📋 Requisitos Previos.*?## 🚀', new_reqs + '\n\n## 🚀', content, flags=re.DOTALL)

# 2. Update Instalación y Ejecución
new_install = """## 🚀 Instalación y Ejecución

### Opción 1: Desarrollo Local (Node.js)
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

### Opción 2: Producción en VPS (Python/Flask con Gunicorn)
Ideal para servidores en la nube (ej. Azure) que ya tienen un entorno Python/Gunicorn, evitando instalar Node.js.

```bash
# 1. Instalar requerimientos de Python
pip3 install -r requirements.txt

# 2. Iniciar servidor en segundo plano (puerto 8001)
gunicorn --bind 0.0.0.0:8001 app:app --daemon
```

---

## 🛡️ Robustez en Producción (Zero CORS)

Para asegurar que el sistema funcione a la perfección detrás de proxies, redes corporativas estrictas, bloqueadores de rastreo (Tracking Prevention) o AdBlockers, el proyecto ha sido configurado para ser **100% autónomo**.
Todas las dependencias críticas de terceros se sirven localmente desde la carpeta `assets/`:
- **Fuentes (Outfit):** Descargadas desde Google Fonts (.ttf).
- **Librerías (intl-tel-input):** JavaScript, CSS e imágenes de banderas auto-alojadas, garantizando el formateo de números en cualquier red.

---

## 🔑 Credenciales"""
content = re.sub(r'## 🚀 Instalación y Ejecución.*?## 🔑 Credenciales', new_install, content, flags=re.DOTALL)

# 3. Update Estructura del Proyecto
new_structure = """## 📁 Estructura del Proyecto

```
IA_LOGIN/
├── assets/               # Librerías locales y tipografías (Evita bloqueos CORS/AdBlock)
├── index.html            # Página de login
├── styles.css            # Estilos (glassmorphism, responsivo)
├── app.js                # Lógica del cliente (validación, animaciones, JWT storage)
├── server.js             # Backend Express (Node.js)
├── app.py                # Backend Producción (Python + Flask)
├── requirements.txt      # Dependencias de Python
├── reglas.js             # Base de conocimiento del sistema experto
├── motorInferencia.js    # Motor de inferencia
├── chatbot.js            # 🤖 Chatbot IA conversacional
├── dashboard.html        # Panel post-login
├── dashboard.css         # Estilos del dashboard
├── dashboard.js          # Lógica del dashboard
└── package.json          # Dependencias Node.js
```"""
content = re.sub(r'## 📁 Estructura del Proyecto.*?```', new_structure, content, flags=re.DOTALL)

# 4. Update the bottom line
content = content.replace('*Desarrollado para Alejandro (Josseth)*', '*Desarrollado (GRUPO 3) - UTH San pedro sula 2026 - INTELIGENCIA ARTIFICIAL*')

with open('README.md', 'w', encoding='utf-8') as f:
    f.write(content)
