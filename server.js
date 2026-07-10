const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { buildFaceSignature, calculateFaceSimilarity } = require('./faceMatcher');

const app = express();
const port = process.env.PORT || 3000;

// ─── JWT Configuration ───
// Generate a random secret on each server start (in production, use env variable)
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');
const JWT_EXPIRATION = '1h'; // Token expires in 1 hour

// Token blacklist (for logout - in production, use Redis)
const tokenBlacklist = new Set();
const FACE_MATCH_THRESHOLD = 0.40; // Umbral de similitud facial (0-1). 0.40 = tolerante a variaciones de luz/posición
const REGISTERED_FACE_SIGNATURES = new Map();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static(__dirname));

// ─── Simulated user database (academic project) ───
const USERS = [
  {
    id: 1,
    email: 'test@test.com',
    password: 'Test1234!',
    name: 'Usuario Demo',
    role: 'user',
    preferences: {
      language: 'es',
      theme: 'dark',
      twoFactor: false,
      strictMode: false,
    },
  },
  {
    id: 2,
    email: 'admin@sistema.hn',
    password: 'Admin2024!',
    name: 'Administrador',
    role: 'admin',
    preferences: {
      language: 'es',
      theme: 'dark',
      twoFactor: false,
      strictMode: false,
    },
  },
];

// ─── Historia del Sistema (in-memory — equivale a SQL: system_logs + chat_logs) ───
//
// SQL equivalente (para producción con SQLite/PostgreSQL):
//
// CREATE TABLE system_logs (
//   id       INTEGER PRIMARY KEY AUTOINCREMENT,
//   usuario  TEXT NOT NULL,
//   accion   TEXT NOT NULL,   -- 'login','logout','perfil','preferencias','password','fraude'
//   fecha    TEXT NOT NULL,   -- ISO 8601
//   resultado TEXT NOT NULL,  -- 'exito' | 'error' | 'advertencia'
//   detalles TEXT             -- JSON string con metadata extra (nunca contraseñas)
// );
//
// CREATE TABLE chat_logs (
//   id        INTEGER PRIMARY KEY AUTOINCREMENT,
//   usuario   TEXT NOT NULL,
//   consulta  TEXT NOT NULL,
//   respuesta TEXT NOT NULL,
//   modulo    TEXT NOT NULL,  -- intent del chatbot: 'greet','explain_rule','fraud_info'...
//   fecha     TEXT NOT NULL,
//   resultado TEXT NOT NULL   -- 'respondido' | 'desconocido'
// );
//
// Relación de trazabilidad:
//   SELECT * FROM system_logs s
//   JOIN chat_logs c ON s.usuario = c.usuario
//   WHERE s.usuario = 'demo@email.com'
//   ORDER BY s.fecha DESC;

let logIdCounter  = 1;
let chatIdCounter = 1;

const SYSTEM_LOGS = []; // Array<{ id, usuario, accion, fecha, resultado, detalles }>
const CHAT_LOGS   = []; // Array<{ id, usuario, consulta, respuesta, modulo, fecha, resultado }>
const MAX_LOGS    = 500; // Límite de registros en memoria

/** Inserta un registro de acción del sistema */
function crearLog(usuario, accion, resultado, detalles = {}) {
  // Sanitizar: nunca guardar campos sensibles
  const safe = { ...detalles };
  delete safe.password;
  delete safe.currentPassword;
  delete safe.newPassword;
  delete safe.token;

  const entry = {
    id: logIdCounter++,
    usuario: String(usuario || 'sistema'),
    accion:  String(accion),
    fecha:   new Date().toISOString(),
    resultado: String(resultado), // 'exito' | 'error' | 'advertencia'
    detalles: JSON.stringify(safe),
  };

  SYSTEM_LOGS.unshift(entry); // más reciente primero
  if (SYSTEM_LOGS.length > MAX_LOGS) SYSTEM_LOGS.pop(); // purgar si excede límite
  return entry;
}

