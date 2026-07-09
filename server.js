const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static(__dirname));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

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
