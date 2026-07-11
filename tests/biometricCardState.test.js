const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeCardStatus, isCardTransactionAllowed } = require('../cardUtils.js');

test('las tarjetas pendientes bloquean transacciones hasta la validación biométrica', () => {
  assert.equal(normalizeCardStatus('Pendiente'), 'Pendiente');
  assert.equal(isCardTransactionAllowed('Pendiente', false), false);
  assert.equal(isCardTransactionAllowed('Pendiente', true), false);
});

test('las tarjetas completadas permiten transacciones tras validación biométrica exitosa', () => {
  assert.equal(normalizeCardStatus('Completada'), 'Completada');
  assert.equal(isCardTransactionAllowed('Completada', true), true);
  assert.equal(isCardTransactionAllowed('Completada', false), false);
});
