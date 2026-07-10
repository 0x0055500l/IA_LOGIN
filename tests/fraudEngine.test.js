const test = require('node:test');
const assert = require('node:assert/strict');
const { evaluateTransactionRules } = require('../fraudEngine');

test('detecta transacciones sospechosas con reglas de fraude', () => {
  const result = evaluateTransactionRules({
    amount: 5000,
    country: 'US',
    usualCountry: 'HN',
    device: 'unknown-device',
    repeatedTransfers: 4,
    historyAvg: 100,
    newAccount: true,
    suspiciousDestination: true,
    timeWindowMinutes: 2,
    ipChanged: true,
    previousLocations: ['Honduras']
  });

  assert.equal(result.riskLevel, 'Alto');
  assert.equal(result.isSuspicious, true);
  assert.ok(result.rulesActivated.length >= 3);
  assert.match(result.explanation, /Riesgo alto/i);
});
