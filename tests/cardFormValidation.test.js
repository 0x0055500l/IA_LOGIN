const assert = require('assert');
const { getMissingCardFields, isCardFormComplete } = require('../cardUtils.js');

assert.deepStrictEqual(getMissingCardFields({ number: '4111 1111 1111 1111', expiry: '12/30', cvv: '123', status: 'Activa' }), []);
assert.deepStrictEqual(getMissingCardFields({ number: '', expiry: '12/30', cvv: '123', status: 'Activa' }), ['number']);
assert.deepStrictEqual(getMissingCardFields({ number: '4111 1111 1111 1111', expiry: '', cvv: '123', status: 'Activa' }), ['expiry']);
assert.deepStrictEqual(getMissingCardFields({ number: '4111 1111 1111 1111', expiry: '12/30', cvv: '', status: 'Activa' }), ['cvv']);
assert.deepStrictEqual(getMissingCardFields({ number: '4111 1111 1111 1111', expiry: '12/30', cvv: '123', status: '' }), ['status']);
assert.strictEqual(isCardFormComplete({ number: '4111 1111 1111 1111', expiry: '12/30', cvv: '123', status: 'Activa' }), true);
assert.strictEqual(isCardFormComplete({ number: '', expiry: '12/30', cvv: '123', status: 'Activa' }), false);

console.log('cardFormValidation tests passed');
