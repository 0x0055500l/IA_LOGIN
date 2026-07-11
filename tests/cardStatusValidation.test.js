const assert = require('assert');
const { isCardActiveStatus, isCardBlockedStatus } = require('../cardUtils.js');

assert.strictEqual(isCardActiveStatus('Activa'), true);
assert.strictEqual(isCardActiveStatus('Completada'), true);
assert.strictEqual(isCardActiveStatus('Pendiente'), false);
assert.strictEqual(isCardActiveStatus('Bloqueada'), false);
assert.strictEqual(isCardBlockedStatus('Activa'), false);
assert.strictEqual(isCardBlockedStatus('Completada'), false);
assert.strictEqual(isCardBlockedStatus('Pendiente'), true);
assert.strictEqual(isCardBlockedStatus('Bloqueada'), true);

console.log('cardStatusValidation tests passed');
