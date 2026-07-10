const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;

// ─── JWT Configuration ───
// Generate a random secret on each server start (in production, use env variable)
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');
const JWT_EXPIRATION = '1h'; // Token expires in 1 hour

// Token blacklist (for logout - in production, use Redis)
const tokenBlacklist = new Set();

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
  const { amount, hour, location, lastLocation, faceVerified } = req.body;

  const parsedAmount = Number(amount || 0);
  const parsedHour = Number(String(hour || '00:00').split(':')[0]);
  const isSuspiciousHour = parsedHour >= 23 || parsedHour <= 5;
  const isUnusualAmount = parsedAmount > 3000;
  const isImpossibleTravel = location && lastLocation && location !== lastLocation;

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
  if (!faceVerified) {
    score += 20;
    reasons.push('No se confirmó la verificación facial.');
  }

  if (score >= 70) {
    return res.json({ score: 85, level: 'alto', decision: 'Verificación facial obligatoria antes de aprobar.', reasons, legitimateUser: true, faceMatch: faceVerified === true });
  }
  if (score >= 40) {
    return res.json({ score: 55, level: 'medio', decision: 'Verificación facial obligatoria antes de aprobar.', reasons, legitimateUser: true, faceMatch: faceVerified === true });
  }
  res.json({ score: 12, level: 'bajo', decision: 'Transacción aprobada.', reasons: ['El patrón de riesgo se considera aceptable.'], legitimateUser: true, faceMatch: faceVerified === true });
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Servidor listo en http://localhost:${port}`);
  console.log(`JWT Secret generado (${JWT_SECRET.substring(0, 8)}...)`);
});
