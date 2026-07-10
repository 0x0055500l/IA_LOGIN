// ─── Translations Dictionary ───
const DASHBOARD_TRANSLATIONS = {
  es: {
    brand_title: "BankSecure",
    brand_subtitle: "Fraude & Riesgo",
    nav_inicio: "Inicio",
    nav_analisis: "Análisis",
    nav_reglas: "Reglas",
    nav_historial: "Historial",
    nav_asistente: "Asistente IA",
    nav_config: "Configuración",
    sidebar_footer_title: "Modo experto",
    sidebar_footer_subtitle: "Motor de inferencia activo",
    dashboard_eyebrow: "Panel de control",
    dashboard_title: "Detección inteligente de fraude",
    dashboard_online: "● En línea",
    logout_btn_text: "Salir",
    hero_eyebrow: "Análisis bancario",
    hero_title: "Sistema experto preparado para decisiones de riesgo",
    hero_desc: "La plataforma evalúa transacciones, activa reglas y explica cada conclusión con una lógica clara y auditable.",
    hero_badge_label: "Riesgo actual",
    stat_monitored: "Transacciones monitoreadas",
    stat_monitored_sub: "+12% vs. ayer",
    stat_alerts: "Alertas activas",
    stat_alerts_sub: "3 requieren revisión",
    stat_accuracy: "Precisión del motor",
    stat_accuracy_sub: "Modelo en evolución",
    stat_status: "Estado del sistema",
    stat_status_sub: "Sin interrupciones",
    system_status_eyebrow: "Estado del sistema",
    system_status_title: "Monitor bancario",
    panel_tag_realtime: "Tiempo real",
    status_inference_title: "Motor de inferencia activo",
    status_inference_desc: "El sistema está evaluando reglas y generando explicaciones para cada decisión.",
    status_kb: "Base de conocimiento",
    status_auth: "Autenticación",
    status_jwt: "Sesión JWT",
    status_device: "Dispositivo",
    risk_eyebrow: "Nivel de riesgo",
    risk_title: "Riesgo actual",
    rules_eyebrow: "Motor de inferencia",
    rules_title: "Reglas activadas",
    explanation_eyebrow: "Explicación",
    explanation_title: "Razonamiento del sistema",
    events_eyebrow: "Historial de eventos",
    events_title: "Últimas acciones",
    settings_tab_profile: "Perfil",
    settings_tab_lang: "Idioma",
    settings_tab_theme: "Tema Visual",
    settings_tab_security: "Seguridad",
    profile_title: "Editar Perfil",
    profile_subtitle: "Actualiza tu nombre y correo electrónico principal de la cuenta.",
    profile_name: "Nombre Completo",
    profile_email: "Correo Electrónico",
    save_changes: "Guardar cambios",
    lang_title: "Idioma del Sistema",
    lang_subtitle: "Selecciona tu idioma de preferencia para la interfaz y el chatbot.",
    lang_select: "Seleccionar idioma",
    theme_title: "Tema Visual",
    theme_subtitle: "Personaliza el estilo visual de tu espacio de trabajo.",
    theme_dark: "Tema Oscuro",
    theme_light: "Tema Claro",
    security_title: "Opciones de Seguridad",
    security_subtitle: "Configura tus preferencias de protección y credenciales.",
    security_2fa: "Autenticación de dos factores (2FA)",
    security_2fa_desc: "Exige un código OTP temporal en cada inicio de sesión.",
    security_strict: "Modo de seguridad estricto",
    security_strict_desc: "El sistema experto denegará accesos ante cualquier señal sospechosa.",
    device_trust: "Dispositivo de confianza",
    device_not_registered: "Este dispositivo no está registrado como seguro.",
    device_registered: "Este dispositivo está registrado como seguro.",
    device_register: "Registrar dispositivo",
    device_unregister: "Quitar dispositivo",
    password_change_title: "Cambiar Contraseña",
    password_change_subtitle: "Actualiza tu contraseña periódicamente para mantener tu cuenta segura.",
    password_current: "Contraseña Actual",
    password_new: "Nueva Contraseña",
    password_update_btn: "Actualizar contraseña",
    under_dev_toast: "Módulo en desarrollo",
    save_success_toast: "¡Preferencias guardadas con éxito!",
    profile_success_toast: "¡Perfil actualizado con éxito!",
    pass_success_toast: "¡Contraseña actualizada con éxito!",
    save_error_toast: "Error al guardar los cambios.",
    pass_mismatch_toast: "La contraseña debe cumplir con los requisitos mínimos.",
    device_trust_added: "Dispositivo registrado correctamente.",
    device_trust_removed: "Dispositivo desvinculado correctamente."
  },
  en: {
    brand_title: "BankSecure",
    brand_subtitle: "Fraud & Risk",
    nav_inicio: "Home",
    nav_analisis: "Analysis",
    nav_reglas: "Rules",
    nav_historial: "History",
    nav_asistente: "AI Assistant",
    nav_config: "Settings",
    sidebar_footer_title: "Expert Mode",
    sidebar_footer_subtitle: "Inference engine active",
    dashboard_eyebrow: "Control Panel",
    dashboard_title: "Intelligent Fraud Detection",
    dashboard_online: "● Online",
    logout_btn_text: "Logout",
    hero_eyebrow: "Banking Analysis",
    hero_title: "Expert system ready for risk decisions",
    hero_desc: "The platform evaluates transactions, triggers rules, and explains each conclusion with clear, auditable logic.",
    hero_badge_label: "Current Risk",
    stat_monitored: "Monitored Transactions",
    stat_monitored_sub: "+12% vs. yesterday",
    stat_alerts: "Active Alerts",
    stat_alerts_sub: "3 require review",
    stat_accuracy: "Engine Accuracy",
    stat_accuracy_sub: "Evolving model",
    stat_status: "System Status",
    stat_status_sub: "Without interruptions",
    system_status_eyebrow: "System Status",
    system_status_title: "Banking Monitor",
    panel_tag_realtime: "Real Time",
    status_inference_title: "Inference Engine Active",
    status_inference_desc: "The system is evaluating rules and generating explanations for each decision.",
    status_kb: "Knowledge Base",
    status_auth: "Authentication",
    status_jwt: "JWT Session",
    status_device: "Device",
    risk_eyebrow: "Risk Level",
    risk_title: "Current Risk",
    rules_eyebrow: "Inference Engine",
    rules_title: "Triggered Rules",
    explanation_eyebrow: "Explanation",
    explanation_title: "System Reasoning",
    events_eyebrow: "Event History",
    events_title: "Latest Actions",
    settings_tab_profile: "Profile",
    settings_tab_lang: "Language",
    settings_tab_theme: "Visual Theme",
    settings_tab_security: "Security",
    profile_title: "Edit Profile",
    profile_subtitle: "Update your name and primary email address of your account.",
    profile_name: "Full Name",
    profile_email: "Email Address",
    save_changes: "Save changes",
    lang_title: "System Language",
    lang_subtitle: "Select your preferred language for the interface and chatbot.",
    lang_select: "Select language",
    theme_title: "Visual Theme",
    theme_subtitle: "Customize the visual style of your workspace.",
    theme_dark: "Dark Theme",
    theme_light: "Light Theme",
    security_title: "Security Options",
    security_subtitle: "Configure your protection preferences and credentials.",
    security_2fa: "Two-Factor Authentication (2FA)",
    security_2fa_desc: "Requires a temporary OTP code at every login.",
    security_strict: "Strict Security Mode",
    security_strict_desc: "The expert system will deny access on any suspicious signal.",
    device_trust: "Trusted Device",
    device_not_registered: "This device is not registered as secure.",
    device_registered: "This device is registered as secure.",
    device_register: "Register Device",
    device_unregister: "Unregister Device",
    password_change_title: "Change Password",
    password_change_subtitle: "Update your password periodically to keep your account secure.",
    password_current: "Current Password",
    password_new: "New Password",
    password_update_btn: "Update password",
    under_dev_toast: "Module under development",
    save_success_toast: "Preferences saved successfully!",
    profile_success_toast: "Profile updated successfully!",
    pass_success_toast: "Password updated successfully!",
    save_error_toast: "Error saving changes.",
    pass_mismatch_toast: "Password does not meet the minimum requirements.",
    device_trust_added: "Device registered successfully.",
    device_trust_removed: "Device unregistered successfully."
  }
};

