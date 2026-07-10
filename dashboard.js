document.addEventListener('DOMContentLoaded', async () => {
  const sessionLoader = document.getElementById('sessionLoader');
  const dashboardShell = document.getElementById('dashboardShell');

  // ─── JWT Session Validation ───
  const token = sessionStorage.getItem('authToken');

  if (!token) {
    // No token → redirect to login immediately
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
      // Token invalid or expired → clear and redirect
      sessionStorage.clear();
      window.location.href = 'index.html';
      return;
    }

    // Session is valid — store fresh user data from server
    const user = session.user;
    sessionStorage.setItem('userName', user.name);
    sessionStorage.setItem('userEmail', user.email);

    // Hide loader, show dashboard
    if (sessionLoader) sessionLoader.classList.add('hidden');
    if (dashboardShell) dashboardShell.style.display = '';

    // Initialize dashboard with validated user data
    initializeDashboard(user, session.expiresAt);

  } catch (error) {
    console.error('Session validation failed:', error);
    sessionStorage.clear();
    window.location.href = 'index.html';
    return;
  }
});

function initializeDashboard(user, expiresAt) {
  const userPill = document.getElementById('userPill');
  const riskBadge = document.getElementById('riskBadge');
  const riskValue = document.getElementById('riskValue');
  const riskBar = document.getElementById('riskBar');
  const riskText = document.getElementById('riskText');
  const systemState = document.getElementById('systemState');
  const authStatus = document.getElementById('authStatus');
  const sessionStatus = document.getElementById('sessionStatus');
  const deviceStatus = document.getElementById('deviceStatus');
  const ruleList = document.getElementById('ruleList');
  const explanationText = document.getElementById('explanationText');
  const eventList = document.getElementById('eventList');
  const logoutBtn = document.getElementById('logoutBtn');

  // Display user info from server (not localStorage)
  const email = user.email || 'usuario@banco.local';
  const deviceRegistered = localStorage.getItem('registeredDevice') === 'true';
  const loginAttempts = Number(localStorage.getItem('loginAttempts') || '0');
  const lockoutEnd = Number(localStorage.getItem('lockoutEnd') || '0');

  // Evaluate rules with the inference engine
  const contexto = {
    credencialesValidas: true, // User is authenticated via JWT
    contrasenaIncorrecta: false,
    intentosFallidos: loginAttempts,
    dispositivoRegistrado: deviceRegistered,
    requiereOtp: !deviceRegistered,
  };

  const resultado = window.evaluarReglas(contexto);

  // Populate dashboard
  if (userPill) userPill.textContent = user.name || email;
  if (riskBadge) riskBadge.textContent = resultado.nivelRiesgo;
  if (riskValue) riskValue.textContent = resultado.nivelRiesgo;

  if (riskBar) {
    const widthByRisk = { Bajo: '32%', Medio: '68%', Alto: '100%' };
    riskBar.style.width = widthByRisk[resultado.nivelRiesgo] || '40%';
  }

  if (riskText) riskText.textContent = resultado.explicacion;

  if (systemState) {
    systemState.textContent = resultado.decision === 'Acceso permitido' ? 'Operativo' : 'Requiere revisión';
  }

  if (authStatus) authStatus.textContent = '✅ JWT Verificado';

  if (sessionStatus) {
    const expDate = new Date(expiresAt);
    const now = new Date();
    const minutesLeft = Math.round((expDate - now) / 60000);
    sessionStatus.textContent = `🔒 ${minutesLeft} min restantes`;
    sessionStatus.title = `Expira: ${expDate.toLocaleTimeString()}`;
  }

  if (deviceStatus) {
    deviceStatus.textContent = deviceRegistered ? 'Registrado' : 'Desconocido';
  }

  if (ruleList) {
    ruleList.innerHTML = resultado.reglasActivadas
      .map((regla) => {
        const icon = regla.tipo === 'autenticacion' ? '🔑' : regla.tipo === 'seguridad' ? '🛡️' : '📱';
        return `<li>${icon} <strong>${regla.id}</strong> · ${regla.nombre}<br><small>${regla.explicacion}</small></li>`;
      })
      .join('');
  }

  if (explanationText) {
    explanationText.textContent = resultado.explicacion;

    if (resultado.requiereOtp) {
      const otpPanel = document.createElement('div');
      otpPanel.className = 'otp-panel';
      otpPanel.innerHTML = `
        <strong>Autenticación adicional requerida</strong>
        <p>Código OTP simulado: 482917</p>
        <button type="button">Validar acceso</button>
      `;
      explanationText.insertAdjacentElement('afterend', otpPanel);
    }
  }

  if (eventList) {
    const events = [
      { label: 'Inicio de sesión', value: `${user.name} — JWT activo`, icon: '🔑' },
      { label: 'Sesión', value: `Expira en ${Math.round((new Date(expiresAt) - new Date()) / 60000)} min`, icon: '⏱️' },
      { label: 'Rol', value: user.role === 'admin' ? 'Administrador' : 'Usuario', icon: '👤' },
      { label: 'Dispositivo', value: deviceRegistered ? 'Registrado' : 'No identificado', icon: '📱' },
      { label: 'Intentos fallidos previos', value: `${loginAttempts}`, icon: '⚠️' },
      { label: 'Bloqueo', value: lockoutEnd > Date.now() ? 'Temporal activo' : 'Sin bloqueo', icon: '🔒' },
    ];

    eventList.innerHTML = events
      .map((event) => `<li>${event.icon} <strong>${event.label}</strong><br />${event.value}</li>`)
      .join('');
  }

  // ─── Logout Handler ───
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      logoutBtn.disabled = true;
      logoutBtn.textContent = 'Cerrando…';

      try {
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (e) {
        // Even if server call fails, still clear local session
        console.warn('Logout request failed, clearing local session anyway.');
      }

      // Clear all session data
      sessionStorage.clear();
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('lockoutEnd');

      // Redirect to login
      window.location.href = 'index.html';
    });
  }

  // ─── Auto Session Expiry Check ───
  const expTime = new Date(expiresAt).getTime();
  const checkInterval = setInterval(() => {
    const now = Date.now();
    const remaining = expTime - now;

    if (remaining <= 0) {
      clearInterval(checkInterval);
      sessionStorage.clear();
      alert('Tu sesión ha expirado. Serás redirigido al login.');
      window.location.href = 'index.html';
      return;
    }

    // Update session timer in UI
    if (sessionStatus) {
      const minutesLeft = Math.round(remaining / 60000);
      if (minutesLeft <= 5) {
        sessionStatus.textContent = `⚠️ ${minutesLeft} min restantes`;
        sessionStatus.style.color = 'var(--warning)';
      }
    }
  }, 30000); // Check every 30 seconds
}
