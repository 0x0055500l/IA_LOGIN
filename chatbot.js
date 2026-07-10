/**
 * Chatbot IA — Sistema Experto Conversacional
 * Usa BASE_CONOCIMIENTO (reglas.js) y evaluarReglas (motorInferencia.js)
 * para responder preguntas sobre seguridad, fraude y el estado del sistema.
 */
(function () {
  'use strict';

  // ─── State ───
  const conversationHistory = [];
  let isTyping = false;
  let chatOpen = false;

  // ─── DOM References (initialized on DOMContentLoaded) ───
  let chatPanel, chatMessages, chatInput, chatSendBtn, chatToggleBtn, chatFab, chatClose, typingIndicator;

  // ─── NLU: Intent Detection ───
  const INTENTS = [
    {
      id: 'greet',
      patterns: [/^hola/i, /^buenas/i, /^hey/i, /^saludos/i, /^hi/i, /^hello/i, /^qué tal/i, /^buen(os|as)/i],
      handler: handleGreeting,
    },
    {
      id: 'explain_rule',
      patterns: [/regla\s*(r?\d)/i, /qu[ée]\s*(es|significa|hace)\s*(la\s+)?regla/i, /explicar?\s*(la\s+)?regla/i, /r([1-6])/i],
      handler: handleExplainRule,
    },
    {
      id: 'list_rules',
      patterns: [/todas?\s*las?\s*reglas/i, /listar?\s*reglas/i, /cu[aá]ntas?\s*reglas/i, /qu[eé]\s*reglas\s*(hay|tiene|existen)/i, /reglas\s*(disponibles|del sistema)/i, /base\s*de\s*conocimiento/i],
      handler: handleListRules,
    },
    {
      id: 'evaluate_scenario',
      patterns: [/qu[eé]\s*pasa\s*si/i, /qu[eé]\s*(pasar[ií]a|sucede|ocurre)\s*si/i, /simular?/i, /evaluar?\s*(un\s+)?escenario/i, /intentos?\s*fallidos?/i, /(\d+)\s*intentos/i],
      handler: handleScenario,
    },
    {
      id: 'risk_level',
      patterns: [/nivel\s*de\s*riesgo/i, /riesgo\s*(actual|ahora)/i, /cu[aá]l\s*(es\s+)?(el\s+)?riesgo/i, /estado\s*del\s*riesgo/i],
      handler: handleRiskLevel,
    },
    {
      id: 'security_tips',
      patterns: [/consejos?\s*(de\s+)?seguridad/i, /recomendaci[oó]n/i, /c[oó]mo\s*(me\s+)?(protej|proteg)/i, /tips/i, /seguridad/i, /proteger\s*(mi\s+)?cuenta/i],
      handler: handleSecurityTips,
    },
    {
      id: 'otp_info',
      patterns: [/otp/i, /autenticaci[oó]n\s*(adicional|doble|dos\s*factores)/i, /2fa/i, /c[oó]digo\s*(de\s+)?verificaci[oó]n/i, /verificaci[oó]n\s*extra/i],
      handler: handleOTPInfo,
    },
    {
      id: 'device_info',
      patterns: [/dispositivo/i, /equipo\s*(registrado|desconocido|nuevo)/i, /desde\s*(d[oó]nde|qu[eé]\s*equipo)/i],
      handler: handleDeviceInfo,
    },
    {
      id: 'block_info',
      patterns: [/bloque(o|ar|ada)/i, /cuenta\s*bloqueada/i, /desbloquear/i, /me\s*bloquearon/i],
      handler: handleBlockInfo,
    },
    {
      id: 'fraud_info',
      patterns: [/fraude/i, /transacci[oó]n\s*(sospechosa|fraudulenta)/i, /antifraude/i, /detecci[oó]n/i],
      handler: handleFraudInfo,
    },
    {
      id: 'system_status',
      patterns: [/estado\s*(del\s+)?sistema/i, /motor\s*(de\s+)?inferencia/i, /sistema\s*experto/i, /c[oó]mo\s*(funciona|trabaja)\s*(el\s+)?sistema/i],
      handler: handleSystemStatus,
    },
    {
      id: 'help',
      patterns: [/ayuda/i, /help/i, /qu[eé]\s*(puedes|sabes)\s*hacer/i, /comandos/i, /funciones/i, /opciones/i, /men[uú]/i],
      handler: handleHelp,
    },
    {
      id: 'goodbye',
      patterns: [/adi[oó]s/i, /bye/i, /hasta\s*luego/i, /nos\s*vemos/i, /chao/i, /gracias/i],
      handler: handleGoodbye,
    },
  ];

  // ─── Intent Handlers ───

  function handleGreeting(msg) {
    const userName = sessionStorage.getItem('userName') || 'usuario';
    const greetings = [
      `¡Hola, ${userName}! 👋 Soy el asistente del Sistema Experto BankSecure. ¿En qué puedo ayudarte?`,
      `¡Bienvenido, ${userName}! Estoy aquí para explicarte las reglas del sistema, evaluar escenarios de riesgo o darte consejos de seguridad.`,
      `¡Hola! 🤖 Pregúntame sobre las reglas de seguridad, el nivel de riesgo, o cualquier duda sobre el sistema antifraude.`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  function handleExplainRule(msg) {
    const reglas = window.BASE_CONOCIMIENTO || [];
    const match = msg.match(/r?(\d)/i);
    if (!match) {
      return 'Por favor especifica el número de regla (por ejemplo: "¿Qué es la regla R3?")';
    }

    const ruleId = `R${match[1]}`;
    const regla = reglas.find((r) => r.id === ruleId);

    if (!regla) {
      return `No encontré la regla ${ruleId}. Las reglas disponibles son R1 a R6.`;
    }

    return `📋 **${regla.id} — ${regla.nombre}**\n\n` +
      `▸ **Condición:** ${regla.condicion}\n` +
      `▸ **Acción:** ${regla.accion}\n` +
      `▸ **Tipo:** ${regla.tipo}\n` +
      `▸ **Prioridad:** ${regla.prioridad}\n\n` +
      `💡 ${regla.explicacion}`;
  }

  function handleListRules(msg) {
    const reglas = window.BASE_CONOCIMIENTO || [];
    if (!reglas.length) return 'No se encontró la base de conocimiento.';

    let response = `📚 **Base de Conocimiento — ${reglas.length} reglas cargadas:**\n\n`;
    reglas.forEach((r) => {
      const icon = r.tipo === 'autenticacion' ? '🔑' : r.tipo === 'seguridad' ? '🛡️' : '📱';
      response += `${icon} **${r.id}** · ${r.nombre} — _${r.condicion}_\n`;
    });
    response += `\nPuedes preguntarme sobre cualquiera en detalle: "Explícame la regla R3"`;
    return response;
  }

  function handleScenario(msg) {
    const evaluarReglas = window.evaluarReglas;
    if (!evaluarReglas) return 'El motor de inferencia no está disponible.';

    // Extract number of failed attempts from the message
    const attemptsMatch = msg.match(/(\d+)\s*intentos?/i);
    const attempts = attemptsMatch ? parseInt(attemptsMatch[1]) : 0;

    // Detect keywords for scenario building
    const hasCorrectPassword = /correct[oa]|v[aá]lid[oa]|bien/i.test(msg);
    const hasWrongPassword = /incorrect[oa]|inv[aá]lid[oa]|mal|equivocad[oa]|fallid[oa]/i.test(msg);
    const hasKnownDevice = /registrado|conocido|mismo\s*equipo/i.test(msg);
    const hasUnknownDevice = /desconocido|nuevo|otro\s*(equipo|dispositivo)/i.test(msg);

    const contexto = {
      credencialesValidas: hasCorrectPassword && !hasWrongPassword,
      contrasenaIncorrecta: hasWrongPassword || attempts > 0,
      intentosFallidos: attempts,
      dispositivoRegistrado: hasKnownDevice || (!hasUnknownDevice && !hasKnownDevice),
      requiereOtp: hasUnknownDevice && hasCorrectPassword,
    };

    const resultado = evaluarReglas(contexto);

    let response = `🔬 **Evaluación del escenario:**\n\n`;
    response += `▸ Credenciales: ${contexto.credencialesValidas ? '✅ Válidas' : '❌ Inválidas'}\n`;
    response += `▸ Intentos fallidos: ${contexto.intentosFallidos}\n`;
    response += `▸ Dispositivo: ${contexto.dispositivoRegistrado ? '✅ Registrado' : '⚠️ Desconocido'}\n\n`;

    const riskIcon = resultado.nivelRiesgo === 'Alto' ? '🔴' : resultado.nivelRiesgo === 'Medio' ? '🟡' : '🟢';
    response += `${riskIcon} **Nivel de riesgo: ${resultado.nivelRiesgo}**\n`;
    response += `📌 **Decisión: ${resultado.decision}**\n\n`;

    if (resultado.reglasActivadas.length > 0) {
      response += `Reglas activadas: ${resultado.reglasActivadas.map((r) => r.id).join(', ')}\n`;
    }
    response += `\n💬 ${resultado.explicacion}`;

    return response;
  }

  function handleRiskLevel(msg) {
    const riskValue = document.getElementById('riskValue');
    const riskText = document.getElementById('riskText');

    if (!riskValue) return 'No puedo acceder a la información de riesgo del dashboard.';

    const level = riskValue.textContent || 'Desconocido';
    const text = riskText ? riskText.textContent : '';
    const icon = level === 'Alto' ? '🔴' : level === 'Medio' ? '🟡' : '🟢';

    return `${icon} **Nivel de riesgo actual: ${level}**\n\n${text}\n\nSi quieres simular un escenario diferente, dime algo como: "¿Qué pasa si tengo 4 intentos fallidos?"`;
  }

  function handleSecurityTips(msg) {
    const tips = [
      '🔐 **Contraseña fuerte:** Usa al menos 8 caracteres con mayúsculas, minúsculas, números y símbolos especiales.',
      '📱 **Autenticación de dos factores:** Activa la verificación en 2 pasos para añadir una capa extra de seguridad.',
      '🖥️ **Dispositivos de confianza:** Registra solo dispositivos personales. Evita iniciar sesión en equipos públicos.',
      '🕐 **Horarios sospechosos:** Las transacciones entre 11 PM y 5 AM son consideradas de mayor riesgo.',
      '📍 **Ubicación consistente:** Las transacciones desde ubicaciones muy distantes a la última registrada activan alertas.',
      '⚠️ **No compartas credenciales:** Nunca envíes tu contraseña por correo, chat o teléfono.',
      '🔄 **Cambia tu contraseña periódicamente:** Se recomienda cada 90 días como máximo.',
    ];

    let response = '🛡️ **Consejos de Seguridad Bancaria:**\n\n';
    // Show 4 random tips
    const shuffled = tips.sort(() => 0.5 - Math.random()).slice(0, 4);
    shuffled.forEach((tip) => { response += `${tip}\n\n`; });
    return response;
  }

  function handleOTPInfo(msg) {
    return '🔐 **Autenticación de Dos Factores (OTP)**\n\n' +
      'El sistema solicita un código OTP (One-Time Password) cuando:\n\n' +
      '▸ Inicias sesión desde un **dispositivo desconocido** (Regla R6)\n' +
      '▸ Se detecta una **transacción de riesgo medio o alto**\n' +
      '▸ Tu ubicación actual **no coincide** con la última registrada\n\n' +
      'El código se envía por SMS o correo electrónico y es válido por 5 minutos. ' +
      'Esto añade una segunda capa de verificación que protege tu cuenta incluso si tus credenciales son comprometidas.';
  }

  function handleDeviceInfo(msg) {
    return '📱 **Gestión de Dispositivos**\n\n' +
      '▸ **Dispositivo registrado** (Regla R5): Reduce el nivel de riesgo. El sistema confía más en accesos desde equipos conocidos.\n\n' +
      '▸ **Dispositivo desconocido** (Regla R6): Aumenta el nivel de riesgo a Medio y solicita autenticación adicional (OTP).\n\n' +
      'El sistema identifica dispositivos mediante huella digital del navegador (user-agent, resolución, zona horaria). ' +
      'Esto permite detectar accesos sospechosos automáticamente.';
  }

  function handleBlockInfo(msg) {
    return '🔒 **Bloqueo de Cuenta**\n\n' +
      'El sistema tiene dos niveles de bloqueo:\n\n' +
      '🟡 **Bloqueo temporal** (Regla R3): Tras **3 intentos fallidos** consecutivos, la cuenta se bloquea por **15 minutos**. ' +
      'Esto previene ataques de fuerza bruta.\n\n' +
      '🔴 **Bloqueo total** (Regla R4): Tras **5 intentos fallidos**, la cuenta se bloquea **permanentemente** hasta que un administrador la rehabilite.\n\n' +
      '💡 Si tu cuenta fue bloqueada, contacta al administrador del sistema.';
  }

  function handleFraudInfo(msg) {
    return '🕵️ **Sistema Antifraude**\n\n' +
      'El motor de inferencia evalúa múltiples factores para detectar fraude:\n\n' +
      '▸ **Monto inusual**: Transacciones superiores a $3,000 (+35 puntos de riesgo)\n' +
      '▸ **Viaje imposible**: Ubicación actual diferente a la última compra (+35 puntos)\n' +
      '▸ **Horario sospechoso**: Transacciones entre 11 PM y 5 AM (+20 puntos)\n' +
      '▸ **Sin verificación facial**: No se confirmó la identidad (+20 puntos)\n\n' +
      'Score ≥ 70 → 🔴 Riesgo Alto | Score ≥ 40 → 🟡 Riesgo Medio | Score < 40 → 🟢 Riesgo Bajo\n\n' +
      'Pregúntame "¿Qué pasa si tengo 5 intentos fallidos?" para simular un escenario.';
  }

  function handleSystemStatus(msg) {
    const reglas = window.BASE_CONOCIMIENTO || [];
    const userName = sessionStorage.getItem('userName') || 'usuario';

    return '⚙️ **Estado del Sistema Experto**\n\n' +
      `▸ Motor de inferencia: ✅ Activo\n` +
      `▸ Base de conocimiento: ${reglas.length} reglas cargadas\n` +
      `▸ Usuario autenticado: ${userName}\n` +
      `▸ Sesión: 🔒 Protegida con JWT\n` +
      `▸ Chatbot IA: 🤖 En línea\n\n` +
      'El sistema experto usa **encadenamiento hacia adelante** (forward chaining) para evaluar reglas. ' +
      'Cada regla tiene una condición que, al cumplirse, dispara una acción y genera una explicación auditable.';
  }

  function handleHelp(msg) {
    return '🤖 **Soy el Asistente IA de BankSecure.** Puedo ayudarte con:\n\n' +
      '📋 **Reglas** — "Explícame la regla R3" o "Lista todas las reglas"\n' +
      '🔬 **Escenarios** — "¿Qué pasa si tengo 4 intentos fallidos?"\n' +
      '📊 **Riesgo** — "¿Cuál es el nivel de riesgo actual?"\n' +
      '🛡️ **Seguridad** — "Dame consejos de seguridad"\n' +
      '🔐 **OTP** — "¿Qué es la autenticación de dos factores?"\n' +
      '📱 **Dispositivos** — "¿Cómo funciona el registro de dispositivos?"\n' +
      '🔒 **Bloqueos** — "¿Cuándo se bloquea la cuenta?"\n' +
      '🕵️ **Fraude** — "¿Cómo detecta el sistema el fraude?"\n' +
      '⚙️ **Sistema** — "¿Cómo funciona el sistema experto?"\n\n' +
      '¡Pregúntame lo que necesites! 💬';
  }

  function handleGoodbye(msg) {
    const responses = [
      '¡Hasta luego! 👋 Estaré aquí cuando me necesites.',
      '¡Gracias por usar el asistente! Si tienes más dudas, no dudes en escribirme. 🤖',
      '¡Nos vemos! Recuerda mantener tus credenciales seguras. 🔒',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  function handleUnknown(msg) {
    const responses = [
      'No estoy seguro de entender tu pregunta. ¿Puedes reformularla? Escribe "ayuda" para ver qué puedo hacer.',
      'Hmm, no reconozco esa consulta. Intenta preguntarme sobre reglas, riesgo, seguridad o el sistema experto. 🤔',
      'No tengo información sobre eso. Prueba con: "Lista las reglas" o "¿Qué pasa si tengo 3 intentos fallidos?"',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ─── Core NLU ───
  function detectIntent(message) {
    const normalized = message.trim().toLowerCase();

    for (const intent of INTENTS) {
      for (const pattern of intent.patterns) {
        if (pattern.test(normalized)) {
          return { intent: intent.id, handler: intent.handler };
        }
      }
    }

    return { intent: 'unknown', handler: handleUnknown };
  }

  function processMessage(userMessage) {
    const { handler } = detectIntent(userMessage);
    return handler(userMessage);
  }

  // ─── UI Rendering ───

  function formatBotMessage(text) {
    // Simple markdown-like formatting for bot messages
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/▸/g, '<span class="chat-bullet">▸</span>');
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message chat-${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';

    if (sender === 'bot') {
      bubble.innerHTML = formatBotMessage(text);
    } else {
      bubble.textContent = text;
    }

    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Track in history
    conversationHistory.push({ sender, text, timestamp: Date.now() });
  }

  function showTypingIndicator() {
    if (typingIndicator) {
      typingIndicator.classList.add('visible');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    isTyping = true;
  }

  function hideTypingIndicator() {
    if (typingIndicator) {
      typingIndicator.classList.remove('visible');
    }
    isTyping = false;
  }

  async function handleUserInput() {
    const message = chatInput.value.trim();
    if (!message || isTyping) return;

    chatInput.value = '';
    addMessage(message, 'user');

    // Show typing indicator
    showTypingIndicator();

    // Simulate thinking delay (200-800ms based on response length)
    const response = processMessage(message);
    const delay = Math.min(300 + response.length * 2, 1200);

    await new Promise((r) => setTimeout(r, delay));

    hideTypingIndicator();
    addMessage(response, 'bot');
  }

  function toggleChat() {
    chatOpen = !chatOpen;
    chatPanel.classList.toggle('open', chatOpen);
    if (chatFab) chatFab.classList.toggle('hidden', chatOpen);

    if (chatOpen) {
      chatInput.focus();
      // Send welcome message if first time
      if (conversationHistory.length === 0) {
        setTimeout(() => {
          showTypingIndicator();
          setTimeout(() => {
            hideTypingIndicator();
            const userName = sessionStorage.getItem('userName') || 'usuario';
            addMessage(
              `¡Hola, ${userName}! 👋 Soy el **Asistente IA** del Sistema Experto BankSecure.\n\n` +
              `Puedo explicarte las reglas de seguridad, evaluar escenarios de riesgo, o responder tus dudas sobre el sistema antifraude.\n\n` +
              `Escribe **"ayuda"** para ver todo lo que puedo hacer. 🤖`,
              'bot'
            );
          }, 600);
        }, 300);
      }
    }
  }

  // ─── Initialization ───
  function init() {
    chatPanel = document.getElementById('chatPanel');
    chatMessages = document.getElementById('chatMessages');
    chatInput = document.getElementById('chatInput');
    chatSendBtn = document.getElementById('chatSendBtn');
    chatToggleBtn = document.getElementById('chatToggleBtn');
    chatFab = document.getElementById('chatFab');
    chatClose = document.getElementById('chatClose');
    typingIndicator = document.getElementById('typingIndicator');

    if (!chatPanel || !chatMessages || !chatInput) {
      console.warn('Chatbot: elementos del DOM no encontrados.');
      return;
    }

    // Event listeners
    chatSendBtn?.addEventListener('click', handleUserInput);

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserInput();
      }
    });

    chatToggleBtn?.addEventListener('click', toggleChat);
    chatFab?.addEventListener('click', toggleChat);
    chatClose?.addEventListener('click', toggleChat);
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for sidebar button
  window.toggleChatbot = function () {
    if (!chatOpen) toggleChat();
    else chatInput?.focus();
  };
})();
