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

  // Initialize intlTelInput for advanced phone validation
  const iti = window.intlTelInput(phoneInput, {
    allowDropdown: false, // Deshabilita el selector manual
    nationalMode: false,  // Permite e incita a escribir códigos internacionales (ej: +504)
    autoHideDialCode: false,
    initialCountry: "",   // Lo dejamos vacío para que aparezca un placeholder (globo) hasta que escriba
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

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
      // Regex avanzado que soporta TLDs complejos como .com.hn, .co.uk, etc.
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
      if (!value) return "El correo es requerido.";
      if (!regex.test(value)) return "Formato de correo inválido.";
      if (value.length > 60) return "El correo es demasiado largo.";
      return null;
    },
    password: (value) => {
      if (!value) return "La contraseña es requerida.";
      if (value.length < 8) return "Debe tener al menos 8 caracteres.";
      if (!/(?=.*[a-z])/.test(value)) return "Debe contener una minúscula.";
      if (!/(?=.*[A-Z])/.test(value)) return "Debe contener una mayúscula.";
      if (!/(?=.*\d)/.test(value)) return "Debe contener un número.";
      if (!/(?=.*[\W_])/.test(value))
        return "Debe contener un carácter especial.";
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
        if (clean === "test@error.com") {
          showError(emailError, "Este correo no existe o no puede recibir mensajes.");
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
    const sanitizedValue = originalValue.replace(/(?!^\+)[^\d\s-]/g, '');
    
    if (originalValue !== sanitizedValue) {
      e.target.value = sanitizedValue;
      showError(phoneError, "Solo se permiten números en este campo.");
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
      showError(phoneError, "Formato o longitud de número inválido para el país.");
    }
  });

  // Re-validar si el usuario cambia el país desde el selector (bandera)
  phoneInput.addEventListener("countrychange", () => {
    if (phoneInput.value.trim()) {
      if (iti.isValidNumber()) {
        showError(phoneError, null);
      } else {
        showError(phoneError, "El número no coincide con el país seleccionado.");
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

  // 6. Form Submission & Spoofing Prevention
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

    if (emailErr) {
      showError(emailError, emailErr);
      hasError = true;
    } else if (!isEmailValidDeep) {
      showError(emailError, "Espera a la validación del correo o ingresa uno válido.");
      hasError = true;
    }

    if (passErr) {
      showError(passwordError, passErr);
      hasError = true;
    }

    if (!iti.isValidNumber()) {
      showError(phoneError, "Número telefónico inválido para la región seleccionada.");
      hasError = true;
    }

    if (hasError) {
      triggerShake(form);
      return;
    }

    // Simulate secure API call
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 1500));

      // Randomly fail to simulate brute force prevention feedback (or just a fake backend logic)
      // For demo purposes, let's hardcode a success if email is test@test.com
      const isSuccess = email === "test@test.com" && password === "Test1234!";

      if (isSuccess) {
        formFeedback.textContent = "Autenticación exitosa. Redirigiendo...";
        formFeedback.className = "form-feedback feedback-success";
        localStorage.removeItem("loginAttempts");
        localStorage.setItem(
          "expertUser",
          JSON.stringify({
            email,
            passwordCorrect: true,
            lastLogin: new Date().toISOString(),
          }),
        );
        if (!localStorage.getItem("registeredDevice")) {
          localStorage.setItem("registeredDevice", "false");
        }
        localStorage.setItem("expertSession", "active");
        window.location.href = "dashboard.html";
      } else {
        handleFailedAttempt();
      }
    } catch (error) {
      formFeedback.textContent = "Error de conexión segura.";
      formFeedback.className = "form-feedback feedback-error";
    } finally {
      submitBtn.classList.remove("loading");
      if (!checkRateLimit()) submitBtn.disabled = false;
    }
  });

  function handleFailedAttempt() {
    let attempts = parseInt(localStorage.getItem("loginAttempts") || "0");
    attempts++;
    localStorage.setItem("loginAttempts", attempts);

    triggerShake(form);

    if (attempts >= MAX_ATTEMPTS) {
      const lockoutEnd = new Date().getTime() + LOCKOUT_TIME;
      localStorage.setItem("lockoutEnd", lockoutEnd);
      checkRateLimit();
    } else {
      formFeedback.textContent = `Credenciales incorrectas. Intento ${attempts}/${MAX_ATTEMPTS}`;
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
});

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
// made josseth
