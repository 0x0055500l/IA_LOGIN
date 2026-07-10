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
  },
  {
    id: 2,
    email: 'admin@sistema.hn',
    password: 'Admin2024!',
    name: 'Administrador',
    role: 'admin',
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
  res.json({
    valid: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
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
