(function (root) {
  function luhnCheck(num) {
    const digits = String(num || '').replace(/\D/g, '');
    if (digits.length < 13 || digits.length > 19) return false;
    let sum = 0;
    let alt = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let n = parseInt(digits[i], 10);
      if (alt) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alt = !alt;
    }
    return sum % 10 === 0;
  }

  function isExpiryFuture(exp) {
    const match = String(exp || '').match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!match) return false;
    const month = parseInt(match[1], 10);
    const year = 2000 + parseInt(match[2], 10);
    const now = new Date();
    const expDate = new Date(year, month, 1);
    return expDate > now;
  }

  function isCvvValid(cvv) {
    return /^\d{3,4}$/.test(String(cvv || ''));
  }

  function isCardFormComplete(card) {
    return [card.number, card.expiry, card.cvv, card.status].every((value) => String(value || '').trim() !== '');
  }

  function generateInitialAvailableAmount(min = 3000, max = 10000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getActiveCardBalance(cards, fallback = 0) {
    const activeCard = Array.isArray(cards) ? cards.find((card) => card && card.status === 'Activa') || cards[0] : null;
    if (activeCard && activeCard.availableAmount != null) {
      return Number(activeCard.availableAmount);
    }
    return Number(fallback) || 0;
  }

  const api = {
    luhnCheck,
    isExpiryFuture,
    isCvvValid,
    isCardFormComplete,
    generateInitialAvailableAmount,
    getActiveCardBalance
  };

  root.cardUtils = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