/** Inserta un registro de interacción del chatbot */
function crearChatLog(usuario, consulta, respuesta, modulo, resultado = 'respondido') {
  const entry = {
    id: chatIdCounter++,
    usuario: String(usuario || 'sistema'),
    consulta: String(consulta).substring(0, 500),
    respuesta: String(respuesta).substring(0, 2000),
    modulo: String(modulo),
    fecha: new Date().toISOString(),
    resultado: String(resultado),
  };

  CHAT_LOGS.unshift(entry);
  if (CHAT_LOGS.length > MAX_LOGS) CHAT_LOGS.pop();
  return entry;
}

// ─── Server-side Rate Limiting by IP ───
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 60 * 1000;

function getRateLimitInfo(ip) {
  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, { count: 0, lockoutEnd: 0 });
  }
  return loginAttempts.get(ip);
}

function isRateLimited(ip) {
  const info = getRateLimitInfo(ip);
  if (info.lockoutEnd > Date.now()) {
    return {
      locked: true,
      remaining: Math.ceil((info.lockoutEnd - Date.now()) / 1000),
    };
  }
  if (info.lockoutEnd > 0 && info.lockoutEnd <= Date.now()) {
    info.count = 0;
    info.lockoutEnd = 0;
  }
  return { locked: false };
}

function recordFailedAttempt(ip) {
  const info = getRateLimitInfo(ip);
  info.count++;
  if (info.count >= MAX_ATTEMPTS) {
    info.lockoutEnd = Date.now() + LOCKOUT_DURATION;
  }
}

function resetAttempts(ip) {
  loginAttempts.delete(ip);
}

// ─── JWT Authentication Middleware ───
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      valid: false,
      message: 'Token de autenticación requerido.',
    });
  }

  // Check blacklist
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({
      valid: false,
      message: 'Sesión cerrada. Inicia sesión de nuevo.',
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      const message = err.name === 'TokenExpiredError'
        ? 'Tu sesión ha expirado. Inicia sesión de nuevo.'
        : 'Token inválido.';
      return res.status(403).json({ valid: false, message });
    }
    req.user = decoded;
    req.token = token;
    next();
  });
}

// ─── Routes ───

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Login — returns JWT on success
app.post('/api/login', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const { email, password } = req.body;

  const rateLimit = isRateLimited(ip);
  if (rateLimit.locked) {
    return res.status(429).json({
      success: false,
      locked: true,
      message: `Demasiados intentos. Intenta de nuevo en ${rateLimit.remaining}s.`,
    });
  }

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Correo y contraseña son requeridos.',
    });
  }

  const user = USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    resetAttempts(ip);

    // Generate JWT token
    const tokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
      issuer: 'banksecure-expert-system',
    });

    return res.json({
      success: true,
      message: 'Autenticación exitosa.',
      token,
      user: { email: user.email, name: user.name, role: user.role },
    });
  }

  // Failed login
  recordFailedAttempt(ip);
  const info = getRateLimitInfo(ip);
  const attemptsLeft = MAX_ATTEMPTS - info.count;

  if (info.lockoutEnd > Date.now()) {
    return res.status(429).json({
      success: false,
      locked: true,
      message: `Cuenta bloqueada por demasiados intentos. Espera ${Math.ceil(LOCKOUT_DURATION / 1000)}s.`,
    });
  }

  return res.status(401).json({
    success: false,
    locked: false,
    message: `Credenciales incorrectas. ${attemptsLeft} intento${attemptsLeft !== 1 ? 's' : ''} restante${attemptsLeft !== 1 ? 's' : ''}.`,
  });
});

// Session validation — protected route
app.get('/api/session', authenticateToken, (req, res) => {
  const user = USERS.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ valid: false, message: 'Usuario no encontrado.' });
  }
  res.json({
    valid: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      preferences: user.preferences || {
        language: 'es',
        theme: 'dark',
        twoFactor: false,
        strictMode: false,
      },
    },
    expiresAt: new Date(req.user.exp * 1000).toISOString(),
  });
});

