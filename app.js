/**
 * Advanced Client-Side Security & Validation Logic
 */

// Add shake animation to document dynamically
const style = document.createElement("style");
style.innerHTML = `
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  // Apply saved theme and language
  const savedTheme = localStorage.getItem('userTheme') || 'dark';
  const savedLang = localStorage.getItem('userLanguage') || 'es';

  if (savedTheme === 'light') {
    document.body.classList.add('theme-light');
  } else {
    document.body.classList.remove('theme-light');
  }

  const TRANSLATIONS = {
    es: {
      login_welcome: "Bienvenido",
      login_subtitle: "Ingresa tus credenciales de forma segura",
      login_email: "Correo Electrónico",
      login_phone: "Número Telefónico",
      login_password: "Contraseña",
      login_submit: "Iniciar Sesión",
      fraud_toggle_btn: "🛡️ Verificación Antifraude",
      fraud_title: "Motor de Inferencia Antifraude",
      fraud_desc: "Analiza la transacción ficticia con cámara y reglas expertas.",
      fraud_amount: "Monto",
      fraud_hour: "Hora",
      fraud_loc: "Ubicación actual",
      fraud_last_loc: "Última compra",
      fraud_scan: "Escanear Rostro",
      camera_ready: "Listo para activar la cámara.",
      risk_waiting: "Esperando evaluación del riesgo…"
    },
    en: {
      login_welcome: "Welcome",
      login_subtitle: "Enter your credentials securely",
      login_email: "Email Address",
      login_phone: "Phone Number",
      login_password: "Password",
      login_submit: "Sign In",
      fraud_toggle_btn: "🛡️ Fraud Verification",
      fraud_title: "Anti-Fraud Inference Engine",
      fraud_desc: "Analyzes mock transactions using camera and expert rules.",
      fraud_amount: "Amount",
      fraud_hour: "Hour",
      fraud_loc: "Current Location",
      fraud_last_loc: "Last Purchase",
      fraud_scan: "Scan Face",
      camera_ready: "Ready to activate camera.",
      risk_waiting: "Waiting for risk evaluation..."
    }
  };

  const getValidationMsg = (key, lang) => {
    const msgs = {
      es: {
        email_req: "El correo es requerido.",
        email_inv: "Formato de correo inválido.",
        email_long: "El correo es demasiado largo.",
        pass_req: "La contraseña es requerida.",
        pass_len: "Debe tener al menos 8 caracteres.",
        pass_lower: "Debe contener una minúscula.",
        pass_upper: "Debe contener una mayúscula.",
        pass_num: "Debe contener un número.",
        pass_spec: "Debe contener un carácter especial.",
        phone_err: "Solo se permiten números en este campo.",
        phone_inv: "Formato o longitud de número inválido para el país.",
        phone_mismatch: "El número no coincide con el país seleccionado.",
        phone_region: "Número telefónico inválido para la región seleccionada.",
        wait_mx: "Espera a la validación del correo o ingresa uno válido.",
        success_redirect: "Autenticación exitosa. Redirigiendo...",
        server_error: "Error de conexión con el servidor."
      },
      en: {
        email_req: "Email is required.",
        email_inv: "Invalid email format.",
        email_long: "Email is too long.",
        pass_req: "Password is required.",
        pass_len: "Must be at least 8 characters.",
        pass_lower: "Must contain a lowercase letter.",
        pass_upper: "Must contain an uppercase letter.",
        pass_num: "Must contain a number.",
        pass_spec: "Must contain a special character.",
        phone_err: "Only numbers are allowed in this field.",
        phone_inv: "Invalid number format or length for this country.",
        phone_mismatch: "The number does not match the selected country.",
        phone_region: "Invalid phone number for the selected region.",
        wait_mx: "Wait for email validation or enter a valid one.",
        success_redirect: "Authentication successful. Redirecting...",
        server_error: "Connection error with the server."
      }
    };
    return msgs[lang]?.[key] || msgs.es[key];
  };

  function applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        el.textContent = TRANSLATIONS[lang][key];
      }
    });
  }

  applyLanguage(savedLang);
  window.getValidationMsg = getValidationMsg; // Make accessible globally if needed

  // 1. Anti-DevTools & Inspector Protections
  preventDevTools();

  const form = document.getElementById("secureLoginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const phoneInput = document.getElementById("phone");
  const toggleBtn = document.getElementById("togglePassword");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const phoneError = document.getElementById("phoneError");
  const strengthBar = document.getElementById("strengthBar");
  const submitBtn = document.getElementById("submitBtn");
  const formFeedback = document.getElementById("formFeedback");
  const emailLoader = document.getElementById("emailLoader");
  const scanFaceBtn = document.getElementById("scanFaceBtn");
  const faceVideo = document.getElementById("faceVideo");
  const captureCanvas = document.getElementById("captureCanvas");
  const cameraStatus = document.getElementById("cameraStatus");

  // Initialize intlTelInput for advanced phone validation
  const iti = window.intlTelInput(phoneInput, {
    allowDropdown: false,
    nationalMode: false,
    autoHideDialCode: false,
    initialCountry: "hn",
    preferredCountries: ["hn"],
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  phoneInput.value = "+504";

  // Rate Limiting Configuration
  const MAX_ATTEMPTS = 3;
  const LOCKOUT_TIME = 30 * 1000; // 30 seconds

  // 2. Prevent right-click and common shortcuts for devtools/inspection
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey &&
        e.shiftKey &&
        (e.key === "I" || e.key === "J" || e.key === "C")) ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
      console.warn(
        "Intento de acceso a herramientas de desarrollo detectado y bloqueado.",
      );
    }
  });

  // 3. Rate Limit Checking (Client-side simulation)
  function checkRateLimit() {
    const lockoutEnd = localStorage.getItem("lockoutEnd");
    if (lockoutEnd) {
      const now = new Date().getTime();
      if (now < parseInt(lockoutEnd)) {
        const remaining = Math.ceil((parseInt(lockoutEnd) - now) / 1000);
        disableForm(`Demasiados intentos. Intenta en ${remaining}s.`);
        setTimeout(checkRateLimit, 1000);
        return true;
      } else {
        localStorage.removeItem("lockoutEnd");
        localStorage.removeItem("loginAttempts");
        enableForm();
      }
    }
    return false;
  }

  checkRateLimit();

  // 4. Input Sanitization (Basic XSS prevention on client)
  function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
  }

  // 5. Validation Logic
  const validators = {
    email: (value) => {
      const currentLang = localStorage.getItem('userLanguage') || 'es';
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
      if (!value) return getValidationMsg("email_req", currentLang);
      if (!regex.test(value)) return getValidationMsg("email_inv", currentLang);
      if (value.length > 60) return getValidationMsg("email_long", currentLang);
      return null;
    },
    password: (value) => {
      const currentLang = localStorage.getItem('userLanguage') || 'es';
      if (!value) return getValidationMsg("pass_req", currentLang);
      if (value.length < 8) return getValidationMsg("pass_len", currentLang);
      if (!/(?=.*[a-z])/.test(value)) return getValidationMsg("pass_lower", currentLang);
      if (!/(?=.*[A-Z])/.test(value)) return getValidationMsg("pass_upper", currentLang);
      if (!/(?=.*\d)/.test(value)) return getValidationMsg("pass_num", currentLang);
      if (!/(?=.*[\W_])/.test(value)) return getValidationMsg("pass_spec", currentLang);
      return null;
    },
  };

  // Live Validation & Prediction
  let emailCheckTimeout = null;
  let isEmailValidDeep = false;

  emailInput.addEventListener("input", (e) => {
    // Prevent typing non-email friendly characters roughly
    const clean = sanitizeInput(e.target.value.trim());
    if (e.target.value !== clean) {
      e.target.value = clean;
    }
    const err = validators.email(clean);

    // Clear previous timeout
    clearTimeout(emailCheckTimeout);
    isEmailValidDeep = false;
    emailLoader.classList.remove("visible");

    if (err) {
      showError(emailError, err);
    } else {
      showError(emailError, null);
      // Simulate Deep Validation (Ping MX records / Backend check)
      emailLoader.classList.add("visible");

      emailCheckTimeout = setTimeout(() => {
        // Simulación de respuesta de backend
        emailLoader.classList.remove("visible");
        const currentLang = localStorage.getItem('userLanguage') || 'es';
        if (clean === "test@error.com") {
          showError(
            emailError,
            currentLang === 'en' ? "This email does not exist or cannot receive messages." : "Este correo no existe o no puede recibir mensajes.",
          );
          isEmailValidDeep = false;
        } else {
          showError(emailError, null); // Valid!
          isEmailValidDeep = true;
        }
      }, 1200); // 1.2s delay to simulate network
    }
  });

  phoneInput.addEventListener("input", (e) => {
    const originalValue = e.target.value;
    // Permitir solo el signo + al principio y números después.
    const sanitizedValue = originalValue.replace(/(?!^\+)[^\d\s-]/g, "");

    const currentLang = localStorage.getItem('userLanguage') || 'es';
    if (originalValue !== sanitizedValue) {
      e.target.value = sanitizedValue;
      showError(phoneError, getValidationMsg("phone_err", currentLang));
      return;
    }

    if (!sanitizedValue.trim() || sanitizedValue.trim() === "+") {
      showError(phoneError, null);
      return;
    }

    // Validación en tiempo real del tamaño y formato según el país
    if (iti.isValidNumber()) {
      showError(phoneError, null);
    } else {
      showError(
        phoneError,
        getValidationMsg("phone_inv", currentLang),
      );
    }
  });

  // Re-validar si el usuario cambia el país desde el selector (bandera)
  phoneInput.addEventListener("countrychange", () => {
    const currentLang = localStorage.getItem('userLanguage') || 'es';
    if (phoneInput.value.trim()) {
      if (iti.isValidNumber()) {
        showError(phoneError, null);
      } else {
        showError(
          phoneError,
          getValidationMsg("phone_mismatch", currentLang),
        );
      }
    }
  });

  passwordInput.addEventListener("input", (e) => {
    const val = e.target.value;
    const err = validators.password(val);
    showError(passwordError, err);
    updateStrength(val);
  });

  function showError(element, message) {
    if (message) {
      element.textContent = message;
      element.classList.add("visible");
    } else {
      element.classList.remove("visible");
    }
  }

  function updateStrength(password) {
    let score = 0;
    if (password.length > 7) score += 25;
    if (/(?=.*[a-z])/.test(password)) score += 25;
    if (/(?=.*[A-Z])/.test(password)) score += 25;
    if (/(?=.*\d)/.test(password) && /(?=.*[\W_])/.test(password)) score += 25;

    strengthBar.style.width = score + "%";
    if (score <= 25) strengthBar.style.backgroundColor = "var(--error-color)";
    else if (score <= 50)
      strengthBar.style.backgroundColor = "var(--warning-color)";
    else if (score <= 75) strengthBar.style.backgroundColor = "#60a5fa";
    else strengthBar.style.backgroundColor = "var(--success-color)";
  }

  // Password Toggle
  toggleBtn.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    toggleBtn.style.color =
      type === "text" ? "var(--primary-color)" : "var(--text-muted)";
  });

  let faceVerified = false;
  let streamActive = false;

  async function startCamera() {
    if (streamActive) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      faceVideo.srcObject = stream;
      await faceVideo.play();
      streamActive = true;
      cameraStatus.textContent = "Cámara activa. Presiona Escanear Rostro.";
      cameraStatus.className = "camera-status";
    } catch (error) {
      cameraStatus.textContent =
        "No se pudo acceder a la cámara. Usa un navegador con permisos.";
      cameraStatus.className = "camera-status error";
      console.error(error);
    }
  }

  function captureFrame() {
    const context = captureCanvas.getContext("2d");
    captureCanvas.width = faceVideo.videoWidth || 320;
    captureCanvas.height = faceVideo.videoHeight || 240;
    context.drawImage(
      faceVideo,
      0,
      0,
      captureCanvas.width,
      captureCanvas.height,
    );
    return captureCanvas.toDataURL("image/png");
  }

  async function evaluateFaceVerification() {
    if (!streamActive) {
      await startCamera();
    }

    scanFaceBtn.disabled = true;
    scanFaceBtn.textContent = "Analizando…";
    cameraStatus.textContent = "Procesando rostro…";

    const payload = {
      faceImage: captureFrame(),
    };

    try {
      const response = await fetch("http://localhost:3000/api/fraud-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      faceVerified = result.faceMatch && result.faceMatch !== false;
      cameraStatus.textContent = faceVerified
        ? "Rostro verificado con éxito."
        : "El rostro no coincidió con el perfil legítimo.";
      cameraStatus.className = faceVerified
        ? "camera-status success"
        : "camera-status error";

      if (!faceVerified) {
        formFeedback.textContent =
          "Verificación facial necesaria antes de iniciar sesión.";
        formFeedback.className = "form-feedback feedback-warning";
      } else {
        formFeedback.textContent = "Rostro verificado. Ahora puedes iniciar sesión.";
        formFeedback.className = "form-feedback feedback-success";
      }
    } catch (error) {
      faceVerified = false;
      cameraStatus.textContent = "No fue posible contactar al servicio de verificación.";
      cameraStatus.className = "camera-status error";
      formFeedback.textContent = "No se pudo verificar el rostro. Intenta nuevamente.";
      formFeedback.className = "form-feedback feedback-error";
      console.error(error);
    } finally {
      scanFaceBtn.disabled = false;
      scanFaceBtn.textContent = "Escanear Rostro";
    }
  }

  scanFaceBtn.addEventListener("click", async () => {
    await evaluateFaceVerification();
  });

  // 6. Form Submission — Server-side authentication
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (checkRateLimit()) return;

    // Anti-bot Honeypot check
    const honeypot = document.getElementById("website_url").value;
    if (honeypot) {
      console.warn("Actividad sospechosa detectada.");
      return; // Silently fail
    }

    const email = sanitizeInput(emailInput.value);
    const password = passwordInput.value;

    const emailErr = validators.email(email);
    const passErr = validators.password(password);

    let hasError = false;

    const currentLang = localStorage.getItem('userLanguage') || 'es';
    if (emailErr) {
      showError(emailError, emailErr);
      hasError = true;
    } else if (!isEmailValidDeep) {
      showError(
        emailError,
        getValidationMsg("wait_mx", currentLang),
      );
      hasError = true;
    }

    if (passErr) {
      showError(passwordError, passErr);
      hasError = true;
    }

    if (!iti.isValidNumber()) {
      showError(
        phoneError,
        getValidationMsg("phone_region", currentLang),
      );
      hasError = true;
    }

    if (!faceVerified) {
      formFeedback.textContent = "Debes completar la verificación facial antes de iniciar sesión.";
      formFeedback.className = "form-feedback feedback-warning";
      hasError = true;
    }

    if (hasError) {
      triggerShake(form);
      return;
    }

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
      // Authenticate against the server instead of comparing hardcoded strings
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          phone: iti.getNumber(),
        }),
      });

      const result = await response.json();

      const currentLang = localStorage.getItem('userLanguage') || 'es';
      if (response.ok && result.success) {
        formFeedback.textContent = getValidationMsg("success_redirect", currentLang);
        formFeedback.className = "form-feedback feedback-success";
        localStorage.removeItem("loginAttempts");

        // Store JWT token securely in sessionStorage (cleared on tab close)
        sessionStorage.setItem("authToken", result.token);
        sessionStorage.setItem("userName", result.user.name);
        sessionStorage.setItem("userEmail", result.user.email);

        // Registrar acción de login en el historial (intento informativo)
        try {
          await fetch('/api/logs/action', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${result.token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ accion: 'login', resultado: 'exito', detalles: { ip: '', method: 'password' } })
          });
        } catch (e) { console.debug('[app] No se registró el login en historial:', e); }

        // Small delay so user sees the success message
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 800);
      } else {
        // Server rejected credentials
        if (result.locked) {
          disableForm(result.message || (currentLang === 'en' ? "Account temporarily locked." : "Cuenta bloqueada temporalmente."));
        } else {
          handleFailedAttempt(result.message);
        }
      }
    } catch (error) {
      const currentLang = localStorage.getItem('userLanguage') || 'es';
      formFeedback.textContent = getValidationMsg("server_error", currentLang);
      formFeedback.className = "form-feedback feedback-error";
      console.error("Login error:", error);
    } finally {
      submitBtn.classList.remove("loading");
      if (!checkRateLimit()) submitBtn.disabled = false;
    }
  });

  function handleFailedAttempt(serverMessage) {
    let attempts = parseInt(localStorage.getItem("loginAttempts") || "0");
    attempts++;
    localStorage.setItem("loginAttempts", attempts);

    triggerShake(form);

    if (attempts >= MAX_ATTEMPTS) {
      const lockoutEnd = new Date().getTime() + LOCKOUT_TIME;
      localStorage.setItem("lockoutEnd", lockoutEnd);
      checkRateLimit();
    } else {
      formFeedback.textContent =
        serverMessage ||
        `Credenciales incorrectas. Intento ${attempts}/${MAX_ATTEMPTS}`;
      formFeedback.className = "form-feedback feedback-error";
    }
  }

  function triggerShake(element) {
    element.style.animation = "none";
    element.offsetHeight; // trigger reflow
    element.style.animation = "shake 0.5s cubic-bezier(.36,.07,.19,.97) both";
  }

  function disableForm(msg) {
    emailInput.disabled = true;
    passwordInput.disabled = true;
    phoneInput.disabled = true;
    submitBtn.disabled = true;
    formFeedback.textContent = msg;
    formFeedback.className = "form-feedback feedback-warning";
  }

  function enableForm() {
    emailInput.disabled = false;
    passwordInput.disabled = false;
    phoneInput.disabled = false;
    submitBtn.disabled = false;
    formFeedback.textContent = "";
  }

  // 7. Interactive AI Logo tracking
  const aiLogo = document.getElementById("aiLogo");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let logoX = window.innerWidth / 2;
  let logoY = window.innerHeight / 2;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow loop using RequestAnimationFrame
  function animateLogo() {
    // Lerp (Linear Interpolation) for smooth follow
    logoX += (mouseX - logoX) * 0.1;
    logoY += (mouseY - logoY) * 0.1;

    if (aiLogo) {
      aiLogo.style.left = `${logoX}px`;
      aiLogo.style.top = `${logoY}px`;
    }

    requestAnimationFrame(animateLogo);
  }

  animateLogo();

  // 8. Header Canvas AI Logo (Interactive)
  const canvas = document.getElementById("headerCanvasLogo");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let time = 0;

    // Mouse position relative to canvas center
    let targetCx = canvas.width / 2;
    let targetCy = canvas.height / 2;
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;

    document.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      // Calculate mouse position relative to canvas
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Constrain movement area so it just "leans" towards mouse
      // The pull is calculated based on the mouse position relative to the whole window
      // to make it react even if you're not hovering exactly on top of it.
      const dx = e.clientX - window.innerWidth / 2;
      const dy = e.clientY - window.innerHeight / 2;

      // Maximum displacement limit for the core inside the canvas
      targetCx = canvas.width / 2 + (dx / window.innerWidth) * 20;
      targetCy = canvas.height / 2 + (dy / window.innerHeight) * 20;
    });

    function drawCanvasLogo() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      // Lerp center for smooth leaning
      cx += (targetCx - cx) * 0.1;
      cy += (targetCy - cy) * 0.1;

      const radius = 30;
      const nodes = 6;

      // Draw connections (neural network mesh)
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < nodes; i++) {
        const angle1 = time + (i * Math.PI * 2) / nodes;
        const x1 = cx + Math.cos(angle1) * radius;
        const y1 = cy + Math.sin(angle1) * radius;

        for (let j = i + 1; j < nodes; j++) {
          const angle2 = time + (j * Math.PI * 2) / nodes;
          const x2 = cx + Math.cos(angle2) * radius;
          const y2 = cy + Math.sin(angle2) * radius;

          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
      }
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.stroke();

      // Draw nodes
      for (let i = 0; i < nodes; i++) {
        const angle = time + (i * Math.PI * 2) / nodes;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#38bdf8";
        ctx.fill();
      }
      ctx.shadowBlur = 0; // reset

      // Draw pulsing core
      ctx.beginPath();
      const corePulse = Math.sin(time * 3) * 3 + 8; // Pulse between 5 and 11
      ctx.arc(cx, cy, corePulse, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#38bdf8";
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      requestAnimationFrame(drawCanvasLogo);
    }

    drawCanvasLogo();
  }

  // 9. Background Neural Network (Magnetic Effect)
  const bgCanvas = document.getElementById("bgCanvas");
  if (bgCanvas) {
    const bgCtx = bgCanvas.getContext("2d");
    let particles = [];
    const particleCount = 80;

    function resizeBg() {
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeBg);
    resizeBg();

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * bgCanvas.width,
        y: Math.random() * bgCanvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
      });
    }

    function animateBg() {
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

      // Draw and update particles
      for (let i = 0; i < particleCount; i++) {
        let p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > bgCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > bgCanvas.height) p.vy *= -1;

        // Magnetic effect with mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          // Gentle attraction
          p.x += dx * 0.015;
          p.y += dy * 0.015;

          // Draw line to mouse
          bgCtx.beginPath();
          bgCtx.moveTo(p.x, p.y);
          bgCtx.lineTo(mouseX, mouseY);
          // Fade out line as it gets further away
          bgCtx.strokeStyle = `rgba(56, 189, 248, ${0.3 - dist / 666})`;
          bgCtx.lineWidth = 1;
          bgCtx.stroke();
        }

        // Draw particle
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        bgCtx.fillStyle = "rgba(56, 189, 248, 0.4)";
        bgCtx.fill();

        // Connect to other nearby particles
        for (let j = i + 1; j < particleCount; j++) {
          let p2 = particles[j];
          const pdx = p.x - p2.x;
          const pdy = p.y - p2.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pdist < 120) {
            bgCtx.beginPath();
            bgCtx.moveTo(p.x, p.y);
            bgCtx.lineTo(p2.x, p2.y);
            bgCtx.strokeStyle = `rgba(56, 189, 248, ${0.15 - pdist / 800})`;
            bgCtx.lineWidth = 0.5;
            bgCtx.stroke();
          }
        }
      }

      requestAnimationFrame(animateBg);
    }

    animateBg();
  }

  // 10. Collapsible Fraud Panel Toggle
  const fraudToggleBtn = document.getElementById("fraudToggleBtn");
  const fraudPanelWrapper = document.getElementById("fraudPanelWrapper");

  if (fraudToggleBtn && fraudPanelWrapper) {
    fraudToggleBtn.addEventListener("click", () => {
      fraudToggleBtn.classList.toggle("active");
      fraudPanelWrapper.classList.toggle("open");

      // Update border radius when open
      if (fraudPanelWrapper.classList.contains("open")) {
        fraudToggleBtn.style.borderRadius = "14px 14px 0 0";
      } else {
        fraudToggleBtn.style.borderRadius = "14px";
      }
    });
  }
});

/**
 * ─── guardarPerfil() ─────────────────────────────────────────────────────────
 * Función global del sistema BankSecure para guardar los cambios del perfil
 * desde el módulo de Configuraciones.
 *
 * Flujo:
 *  1. Captura nombre y correo del formulario #profileSettingsForm
 *  2. Valida el formato del correo con regex
 *  3. Envía los datos al servidor mediante fetch → POST /api/updateProfile
 *  4. Incluye el token JWT en el header Authorization: Bearer <token>
 *  5. Muestra mensaje visual según la respuesta del servidor:
 *     - Status 200: "✓ Cambios guardados correctamente."
 *     - Status 400: "✗ <mensaje de error del servidor>"
 *     - Error de red: "✗ Error de conexión."
 *
 * Esta función es invocada por el formulario en dashboard.js a través del
 * handler del evento 'submit'. También puede llamarse directamente:
 *   guardarPerfil();
 *
 * @returns {Promise<void>}
 */
async function guardarPerfil() {
  // Si estamos en el dashboard, delegar a la implementación completa
  if (typeof window.guardarPerfil === 'function' && window.guardarPerfil !== guardarPerfil) {
    return window.guardarPerfil();
  }

  const currentLang = localStorage.getItem('userLanguage') || 'es';
  const token = sessionStorage.getItem('authToken');

  // Capturar valores del formulario de configuración
  const nameInput  = document.getElementById('profileName');
  const emailInput = document.getElementById('profileEmail');

  if (!nameInput || !emailInput) {
    console.warn('[guardarPerfil] Formulario de perfil no encontrado en el DOM.');
    return;
  }

  const name  = nameInput.value.trim();
  const email = emailInput.value.trim();

  // ── Validación cliente ──
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;

  if (!name) {
    mostrarMensajePerfil(
      currentLang === 'en' ? '✗ Name is required.' : '✗ El nombre es requerido.',
      false
    );
    return;
  }

  if (!emailRegex.test(email)) {
    mostrarMensajePerfil(
      currentLang === 'en' ? '✗ Invalid email format.' : '✗ Formato de correo electrónico inválido.',
      false
    );
    return;
  }

  if (!token) {
    mostrarMensajePerfil(
      currentLang === 'en' ? '✗ Session expired. Please log in again.' : '✗ Sesión expirada. Inicia sesión de nuevo.',
      false
    );
    return;
  }

  try {
    // ── Petición al servidor con autenticación JWT ──
    const response = await fetch('/api/updateProfile', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Status 200: éxito
      if (data.token) sessionStorage.setItem('authToken', data.token);
      sessionStorage.setItem('userName', data.user.name);
      sessionStorage.setItem('userEmail', data.user.email);

      mostrarMensajePerfil(
        currentLang === 'en' ? '✓ Changes saved successfully!' : '✓ Cambios guardados correctamente.',
        true
      );
    } else {
      // Status 400: error de validación
      const errMsg = data.message
        || (currentLang === 'en' ? 'Error saving changes.' : 'Error al guardar los cambios.');
      mostrarMensajePerfil(`✗ ${errMsg}`, false);
    }
  } catch (err) {
    // Error de red
    mostrarMensajePerfil(
      currentLang === 'en' ? '✗ Connection error. Please try again.' : '✗ Error de conexión. Inténtalo de nuevo.',
      false
    );
    console.error('[guardarPerfil] Error de red:', err);
  }
}

/**
 * mostrarMensajePerfil() — muestra un mensaje visual en el formulario de perfil.
 * @param {string} mensaje  - Texto a mostrar
 * @param {boolean} exito   - true = éxito (verde), false = error (rojo)
 */
function mostrarMensajePerfil(mensaje, exito) {
  // Intentar usar el elemento dedicado si existe (dashboard)
  const feedbackEl = document.getElementById('profileFeedback');
  if (feedbackEl && typeof window.showProfileFeedback === 'function') {
    window.showProfileFeedback(mensaje, exito ? 'success' : 'error');
    return;
  }

  // Fallback: crear o reusar un elemento temporal
  let el = document.getElementById('profileFeedbackFallback');
  if (!el) {
    el = document.createElement('div');
    el.id = 'profileFeedbackFallback';
    el.style.cssText = `
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      margin: 10px 0;
      border: 1px solid;
      transition: opacity 0.3s ease;
    `;
    const form = document.getElementById('profileSettingsForm');
    if (form) {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) form.insertBefore(el, btn);
      else form.appendChild(el);
    }
  }

  el.textContent = mensaje;
  el.style.opacity = '1';

  if (exito) {
    el.style.background = 'rgba(20, 195, 142, 0.1)';
    el.style.borderColor = '#14c38e';
    el.style.color = '#14c38e';
    setTimeout(() => { el.style.opacity = '0'; }, 5000);
  } else {
    el.style.background = 'rgba(255, 93, 122, 0.1)';
    el.style.borderColor = '#ff5d7a';
    el.style.color = '#ff5d7a';
  }
}

// Advanced Anti-DevTools Logic
function preventDevTools() {
  let devtoolsOpen = false;

  // 1. Debugger loop (slows down inspection and pauses execution if devtools is open)
  const devtoolsCheck = setInterval(() => {
    const start = performance.now();
    debugger; // This will pause execution if DevTools is open
    const end = performance.now();

    if (end - start > 100) {
      devtoolsOpen = true;
      document.body.innerHTML = `
                <div style="display:flex; justify-content:center; align-items:center; height:100vh; background-color:#0f172a; color:#ef4444; text-align:center; flex-direction:column; padding: 20px;">
                    <h1 style="font-family:'Outfit',sans-serif; margin-bottom:15px;">Acceso Denegado</h1>
                    <p style="font-family:'Outfit',sans-serif;">Entorno inseguro detectado. Por favor, cierra las herramientas de desarrollo.</p>
                </div>`;
      clearInterval(devtoolsCheck);
    }
  }, 2000);

  // 2. Clear console
  console.clear();
  console.log("%c¡Alto!", "color: red; font-size: 40px; font-weight: bold;");
  console.log(
    "%cEsta es una característica del navegador pensada para desarrolladores. Si alguien te indicó que copiaras y pegaras algo aquí para habilitar una función o piratear la cuenta de alguien, se trata de un fraude.",
    "font-size: 16px;",
  );
}
