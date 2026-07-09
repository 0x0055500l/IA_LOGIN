document.addEventListener('DOMContentLoaded', () => {
  const userPill = document.getElementById('userPill');
  const riskBadge = document.getElementById('riskBadge');
  const riskValue = document.getElementById('riskValue');
  const riskBar = document.getElementById('riskBar');
  const riskText = document.getElementById('riskText');
  const systemState = document.getElementById('systemState');
  const authStatus = document.getElementById('authStatus');
  const deviceStatus = document.getElementById('deviceStatus');
  const ruleList = document.getElementById('ruleList');
  const explanationText = document.getElementById('explanationText');
  const eventList = document.getElementById('eventList');

  const storedUser = JSON.parse(localStorage.getItem('expertUser') || 'null');
  const email = storedUser?.email || 'usuario@banco.local';
  const deviceRegistered = localStorage.getItem('registeredDevice') === 'true';
  const loginAttempts = Number(localStorage.getItem('loginAttempts') || '0');
  const lockoutEnd = Number(localStorage.getItem('lockoutEnd') || '0');
  const passwordCorrect = storedUser?.passwordCorrect === true;

  const contexto = {
    credencialesValidas: passwordCorrect,
    contrasenaIncorrecta: !passwordCorrect,
    intentosFallidos: loginAttempts,
    dispositivoRegistrado: deviceRegistered,
    requiereOtp: !deviceRegistered && passwordCorrect
  };

  const resultado = window.evaluarReglas(contexto);

  if (userPill) {
    userPill.textContent = email;
  }

  if (riskBadge) {
    riskBadge.textContent = resultado.nivelRiesgo;
  }

  if (riskValue) {
    riskValue.textContent = resultado.nivelRiesgo;
  }

  if (riskBar) {
    const widthByRisk = {
      Bajo: '32%',
      Medio: '68%',
      Alto: '100%'
    };
    riskBar.style.width = widthByRisk[resultado.nivelRiesgo] || '40%';
  }

  if (riskText) {
    riskText.textContent = resultado.explicacion;
  }

  if (systemState) {
    systemState.textContent = resultado.decision === 'Acceso permitido' ? 'Operativo' : 'Requiere revisión';
  }

  if (authStatus) {
    authStatus.textContent = passwordCorrect ? 'Verificada' : 'Rechazada';
  }

  if (deviceStatus) {
    deviceStatus.textContent = deviceRegistered ? 'Registrado' : 'Desconocido';
  }

  if (ruleList) {
    ruleList.innerHTML = resultado.reglasActivadas
      .map((regla) => `<li><strong>${regla.id}</strong> · ${regla.nombre}</li>`)
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
      { label: 'Inicio de sesión', value: 'Autenticación completada' },
      { label: 'Dispositivo', value: deviceRegistered ? 'Registrado' : 'No identificado' },
      { label: 'Intentos fallidos', value: `${loginAttempts}` },
      { label: 'Bloqueo', value: lockoutEnd > Date.now() ? 'Temporal activo' : 'Sin bloqueo' }
    ];

    eventList.innerHTML = events
      .map((event) => `<li><strong>${event.label}</strong><br />${event.value}</li>`)
      .join('');
  }
});
