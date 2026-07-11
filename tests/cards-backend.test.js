const test = require('node:test');
const assert = require('node:assert/strict');
const { app } = require('../server');

let server;

function resetServerState() {
  const mod = require('../server');
  if (mod && mod.__resetTestState) {
    mod.__resetTestState();
  }
}
let baseUrl;
let token;

async function request(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { res, data };
}

test.before(async () => {
  resetServerState();
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;

  const login = await request('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'test@test.com', password: 'Test1234!' })
  });
  token = login.data.token;
});

test.after(async () => {
  await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
});

test('No permite guardar tarjetas con campos vacíos', async () => {
  const { res, data } = await request('/api/cards', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ number: '', expiry: '', cvv: '', status: 'Activa' })
  });

  assert.equal(res.status, 400);
  assert.equal(data.success, false);
});

test('Permite crear varias tarjetas y asignar saldo aleatorio inicial', async () => {
  const first = await request('/api/cards', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ number: '4111 1111 1111 1111', expiry: '12/30', cvv: '123', status: 'Activa' })
  });
  assert.equal(first.res.status, 201);
  assert.equal(first.data.success, true);
  assert.ok(first.data.card.availableAmount >= 20000 && first.data.card.availableAmount <= 10000000);
  assert.equal(first.data.card.selected, false);

  const second = await request('/api/cards', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ number: '5555 4444 3333 2222', expiry: '10/29', cvv: '456', status: 'Activa' })
  });
  assert.equal(second.res.status, 201);
  assert.equal(second.data.success, true);
  assert.equal(second.data.card.selected, false);

  const select = await request(`/api/cards/${first.data.card.id}/select`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  assert.equal(select.res.status, 200);
  assert.equal(select.data.success, true);
  assert.equal(select.data.card.id, first.data.card.id);
});

test('Reduce el saldo al realizar una transacción válida', async () => {
  const cards = await request('/api/cards', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });

  const selectedCard = cards.data.cards.find((card) => card.selected);
  assert.ok(selectedCard);

  const before = selectedCard.availableAmount;
  const tx = await request(`/api/cards/${selectedCard.id}/transactions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ amount: 5000, description: 'Compra test' })
  });

  assert.equal(tx.res.status, 201);
  assert.equal(tx.data.success, true);
  assert.equal(tx.data.card.availableAmount, before - 5000);
});
