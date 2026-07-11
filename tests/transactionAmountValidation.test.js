const assert = require('assert');
const { validateTransactionAmount } = require('../cardUtils.js');

assert.deepStrictEqual(validateTransactionAmount(''), {
  valid: false,
  message: 'Debe ingresar un monto para realizar la transacción.',
  amount: null
});

assert.deepStrictEqual(validateTransactionAmount('  '), {
  valid: false,
  message: 'Debe ingresar un monto para realizar la transacción.',
  amount: null
});

assert.deepStrictEqual(validateTransactionAmount('150.50'), {
  valid: true,
  message: '',
  amount: 150.5
});

console.log('transactionAmountValidation tests passed');
