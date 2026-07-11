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
    settings_tab_cards: "Tarjetas",
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
    device_trust_removed: "Dispositivo desvinculado correctamente.",
    cards_title: "Gestión de Tarjetas",
    cards_subtitle: "Registra tu propia tarjeta para usarla en validaciones y transacciones.",
    cards_number: "Número de Tarjeta",
    cards_expiry: "Vencimiento",
    cards_cvv: "CVV",
    cards_status: "Estado",
    cards_validate: "Validar Tarjeta",
    cards_save: "Guardar Cambios",
    cards_add: "Agregar Tarjeta",
    cards_saved_title: "Tarjetas Guardadas",
    cards_luhn_valid: "✓ Correcta",
    cards_luhn_invalid: "✗ Incorrecta",
    cards_updated: "Tarjeta actualizada correctamente",
    cards_added: "Nueva tarjeta agregada",
    cards_deleted: "Tarjeta eliminada",
    cards_error_number: "Número de tarjeta inválido (debe pasar validación Luhn)",
    cards_error_expiry: "Fecha de vencimiento inválida o ya pasó",
    cards_error_cvv: "CVV inválido (3-4 dígitos)",
    cards_empty: "No hay tarjetas guardadas"
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
    settings_tab_cards: "Cards",
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
    device_trust_removed: "Device unregistered successfully.",
    cards_title: "Card Management",
    cards_subtitle: "Register your own card to use it for validations and transactions.",
    cards_number: "Card Number",
    cards_expiry: "Expiry Date",
    cards_cvv: "CVV",
    cards_status: "Status",
    cards_validate: "Validate Card",
    cards_save: "Save Changes",
    cards_add: "Add Card",
    cards_saved_title: "Saved Cards",
    cards_luhn_valid: "✓ Valid",
    cards_luhn_invalid: "✗ Invalid",
    cards_updated: "Card updated successfully",
    cards_added: "New card added",
    cards_deleted: "Card deleted",
    cards_error_number: "Invalid card number (must pass Luhn validation)",
    cards_error_expiry: "Invalid or past expiry date",
    cards_error_cvv: "Invalid CVV (3-4 digits)",
    cards_empty: "No saved cards"
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
  const dashboardView = document.getElementById('dashboardView');
  const settingsView = document.getElementById('settingsView');
  const historialView = document.getElementById('historialView');

  const hideLoader = () => {
    if (sessionLoader) {
      sessionLoader.classList.add('hidden');
    }
  };

  const showDashboard = () => {
    if (dashboardView) dashboardView.classList.remove('hidden');
    if (settingsView) settingsView.classList.add('hidden');
    if (historialView) historialView.classList.add('hidden');
  };

  hideLoader();
  showDashboard();

  try {
    const token = sessionStorage.getItem('authToken');

    if (!token) {
      window.location.href = 'index.html';
      return;
    }

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
    sessionStorage.setItem('userRole', user.role);

    const prefs = user.preferences || { language: 'es', theme: 'dark', twoFactor: false, strictMode: false };
    sessionStorage.setItem('userPreferences', JSON.stringify(prefs));
    localStorage.setItem('userTheme', prefs.theme);
    localStorage.setItem('userLanguage', prefs.language);

    initializeDashboard(user, session.expiresAt);
  } catch (error) {
    console.error('Dashboard initialization failed:', error);
    hideLoader();
    showDashboard();
  }
});