// Logout — blacklist the token
app.post('/api/logout', authenticateToken, (req, res) => {
  tokenBlacklist.add(req.token);

  // Auto-clean expired tokens from blacklist every 100 logouts
  if (tokenBlacklist.size % 100 === 0) {
    for (const t of tokenBlacklist) {
      try {
        jwt.verify(t, JWT_SECRET);
      } catch {
        tokenBlacklist.delete(t); // already expired, remove
      }
    }
  }

  res.json({ success: true, message: 'Sesión cerrada exitosamente.' });
});

// ─── User Profile & Settings Endpoints ───

// Update profile: Name and Email
app.put('/api/user/profile', authenticateToken, (req, res) => {
  const { name, email } = req.body;
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'El nombre es requerido.' });
  }
  if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Formato de correo electrónico inválido.' });
  }

  const user = USERS.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
  }

  // Check if email is already taken
  const emailExists = USERS.some((u) => u.id !== user.id && u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return res.status(400).json({ success: false, message: 'El correo electrónico ya está en uso.' });
  }

  user.name = name.trim();
  user.email = email.toLowerCase().trim();

  // Create a new JWT token with updated user information
  const tokenPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
    issuer: 'banksecure-expert-system',
  });

  res.json({
    success: true,
    message: 'Perfil actualizado con éxito.',
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
});

// ─── /api/updateProfile alias (maps to /api/user/profile) ───
// Endpoint requerido: recibe name + email, valida, actualiza y devuelve JSON estándar
app.post('/api/updateProfile', authenticateToken, (req, res) => {
  const { name, email } = req.body;

  // Validación del nombre
  if (!name || String(name).trim().length === 0) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: 'El nombre es requerido.',
    });
  }

  // Validación del formato de correo electrónico
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: 'Formato de correo electrónico inválido.',
    });
  }

  const user = USERS.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: 'Usuario no encontrado.',
    });
  }

  // Verificar si el correo ya está en uso por otro usuario
  const emailTaken = USERS.some(
    (u) => u.id !== user.id && u.email.toLowerCase() === email.toLowerCase()
  );
  if (emailTaken) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: 'El correo electrónico ya está en uso por otra cuenta.',
    });
  }

  // Actualizar datos del usuario en la "base de datos"
  user.name = String(name).trim();
  user.email = email.toLowerCase().trim();

  // Emitir nuevo JWT con información actualizada
  const tokenPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const newToken = jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
    issuer: 'banksecure-expert-system',
  });

  return res.status(200).json({
    status: 200,
    success: true,
    message: 'Perfil actualizado correctamente.',
    token: newToken,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
});

// Update preferences: Language, Theme, 2FA, Strict Mode
app.put('/api/user/preferences', authenticateToken, (req, res) => {
  const { language, theme, twoFactor, strictMode } = req.body;

  if (language && !['es', 'en'].includes(language)) {
    return res.status(400).json({ success: false, message: 'Idioma no disponible.' });
  }
  if (theme && !['dark', 'light'].includes(theme)) {
    return res.status(400).json({ success: false, message: 'Tema visual no disponible.' });
  }

  const user = USERS.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
  }

  user.preferences = {
    language: language || user.preferences.language,
    theme: theme || user.preferences.theme,
    twoFactor: twoFactor !== undefined ? Boolean(twoFactor) : user.preferences.twoFactor,
    strictMode: strictMode !== undefined ? Boolean(strictMode) : user.preferences.strictMode,
  };

  res.json({
    success: true,
    message: 'Preferencias actualizadas con éxito.',
    preferences: user.preferences,
  });
});