// ─── Toast Notifications Generator ───
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast-notification ${type}`;

  const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
  toast.innerHTML = `<span style="font-weight: bold;">${icon}</span> <span>${message}</span>`;
  document.body.appendChild(toast);

  // Trigger reflow for animation
  toast.offsetHeight;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─── Apply Language Globally ───
function applyDashboardLanguage(lang) {
  localStorage.setItem('userLanguage', lang);

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (DASHBOARD_TRANSLATIONS[lang] && DASHBOARD_TRANSLATIONS[lang][key]) {
      el.textContent = DASHBOARD_TRANSLATIONS[lang][key];
    }
  });

  const emailInput = document.getElementById('profileEmail');
  const nameInput = document.getElementById('profileName');

  if (emailInput) emailInput.placeholder = lang === 'en' ? 'enter@email.com' : 'tu@correo.com.hn';
  if (nameInput) nameInput.placeholder = lang === 'en' ? 'Full Name' : 'Nombre Completo';

  const selectLang = document.getElementById('systemLanguage');
  if (selectLang) selectLang.value = lang;
}

// ─── Session Initialization on DOMContentLoaded ───
document.addEventListener('DOMContentLoaded', async () => {
  const sessionLoader = document.getElementById('sessionLoader');
  const dashboardShell = document.getElementById('dashboardShell');

  // JWT Session Validation
  const token = sessionStorage.getItem('authToken');

  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const response = await fetch('/api/session', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const session = await response.json();

    if (!response.ok || !session.valid) {
      sessionStorage.clear();
      window.location.href = 'index.html';
      return;
    }

    const user = session.user;
    sessionStorage.setItem('userName', user.name);
    sessionStorage.setItem('userEmail', user.email);

    // Store user preferences
    const prefs = user.preferences || { language: 'es', theme: 'dark', twoFactor: false, strictMode: false };
    sessionStorage.setItem('userPreferences', JSON.stringify(prefs));
    localStorage.setItem('userTheme', prefs.theme);
    localStorage.setItem('userLanguage', prefs.language);

    if (sessionLoader) sessionLoader.classList.add('hidden');
    if (dashboardShell) dashboardShell.style.display = '';

    initializeDashboard(user, session.expiresAt);

  } catch (error) {
    console.error('Session validation failed:', error);
    sessionStorage.clear();
    window.location.href = 'index.html';
  }
});

// ─── Initialize Dashboard ───
function initializeDashboard(user, expiresAt) {
  const userPill = document.getElementById('userPill');
  const logoutBtn = document.getElementById('logoutBtn');
  const navInicio = document.getElementById('navInicio');
  const navConfig = document.getElementById('navConfig');
  const dashboardView = document.getElementById('dashboardView');
  const settingsView = document.getElementById('settingsView');
  const historialView = document.getElementById('historialView');

  // SPA Navigation handlers
  if (navInicio && navConfig && dashboardView && settingsView) {
    navInicio.addEventListener('click', (e) => {
      e.preventDefault();
      dashboardView.style.display = 'grid';
      settingsView.style.display = 'none';
      if (historialView) historialView.style.display = 'none';
      navInicio.classList.add('active');
      navConfig.classList.remove('active');
      const navHistorial = document.getElementById('navHistorial');
      if (navHistorial) navHistorial.classList.remove('active');
    });

    navConfig.addEventListener('click', (e) => {
      e.preventDefault();
      settingsView.style.display = 'block';
      dashboardView.style.display = 'none';
      if (historialView) historialView.style.display = 'none';
      navConfig.classList.add('active');
      navInicio.classList.remove('active');
      const navHistorial = document.getElementById('navHistorial');
      if (navHistorial) navHistorial.classList.remove('active');
    });

    // Incomplete routes show nice warning; historial loads the historial module
    ['navAnalisis', 'navReglas'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const currentLang = localStorage.getItem('userLanguage') || 'es';
          showToast(DASHBOARD_TRANSLATIONS[currentLang].under_dev_toast, 'error');
        });
      }
    });

    // Historial route: load or call initHistorialView()
    const historialBtn = document.getElementById('navHistorial');
    if (historialBtn) {
      historialBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        // Show historial view and hide others
        if (historialView) historialView.style.display = 'block';
        if (dashboardView) dashboardView.style.display = 'none';
        if (settingsView) settingsView.style.display = 'none';

        // Update active menu states
        if (navInicio) navInicio.classList.remove('active');
        if (navConfig) navConfig.classList.remove('active');
        historialBtn.classList.add('active');

        // If the module is already loaded, call it directly
        if (window.initHistorialView && typeof window.initHistorialView === 'function') {
          window.initHistorialView();
          return;
        }

        // Otherwise dynamically load historial.js and then call the initializer
        try {
          await new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'historial.js';
            s.onload = () => resolve();
            s.onerror = (err) => reject(err || new Error('Failed to load historial.js'));
            document.body.appendChild(s);
          });

          if (window.initHistorialView) window.initHistorialView();
        } catch (err) {
          console.error('No se pudo cargar el módulo Historial:', err);
          const currentLang = localStorage.getItem('userLanguage') || 'es';
          showToast(DASHBOARD_TRANSLATIONS[currentLang].under_dev_toast, 'error');
        }
      });
    }
  }

  // Load Preferences & Theme
  const preferences = JSON.parse(sessionStorage.getItem('userPreferences')) || user.preferences || {
    language: 'es',
    theme: 'dark',
    twoFactor: false,
    strictMode: false
  };

  // Apply Theme on load
  applyVisualTheme(preferences.theme);

  // Apply Language on load
  applyDashboardLanguage(preferences.language);

  // Initialize Input Values in Form Settings
  const profileNameInput = document.getElementById('profileName');
  const profileEmailInput = document.getElementById('profileEmail');
  if (profileNameInput) profileNameInput.value = user.name || '';
  if (profileEmailInput) profileEmailInput.value = user.email || '';

  // Initialize Switches
  const toggle2fa = document.getElementById('security2faToggle');
  const toggleStrict = document.getElementById('securityStrictToggle');
  if (toggle2fa) toggle2fa.checked = preferences.twoFactor;
  if (toggleStrict) toggleStrict.checked = preferences.strictMode;

  // Initialize Trusted Device Button
  updateDeviceTrustUI();

  // Run initial expert system evaluation
  evaluateAndRenderExpertSystem(preferences);

  // Register Settings Handlers
  setupSettingsHandlers(user, expiresAt);

  // Display user info in topbar
  if (userPill) userPill.textContent = user.name || user.email;

  // Logout handler
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      logoutBtn.disabled = true;
      const currentLang = localStorage.getItem('userLanguage') || 'es';
      logoutBtn.querySelector('span').textContent = currentLang === 'en' ? 'Logging out...' : 'Cerrando...';

      // Intentar registrar logout en historial antes de invalidar token
      try {
        const tokenNow = sessionStorage.getItem('authToken');
        if (window.registrarAccion && typeof window.registrarAccion === 'function') {
          try { window.registrarAccion('logout', 'exito', { user: sessionStorage.getItem('userEmail') }); } catch (_) { }
        } else if (tokenNow) {
          await fetch('/api/logs/action', { method: 'POST', headers: { 'Authorization': `Bearer ${tokenNow}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ accion: 'logout', resultado: 'exito', detalles: {} }) });
        }
      } catch (e) {
        console.warn('No se pudo registrar logout en historial:', e);
      }

      try {
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (e) {
        console.warn('Logout request failed, clearing local session anyway.');
      }

      sessionStorage.clear();
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('lockoutEnd');
      window.location.href = 'index.html';
    });
  }

  // Auto Session Expiry Interval
  const expTime = new Date(expiresAt).getTime();
  const sessionStatus = document.getElementById('sessionStatus');
  const checkInterval = setInterval(() => {
    const remaining = expTime - Date.now();

    if (remaining <= 0) {
      clearInterval(checkInterval);
      sessionStorage.clear();
      const currentLang = localStorage.getItem('userLanguage') || 'es';
      alert(currentLang === 'en' ? 'Your session has expired. Redirecting to login.' : 'Tu sesión ha expirado. Serás redirigido al login.');
      window.location.href = 'index.html';
      return;
    }

    if (sessionStatus) {
      const minutesLeft = Math.round(remaining / 60000);
      const currentLang = localStorage.getItem('userLanguage') || 'es';
      if (minutesLeft <= 5) {
        sessionStatus.textContent = `⚠️ ${minutesLeft} ${currentLang === 'en' ? 'min left' : 'min restantes'}`;
        sessionStatus.style.color = 'var(--danger)';
      } else {
        sessionStatus.textContent = `🔒 ${minutesLeft} ${currentLang === 'en' ? 'min left' : 'min restantes'}`;
      }
    }
  }, 30000);
}

