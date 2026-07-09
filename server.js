const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static(__dirname));

// ─── Simulated user database (academic project) ───
// In production, use bcrypt + a real database + JWT tokens
const USERS = [
  {
    email: 'test@test.com',
    // In production: store bcrypt hash, never plaintext
    password: 'Test1234!',
    name: 'Usuario Demo',
  },
  {
    email: 'admin@sistema.hn',
    password: 'Admin2024!',
    name: 'Administrador',
  },
];

// ─── Server-side Rate Limiting by IP ───
const loginAttempts = new Map(); // IP -> { count, lockoutEnd }
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 60 * 1000; // 60 seconds

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
  // Reset if lockout has expired
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

// ─── Routes ───

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Login endpoint — server validates credentials
app.post('/api/login', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const { email, password } = req.body;

  // Check rate limit first
  const rateLimit = isRateLimited(ip);
  if (rateLimit.locked) {
    return res.status(429).json({
      success: false,
      locked: true,
      message: `Demasiados intentos. Intenta de nuevo en ${rateLimit.remaining}s.`,
    });
  }

  // Validate inputs exist
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Correo y contraseña son requeridos.',
    });
  }

  // Find user (in production: query DB + bcrypt.compare)
  const user = USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    resetAttempts(ip);
    return res.json({
      success: true,
      message: 'Autenticación exitosa.',
      user: { email: user.email, name: user.name },
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

// Fraud check endpoint (existing)
app.post('/api/fraud-check', (req, res) => {
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
    res.json({
      score: 85,
      level: 'alto',
      decision: 'Verificación facial obligatoria antes de aprobar.',
      reasons,
      legitimateUser: true,
      faceMatch: faceVerified === true,
    });
    return;
  }

  if (score >= 40) {
    res.json({
      score: 55,
      level: 'medio',
      decision: 'Verificación facial obligatoria antes de aprobar.',
      reasons,
      legitimateUser: true,
      faceMatch: faceVerified === true,
    });
    return;
  }

  res.json({
    score: 12,
    level: 'bajo',
    decision: 'Transacción aprobada.',
    reasons: ['El patrón de riesgo se considera aceptable.'],
    legitimateUser: true,
    faceMatch: faceVerified === true,
  });
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Servidor listo en http://localhost:${port}`);
});