// Update security: Change Password
app.put('/api/user/password', authenticateToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'La contraseña actual y la nueva son requeridas.' });
  }

  const user = USERS.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
  }

  if (user.password !== currentPassword) {
    return res.status(400).json({ success: false, message: 'La contraseña actual es incorrecta.' });
  }

  // Password validation: min 8 length, upper, lower, number, special char
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passRegex.test(newPassword)) {
    return res.status(400).json({
      success: false,
      message: 'La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.',
    });
  }

  user.password = newPassword;
  res.json({ success: true, message: 'Contraseña actualizada con éxito.' });
});

// Chatbot endpoint — processes messages using expert system rules
app.post('/api/chat', authenticateToken, (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ reply: 'Mensaje vacío.' });
  }

  // The chatbot logic runs client-side using the expert system,
  // but this endpoint validates the session is active
  res.json({ authenticated: true, user: req.user.name });
});

// Fraud check — now protected
app.post('/api/fraud-check', authenticateToken, (req, res) => {
  const { amount, hour, location, lastLocation, faceVerified, faceImage } = req.body;

  const parsedAmount = Number(amount || 0);
  const parsedHour = Number(String(hour || '00:00').split(':')[0]);
  const isSuspiciousHour = parsedHour >= 23 || parsedHour <= 5;
  const isUnusualAmount = parsedAmount > 3000;
  const isImpossibleTravel = location && lastLocation && location !== lastLocation;

  const userEmail = req.user?.email || 'unknown';
  const capturedFaceSignature = faceImage ? buildFaceSignature(faceImage) : null;
  const existingFaceSignature = userEmail ? REGISTERED_FACE_SIGNATURES.get(userEmail) : null;
  let faceSimilarity = 0;
  let faceMatch = Boolean(faceVerified);

  if (capturedFaceSignature) {
    if (!existingFaceSignature) {
      REGISTERED_FACE_SIGNATURES.set(userEmail, capturedFaceSignature);
      faceSimilarity = 1;
      faceMatch = true;
    } else {
      faceSimilarity = calculateFaceSimilarity(capturedFaceSignature, existingFaceSignature);
      faceMatch = faceSimilarity >= FACE_MATCH_THRESHOLD || Boolean(faceVerified);
    }
  }

  let score = 0;
  let reasons = [];

  if (isUnusualAmount) {
    score += 35;
    reasons.push('Monto inusual para el perfil.');
  }
  if (isImpossibleTravel) {
    score += 35;
    reasons.push('Geolocalización incompatible con la última compra.');
  }
  if (isSuspiciousHour) {
    score += 20;
    reasons.push('Horario sospechoso para una transacción.');
  }
  if (!faceMatch) {
    score += 20;
    reasons.push('No se confirmó la verificación facial.');
  }

  if (score >= 70) {
    return res.json({ score: 85, level: 'alto', decision: 'Verificación facial obligatoria antes de aprobar.', reasons, legitimateUser: true, faceMatch, faceSimilarity });
  }
  if (score >= 40) {
    return res.json({ score: 55, level: 'medio', decision: 'Verificación facial obligatoria antes de aprobar.', reasons, legitimateUser: true, faceMatch, faceSimilarity });
  }
  res.json({ score: 12, level: 'bajo', decision: 'Transacción aprobada.', reasons: ['El patrón de riesgo se considera aceptable.'], legitimateUser: true, faceMatch, faceSimilarity });
});

// ═══════════════════════════════════════════════════════════════════════════
// ─── Módulo Historial — Endpoints ───────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

/**
 * POST /api/logs/action
 * Registra una acción del usuario en SYSTEM_LOGS.
 * Body: { accion, resultado, detalles? }
 */
app.post('/api/logs/action', authenticateToken, (req, res) => {
  const { accion, resultado, detalles } = req.body;

  if (!accion || !resultado) {
    return res.status(400).json({ success: false, message: 'accion y resultado son requeridos.' });
  }

  const validos = ['exito', 'error', 'advertencia'];
  if (!validos.includes(resultado)) {
    return res.status(400).json({ success: false, message: `resultado debe ser: ${validos.join(', ')}.` });
  }

  const log = crearLog(req.user.email, accion, resultado, detalles || {});
  res.status(201).json({ success: true, log });
});