// ─── Settings Handlers ───
function setupSettingsHandlers(user, expiresAt) {
  const profileForm = document.getElementById('profileSettingsForm');
  const langForm = document.getElementById('langSettingsForm');
  const passwordForm = document.getElementById('passwordSettingsForm');
  const toggle2fa = document.getElementById('security2faToggle');
  const toggleStrict = document.getElementById('securityStrictToggle');
  const trustDeviceBtn = document.getElementById('trustDeviceBtn');

  const token = sessionStorage.getItem('authToken');

  // Switch tabs handler
  window.switchSettingsPane = function (paneId) {
    document.querySelectorAll('.settings-pane').forEach(pane => pane.classList.remove('active'));
    document.getElementById(paneId).classList.add('active');

    document.querySelectorAll('.settings-tab-btn').forEach(btn => btn.classList.remove('active'));

    const btnMap = {
      perfilTab: 'btnPerfilTab',
      idiomaTab: 'btnIdiomaTab',
      temaTab: 'btnTemaTab',
      seguridadTab: 'btnSeguridadTab'
    };
    document.getElementById(btnMap[paneId]).classList.add('active');
  };

  // Theme selection cards handler
  window.selectVisualTheme = function (theme) {
    applyVisualTheme(theme);
    savePreferencesApi({ theme });

    const currentLang = localStorage.getItem('userLanguage') || 'es';
    showToast(DASHBOARD_TRANSLATIONS[currentLang].save_success_toast, 'success');
  };

  // Profile Form update — guardarPerfil()
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await guardarPerfil();
    });
  }

  // Language selector update
  if (langForm) {
    langForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newLang = document.getElementById('systemLanguage').value;

      applyDashboardLanguage(newLang);
      await savePreferencesApi({ language: newLang });

      // Refresh expert system rendering in chosen language
      const prefs = JSON.parse(sessionStorage.getItem('userPreferences'));
      evaluateAndRenderExpertSystem(prefs);

      // Update chatbot welcome message if initialized
      const chatbotWelcomeMsg = document.getElementById('chatMessages');
      if (chatbotWelcomeMsg) {
        // chatbot welcome updates automatically on next chat open or manual check
      }

      showToast(DASHBOARD_TRANSLATIONS[newLang].save_success_toast, 'success');
    });
  }

  // 2FA Switch toggle
  if (toggle2fa) {
    toggle2fa.addEventListener('change', async () => {
      const active = toggle2fa.checked;
      await savePreferencesApi({ twoFactor: active });

      const prefs = JSON.parse(sessionStorage.getItem('userPreferences'));
      evaluateAndRenderExpertSystem(prefs);

      const currentLang = localStorage.getItem('userLanguage') || 'es';
      showToast(DASHBOARD_TRANSLATIONS[currentLang].save_success_toast, 'success');
    });
  }

  // Strict Mode Switch toggle
  if (toggleStrict) {
    toggleStrict.addEventListener('change', async () => {
      const active = toggleStrict.checked;
      await savePreferencesApi({ strictMode: active });

      const prefs = JSON.parse(sessionStorage.getItem('userPreferences'));
      evaluateAndRenderExpertSystem(prefs);

      const currentLang = localStorage.getItem('userLanguage') || 'es';
      showToast(DASHBOARD_TRANSLATIONS[currentLang].save_success_toast, 'success');
    });
  }

  // Trust Device registration
  if (trustDeviceBtn) {
    trustDeviceBtn.addEventListener('click', () => {
      const isCurrentlyRegistered = localStorage.getItem('registeredDevice') === 'true';
      const currentLang = localStorage.getItem('userLanguage') || 'es';

      if (isCurrentlyRegistered) {
        localStorage.setItem('registeredDevice', 'false');
        showToast(DASHBOARD_TRANSLATIONS[currentLang].device_trust_removed, 'success');
      } else {
        localStorage.setItem('registeredDevice', 'true');
        showToast(DASHBOARD_TRANSLATIONS[currentLang].device_trust_added, 'success');
      }

      // Re-render device UI
      updateDeviceTrustUI();

      // Re-evaluate expert rules
      const prefs = JSON.parse(sessionStorage.getItem('userPreferences'));
      evaluateAndRenderExpertSystem(prefs);
    });
  }

  // Password Update
  if (passwordForm) {
    passwordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const currentLang = localStorage.getItem('userLanguage') || 'es';
      const currentPassword = document.getElementById('currentPassword').value;
      const newPassword = document.getElementById('newPassword').value;

      if (!currentPassword || !newPassword) {
        showToast(currentLang === 'en' ? "Please fill all password fields." : "Por favor llena todos los campos de contraseña.", 'error');
        return;
      }

      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passRegex.test(newPassword)) {
        showToast(DASHBOARD_TRANSLATIONS[currentLang].pass_mismatch_toast, 'error');
        return;
      }

      try {
        const res = await fetch('/api/user/password', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ currentPassword, newPassword })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          document.getElementById('currentPassword').value = '';
          document.getElementById('newPassword').value = '';
          showToast(DASHBOARD_TRANSLATIONS[currentLang].pass_success_toast, 'success');
          try {
            if (window.registrarAccion && typeof window.registrarAccion === 'function') {
              window.registrarAccion('password_cambio', 'exito', { user: sessionStorage.getItem('userEmail') });
            } else if (token) {
              await fetch('/api/logs/action', { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ accion: 'password_cambio', resultado: 'exito', detalles: { user: sessionStorage.getItem('userEmail') } }) });
            }
          } catch (e) { console.debug('[dashboard] no se pudo registrar cambio de contraseña', e); }
        } else {
          showToast(data.message || currentLang === 'en' ? "Current password mismatch." : "Contraseña actual incorrecta.", 'error');
        }
      } catch (err) {
        showToast(DASHBOARD_TRANSLATIONS[currentLang].save_error_toast, 'error');
      }
    });
  }
}

