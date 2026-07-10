/**
 * Chatbot IA — Sistema Experto Conversacional Bilingüe
 * Usa BASE_CONOCIMIENTO (reglas.js) y evaluarReglas (motorInferencia.js)
 * para responder preguntas sobre seguridad, fraude y el estado del sistema.
 */
(function () {
  'use strict';

  // ─── State ───
  const conversationHistory = [];
  let isTyping = false;
  let chatOpen = false;

  // ─── DOM References ───
  let chatPanel, chatMessages, chatInput, chatSendBtn, chatToggleBtn, chatFab, chatClose, typingIndicator;

  // ─── NLU: Intent Detection with Bilingual Patterns ───
  const INTENTS = [
    {
      id: 'greet',
      patterns: [/^hola/i, /^buenas/i, /^hey/i, /^saludos/i, /^hi/i, /^hello/i, /^qué tal/i, /^buen(os|as)/i],
      handler: handleGreeting,
    },
    {
      id: 'explain_rule',
      patterns: [/regla\s*(r?\d)/i, /rule\s*(r?\d)/i, /qu[ée]\s*(es|significa|hace)\s*(la\s+)?regla/i, /what\s*is\s*(the\s+)?rule/i, /explicar?\s*(la\s+)?regla/i, /explain\s*(the\s+)?rule/i, /r([1-8])/i],
      handler: handleExplainRule,
    },
    {
      id: 'list_rules',
      patterns: [/todas?\s*las?\s*reglas/i, /all\s*(the\s+)?rules/i, /listar?\s*reglas/i, /list\s*rules/i, /cu[aá]ntas?\s*reglas/i, /how\s*many\s*rules/i, /qu[eé]\s*reglas\s*(hay|tiene|existen)/i, /what\s*rules/i, /base\s*de\s*conocimiento/i, /knowledge\s*base/i],
      handler: handleListRules,
    },
    {
      id: 'evaluate_scenario',
      patterns: [/qu[eé]\s*pasa\s*si/i, /what\s*happens\s*if/i, /qu[eé]\s*(pasar[ií]a|sucede|ocurre)\s*si/i, /what\s*would\s*happen\s*if/i, /simular?/i, /simulate/i, /evaluar?\s*(un\s+)?escenario/i, /evaluate\s*(a\s+)?scenario/i, /intentos?\s*fallidos?/i, /failed\s*attempts?/i, /(\d+)\s*intentos/i, /(\d+)\s*attempts/i],
      handler: handleScenario,
    },
    {
      id: 'risk_level',
      patterns: [/nivel\s*de\s*riesgo/i, /risk\s*level/i, /riesgo\s*(actual|ahora)/i, /current\s*risk/i, /cu[aá]l\s*(es\s+)?(el\s+)?riesgo/i, /what\s*is\s*the\s*risk/i, /estado\s*del\s*riesgo/i],
      handler: handleRiskLevel,
    },
    {
      id: 'security_tips',
      patterns: [/consejos?\s*(de\s+)?seguridad/i, /security\s*tips/i, /recomendaci[oó]n/i, /recommendation/i, /c[oó]mo\s*(me\s+)?(protej|proteg)/i, /how\s*to\s*protect/i, /tips/i, /seguridad/i, /security/i, /proteger\s*(mi\s+)?cuenta/i, /protect\s*my\s*account/i],
      handler: handleSecurityTips,
    },
    {
      id: 'otp_info',
      patterns: [/otp/i, /autenticaci[oó]n\s*(adicional|doble|dos\s*factores)/i, /two\s*-?\s*factor/i, /2fa/i, /c[oó]digo\s*(de\s+)?verificaci[oó]n/i, /verification\s*code/i, /verificaci[oó]n\s*extra/i, /extra\s*verification/i],
      handler: handleOTPInfo,
    },
    {
      id: 'device_info',
      patterns: [/dispositivo/i, /device/i, /equipo\s*(registrado|desconocido|nuevo)/i, /trusted\s*device/i, /desde\s*(d[oó]nde|qu[eé]\s*equipo)/i],
      handler: handleDeviceInfo,
    },
    {
      id: 'block_info',
      patterns: [/bloque(o|ar|ada)/i, /lock/i, /cuenta\s*bloqueada/i, /locked\s*account/i, /desbloquear/i, /unlock/i, /me\s*bloquearon/i],
      handler: handleBlockInfo,
    },
    {
      id: 'fraud_info',
      patterns: [/fraude/i, /fraud/i, /transacci[oó]n\s*(sospechosa|fraudulenta)/i, /suspicious\s*transaction/i, /antifraude/i, /anti-fraud/i, /detecci[oó]n/i, /detection/i],
      handler: handleFraudInfo,
    },
    {
      id: 'system_status',
      patterns: [/estado\s*(del\s+)?sistema/i, /system\s*status/i, /motor\s*(de\s+)?inferencia/i, /inference\s*engine/i, /sistema\s*experto/i, /expert\s*system/i, /c[oó]mo\s*(funciona|trabaja)\s*(el\s+)?sistema/i, /how\s*does\s*the\s*system\s*work/i],
      handler: handleSystemStatus,
    },
    {
      id: 'help',
      patterns: [/ayuda/i, /help/i, /qu[eé]\s*(puedes|sabes)\s*hacer/i, /what\s*can\s*you\s*do/i, /comandos/i, /commands/i, /funciones/i, /opciones/i, /options/i, /men[uú]/i, /menu/i],
      handler: handleHelp,
    },
    {
      id: 'goodbye',
      patterns: [/adi[oó]s/i, /bye/i, /goodbye/i, /hasta\s*luego/i, /see\s*you/i, /chao/i, /gracias/i, /thanks/i, /thank\s*you/i],
      handler: handleGoodbye,
    },
  ];

  // ─── Intent Handlers ───

  function handleGreeting(msg) {
    const userName = sessionStorage.getItem('userName') || 'usuario';
    const lang = localStorage.getItem('userLanguage') || 'es';

    if (lang === 'en') {
      const greetings = [
        `Hello, ${userName}! 👋 I'm the assistant of the BankSecure Expert System. How can I help you?`,
        `Welcome, ${userName}! I'm here to explain the rules, evaluate risk scenarios, or give you security tips.`,
        `Hi! 🤖 Ask me about safety rules, risk level, or anything about the anti-fraud system.`
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    } else {
      const greetings = [
        `¡Hola, ${userName}! 👋 Soy el asistente del Sistema Experto BankSecure. ¿En qué puedo ayudarte?`,
        `¡Bienvenido, ${userName}! Estoy aquí para explicarte las reglas del sistema, evaluar escenarios de riesgo o darte consejos de seguridad.`,
        `¡Hola! 🤖 Pregúntame sobre las reglas de seguridad, el nivel de riesgo, o cualquier duda sobre el sistema antifraude.`
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
  }

  function handleExplainRule(msg) {
    const reglas = window.BASE_CONOCIMIENTO || [];
    const lang = localStorage.getItem('userLanguage') || 'es';
    const match = msg.match(/r?(\d)/i);
    
    if (!match) {
      return lang === 'en'
        ? 'Please specify the rule number (for example: "Explain rule R3")'
        : 'Por favor especifica el número de regla (por ejemplo: "¿Qué es la regla R3?")';
    }

    const ruleId = `R${match[1]}`;
    const regla = reglas.find((r) => r.id === ruleId);

    if (!regla) {
      return lang === 'en'
        ? `I couldn't find rule ${ruleId}. Available rules are R1 to R8.`
        : `No encontré la regla ${ruleId}. Las reglas disponibles son R1 a R8.`;
    }

    if (lang === 'en') {
      return `📋 **${regla.id} — ${regla.nombreEn}**\n\n` +
        `▸ **Condition:** ${regla.condicionEn}\n` +
        `▸ **Action:** ${regla.accionEn}\n` +
        `▸ **Type:** ${regla.tipo}\n` +
        `▸ **Priority:** ${regla.prioridad}\n\n` +
        `💡 ${regla.explicacionEn}`;
    } else {
      return `📋 **${regla.id} — ${regla.nombre}**\n\n` +
        `▸ **Condición:** ${regla.condicion}\n` +
        `▸ **Acción:** ${regla.accion}\n` +
        `▸ **Tipo:** ${regla.tipo}\n` +
        `▸ **Prioridad:** ${regla.prioridad}\n\n` +
        `💡 ${regla.explicacion}`;
    }
  }

  function handleListRules(msg) {
    const reglas = window.BASE_CONOCIMIENTO || [];
    const lang = localStorage.getItem('userLanguage') || 'es';

    if (!reglas.length) {
      return lang === 'en' ? 'Knowledge base not found.' : 'No se encontró la base de conocimiento.';
    }

    if (lang === 'en') {
      let response = `📚 **Knowledge Base — ${reglas.length} rules loaded:**\n\n`;
      reglas.forEach((r) => {
        const icon = r.tipo === 'autenticacion' ? '🔑' : r.tipo === 'seguridad' ? '🛡️' : '📱';
        response += `${icon} **${r.id}** · ${r.nombreEn} — _${r.condicionEn}_\n`;
      });
      response += `\nYou can ask me about any rule in detail: "Explain rule R3"`;
      return response;
    } else {
      let response = `📚 **Base de Conocimiento — ${reglas.length} reglas cargadas:**\n\n`;
      reglas.forEach((r) => {
        const icon = r.tipo === 'autenticacion' ? '🔑' : r.tipo === 'seguridad' ? '🛡️' : '📱';
        response += `${icon} **${r.id}** · ${r.nombre} — _${r.condicion}_\n`;
      });
      response += `\nPuedes preguntarme sobre cualquiera en detalle: "Explícame la regla R3"`;
      return response;
    }
  }

  function handleScenario(msg) {
    const evaluarReglas = window.evaluarReglas;
    const lang = localStorage.getItem('userLanguage') || 'es';
    if (!evaluarReglas) {
      return lang === 'en' ? 'Inference engine is unavailable.' : 'El motor de inferencia no está disponible.';
    }

    // Extract attempts
    const attemptsMatch = msg.match(/(\d+)\s*(intento|attempt)/i);
    const attempts = attemptsMatch ? parseInt(attemptsMatch[1]) : 0;

    // Detect bilingual keywords
    const hasCorrectPassword = /correct[oa]|v[aá]lid[oa]|bien|correct|valid|right/i.test(msg);
    const hasWrongPassword = /incorrect[oa]|inv[aá]lid[oa]|mal|equivocad[oa]|fallid[oa]|wrong|invalid|failed|error/i.test(msg);
    const hasKnownDevice = /registrado|conocido|mismo\s*equipo|registered|known|trusted/i.test(msg);
    const hasUnknownDevice = /desconocido|nuevo|otro\s*(equipo|dispositivo)|unknown|new|untrusted/i.test(msg);

    // Get current preferences switches
    const prefs = JSON.parse(sessionStorage.getItem('userPreferences')) || { twoFactor: false, strictMode: false };

    const contexto = {
      credencialesValidas: hasCorrectPassword && !hasWrongPassword,
      contrasenaIncorrecta: hasWrongPassword || attempts > 0,
      intentosFallidos: attempts,
      dispositivoRegistrado: hasKnownDevice || (!hasUnknownDevice && !hasKnownDevice),
      requiereOtp: (hasUnknownDevice && hasCorrectPassword) || prefs.twoFactor,
      dobleFactorHabilitado: prefs.twoFactor,
      modoEstricto: prefs.strictMode,
      language: lang
    };

    const resultado = evaluarReglas(contexto);

    if (lang === 'en') {
      let response = `🔬 **Scenario evaluation:**\n\n`;
      response += `▸ Credentials: ${contexto.credencialesValidas ? '✅ Valid' : '❌ Invalid'}\n`;
      response += `▸ Failed attempts: ${contexto.intentosFallidos}\n`;
      response += `▸ Device: ${contexto.dispositivoRegistrado ? '✅ Registered' : '⚠️ Unknown'}\n`;
      response += `▸ 2FA Setting: ${contexto.dobleFactorHabilitado ? '✅ Enabled' : '❌ Disabled'}\n`;
      response += `▸ Strict Mode: ${contexto.modoEstricto ? '✅ Enabled' : '❌ Disabled'}\n\n`;

      const riskIcon = resultado.nivelRiesgo === 'Alto' ? '🔴' : resultado.nivelRiesgo === 'Medio' ? '🟡' : '🟢';
      let riskStr = resultado.nivelRiesgo === 'Alto' ? 'High' : resultado.nivelRiesgo === 'Medio' ? 'Medium' : 'Low';
      
      let decisionStr = resultado.decision;
      if (resultado.decision === 'Acceso permitido') decisionStr = 'Access allowed';
      else if (resultado.decision === 'Acceso permitido con revisión') decisionStr = 'Access allowed with review';
      else if (resultado.decision === 'Pendiente de autenticación adicional') decisionStr = 'Pending additional authentication';
      else if (resultado.decision === 'Acceso temporalmente bloqueado') decisionStr = 'Access temporarily blocked';
      else if (resultado.decision === 'Acceso denegado') decisionStr = 'Access denied';

      response += `${riskIcon} **Risk Level: ${riskStr}**\n`;
      response += `📌 **Decision: ${decisionStr}**\n\n`;

      if (resultado.reglasActivadas.length > 0) {
        response += `Rules triggered: ${resultado.reglasActivadas.map((r) => r.id).join(', ')}\n`;
      }
      response += `\n💬 ${resultado.explicacion}`;
      return response;
    } else {
      let response = `🔬 **Evaluación del escenario:**\n\n`;
      response += `▸ Credenciales: ${contexto.credencialesValidas ? '✅ Válidas' : '❌ Inválidas'}\n`;
      response += `▸ Intentos fallidos: ${contexto.intentosFallidos}\n`;
      response += `▸ Dispositivo: ${contexto.dispositivoRegistrado ? '✅ Registrado' : '⚠️ Desconocido'}\n`;
      response += `▸ Ajuste 2FA: ${contexto.dobleFactorHabilitado ? '✅ Activo' : '❌ Inactivo'}\n`;
      response += `▸ Modo Estricto: ${contexto.modoEstricto ? '✅ Activo' : '❌ Inactivo'}\n\n`;

      const riskIcon = resultado.nivelRiesgo === 'Alto' ? '🔴' : resultado.nivelRiesgo === 'Medio' ? '🟡' : '🟢';
      response += `${riskIcon} **Nivel de riesgo: ${resultado.nivelRiesgo}**\n`;
      response += `📌 **Decisión: ${resultado.decision}**\n\n`;

      if (resultado.reglasActivadas.length > 0) {
        response += `Reglas activadas: ${resultado.reglasActivadas.map((r) => r.id).join(', ')}\n`;
      }
      response += `\n💬 ${resultado.explicacion}`;
      return response;
    }
  }

  function handleRiskLevel(msg) {
    const riskValue = document.getElementById('riskValue');
    const riskText = document.getElementById('riskText');
    const lang = localStorage.getItem('userLanguage') || 'es';

    if (!riskValue) {
      return lang === 'en' 
        ? 'Cannot access risk info on the dashboard.' 
        : 'No puedo acceder a la información de riesgo del dashboard.';
    }

    const level = riskValue.textContent || 'Desconocido';
    const text = riskText ? riskText.textContent : '';
    const icon = level === 'Alto' || level === 'High' ? '🔴' : level === 'Medio' || level === 'Medium' ? '🟡' : '🟢';

    if (lang === 'en') {
      const levelStr = level === 'Alto' ? 'High' : level === 'Medio' ? 'Medium' : level === 'Bajo' ? 'Low' : level;
      return `${icon} **Current risk level: ${levelStr}**\n\n${text}\n\nIf you want to simulate a different scenario, try asking: "What happens if I have 4 failed attempts?"`;
    } else {
      return `${icon} **Nivel de riesgo actual: ${level}**\n\n${text}\n\nSi quieres simular un escenario diferente, dime algo como: "¿Qué pasa si tengo 4 intentos fallidos?"`;
    }
  }

  function handleSecurityTips(msg) {
    const lang = localStorage.getItem('userLanguage') || 'es';

    if (lang === 'en') {
      const tips = [
        '🔐 **Strong password:** Use at least 8 characters with uppercase, lowercase, numbers, and special symbols.',
        '📱 **Two-factor authentication:** Enable 2-step verification to add an extra layer of security.',
        '🖥️ **Trusted devices:** Register only personal devices. Avoid logging in on public computers.',
        '🕐 **Suspicious hours:** Transactions between 11 PM and 5 AM are considered higher risk.',
        '📍 **Consistent location:** Transactions from locations far from the last registered one trigger alerts.',
        '⚠️ **Do not share credentials:** Never send your password via email, chat, or phone.',
        '🔄 **Change your password periodically:** Up to 90 days maximum is recommended.'
      ];
      let response = '🛡️ **Banking Security Tips:**\n\n';
      const shuffled = tips.sort(() => 0.5 - Math.random()).slice(0, 4);
      shuffled.forEach((tip) => { response += `${tip}\n\n`; });
      return response;
    } else {
      const tips = [
        '🔐 **Contraseña fuerte:** Usa al menos 8 caracteres con mayúsculas, minúsculas, números y símbolos especiales.',
        '📱 **Autenticación de dos factores:** Activa la verificación en 2 pasos para añadir una capa extra de seguridad.',
        '🖥️ **Dispositivos de confianza:** Registra solo dispositivos personales. Evita iniciar sesión en equipos públicos.',
        '🕐 **Horarios sospechosos:** Las transacciones entre 11 PM y 5 AM son consideradas de mayor riesgo.',
        '📍 **Ubicación consistente:** Las transacciones desde ubicaciones muy distantes a la última registrada activan alertas.',
        '⚠️ **No compartas credenciales:** Nunca envíes tu contraseña por correo, chat o teléfono.',
        '🔄 **Cambia tu contraseña periódicamente:** Se recomienda cada 90 días como máximo.'
      ];
      let response = '🛡️ **Consejos de Seguridad Bancaria:**\n\n';
      const shuffled = tips.sort(() => 0.5 - Math.random()).slice(0, 4);
      shuffled.forEach((tip) => { response += `${tip}\n\n`; });
      return response;
    }
  }

  function handleOTPInfo(msg) {
    const lang = localStorage.getItem('userLanguage') || 'es';

    if (lang === 'en') {
      return '🔐 **Two-Factor Authentication (OTP)**\n\n' +
        'The system requests an OTP (One-Time Password) code when:\n\n' +
        '▸ You log in from an **unknown device** (Rule R6)\n' +
        '▸ A **medium or high risk transaction** is detected\n' +
        '▸ Your current location **does not match** the last registered one\n\n' +
        'The code is sent via SMS or email and is valid for 5 minutes. ' +
        'This adds a second verification layer that protects your account even if your credentials are compromised.';
    } else {
      return '🔐 **Autenticación de Dos Factores (OTP)**\n\n' +
        'El sistema solicita un código OTP (One-Time Password) cuando:\n\n' +
        'El usuario introduce credenciales pero el dispositivo es desconocido o tiene activo el 2FA.\n\n' +
        '▸ Inicias sesión desde un **dispositivo desconocido** (Regla R6)\n' +
        '▸ Se detecta una **transacción de riesgo medio o alto**\n' +
        '▸ Tu ubicación actual **no coincide** con la última registrada\n\n' +
        'El código se envía por SMS o correo electrónico y es válido por 5 minutos.';
    }
  }

  function handleDeviceInfo(msg) {
    const lang = localStorage.getItem('userLanguage') || 'es';

    if (lang === 'en') {
      return '📱 **Device Management**\n\n' +
        '▸ **Registered device** (Rule R5): Decreases risk level. The system trusts accesses from known equipment.\n\n' +
        '▸ **Unknown device** (Rule R6): Increases risk level to Medium and requests additional authentication (OTP).\n\n' +
        'The system identifies devices using browser fingerprinting (user-agent, resolution, timezone). ' +
        'This allows automatic detection of suspicious access.';
    } else {
      return '📱 **Gestión de Dispositivos**\n\n' +
        '▸ **Dispositivo registrado** (Regla R5): Reduce el nivel de riesgo. El sistema confía más en accesos desde equipos conocidos.\n\n' +
        '▸ **Dispositivo desconocido** (Regla R6): Aumenta el nivel de riesgo a Medio y solicita autenticación adicional (OTP).\n\n' +
        'El sistema identifica dispositivos mediante huella digital del navegador (user-agent, resolución, zona horaria).';
    }
  }

  function handleBlockInfo(msg) {
    const lang = localStorage.getItem('userLanguage') || 'es';

    if (lang === 'en') {
      return '🔒 **Account Lockout**\n\n' +
        'The system has two levels of lockout:\n\n' +
        '🟡 **Temporary lockout** (Rule R3): After **3 failed attempts** in a row, the account locks for **15 minutes** to prevent brute-force attacks.\n\n' +
        '🔴 **Total lockout** (Rule R4): After **5 failed attempts**, the account locks **permanently** until an admin unlocks it.\n\n' +
        '💡 If your account was locked, please contact the system administrator.';
    } else {
      return '🔒 **Bloqueo de Cuenta**\n\n' +
        'El sistema tiene dos niveles de bloqueo:\n\n' +
        '🟡 **Bloqueo temporal** (Regla R3): Tras **3 intentos fallidos** consecutivos, la cuenta se bloquea por **15 minutos**.\n\n' +
        '🔴 **Bloqueo total** (Regla R4): Tras **5 intentos fallidos**, la cuenta se bloquea **permanentemente** hasta que un administrador la rehabilite.';
    }
  }

  function handleFraudInfo(msg) {
    const lang = localStorage.getItem('userLanguage') || 'es';

    if (lang === 'en') {
      return '🕵️ **Anti-Fraud System**\n\n' +
        'The inference engine evaluates multiple factors to detect fraud:\n\n' +
        '▸ **Unusual amount**: Transactions over $3,000 (+35 risk points)\n' +
        '▸ **Impossible travel**: Current location different from last purchase (+35 points)\n' +
        '▸ **Suspicious hour**: Transactions between 11 PM and 5 AM (+20 points)\n' +
        '▸ **No facial verification**: Identity not confirmed (+20 points)\n\n' +
        'Score ≥ 70 → 🔴 High Risk | Score ≥ 40 → 🟡 Medium Risk | Score < 40 → 🟢 Low Risk\n\n' +
        'Ask me "What happens if I have 5 failed attempts?" to simulate a scenario.';
    } else {
      return '🕵️ **Sistema Antifraude**\n\n' +
        'El motor de inferencia evalúa múltiples factores para detectar fraudes:\n\n' +
        '▸ **Monto inusual**: Transacciones superiores a $3,000 (+35 puntos de riesgo)\n' +
        '▸ **Viaje imposible**: Ubicación actual diferente a la última compra (+35 puntos)\n' +
        '▸ **Horario sospechoso**: Transacciones entre 11 PM y 5 AM (+20 puntos)\n' +
        '▸ **Sin verificación facial**: No se confirmó la identidad (+20 puntos)\n\n' +
        'Score ≥ 70 → 🔴 Riesgo Alto | Score ≥ 40 → 🟡 Riesgo Medio | Score < 40 → 🟢 Riesgo Bajo';
    }
  }

  function handleSystemStatus(msg) {
    const reglas = window.BASE_CONOCIMIENTO || [];
    const userName = sessionStorage.getItem('userName') || 'usuario';
    const lang = localStorage.getItem('userLanguage') || 'es';

    if (lang === 'en') {
      return '⚙️ **Expert System Status**\n\n' +
        `▸ Inference engine: ✅ Active\n` +
        `▸ Knowledge base: ${reglas.length} rules loaded\n` +
        `▸ Authenticated user: ${userName}\n` +
        `▸ Session: 🔒 Protected with JWT\n` +
        `▸ AI Chatbot: 🤖 Online\n\n` +
        'The expert system uses **forward chaining** to evaluate rules. ' +
        'Each rule has a condition that, when met, fires an action and generates an auditable explanation.';
    } else {
      return '⚙️ **Estado del Sistema Experto**\n\n' +
        `▸ Motor de inferencia: ✅ Activo\n` +
        `▸ Base de conocimiento: ${reglas.length} reglas cargadas\n` +
        `▸ Usuario autenticado: ${userName}\n` +
        `▸ Sesión: 🔒 Protegida con JWT\n` +
        `▸ Chatbot IA: 🤖 En línea\n\n` +
        'El sistema experto usa **encadenamiento hacia adelante** (forward chaining) para evaluar reglas.';
    }
  }

  function handleHelp(msg) {
    const lang = localStorage.getItem('userLanguage') || 'es';

    if (lang === 'en') {
      return '🤖 **I am the BankSecure AI Assistant.** I can help you with:\n\n' +
        '📋 **Rules** — "Explain rule R3" or "List all rules"\n' +
        '🔬 **Scenarios** — "What happens if I have 4 failed attempts?"\n' +
        '📊 **Risk** — "What is the current risk level?"\n' +
        '🛡️ **Security** — "Give me security tips"\n' +
        '🔐 **OTP** — "What is two-factor authentication?"\n' +
        '📱 **Devices** — "How does device registration work?"\n' +
        '🔒 **Lockouts** — "When is the account locked?"\n' +
        '🕵️ **Fraud** — "How does the system detect fraud?"\n' +
        '⚙️ **System** — "How does the expert system work?"\n\n' +
        'Ask me anything you need! 💬';
    } else {
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
  }

  function handleGoodbye(msg) {
    const lang = localStorage.getItem('userLanguage') || 'es';

    if (lang === 'en') {
      const responses = [
        'Goodbye! 👋 I will be here when you need me.',
        'Thanks for using the assistant! If you have more questions, feel free to write. 🤖',
        'See you! Remember to keep your credentials secure. 🔒'
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    } else {
      const responses = [
        '¡Hasta luego! 👋 Estaré aquí cuando me necesites.',
        '¡Gracias por usar el asistente! Si tienes más dudas, no dudes en escribirme. 🤖',
        '¡Nos vemos! Recuerda mantener tus credenciales seguras. 🔒'
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  function handleUnknown(msg) {
    const lang = localStorage.getItem('userLanguage') || 'es';

    if (lang === 'en') {
      const responses = [
        'I am not sure I understand your question. Can you rephrase it? Type "help" to see what I can do.',
        'Hmm, I don\'t recognize that query. Try asking me about rules, risk, security, or the expert system. 🤔',
        'I don\'t have information about that. Try: "List the rules" or "What happens if I have 3 failed attempts?"'
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    } else {
      const responses = [
        'No estoy seguro de entender tu pregunta. ¿Puedes reformularla? Escribe "ayuda" para ver qué puedo hacer.',
        'Hmm, no reconozco esa consulta. Intenta preguntarme sobre reglas, riesgo, seguridad o el sistema experto. 🤔',
        'No tengo información sobre eso. Prueba con: "Lista las reglas" o "¿Qué pasa si tengo 3 intentos fallidos?"'
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
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

    chatMessages.scrollTop = chatMessages.scrollHeight;

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

    showTypingIndicator();

    const { intent, handler } = detectIntent(message);
    const response = handler(message);
    const delay = Math.min(300 + response.length * 2, 1200);

    await new Promise((r) => setTimeout(r, delay));

    hideTypingIndicator();
    addMessage(response, 'bot');

    // Registrar consulta en el historial del sistema
    if (window.registrarChat && typeof window.registrarChat === 'function') {
      const resultado = intent === 'unknown' ? 'desconocido' : 'respondido';
      window.registrarChat(message, response, intent, resultado);
    }
  }

  function toggleChat() {
    chatOpen = !chatOpen;
    chatPanel.classList.toggle('open', chatOpen);
    if (chatFab) chatFab.classList.toggle('hidden', chatOpen);

    if (chatOpen) {
      chatInput.focus();
      if (conversationHistory.length === 0) {
        setTimeout(() => {
          showTypingIndicator();
          setTimeout(() => {
            hideTypingIndicator();
            const userName = sessionStorage.getItem('userName') || 'usuario';
            const lang = localStorage.getItem('userLanguage') || 'es';

            if (lang === 'en') {
              addMessage(
                `Hello, ${userName}! 👋 I am the **AI Assistant** of the BankSecure Expert System.\n\n` +
                `I can explain the security rules, evaluate risk scenarios, or answer your questions about the anti-fraud system.\n\n` +
                `Type **"help"** to see everything I can do. 🤖`,
                'bot'
              );
            } else {
              addMessage(
                `¡Hola, ${userName}! 👋 Soy el **Asistente IA** del Sistema Experto BankSecure.\n\n` +
                `Puedo explicarte las reglas de seguridad, evaluar escenarios de riesgo, o responder tus dudas sobre el sistema antifraude.\n\n` +
                `Escribe **"ayuda"** para ver todo lo que puedo hacer. 🤖`,
                'bot'
              );
            }
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.toggleChatbot = function () {
    if (!chatOpen) toggleChat();
    else chatInput?.focus();
  };
})();
