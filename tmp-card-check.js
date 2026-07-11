const { app } = require('./server');

(async () => {
  const server = app.listen(0, async () => {
    const port = server.address().port;
    const loginRes = await fetch(`http://127.0.0.1:${port}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@test.com', password: 'Test1234!' })
    });
    const login = await loginRes.json();
    const create1 = await fetch(`http://127.0.0.1:${port}/api/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${login.token}` },
      body: JSON.stringify({ number: '4111 1111 1111 1111', expiry: '12/30', cvv: '123', status: 'Activa' })
    });
    const card1 = await create1.json();
    const create2 = await fetch(`http://127.0.0.1:${port}/api/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${login.token}` },
      body: JSON.stringify({ number: '5555 4444 3333 2222', expiry: '10/29', cvv: '456', status: 'Activa' })
    });
    const card2 = await create2.json();
    const select = await fetch(`http://127.0.0.1:${port}/api/cards/${card1.card.id}/select`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${login.token}` }
    });
    const tx = await fetch(`http://127.0.0.1:${port}/api/cards/${card1.card.id}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${login.token}` },
      body: JSON.stringify({ amount: 5000, description: 'Compra test' })
    });
    const txData = await tx.json();
    console.log(JSON.stringify({ create1: create1.status, create2: create2.status, select: select.status, tx: tx.status, card1: card1.card, card2: card2.card, txData }, null, 2));
    server.close();
  });
})();