// ─── Theme Apply Helper ───
function applyVisualTheme(theme) {
  localStorage.setItem('userTheme', theme);
  const darkCard = document.getElementById('themeDarkCard');
  const lightCard = document.getElementById('themeLightCard');

  if (theme === 'light') {
    document.body.classList.add('theme-light');
    if (lightCard) lightCard.classList.add('active');
    if (darkCard) darkCard.classList.remove('active');
  } else {
    document.body.classList.remove('theme-light');
    if (darkCard) darkCard.classList.add('active');
    if (lightCard) lightCard.classList.remove('active');
  }
}

// ─── Trusted Device UI Helper ───
function updateDeviceTrustUI() {
  const isCurrentlyRegistered = localStorage.getItem('registeredDevice') === 'true';
  const statusText = document.getElementById('deviceStatusText');
  const trustBtn = document.getElementById('trustDeviceBtn');
  const currentLang = localStorage.getItem('userLanguage') || 'es';

  if (!trustBtn) return;

  if (isCurrentlyRegistered) {
    if (statusText) statusText.textContent = DASHBOARD_TRANSLATIONS[currentLang].device_registered;
    trustBtn.textContent = DASHBOARD_TRANSLATIONS[currentLang].device_unregister;
    trustBtn.classList.add('registered');
  } else {
    if (statusText) statusText.textContent = DASHBOARD_TRANSLATIONS[currentLang].device_not_registered;
    trustBtn.textContent = DASHBOARD_TRANSLATIONS[currentLang].device_register;
    trustBtn.classList.remove('registered');
  }
}