// ─── Role-Based Access Control ───
function applyRoleRestrictions(role) {
  const isAdmin = role === 'admin';
  const currentLang = localStorage.getItem('userLanguage') || 'es';

  // Hide/show admin-only elements
  document.querySelectorAll('[data-admin-only]').forEach(el => {
    if (!isAdmin) {
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
    } else {
      el.style.display = '';
      el.removeAttribute('aria-hidden');
    }
  });

  // Show role badge in topbar
  const roleBadge = document.getElementById('roleBadge');
  if (roleBadge) {
    if (isAdmin) {
      roleBadge.textContent = currentLang === 'en' ? '🛡️ Admin' : '🛡️ Administrador';
      roleBadge.className = 'role-badge role-admin';
    } else {
      roleBadge.textContent = currentLang === 'en' ? '👤 User' : '👤 Usuario';
      roleBadge.className = 'role-badge role-user';
    }
    roleBadge.style.display = 'inline-flex';
  }

  // Hide/show Historial nav for non-admin (system logs)
  // Regular users can still see Historial but only their own logs (server-side enforced)

  console.log(`[RBAC] Rol aplicado: ${role} | Admin: ${isAdmin}`);
}

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
      dashboardView.classList.remove('hidden');
      settingsView.classList.add('hidden');
      if (historialView) historialView.classList.add('hidden');
      navInicio.classList.add('active');
      navConfig.classList.remove('active');
      const navHistorial = document.getElementById('navHistorial');
      if (navHistorial) navHistorial.classList.remove('active');
    });

    navConfig.addEventListener('click', (e) => {
      e.preventDefault();
      settingsView.classList.remove('hidden');
      dashboardView.classList.add('hidden');
      if (historialView) historialView.classList.add('hidden');
      navConfig.classList.add('active');
      navInicio.classList.remove('active');
      const navHistorial = document.getElementById('navHistorial');
      if (navHistorial) navHistorial.classList.remove('active');
    });

    // Incomplete routes show nice warning; historial loads the historial module
    ['btn-analisis', 'navReglas'].forEach(id => {
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
        if (historialView) historialView.classList.remove('hidden');
        if (dashboardView) dashboardView.classList.add('hidden');
        if (settingsView) settingsView.classList.add('hidden');

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

  // Setup Interactive Banking Widget
  setupInteractiveBanking(user);

  // Display user info in topbar
  if (userPill) userPill.textContent = user.name || user.email;

  // Apply role-based access restrictions
  applyRoleRestrictions(user.role);

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

// ─── Shared Card Helpers ───
const CARDS_KEY = 'bankSecureCards';
const DEFAULT_CARD = {
  number: '',
  expiry: '',
  cvv: '',
  status: 'Activa',
  availableAmount: 0,
  selected: false
};

function getCards() {
  try {
    const raw = localStorage.getItem(CARDS_KEY);
    if (!raw) {
      return [];
    }
    const list = JSON.parse(raw);
    if (!Array.isArray(list) || !list.length) {
      return [];
    }
    const normalized = list.map((card) => ({
      ...card,
      availableAmount: card.availableAmount != null ? Number(card.availableAmount) : 0
    }));
    if (normalized[0] && normalized[0].status === 'Pendiente') {
      normalized[0].status = 'Activa';
      localStorage.setItem(CARDS_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return [];
  }
}

function saveCards(list) {
  const normalized = Array.isArray(list) ? list.map((card) => ({
    ...card,
    availableAmount: card.availableAmount != null ? Number(card.availableAmount) : 0
  })) : [];
  localStorage.setItem(CARDS_KEY, JSON.stringify(normalized));
}

function isCardActive() {
  const cards = getCards();
  const activeCard = cards.find((card) => card && window.cardUtils?.isCardActiveStatus?.(card.status));
  return Boolean(activeCard);
}

function getActiveCard() {
  const cards = getCards();
  return cards.find((card) => card && window.cardUtils?.isCardActiveStatus?.(card.status)) || cards[0] || null;
}

function getActiveCardBalance() {
  const activeCard = getActiveCard();
  return activeCard && activeCard.availableAmount != null ? Number(activeCard.availableAmount) : 0;
}

function updateActiveCardBalance(newBalance) {
  const cards = getCards();
  const activeCard = cards.find((card) => card && window.cardUtils?.isCardActiveStatus?.(card.status)) || cards[0];
  if (!activeCard) return;
  activeCard.availableAmount = Number(newBalance);
  saveCards(cards);
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
    const panes = document.querySelectorAll('.settings-pane');
    panes.forEach(pane => {
      const isActive = pane.id === paneId;
      pane.classList.toggle('active', isActive);
      pane.style.display = isActive ? 'block' : 'none';
    });

    document.querySelectorAll('.settings-tab-btn').forEach(btn => btn.classList.remove('active'));

    const btnMap = {
      perfilTab: 'btnPerfilTab',
      idiomaTab: 'btnIdiomaTab',
      temaTab: 'btnTemaTab',
      tarjetasTab: 'btnTarjetasTab',
      seguridadTab: 'btnSeguridadTab'
    };
    const targetBtn = document.getElementById(btnMap[paneId]);
    if (targetBtn) targetBtn.classList.add('active');
  };

  // Inicializar la pestaña activa por defecto
  window.switchSettingsPane('perfilTab');

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

  // ─── Card Manager ─────────────────────────────────────────────────────────
  (function initCardManager() {
    const ACTIVE_CARD_KEY = 'bankSecureActiveCard';

    const cfgNum    = document.getElementById('cfgCardNumber');
    const cfgExp    = document.getElementById('cfgCardExpiry');
    const cfgCvv    = document.getElementById('cfgCardCvv');
    const cfgStatus = document.getElementById('cfgCardStatus');
    const luhnBadge = document.getElementById('cfgCardLuhnBadge');
    const feedback  = document.getElementById('cfgCardFeedback');
    const listEl    = document.getElementById('cfgCardList');

    const btnValidate = document.getElementById('cfgCardValidateBtn');
    const btnSave     = document.getElementById('cfgCardSaveBtn');
    const btnAdd      = document.getElementById('cfgCardAddBtn');

    if (!cfgNum) return; // tab not in DOM

    let editingIdx = -1; // -1 = editing "new" or default

    function isCardNumberFormatValid(num) {
      const digits = String(num || '').replace(/\D/g, '');
      return /^\d{13,19}$/.test(digits);
    }

    function isExpiryFuture(exp) {
      return window.cardUtils?.isExpiryFuture(exp) ?? false;
    }

    function isCvvValid(cvv) {
      return window.cardUtils?.isCvvValid(cvv) ?? false;
    }

    function isCardFormComplete(card) {
      return window.cardUtils?.isCardFormComplete(card) ?? false;
    }

    function generateInitialAvailableAmount() {
      return window.cardUtils?.generateInitialAvailableAmount() ?? 5248.5;
    }

    // ── Format card number input ──
    cfgNum.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      let formatted = '';
      for (let i = 0; i < v.length && i < 19; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += v[i];
      }
      e.target.value = formatted;
      updateLuhnBadge();
    });

    // ── Format expiry input ──
    cfgExp.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 2) {
        e.target.value = v.substring(0, 2) + '/' + v.substring(2, 4);
      } else {
        e.target.value = v;
      }
    });

    // ── CVV only digits ──
    cfgCvv.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });

    // ── Live card number badge ──
    function updateLuhnBadge() {
      const lang = localStorage.getItem('userLanguage') || 'es';
      const digits = cfgNum.value.replace(/\D/g, '');
      if (digits.length < 13) {
        luhnBadge.textContent = '';
        luhnBadge.className = 'card-luhn-badge';
        return;
      }
      if (isCardNumberFormatValid(cfgNum.value)) {
        luhnBadge.textContent = lang === 'en' ? 'Format OK' : 'Formato válido';
        luhnBadge.className = 'card-luhn-badge valid';
      } else {
        luhnBadge.textContent = lang === 'en' ? 'Use 13-19 digits' : 'Usa 13-19 dígitos';
        luhnBadge.className = 'card-luhn-badge invalid';
      }
    }

    // ── Show feedback ──
    function showCardFeedback(msg, type) {
      if (!feedback) return;
      feedback.textContent = msg;
      feedback.style.display = 'block';
      feedback.style.background = type === 'success'
        ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)';
      feedback.style.color = type === 'success' ? '#22c55e' : '#ef4444';
      feedback.style.borderColor = type === 'success'
        ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)';
      setTimeout(() => { feedback.style.display = 'none'; }, 4000);
    }

    // ── Load a card into the form ──
    function loadCardToForm(card, idx) {
      cfgNum.value    = card.number || '';
      cfgExp.value    = card.expiry || '';
      cfgCvv.value    = card.cvv || '';
      cfgStatus.value = card.status || 'Activa';
      editingIdx = idx;
      updateLuhnBadge();
    }

    // ── Clear form for new card ──
    function clearForm() {
      cfgNum.value = '';
      cfgExp.value = '';
      cfgCvv.value = '';
      cfgStatus.value = 'Activa';
      editingIdx = -1;
      luhnBadge.textContent = '';
      luhnBadge.className = 'card-luhn-badge';
    }

    // ── Render the card list ──
    function renderCardList() {
      const cards = getCards();
      const lang = localStorage.getItem('userLanguage') || 'es';

      if (!listEl) return;
      if (cards.length === 0) {
        listEl.innerHTML = `<div class="card-list-empty">${DASHBOARD_TRANSLATIONS[lang].cards_empty}</div>`;
        return;
      }

      listEl.innerHTML = cards.map((c, i) => {
        const masked = c.number ? ('•••• •••• •••• ' + c.number.replace(/\D/g, '').slice(-4)) : '—';
        const statusMap = { Activa: 'active', Bloqueada: 'blocked', Pendiente: 'pending' };
        const statusClass = statusMap[c.status] || 'pending';
        const isSelected = i === editingIdx ? ' selected' : '';
        const defBadge = '';

        return `
          <div class="card-list-item${isSelected}" data-idx="${i}">
            <div class="card-list-left">
              <span class="card-list-icon">💳</span>
              <div class="card-list-info">
                <span class="card-list-number">${masked}${defBadge}</span>
                <span class="card-list-meta">${lang === 'en' ? 'Exp' : 'Venc'}: ${c.expiry || '—'} · ${c.status}</span>
              </div>
            </div>
            <div class="card-list-right">
              <span class="card-status-badge ${statusClass}">${c.status}</span>
              <button class="card-list-delete" data-delidx="${i}" title="${lang === 'en' ? 'Delete' : 'Eliminar'}">🗑️</button>
            </div>
          </div>
        `;
      }).join('');

      // Select card on click
      listEl.querySelectorAll('.card-list-item').forEach(el => {
        el.addEventListener('click', (e) => {
          if (e.target.closest('.card-list-delete')) return;
          const idx = parseInt(el.dataset.idx, 10);
          loadCardToForm(cards[idx], idx);
          renderCardList();
        });
      });

      // Delete button
      listEl.querySelectorAll('.card-list-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.delidx, 10);
          cards.splice(idx, 1);
          saveCards(cards);
          if (editingIdx === idx) clearForm();
          else if (editingIdx > idx) editingIdx--;
          renderCardList();
          showToast(DASHBOARD_TRANSLATIONS[lang].cards_deleted, 'success');
        });
      });
    }

    // ── Validate button ──
    if (btnValidate) {
      btnValidate.addEventListener('click', () => {
        const lang = localStorage.getItem('userLanguage') || 'es';
        updateLuhnBadge();
        if (isCardNumberFormatValid(cfgNum.value)) {
          const message = lang === 'en' ? 'Card number format accepted.' : 'Formato de tarjeta aceptado.';
          showCardFeedback(message, 'success');
          showToast(message, 'success');
        } else {
          const message = lang === 'en' ? 'Enter a valid card number with 13 to 19 digits.' : 'Ingresa un número de tarjeta válido con 13 a 19 dígitos.';
          showCardFeedback(message, 'error');
          showToast(message, 'error');
        }
      });
    }

    // ── Validate all fields helper ──
    function validateCardFields() {
      const lang = localStorage.getItem('userLanguage') || 'es';
      const cardData = {
        number: cfgNum.value.trim(),
        expiry: cfgExp.value.trim(),
        cvv: cfgCvv.value.trim(),
        status: cfgStatus.value.trim()
      };

      if (!isCardFormComplete(cardData)) {
        const message = lang === 'en' ? 'Please complete all card fields before saving or validating.' : 'Completa todos los campos de la tarjeta antes de guardar o validar.';
        showCardFeedback(message, 'error');
        showToast(message, 'error');
        return false;
      }
      if (!isCardNumberFormatValid(cfgNum.value)) {
        const message = lang === 'en' ? 'Enter a valid card number with 13 to 19 digits.' : 'Ingresa un número de tarjeta válido con 13 a 19 dígitos.';
        showCardFeedback(message, 'error');
        showToast(message, 'error');
        return false;
      }
      if (!isExpiryFuture(cfgExp.value)) {
        showCardFeedback(DASHBOARD_TRANSLATIONS[lang].cards_error_expiry, 'error');
        showToast(DASHBOARD_TRANSLATIONS[lang].cards_error_expiry, 'error');
        return false;
      }
      if (!isCvvValid(cfgCvv.value)) {
        showCardFeedback(DASHBOARD_TRANSLATIONS[lang].cards_error_cvv, 'error');
        showToast(DASHBOARD_TRANSLATIONS[lang].cards_error_cvv, 'error');
        return false;
      }
      return true;
    }

    // ── Save Changes button ──
    if (btnSave) {
      btnSave.addEventListener('click', () => {
        if (!validateCardFields()) return;
        const lang = localStorage.getItem('userLanguage') || 'es';
        const cards = getCards();
        const cardData = {
          number: cfgNum.value.trim(),
          expiry: cfgExp.value.trim(),
          cvv: cfgCvv.value.trim(),
          status: cfgStatus.value,
          availableAmount: cards[editingIdx]?.availableAmount != null ? Number(cards[editingIdx].availableAmount) : generateInitialAvailableAmount()
        };

        if (editingIdx >= 0 && editingIdx < cards.length) {
          // Preserve the isDefault flag
          cards[editingIdx] = cardData;
        } else {
          // Not editing an existing card — save as first card
          cards[0] = { ...cards[0], ...cardData };
        }

        saveCards(cards);
        renderCardList();
        
        // Notificar al dashboard que el estado de la tarjeta cambió
        window.dispatchEvent(new Event('card_state_changed'));
        
        showCardFeedback(DASHBOARD_TRANSLATIONS[lang].cards_updated, 'success');
        showToast(DASHBOARD_TRANSLATIONS[lang].cards_updated, 'success');

        // Log to system history
        if (window.registrarAccion && typeof window.registrarAccion === 'function') {
          window.registrarAccion('tarjeta_actualizada', 'exito', {
            last4: cardData.number.replace(/\D/g, '').slice(-4),
            status: cardData.status
          });
        }
      });
    }

    // ── Add Card button ──
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        if (!validateCardFields()) return;
        const lang = localStorage.getItem('userLanguage') || 'es';
        const cards = getCards();
        const newCard = {
          number: cfgNum.value.trim(),
          expiry: cfgExp.value.trim(),
          cvv: cfgCvv.value.trim(),
          status: cfgStatus.value,
          availableAmount: generateInitialAvailableAmount()
        };

        cards.push(newCard);
        saveCards(cards);
        editingIdx = cards.length - 1;
        renderCardList();

        // Notificar al dashboard que el estado de la tarjeta cambió
        window.dispatchEvent(new Event('card_state_changed'));

        showCardFeedback(DASHBOARD_TRANSLATIONS[lang].cards_added, 'success');
        showToast(DASHBOARD_TRANSLATIONS[lang].cards_added, 'success');

        // Clear form for next card
        clearForm();

        // Log to system history
        if (window.registrarAccion && typeof window.registrarAccion === 'function') {
          window.registrarAccion('tarjeta_agregada', 'exito', {
            last4: newCard.number.replace(/\D/g, '').slice(-4),
            status: newCard.status
          });
        }
      });
    }

    // ── Initial load ──
    const cards = getCards();
    if (cards.length > 0) {
      loadCardToForm(cards[0], 0);
    }
    renderCardList();
  })();
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