/**
 * POST /api/logs/chat
 * Registra una interacción con el Asistente IA en CHAT_LOGS.
 * Body: { consulta, respuesta, modulo, resultado? }
 */
app.post('/api/logs/chat', authenticateToken, (req, res) => {
  const { consulta, respuesta, modulo, resultado } = req.body;

  if (!consulta || !respuesta || !modulo) {
    return res.status(400).json({ success: false, message: 'consulta, respuesta y modulo son requeridos.' });
  }

  const log = crearChatLog(
    req.user.email,
    consulta,
    respuesta,
    modulo,
    resultado || 'respondido'
  );
  res.status(201).json({ success: true, log });
});

/**
 * GET /api/logs
 * Devuelve historial combinado con filtros opcionales.
 * Query params: tipo (sistema|chat|all), usuario, fecha (YYYY-MM-DD), resultado, q (texto libre)
 */
app.get('/api/logs', authenticateToken, (req, res) => {
  const { tipo = 'all', usuario, fecha, resultado, q } = req.query;
  const isAdmin = req.user.role === 'admin';

  // Filtro de usuario: non-admins solo ven sus propios logs
  const filterUser = isAdmin && usuario ? usuario : req.user.email;

  // Filtrar SYSTEM_LOGS
  let sysLogs = SYSTEM_LOGS.filter(l => {
    if (!isAdmin && l.usuario !== req.user.email) return false;
    if (isAdmin && usuario && l.usuario !== usuario) return false;
    if (fecha && !l.fecha.startsWith(fecha)) return false;
    if (resultado && l.resultado !== resultado) return false;
    if (q && !l.accion.toLowerCase().includes(q.toLowerCase()) &&
        !l.detalles.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }).map(l => ({ ...l, tipo: 'sistema' }));

  // Filtrar CHAT_LOGS
  let chatLogs = CHAT_LOGS.filter(l => {
    if (!isAdmin && l.usuario !== req.user.email) return false;
    if (isAdmin && usuario && l.usuario !== usuario) return false;
    if (fecha && !l.fecha.startsWith(fecha)) return false;
    if (resultado && l.resultado !== resultado) return false;
    if (q && !l.consulta.toLowerCase().includes(q.toLowerCase()) &&
        !l.respuesta.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }).map(l => ({ ...l, tipo: 'chat' }));

  // Combinar según tipo solicitado
  let combinados;
  if (tipo === 'sistema') {
    combinados = sysLogs;
  } else if (tipo === 'chat') {
    combinados = chatLogs;
  } else {
    combinados = [...sysLogs, ...chatLogs].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
  }

  res.json({
    success: true,
    total: combinados.length,
    logs: combinados.slice(0, 200), // máximo 200 registros por petición
    meta: {
      totalSistema: sysLogs.length,
      totalChat: chatLogs.length,
      isAdmin,
    },
  });
});

/**
 * DELETE /api/logs
 * Elimina registros según filtros. Requiere body con al menos un criterio.
 * Body: { tipo?, usuario?, fecha?, resultado?, ids? }
 * Non-admins solo pueden eliminar sus propios logs.
 */
app.delete('/api/logs', authenticateToken, (req, res) => {
  const { tipo, usuario, fecha, resultado, ids } = req.body || {};
  const isAdmin = req.user.role === 'admin';

  // Al menos un filtro requerido para evitar borrado masivo accidental por este endpoint
  if (!tipo && !usuario && !fecha && !resultado && !ids) {
    return res.status(400).json({
      success: false,
      message: 'Se requiere al menos un filtro (tipo, usuario, fecha, resultado o ids).',
    });
  }

  let deletedSys  = 0;
  let deletedChat = 0;

  const matchesFilters = (log, typeLabel) => {
    if (!isAdmin && log.usuario !== req.user.email) return false;
    if (isAdmin && usuario && log.usuario !== usuario) return false;
    if (tipo && tipo !== 'all' && tipo !== typeLabel) return false;
    if (fecha && !log.fecha.startsWith(fecha)) return false;
    if (resultado && log.resultado !== resultado) return false;
    if (ids && Array.isArray(ids) && !ids.includes(log.id)) return false;
    return true;
  };

  if (!tipo || tipo === 'sistema' || tipo === 'all') {
    const before = SYSTEM_LOGS.length;
    const toRemove = SYSTEM_LOGS.filter(l => matchesFilters(l, 'sistema'));
    toRemove.forEach(l => { const i = SYSTEM_LOGS.indexOf(l); if (i > -1) SYSTEM_LOGS.splice(i, 1); });
    deletedSys = before - SYSTEM_LOGS.length;
  }

  if (!tipo || tipo === 'chat' || tipo === 'all') {
    const before = CHAT_LOGS.length;
    const toRemove = CHAT_LOGS.filter(l => matchesFilters(l, 'chat'));
    toRemove.forEach(l => { const i = CHAT_LOGS.indexOf(l); if (i > -1) CHAT_LOGS.splice(i, 1); });
    deletedChat = before - CHAT_LOGS.length;
  }

  crearLog(req.user.email, 'eliminar_historial', 'exito', {
    filtros: { tipo, usuario, fecha, resultado, idsCount: ids?.length },
    eliminados: { sistema: deletedSys, chat: deletedChat },
  });

  res.json({
    success: true,
    message: `Se eliminaron ${deletedSys + deletedChat} registros.`,
    eliminados: { sistema: deletedSys, chat: deletedChat },
  });
});

/**
 * DELETE /api/logs/all
 * Elimina TODO el historial. Solo admins pueden borrar de otros usuarios.
 * Non-admins solo borran su propio historial.
 * Body: { confirmCode } — debe ser exactamente "CONFIRMAR"
 */
app.delete('/api/logs/all', authenticateToken, (req, res) => {
  const { confirmCode } = req.body || {};

  if (confirmCode !== 'CONFIRMAR') {
    return res.status(400).json({
      success: false,
      message: 'Se requiere confirmCode = "CONFIRMAR" para borrar todo el historial.',
    });
  }

  const isAdmin = req.user.role === 'admin';
  let delSys = 0, delChat = 0;

  if (isAdmin) {
    // Admin borra absolutamente todo
    delSys  = SYSTEM_LOGS.length;
    delChat = CHAT_LOGS.length;
    SYSTEM_LOGS.length = 0;
    CHAT_LOGS.length   = 0;
    logIdCounter  = 1;
    chatIdCounter = 1;
  } else {
    // Non-admin solo borra sus propios registros
    const userEmail = req.user.email;
    const sysBefore = SYSTEM_LOGS.length;
    const chatBefore = CHAT_LOGS.length;

    const removeFrom = (arr, email) => {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].usuario === email) arr.splice(i, 1);
      }
    };
    removeFrom(SYSTEM_LOGS, userEmail);
    removeFrom(CHAT_LOGS,   userEmail);

    delSys  = sysBefore  - SYSTEM_LOGS.length;
    delChat = chatBefore - CHAT_LOGS.length;
  }

  crearLog(req.user.email, 'eliminar_historial_total', 'advertencia', {
    esAdmin: isAdmin,
    eliminados: { sistema: delSys, chat: delChat },
  });

  res.json({
    success: true,
    message: `Historial eliminado. ${delSys + delChat} registros borrados.`,
    eliminados: { sistema: delSys, chat: delChat },
  });
});

// ─── Health ───
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Servidor listo en http://localhost:${port}`);
  console.log(`JWT Secret generado (${JWT_SECRET.substring(0, 8)}...)`);
});