// ─── Core Expert System Evaluation and Render ───
function evaluateAndRenderExpertSystem(prefs) {
  const riskBadge = document.getElementById('riskBadge');
  const riskValue = document.getElementById('riskValue');
  const riskBar = document.getElementById('riskBar');
  const riskText = document.getElementById('riskText');
  const systemState = document.getElementById('systemState');
  const deviceStatus = document.getElementById('deviceStatus');
  const ruleList = document.getElementById('ruleList');
  const explanationText = document.getElementById('explanationText');
  const eventList = document.getElementById('eventList');
  const kbStatusText = document.getElementById('kbStatusText');

  const deviceRegistered = localStorage.getItem('registeredDevice') === 'true';
  const loginAttempts = Number(localStorage.getItem('loginAttempts') || '0');
  const lockoutEnd = Number(localStorage.getItem('lockoutEnd') || '0');
  const currentLang = prefs.language || 'es';

  // Construct context object for inference engine
  const contexto = {
    credencialesValidas: true,
    contrasenaIncorrecta: false,
    intentosFallidos: loginAttempts,
    dispositivoRegistrado: deviceRegistered,
    requiereOtp: prefs.twoFactor || !deviceRegistered,
    dobleFactorHabilitado: prefs.twoFactor,
    modoEstricto: prefs.strictMode,
    language: currentLang
  };

  const resultado = window.evaluarReglas(contexto);

  // Render values
  let translatedRisk = resultado.nivelRiesgo;
  if (currentLang === 'en') {
    if (resultado.nivelRiesgo === 'Bajo') translatedRisk = 'Low';
    if (resultado.nivelRiesgo === 'Medio') translatedRisk = 'Medium';
    if (resultado.nivelRiesgo === 'Alto') translatedRisk = 'High';
  }

  if (riskBadge) riskBadge.textContent = translatedRisk;
  if (riskValue) riskValue.textContent = translatedRisk;

  // Add colors depending on risk
  if (riskBadge) {
    riskBadge.style.color = resultado.nivelRiesgo === 'Alto' ? 'var(--danger)' : resultado.nivelRiesgo === 'Medio' ? 'var(--warning)' : 'var(--accent)';
  }
  if (riskValue) {
    riskValue.style.color = resultado.nivelRiesgo === 'Alto' ? 'var(--danger)' : resultado.nivelRiesgo === 'Medio' ? 'var(--warning)' : 'var(--accent)';
  }

  if (riskBar) {
    const widthByRisk = { Bajo: '32%', Medio: '68%', Alto: '100%' };
    riskBar.style.width = widthByRisk[resultado.nivelRiesgo] || '40%';
  }

  if (riskText) riskText.textContent = resultado.explicacion;
  if (explanationText) explanationText.textContent = resultado.explicacion;

  if (systemState) {
    if (resultado.decision === 'Acceso permitido') {
      systemState.textContent = currentLang === 'en' ? 'Operational' : 'Operativo';
      systemState.style.color = 'var(--success)';
    } else {
      systemState.textContent = currentLang === 'en' ? 'Requires review' : 'Requiere revisión';
      systemState.style.color = 'var(--warning)';
    }
  }

  if (deviceStatus) {
    deviceStatus.textContent = deviceRegistered
      ? (currentLang === 'en' ? 'Registered' : 'Registrado')
      : (currentLang === 'en' ? 'Unknown' : 'Desconocido');
  }

  if (kbStatusText) {
    kbStatusText.textContent = currentLang === 'en' ? '8 rules loaded' : '8 reglas cargadas';
  }

  // Populate dynamic rules triggered
  if (ruleList) {
    ruleList.innerHTML = resultado.reglasActivadas
      .map((regla) => {
        const icon = regla.tipo === 'autenticacion' ? '🔑' : regla.tipo === 'seguridad' ? '🛡️' : '📱';
        const ruleName = currentLang === 'en' ? regla.nombreEn : regla.nombre;
        const ruleExplain = currentLang === 'en' ? regla.explicacionEn : regla.explicacion;
        return `<li>${icon} <strong>${regla.id}</strong> · ${ruleName}<br><small>${ruleExplain}</small></li>`;
      })
      .join('');
  }

  // OTP panel simulation injection
  const oldOtpPanel = document.querySelector('.otp-panel');
  if (oldOtpPanel) oldOtpPanel.remove();

  if (resultado.requiereOtp && explanationText) {
    const otpPanel = document.createElement('div');
    otpPanel.className = 'otp-panel';
    otpPanel.innerHTML = `
      <strong>${currentLang === 'en' ? 'Additional authentication required' : 'Autenticación adicional requerida'}</strong>
      <p>${currentLang === 'en' ? 'Mock OTP code: 482917' : 'Código OTP simulado: 482917'}</p>
      <button type="button">${currentLang === 'en' ? 'Validate Access' : 'Validar acceso'}</button>
    `;
    explanationText.insertAdjacentElement('afterend', otpPanel);
  }

  // Events list
  if (eventList) {
    const userName = sessionStorage.getItem('userName') || 'Usuario';
    const events = [
      {
        label: currentLang === 'en' ? 'Sign In' : 'Inicio de sesión',
        value: `${userName} — JWT active`,
        icon: '🔑'
      },
      {
        label: currentLang === 'en' ? 'Trust Device' : 'Dispositivo seguro',
        value: deviceRegistered ? (currentLang === 'en' ? 'Trusted' : 'Registrado') : (currentLang === 'en' ? 'Untrusted' : 'No identificado'),
        icon: '📱'
      },
      {
        label: currentLang === 'en' ? 'Strict Security' : 'Seguridad estricta',
        value: prefs.strictMode ? (currentLang === 'en' ? 'Enabled' : 'Habilitado') : (currentLang === 'en' ? 'Disabled' : 'Deshabilitado'),
        icon: '🛡️'
      },
      {
        label: currentLang === 'en' ? 'Lockouts' : 'Bloqueos',
        value: lockoutEnd > Date.now() ? (currentLang === 'en' ? 'Active' : 'Bloqueo activo') : (currentLang === 'en' ? 'None' : 'Sin bloqueos'),
        icon: '🔒'
      }
    ];

    eventList.innerHTML = events
      .map((event) => `<li>${event.icon} <strong>${event.label}</strong><br />${event.value}</li>`)
      .join('');
  }
}