// ─── Advanced Analysis Dashboard Helpers ───
const ANALYSIS_STORAGE_KEY = 'antiFraudAnalysisTransactions';
const ANALYSIS_CHARTS = {};

function getAnalysisTransactions() {
  try {
    return JSON.parse(localStorage.getItem(ANALYSIS_STORAGE_KEY) || '[]');
  } catch (error) {
    console.warn('No se pudieron leer las transacciones de análisis:', error);
    return [];
  }
}

function persistAnalysisTransactions(transactions) {
  localStorage.setItem(ANALYSIS_STORAGE_KEY, JSON.stringify(transactions));
}

function formatCurrency(value) {
  return `$${Number(value || 0).toLocaleString('es-HN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getRiskColor(level) {
  if (level === 'Crítico') return '#ef4444';
  if (level === 'Alto') return '#fb923c';
  if (level === 'Medio') return '#facc15';
  return '#34d399';
}

function getAnalysisRiskLabel(level) {
  if (level === 'Crítico') return 'Crítico';
  if (level === 'Alto') return 'Alto';
  if (level === 'Medio') return 'Medio';
  return 'Bajo';
}

function getAnalysisTransactionProfile(type, amount, transactions) {
  const history = transactions.slice(0, 8);
  const recentCount = history.filter((tx) => tx.type === 'Transferencia' || tx.type === 'Pago').length;
  const suspiciousCount = history.filter((tx) => tx.isSuspicious).length;
  const usualCountry = history[0]?.country || 'HN';
  const countries = ['HN', 'US', 'MX', 'ES', 'CR', 'PA'];
  const cities = ['Tegucigalpa', 'San Pedro Sula', 'Miami', 'Ciudad de México', 'Madrid', 'San José'];
  const devices = ['iPhone 15', 'Samsung S24', 'Windows Laptop', 'MacBook Pro', 'unknown-device'];
  const ips = ['201.192.10.34', '45.132.88.5', '172.16.8.11', '8.8.8.8', '200.42.29.17'];
  const country = history.length > 0 && Math.random() > 0.6 ? (history[0].country === 'HN' ? countries[1] : 'HN') : countries[Math.floor(Math.random() * countries.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const device = suspiciousCount > 0 || Math.random() > 0.7 ? devices[4] : devices[Math.floor(Math.random() * (devices.length - 1))];
  const ip = ips[Math.floor(Math.random() * ips.length)];
  const ipChanged = history.length > 0 && Math.random() > 0.6;
  const deviceChanged = history.length > 0 && Math.random() > 0.7;
  const suspiciousDestination = ['Transferencia', 'Pago'].includes(type) && (amount > 2200 || Math.random() > 0.7);
  const repeatedTransfers = recentCount + (Math.random() > 0.5 ? 2 : 0);
  const timeWindowMinutes = repeatedTransfers > 0 ? 2 : 0;
  const previousLocations = history.map((tx) => tx.city).filter(Boolean);
  const failedAttempts = recentCount > 0 && Math.random() > 0.8 ? 3 : 0;
  const historyAvg = history.length > 0 ? history.reduce((sum, tx) => sum + Number(tx.amountValue || 0), 0) / history.length : 300;

  return {
    country,
    city,
    device,
    ip,
    ipChanged,
    deviceChanged,
    suspiciousDestination,
    repeatedTransfers,
    timeWindowMinutes,
    previousLocations,
    failedAttempts,
    historyAvg,
    usualCountry
  };
}

function registerAnalysisTransaction(type, amount, status = 'Procesada') {
  const transactions = getAnalysisTransactions();
  const userName = sessionStorage.getItem('userName') || 'Usuario';
  const userEmail = sessionStorage.getItem('userEmail') || 'usuario@demo.com';
  const profile = getAnalysisTransactionProfile(type, amount, transactions);
  const evaluation = window.evaluateTransactionRules({
    amount,
    country: profile.country,
    usualCountry: profile.usualCountry,
    device: profile.device,
    deviceChanged: profile.deviceChanged,
    repeatedTransfers: profile.repeatedTransfers,
    historyAvg: profile.historyAvg,
    newAccount: false,
    suspiciousDestination: profile.suspiciousDestination,
    timeWindowMinutes: profile.timeWindowMinutes,
    ipChanged: profile.ipChanged,
    previousLocations: profile.previousLocations,
    failedAttempts: profile.failedAttempts
  });

  const tx = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString('es-HN'),
    time: new Date().toLocaleTimeString('es-HN'),
    amount: Number(amount || 0),
    amountValue: Number(amount || 0),
    amountLabel: formatCurrency(amount),
    type,
    country: profile.country,
    city: profile.city,
    ip: profile.ip,
    device: profile.device,
    status: evaluation.isSuspicious ? (evaluation.riskLevel === 'Crítico' ? 'Bloqueada' : 'Sospechosa') : status,
    user: userName,
    email: userEmail,
    riskLevel: evaluation.riskLevel,
    isSuspicious: evaluation.isSuspicious,
    score: evaluation.score,
    rulesActivated: evaluation.rulesActivated.map((rule) => rule.name),
    explanation: evaluation.explanation,
    recommendations: evaluation.recommendations || [],
    analysisResult: evaluation.riskLevel === 'Bajo' ? 'Aprobada' : 'Revisar'
  };

  const nextTransactions = [tx, ...transactions].slice(0, 50);
  persistAnalysisTransactions(nextTransactions);
  renderAnalysisDashboard();
  return tx;
}

function renderAnalysisDashboard() {
  const transactions = getAnalysisTransactions();
  const latestTx = transactions[0];
  const safeCount = transactions.filter((tx) => !tx.isSuspicious).length;
  const suspiciousCount = transactions.filter((tx) => tx.isSuspicious && tx.riskLevel !== 'Crítico').length;
  const fraudCount = transactions.filter((tx) => tx.riskLevel === 'Crítico').length;
  const activeAlerts = transactions.filter((tx) => tx.isSuspicious).length;
  const protectedMoney = transactions.filter((tx) => !tx.isSuspicious).reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  const riskPct = transactions.length ? Math.round((activeAlerts / transactions.length) * 100) : 0;
  const latestTime = latestTx ? `${latestTx.date} ${latestTx.time}` : '—';

  const totalTxEl = document.getElementById('analysisTotalTx');
  const secureTxEl = document.getElementById('analysisSecureTx');
  const suspiciousTxEl = document.getElementById('analysisSuspiciousTx');
  const fraudTxEl = document.getElementById('analysisFraudTx');
  const riskPctEl = document.getElementById('analysisRiskPct');
  const protectedMoneyEl = document.getElementById('analysisProtectedMoney');
  const activeAlertsEl = document.getElementById('analysisActiveAlerts');
  const lastActivityEl = document.getElementById('analysisLastActivity');
  const globalRiskLabelEl = document.getElementById('analysisGlobalRiskLabel');
  const gaugeValueEl = document.getElementById('analysisGaugeValue');
  const gaugeLevelEl = document.getElementById('analysisGaugeLevel');
  const gaugeRingEl = document.getElementById('riskGauge')?.querySelector('.risk-gauge__ring');
  const alertPanel = document.getElementById('analysisAlertPanel');
  const alertTitleEl = document.getElementById('analysisAlertTitle');
  const alertMessageEl = document.getElementById('analysisAlertMessage');
  const alertRulesEl = document.getElementById('analysisAlertRules');
  const flowTextEl = document.getElementById('analysisFlowText');
  const flowStatusEl = document.getElementById('analysisFlowStatus');
  const historyBodyEl = document.getElementById('analysisHistoryTableBody');

  if (totalTxEl) totalTxEl.textContent = transactions.length;
  if (secureTxEl) secureTxEl.textContent = safeCount;
  if (suspiciousTxEl) suspiciousTxEl.textContent = suspiciousCount;
  if (fraudTxEl) fraudTxEl.textContent = fraudCount;
  if (riskPctEl) riskPctEl.textContent = `${riskPct}%`;
  if (protectedMoneyEl) protectedMoneyEl.textContent = formatCurrency(protectedMoney);
  if (activeAlertsEl) activeAlertsEl.textContent = activeAlerts;
  if (lastActivityEl) lastActivityEl.textContent = latestTime;

  let gaugeLevel = 'Bajo';
  let gaugeValue = '0%';
  let gaugeColor = '#22c55e';
  if (riskPct >= 75 || fraudCount > 0) {
    gaugeLevel = 'Crítico';
    gaugeValue = `${riskPct}%`;
    gaugeColor = '#ef4444';
  } else if (riskPct >= 45 || suspiciousCount > 0) {
    gaugeLevel = 'Alto';
    gaugeValue = `${riskPct}%`;
    gaugeColor = '#fb923c';
  } else if (riskPct >= 20) {
    gaugeLevel = 'Medio';
    gaugeValue = `${riskPct}%`;
    gaugeColor = '#facc15';
  } else {
    gaugeLevel = 'Bajo';
    gaugeValue = `${riskPct}%`;
    gaugeColor = '#22c55e';
  }

  if (globalRiskLabelEl) {
    globalRiskLabelEl.textContent = gaugeLevel;
    globalRiskLabelEl.style.color = gaugeColor;
  }
  if (gaugeValueEl) gaugeValueEl.textContent = gaugeValue;
  if (gaugeLevelEl) gaugeLevelEl.textContent = gaugeLevel;
  if (gaugeRingEl) gaugeRingEl.style.background = `conic-gradient(${gaugeColor} 0deg 90deg, #facc15 90deg 180deg, #fb923c 180deg 270deg, #ef4444 270deg 360deg)`;

  if (latestTx && alertPanel) {
    const isCritical = latestTx.riskLevel === 'Crítico';
    const isWarning = latestTx.riskLevel === 'Alto' || latestTx.riskLevel === 'Medio';
    alertPanel.className = `analysis-alert ${isCritical ? 'analysis-alert--danger' : isWarning ? 'analysis-alert--warning' : 'analysis-alert--safe'}`;
    if (alertTitleEl) alertTitleEl.textContent = latestTx.isSuspicious ? `Alerta Roja · ${latestTx.riskLevel}` : 'Sin alertas activas';
    if (alertMessageEl) alertMessageEl.textContent = latestTx.isSuspicious ? latestTx.explanation : 'El sistema está monitorizando sin incidentes críticos.';
    if (alertRulesEl) {
      alertRulesEl.innerHTML = latestTx.isSuspicious
        ? latestTx.rulesActivated.map((rule) => `<span>${rule}</span>`).join('')
        : '<span>Monitoreo continuo</span>';
    }
  }

  if (flowTextEl) {
    flowTextEl.textContent = latestTx
      ? `Moviendo ${latestTx.amountLabel} en ${latestTx.type.toLowerCase()} desde ${latestTx.country} vía ${latestTx.device}`
      : 'Monitoreo activo de flujos de dinero en tiempo real.';
  }
  if (flowStatusEl) {
    flowStatusEl.textContent = latestTx?.isSuspicious ? `Última operación: ${latestTx.riskLevel}` : 'Sin eventos críticos por el momento';
  }

  if (historyBodyEl) {
    historyBodyEl.innerHTML = transactions.slice(0, 10).map((tx) => `
      <tr>
        <td>${tx.date} ${tx.time}</td>
        <td>${tx.user}</td>
        <td>${tx.type}</td>
        <td>${tx.country}</td>
        <td>${tx.device}</td>
        <td><span style="color:${getRiskColor(tx.riskLevel)}; font-weight:700;">${tx.riskLevel}</span></td>
        <td>${tx.status}</td>
        <td>${tx.explanation}</td>
      </tr>
    `).join('');
  }

  renderAnalysisCharts(transactions);
}

function renderAnalysisCharts(transactions) {
  if (!window.Chart) return;
  const anomalyCtx = document.getElementById('anomalyChart');
  const alertsCtx = document.getElementById('alertsChart');
  const patternsCtx = document.getElementById('patternsChart');
  const auditCtx = document.getElementById('auditChart');

  if (!anomalyCtx || !alertsCtx || !patternsCtx || !auditCtx) return;

  if (ANALYSIS_CHARTS.anomaly) ANALYSIS_CHARTS.anomaly.destroy();
  if (ANALYSIS_CHARTS.alerts) ANALYSIS_CHARTS.alerts.destroy();
  if (ANALYSIS_CHARTS.patterns) ANALYSIS_CHARTS.patterns.destroy();
  if (ANALYSIS_CHARTS.audit) ANALYSIS_CHARTS.audit.destroy();

  const normalCount = transactions.filter((tx) => !tx.isSuspicious).length;
  const suspiciousCount = transactions.filter((tx) => tx.isSuspicious && tx.riskLevel !== 'Crítico').length;
  const fraudCount = transactions.filter((tx) => tx.riskLevel === 'Crítico').length;

  ANALYSIS_CHARTS.anomaly = new window.Chart(anomalyCtx, {
    type: 'bar',
    data: {
      labels: ['Normales', 'Sospechosas', 'Fraudulentas'],
      datasets: [{
        label: 'Transacciones',
        data: [normalCount, suspiciousCount, fraudCount],
        backgroundColor: ['#34d399', '#facc15', '#ef4444'],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.08)' } }, x: { grid: { display: false } } }
    }
  });

  const hourlyBuckets = Array.from({ length: 6 }, (_, index) => {
    const hour = new Date();
    hour.setHours(hour.getHours() - (5 - index));
    return `${hour.getHours()}:00`;
  });
  const alertSeries = hourlyBuckets.map((_, index) => transactions.filter((tx) => new Date(tx.timestamp).getHours() === new Date().getHours() - (5 - index)).length);
  const criticalSeries = hourlyBuckets.map((_, index) => transactions.filter((tx) => tx.riskLevel === 'Crítico' && new Date(tx.timestamp).getHours() === new Date().getHours() - (5 - index)).length);
  const resolvedSeries = hourlyBuckets.map((_, index) => transactions.filter((tx) => tx.riskLevel === 'Bajo' && new Date(tx.timestamp).getHours() === new Date().getHours() - (5 - index)).length);
  const pendingSeries = hourlyBuckets.map((_, index) => transactions.filter((tx) => tx.isSuspicious && new Date(tx.timestamp).getHours() === new Date().getHours() - (5 - index)).length);

  ANALYSIS_CHARTS.alerts = new window.Chart(alertsCtx, {
    type: 'line',
    data: {
      labels: hourlyBuckets,
      datasets: [
        { label: 'Alertas', data: alertSeries, borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.2)', tension: 0.3 },
        { label: 'Críticas', data: criticalSeries, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.2)', tension: 0.3 },
        { label: 'Resueltas', data: resolvedSeries, borderColor: '#34d399', backgroundColor: 'rgba(52,211,153,0.18)', tension: 0.3 },
        { label: 'Pendientes', data: pendingSeries, borderColor: '#facc15', backgroundColor: 'rgba(250,204,21,0.2)', tension: 0.3 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#e2e8f0' } } },
      scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.08)' } }, x: { grid: { display: false } } }
    }
  });

  const peakHours = transactions.reduce((acc, tx) => {
    const hour = new Date(tx.timestamp).getHours();
    acc[hour] = (acc[hour] || 0) + (tx.isSuspicious ? 1 : 0);
    return acc;
  }, {});
  const countryCounts = transactions.reduce((acc, tx) => {
    acc[tx.country] = (acc[tx.country] || 0) + (tx.isSuspicious ? 1 : 0);
    return acc;
  }, {});
  const deviceCounts = transactions.reduce((acc, tx) => {
    acc[tx.device] = (acc[tx.device] || 0) + (tx.isSuspicious ? 1 : 0);
    return acc;
  }, {});
  const typeCounts = transactions.reduce((acc, tx) => {
    acc[tx.type] = (acc[tx.type] || 0) + (tx.isSuspicious ? 1 : 0);
    return acc;
  }, {});

  ANALYSIS_CHARTS.patterns = new window.Chart(patternsCtx, {
    type: 'radar',
    data: {
      labels: ['Horarios', 'Países', 'Dispositivos', 'Tipos'],
      datasets: [{
        label: 'Incidencia',
        data: [
          Object.values(peakHours).reduce((sum, value) => sum + value, 0) || 1,
          Object.values(countryCounts).reduce((sum, value) => sum + value, 0) || 1,
          Object.values(deviceCounts).reduce((sum, value) => sum + value, 0) || 1,
          Object.values(typeCounts).reduce((sum, value) => sum + value, 0) || 1
        ],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56,189,248,0.2)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { r: { angleLines: { color: 'rgba(255,255,255,0.16)' }, grid: { color: 'rgba(255,255,255,0.16)' }, pointLabels: { color: '#e2e8f0' }, suggestedMin: 0, suggestedMax: Math.max(4, transactions.length) } }
    }
  });

  ANALYSIS_CHARTS.audit = new window.Chart(auditCtx, {
    type: 'line',
    data: {
      labels: transactions.map((tx) => `${tx.date} ${tx.time}`),
      datasets: [{
        label: 'Riesgo',
        data: transactions.map((tx) => ({ x: `${tx.date} ${tx.time}`, y: tx.isSuspicious ? (tx.riskLevel === 'Crítico' ? 90 : tx.riskLevel === 'Alto' ? 70 : 40) : 10 })),
        borderColor: '#34d399',
        backgroundColor: 'rgba(52,211,153,0.2)',
        tension: 0.2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#e2e8f0' } } },
      scales: { y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.08)' } }, x: { ticks: { color: '#cbd5e1' }, grid: { display: false } } }
    }
  });
}

// ─── Setup Interactive Banking ───
function setupInteractiveBanking(user) {
  const cardNumber = document.getElementById('cardNumber');
  const cardExpiry = document.getElementById('cardExpiry');
  const cardCvv = document.getElementById('cardCvv');
  const btnValidateAccess = document.getElementById('btn-validar-acceso');
  const cameraModal = document.getElementById('cameraModal');
  const closeCameraModal = document.getElementById('closeCameraModal');
  const accessCameraVideo = document.getElementById('accessCameraVideo');
  const captureFaceBtn = document.getElementById('captureFaceBtn');
  const cameraModalMessage = document.getElementById('cameraModalMessage');
  const btnBlockCard = document.getElementById('btnBlockCard');
  const btnReactivateCard = document.getElementById('btnReactivateCard');
  const btnReviewAlerts = document.getElementById('btnReviewAlerts');

  const statusCardVal = document.getElementById('statusCardVal');
  const statusFaceVal = document.getElementById('statusFaceVal');
  const statusDeviceVal = document.getElementById('statusDeviceVal');
  const bankingAuditList = document.getElementById('bankingAuditList');

  // Balance and Simulator Elements
  const balanceContent = document.getElementById('balanceContent');
  const balanceSecurityOverlay = document.getElementById('balanceSecurityOverlay');
  const transactionAmountInput = document.getElementById('transactionAmount');
  const btnSimulatePurchase = document.getElementById('btnSimulatePurchase');
  const btnSimulateTransfer = document.getElementById('btnSimulateTransfer');
  const bankingTransactionsList = document.getElementById('bankingTransactionsList');
  const btnSimulateWithdrawal = document.getElementById('btnSimulateWithdrawal');
  const btnSimulatePayment = document.getElementById('btnSimulatePayment');

  const PURCHASE_LIMIT = 2000;
  const TRANSFER_LIMIT = 1500;
  const WITHDRAWAL_LIMIT = 1500;
  const PAYMENT_LIMIT = 1500;

  let cardBlocked = false;
  let balance = getActiveCardBalance();

  // Update Admin-Only Visibility
  const isAdmin = user && user.role === 'admin';
  if (btnReactivateCard) {
    btnReactivateCard.classList.toggle('hidden', !isAdmin);
  }

  // Helper to log in local audit log
  function addAuditLog(text, type = '') {
    if (!bankingAuditList) return;
    const li = document.createElement('li');
    li.className = `audit-item ${type}`;
    const time = new Date().toLocaleTimeString();
    li.textContent = `[${time}] ${text}`;
    bankingAuditList.prepend(li);
  }

  // Load and Render Transaction History from localStorage
  function getTransactions() {
    return JSON.parse(localStorage.getItem('bankingTransactions') || '[]');
  }

  function saveTransaction(op, amount, status) {
    const list = getTransactions();
    const newTx = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      operation: op,
      amount: amount ? `$${parseFloat(amount).toFixed(2)}` : '—',
      status: status
    };
    list.unshift(newTx);
    if (list.length > 10) list.pop(); // keep last 10
    localStorage.setItem('bankingTransactions', JSON.stringify(list));
    renderTransactionsTable();
  }

  function renderTransactionsTable() {
    if (!bankingTransactionsList) return;
    const list = getTransactions();
    if (list.length === 0) {
      bankingTransactionsList.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-muted" style="padding: 12px;">No hay transacciones registradas.</td>
        </tr>
      `;
      return;
    }
    bankingTransactionsList.innerHTML = list.map(tx => {
      let statusClass = 'val-pending';
      if (tx.status === 'Aprobado') statusClass = 'val-success';
      if (tx.status === 'Denegado') statusClass = 'val-danger';

      return `
        <tr>
          <td>${tx.date} ${tx.time}</td>
          <td><strong>${tx.operation}</strong></td>
          <td>${tx.amount}</td>
          <td><span class="${statusClass}">${tx.status}</span></td>
        </tr>
      `;
    }).join('');
  }

  // Dynamic balance visibility based on security rules
  function updateBalanceAndSecurityUI() {
    const isDeviceTrusted = localStorage.getItem('registeredDevice') === 'true';
    const isSecure = isDeviceTrusted && !cardBlocked;
    balance = getActiveCardBalance();

    if (balanceContent && balanceSecurityOverlay) {
      if (isSecure) {
        balanceContent.style.display = 'block';
        balanceSecurityOverlay.style.display = 'none';
        const balValEl = balanceContent.querySelector('.balance-value');
        if (balValEl) balValEl.textContent = `$${balance.toFixed(2)}`;
      } else {
        balanceContent.style.display = 'none';
        balanceSecurityOverlay.style.display = 'flex';
      }
    }
  }

  // Auto-update device trust card on load
  function updateDeviceStatusBadge() {
    if (!statusDeviceVal) return;
    const isTrusted = localStorage.getItem('registeredDevice') === 'true';
    if (isTrusted) {
      statusDeviceVal.textContent = '✓ Seguro';
      statusDeviceVal.className = 'status-value val-success';
    } else {
      statusDeviceVal.textContent = '✗ No Confiable';
      statusDeviceVal.className = 'status-value val-danger';
    }
    updateBalanceAndSecurityUI();
  }

  // Initialize UI values

  updateDeviceStatusBadge();
  renderTransactionsTable();
  renderAnalysisDashboard();

  function getCurrentCardStatus() {
    const cards = getCards();
    const activeCard = cards.find((card) => card && ['Activa', 'Completada', 'Pendiente', 'Bloqueada'].includes(card.status)) || cards[0];
    return window.cardUtils?.normalizeCardStatus?.(activeCard?.status) || 'Pendiente';
  }

  function updateCardAuthenticationState(nextStatus, auditText, toastMessage, toastType = 'success') {
    const cards = getCards();
    if (!cards.length) return false;

    const activeCard = cards.find((card) => card && ['Activa', 'Completada', 'Pendiente', 'Bloqueada'].includes(card.status)) || cards[0];
    if (!activeCard) return false;

    const previousStatus = activeCard.status;
    activeCard.status = nextStatus;
    saveCards(cards);
    window.dispatchEvent(new Event('card_state_changed'));
    updateCardStateFromStorage();

    if (auditText) {
      addAuditLog(auditText, toastType === 'error' ? 'val-danger' : 'val-success');
    }

    if (toastMessage) {
      showToast(toastMessage, toastType);
    }

    return previousStatus !== nextStatus;
  }

  // ── Sincronización de estado de tarjeta con Configuración ──
  function updateCardStateFromStorage() {
    try {
      const cards = getCards();
      const status = getCurrentCardStatus();

      const isBlockedByStatus = window.cardUtils?.isCardBlockedStatus?.(status);
      cardBlocked = typeof isBlockedByStatus === 'boolean' ? isBlockedByStatus : (status === 'Bloqueada' || status === 'Pendiente' || status !== 'Completada');
      balance = getActiveCardBalance();

      if (statusCardVal) {
        if (status === 'Completada') {
          statusCardVal.textContent = '✓ Completada';
          statusCardVal.className = 'status-value val-success';
        } else if (status === 'Activa') {
          statusCardVal.textContent = '✓ Activa';
          statusCardVal.className = 'status-value val-success';
        } else if (status === 'Bloqueada') {
          statusCardVal.textContent = '🛑 Bloqueada';
          statusCardVal.className = 'status-value val-danger';
        } else {
          statusCardVal.textContent = 'Pendiente';
          statusCardVal.className = 'status-value val-pending';
        }
      }
      if (statusFaceVal) {
        if (status === 'Completada') {
          statusFaceVal.textContent = '✓ Completada';
          statusFaceVal.className = 'status-value val-success';
        } else {
          statusFaceVal.textContent = 'Pendiente';
          statusFaceVal.className = 'status-value val-pending';
        }
      }
      updateBalanceAndSecurityUI();
    } catch (e) {
      console.error('Error al sincronizar estado de tarjeta', e);
    }
  }

  // Carga inicial
  updateCardStateFromStorage();
  
  // Escuchar cambios de configuración para actualizar la UI en tiempo real
  window.addEventListener('card_state_changed', updateCardStateFromStorage);
  window.addEventListener('storage', (e) => {
    updateDeviceStatusBadge();
    if (e.key === CARDS_KEY) updateCardStateFromStorage();
  });

  // Custom event/listener for device status changes
  const trustDeviceBtn = document.getElementById('trustDeviceBtn');
  if (trustDeviceBtn) {
    trustDeviceBtn.addEventListener('click', () => {
      setTimeout(updateDeviceStatusBadge, 100);
    });
  }

  // Format card number
  if (cardNumber) {
    cardNumber.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      let formatted = '';
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += value[i];
      }
      e.target.value = formatted;
    });
  }

  // Format card expiry
  if (cardExpiry) {
    cardExpiry.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 2) {
        e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
      } else {
        e.target.value = value;
      }
    });
  }

  // Validate access button
  let cameraStream = null;

  const hideCameraModal = () => {
    if (cameraModal) cameraModal.classList.add('hidden');
    if (accessCameraVideo) {
      accessCameraVideo.pause();
      accessCameraVideo.srcObject = null;
    }
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      cameraStream = null;
    }
    if (cameraModalMessage) {
      cameraModalMessage.textContent = '';
      cameraModalMessage.className = 'modal-message';
    }
  };

  const showCameraModal = async () => {
    if (cameraModal) cameraModal.classList.remove('hidden');
    if (!accessCameraVideo) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      accessCameraVideo.srcObject = stream;
      await accessCameraVideo.play();
      cameraStream = stream;
      if (cameraModalMessage) {
        cameraModalMessage.textContent = 'Cámara activada. Presiona Capturar rostro.';
        cameraModalMessage.className = 'modal-message';
      }
    } catch (error) {
      if (cameraModalMessage) {
        cameraModalMessage.textContent = 'No se pudo acceder a la cámara. Verifica permisos o usa otro navegador.';
        cameraModalMessage.className = 'modal-message error';
      }
      console.error('Error al activar cámara:', error);
    }
  };

  if (closeCameraModal) {
    closeCameraModal.addEventListener('click', hideCameraModal);
  }

  if (captureFaceBtn) {
    captureFaceBtn.addEventListener('click', () => {
      if (!accessCameraVideo || !accessCameraVideo.srcObject) {
        if (cameraModalMessage) {
          cameraModalMessage.textContent = 'La cámara no está disponible. Intenta de nuevo.';
          cameraModalMessage.className = 'modal-message error';
        }
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = accessCameraVideo.videoWidth || 320;
      canvas.height = accessCameraVideo.videoHeight || 240;
      const context = canvas.getContext('2d');
      context.drawImage(accessCameraVideo, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');

      if (cameraModalMessage) {
        cameraModalMessage.textContent = 'Rostro capturado correctamente.';
        cameraModalMessage.className = 'modal-message success';
      }

      const biometricSuccessMessage = '[ÉXITO] Rostro coincide con el titular. Acceso autorizado. Estado: Operativo y Auditable.';
      const auditLines = [
        '[INFO] Iniciando verificación biométrica...',
        '[INFO] Extrayendo puntos característicos del rostro...',
        '[SISTEMA EXPERTO] Evaluando regla: verificacion_dispositivo_biometrico',
        biometricSuccessMessage
      ];

      if (bankingAuditList) {
        bankingAuditList.innerHTML = '';
        const logEntry = document.createElement('li');
        logEntry.className = 'audit-item val-success';
        logEntry.style.whiteSpace = 'pre-wrap';
        logEntry.textContent = auditLines.join('\n');
        bankingAuditList.appendChild(logEntry);
      }

      if (btnValidateAccess) {
        btnValidateAccess.textContent = 'Acceso Verificado';
        btnValidateAccess.classList.remove('btn-primary');
        btnValidateAccess.classList.add('btn-success');
        btnValidateAccess.disabled = true;
      }

      const validationSucceeded = auditLines.includes(biometricSuccessMessage);
      if (validationSucceeded) {
        updateCardAuthenticationState(
          'Completada',
          '✓ Validación biométrica aprobada. Estado de la tarjeta actualizado a Completada.',
          'Validación biométrica exitosa. La tarjeta queda operativa.',
          'success'
        );
        saveTransaction('Validación Biométrica', null, 'Aprobado');
      } else {
        updateCardAuthenticationState(
          'Pendiente',
          '✗ Validación biométrica fallida. La tarjeta permanece pendiente.',
          'Validación biométrica fallida. Transacciones bloqueadas.',
          'error'
        );
      }

      console.log('Face capture data:', imageData);
    });
  }

  if (btnValidateAccess) {
    btnValidateAccess.addEventListener('click', async () => {
      if (!isCardActive()) {
        showToast('Operación denegada: La tarjeta no está activa.', 'error');
        addAuditLog('Intento de acceso denegado: La tarjeta no está activa.', 'val-danger');
        return;
      }

      const cardNumVal = cardNumber ? cardNumber.value.replace(/\s/g, '') : '';
      const expiryVal = cardExpiry ? cardExpiry.value : '';
      const cvvVal = cardCvv ? cardCvv.value : '';

      const isCardValid = cardNumVal.length === 16 && expiryVal.length === 5 && cvvVal.length === 3;
      if (!isCardValid) {
        if (statusCardVal) {
          statusCardVal.textContent = '✗ Incorrecta';
          statusCardVal.className = 'status-value val-danger';
        }
        showToast('Datos de tarjeta incorrectos.', 'error');
        addAuditLog('Error: Formato de tarjeta inválido.', 'val-danger');
        return;
      }

      if (statusCardVal) {
        statusCardVal.textContent = '✓ Validada';
        statusCardVal.className = 'status-value val-success';
      }

      showCameraModal();
    });
  }

  // Block Card button
  if (btnBlockCard) {
    btnBlockCard.addEventListener('click', () => {
      // Sincronizar bloqueo en Configuración
      try {
        const list = getCards();
        if (list && list.length > 0) {
          list[0].status = 'Bloqueada';
          saveCards(list);
          window.dispatchEvent(new Event('card_state_changed'));
        }
      } catch (e) {}

      if (statusFaceVal) {
        statusFaceVal.textContent = 'Pendiente';
        statusFaceVal.className = 'status-value val-pending';
      }
      if (cardNumber) cardNumber.value = '';
      if (cardExpiry) cardExpiry.value = '';
      if (cardCvv) cardCvv.value = '';

      updateBalanceAndSecurityUI();
      saveTransaction('Bloqueo Tarjeta', null, 'Aprobado');
      showToast('Tarjeta Bloqueada Correctamente', 'success');
      addAuditLog('🛑 TARJETA BLOQUEADA por el usuario. Acciones inhabilitadas.', 'val-danger');

      if (window.registrarAccion && typeof window.registrarAccion === 'function') {
        window.registrarAccion('tarjeta_bloqueada', 'advertencia', { user: user.email });
      }
    });
  }

  // Reactivate Card button (Admin-Only)
  if (btnReactivateCard) {
    btnReactivateCard.addEventListener('click', () => {
      if (!isAdmin) {
        showToast('Acción denegada: Requiere rol de Administrador.', 'error');
        return;
      }
      
      // Sincronizar reactivación en Configuración
      try {
        const list = getCards();
        if (list && list.length > 0) {
          list[0].status = 'Activa';
          saveCards(list);
          window.dispatchEvent(new Event('card_state_changed'));
        }
      } catch (e) {}

      saveTransaction('Reactivación Tarjeta', null, 'Aprobado');
      showToast('Tarjeta reactivada con éxito', 'success');
      addAuditLog('✓ TARJETA REACTIVADA por el Administrador.', 'val-success');

      if (window.registrarAccion && typeof window.registrarAccion === 'function') {
        window.registrarAccion('tarjeta_reactivada', 'exito', { user: user.email });
      }
    });
  }

  function handleSimulation(type, rawAmount, label, limit, successMessage, denyLabel) {
    const isDeviceTrusted = localStorage.getItem('registeredDevice') === 'true';
    const amountValidation = window.cardUtils?.validateTransactionAmount?.(rawAmount);

    if (!amountValidation?.valid) {
      showToast(amountValidation?.message || 'Debe ingresar un monto para realizar la transacción.', 'error');
      addAuditLog(`Transacción denegada: ${amountValidation?.message || 'Debe ingresar un monto para realizar la transacción.'}`, 'val-danger');
      if (transactionAmountInput) {
        transactionAmountInput.focus();
      }
      return false;
    }

    const amountVal = amountValidation.amount;

    if (!isCardActive()) {
      showToast('Transacción no disponible: la tarjeta no está activa', 'error');
      addAuditLog('Transacción denegada: la tarjeta no está activa', 'val-danger');
      saveTransaction(label, amountVal, 'Denegado');
      return false;
    }

    if (!isDeviceTrusted) {
      showToast('Dispositivo no confiable detectado. Revise su configuración.', 'warning');
      addAuditLog('Dispositivo no confiable detectado en simulación.', 'val-warning');
    }

    const currentCardStatus = getCurrentCardStatus();
    if (currentCardStatus !== 'Completada') {
      showToast('Transacción denegada: complete la validación biométrica para habilitar la tarjeta.', 'error');
      addAuditLog(`${denyLabel} denegada: validación biométrica pendiente o fallida.`, 'val-danger');
      saveTransaction(label, amountVal, 'Denegado');
      return false;
    }

    if (limit && amountVal > limit) {
      showToast(`Denegada: Excede límite (${formatCurrency(limit)})`, 'error');
      addAuditLog(`${denyLabel} denegada: Excede límite.`, 'val-danger');
      saveTransaction(label, amountVal, 'Denegado');
      return false;
    }

    if (amountVal > balance) {
      showToast('Denegada: Saldo insuficiente.', 'error');
      addAuditLog(`${denyLabel} denegada: Saldo insuficiente.`, 'val-danger');
      saveTransaction(label, amountVal, 'Denegado');
      return false;
    }

    balance -= amountVal;
    updateActiveCardBalance(balance);
    updateBalanceAndSecurityUI();
    saveTransaction(label, amountVal, 'Aprobado');
    registerAnalysisTransaction(type, amountVal, 'Aprobada');
    showToast(successMessage, 'success');
    addAuditLog(`✓ ${successMessage}`, 'val-success');

    if (window.registrarAccion && typeof window.registrarAccion === 'function') {
      window.registrarAccion(type, 'exito', { user: user.email, monto: amountVal });
    }
    return true;
  }

  // Simulated Purchases
  if (btnSimulatePurchase) {
    btnSimulatePurchase.addEventListener('click', () => {
      handleSimulation('Compra', transactionAmountInput?.value, 'Simulación Compra', PURCHASE_LIMIT, 'Compra aprobada con éxito', 'Compra');
    });
  }

  // Simulated Transfers
  if (btnSimulateTransfer) {
    btnSimulateTransfer.addEventListener('click', () => {
      handleSimulation('Transferencia', transactionAmountInput?.value, 'Simulación Transferencia', TRANSFER_LIMIT, 'Transferencia realizada con éxito', 'Transferencia');
    });
  }

  if (btnSimulateWithdrawal) {
    btnSimulateWithdrawal.addEventListener('click', () => {
      handleSimulation('Retiro', transactionAmountInput?.value, 'Simulación Retiro', WITHDRAWAL_LIMIT, 'Retiro autorizado con éxito', 'Retiro');
    });
  }

  if (btnSimulatePayment) {
    btnSimulatePayment.addEventListener('click', () => {
      handleSimulation('Pago', transactionAmountInput?.value, 'Simulación Pago', PAYMENT_LIMIT, 'Pago procesado con éxito', 'Pago');
    });
  }

  // Review Alerts button
  if (btnReviewAlerts) {
    btnReviewAlerts.addEventListener('click', () => {
      const isDeviceTrusted = localStorage.getItem('registeredDevice') === 'true';
      if (!isDeviceTrusted) {
        showToast('Dispositivo no confiable detectado.', 'error');
        addAuditLog('Revisión de Alertas: Detectado dispositivo no seguro.', 'val-danger');
      } else if (cardBlocked) {
        showToast('Alerta Activa: Tarjeta bloqueada.', 'error');
        addAuditLog('Revisión de Alertas: La tarjeta se encuentra en estado BLOQUEADO.', 'val-danger');
      } else {
        showToast('No hay alertas críticas activas.', 'success');
        addAuditLog('Revisión de Alertas: Sin amenazas detectadas.', 'val-success');
      }
    });
  }
}

function toggleAnalysisSection(show) {
  const dashboardShell = document.getElementById('dashboardShell');
  const analysisSection = document.getElementById('seccion-analisis');
  const sidebar = dashboardShell ? dashboardShell.querySelector('aside') : null;

  if (!dashboardShell || !analysisSection) return;

  const viewNodes = Array.from(dashboardShell.children).filter((node) => node !== sidebar);

  if (show) {
    viewNodes.forEach((node) => {
      if (node !== analysisSection) node.classList.add('hidden');
    });
    analysisSection.classList.remove('hidden');
  } else {
    viewNodes.forEach((node) => {
      if (node !== analysisSection) node.classList.remove('hidden');
    });
    analysisSection.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const analysisBtn = document.getElementById('btn-analisis');
  const navReglasBtn = document.getElementById('navReglas');
  const navInicioBtn = document.getElementById('navInicio');

  if (analysisBtn) {
    analysisBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleAnalysisSection(true);
    });
  }

  [navReglasBtn, navInicioBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAnalysisSection(false);
      });
    }
  });
});