// Synchronize Preferences Helper
async function savePreferencesApi(prefObj) {
  const token = sessionStorage.getItem('authToken');
  const currentPreferences = JSON.parse(sessionStorage.getItem('userPreferences') || '{}');

  const updatedPreferences = { ...currentPreferences, ...prefObj };
  sessionStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));

  try {
    const res = await fetch('/api/user/preferences', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPreferences)
    });

    if (res.ok) {
      evaluateAndRenderExpertSystem(updatedPreferences);
      // Registrar actualización de preferencias en historial
      try {
        if (window.registrarAccion && typeof window.registrarAccion === 'function') {
          window.registrarAccion('preferencias_actualizadas', 'exito', updatedPreferences);
        } else if (token) {
          await fetch('/api/logs/action', { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ accion: 'preferencias_actualizadas', resultado: 'exito', detalles: updatedPreferences }) });
        }
      } catch (e) {
        console.debug('[dashboard] no se pudo registrar preferencias en historial', e);
      }
    }
  } catch (e) {
    console.error('Error synchronizing preferences to API:', e);
  }
}

// ─── guardarPerfil() ─── Función global para guardar cambios del perfil ───
// Captura los valores del formulario, valida, envía al servidor con JWT y
// muestra el resultado visual tanto en el feedback inline como en el toast.
async function guardarPerfil() {
  const currentLang = localStorage.getItem('userLanguage') || 'es';
  const token = sessionStorage.getItem('authToken');

  // Capturar valores del formulario
  const nameInput = document.getElementById('profileName');
  const emailInput = document.getElementById('profileEmail');
  const submitBtn = document.getElementById('profileSubmitBtn');

  if (!nameInput || !emailInput) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  // ── Validación del lado cliente ──
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;

  if (!name) {
    showProfileFeedback(
      currentLang === 'en' ? 'Name is required.' : 'El nombre es requerido.',
      'error'
    );
    return;
  }
  if (!emailRegex.test(email)) {
    showProfileFeedback(
      currentLang === 'en' ? 'Invalid email format.' : 'Formato de correo electrónico inválido.',
      'error'
    );
    return;
  }
  if (!token) {
    showProfileFeedback(
      currentLang === 'en' ? 'Session expired. Please log in again.' : 'Sesión expirada. Inicia sesión de nuevo.',
      'error'
    );
    return;
  }

  // ── Estado de carga en el botón ──
  const originalBtnText = submitBtn ? submitBtn.textContent : 'Guardar cambios';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = currentLang === 'en' ? 'Saving…' : 'Guardando…';
    submitBtn.style.opacity = '0.7';
  }

  // Ocultar feedback anterior
  showProfileFeedback('', 'hidden');

  try {
    // ── Llamada al endpoint /api/updateProfile con autenticación JWT ──
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
      // ── Éxito: actualizar token JWT y datos en sesión ──
      if (data.token) {
        sessionStorage.setItem('authToken', data.token);
      }
      sessionStorage.setItem('userName', data.user.name);
      sessionStorage.setItem('userEmail', data.user.email);

      // Actualizar el pill de usuario en la topbar
      const userPill = document.getElementById('userPill');
      if (userPill) userPill.textContent = data.user.name;

      // ── Mensaje visual de éxito ──
      const successMsg = currentLang === 'en'
        ? '✓ Changes saved successfully!'
        : '✓ Cambios guardados correctamente.';

      showProfileFeedback(successMsg, 'success');
      showToast(DASHBOARD_TRANSLATIONS[currentLang]?.profile_success_toast || successMsg, 'success');
      try {
        if (window.registrarAccion && typeof window.registrarAccion === 'function') {
          window.registrarAccion('perfil_actualizado', 'exito', { name: data.user.name, email: data.user.email });
        } else if (token) {
          await fetch('/api/logs/action', { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ accion: 'perfil_actualizado', resultado: 'exito', detalles: { name: data.user.name, email: data.user.email } }) });
        }
      } catch (e) { console.debug('[dashboard] no se pudo registrar perfil en historial', e); }

    } else {
      // ── Error de validación del servidor (status 400) ──
      const errMsg = data.message
        || (currentLang === 'en' ? 'Error saving changes.' : 'Error al guardar los cambios.');
      showProfileFeedback(`✗ ${errMsg}`, 'error');
      showToast(errMsg, 'error');
    }

  } catch (networkError) {
    // ── Error de red o servidor no disponible ──
    const netMsg = currentLang === 'en'
      ? '✗ Connection error. Please try again.'
      : '✗ Error de conexión. Inténtalo de nuevo.';
    showProfileFeedback(netMsg, 'error');
    showToast(netMsg, 'error');
    console.error('[guardarPerfil] Error de red:', networkError);

  } finally {
    // ── Restaurar botón siempre ──
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      submitBtn.style.opacity = '';
    }
  }
}

// ─── showProfileFeedback() ─── Mensaje visual inline en el formulario de perfil ───
// type: 'success' | 'error' | 'hidden'
function showProfileFeedback(message, type) {
  const feedbackEl = document.getElementById('profileFeedback');
  if (!feedbackEl) return;

  if (type === 'hidden' || !message) {
    feedbackEl.style.display = 'none';
    feedbackEl.textContent = '';
    feedbackEl.className = 'profile-feedback';
    return;
  }

  feedbackEl.textContent = message;
  feedbackEl.className = `profile-feedback profile-feedback--${type}`;
  feedbackEl.style.display = 'block';

  // Auto-ocultar el mensaje de éxito después de 5 segundos
  if (type === 'success') {
    setTimeout(() => {
      feedbackEl.classList.add('profile-feedback--fade');
      setTimeout(() => {
        feedbackEl.style.display = 'none';
        feedbackEl.className = 'profile-feedback';
      }, 400);
    }, 5000);
  }
}

// Exponer globalmente para uso externo (app.js u otros módulos)
window.guardarPerfil = guardarPerfil;
window.showProfileFeedback = showProfileFeedback;
