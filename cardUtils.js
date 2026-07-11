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

  function getMissingCardFields(card) {
    const fields = {
      number: card?.number,
      expiry: card?.expiry,
      cvv: card?.cvv,
      status: card?.status
    };

    return Object.entries(fields)
      .filter(([, value]) => String(value ?? '').trim() === '')
      .map(([key]) => key);
  }

  function normalizeAnalyticsTransactions(payload) {
    if (!Array.isArray(payload)) return [];

    return payload
      .filter((entry) => entry && typeof entry === 'object')
      .map((entry) => ({
        ...entry,
        timestamp: typeof entry.timestamp === 'string' ? entry.timestamp : '',
        date: typeof entry.date === 'string' ? entry.date : '',
        time: typeof entry.time === 'string' ? entry.time : '',
        amount: Number.isFinite(Number(entry.amount)) ? Number(entry.amount) : 0,
        amountValue: Number.isFinite(Number(entry.amountValue ?? entry.amount)) ? Number(entry.amountValue ?? entry.amount) : 0,
        amountLabel: typeof entry.amountLabel === 'string' ? entry.amountLabel : '',
        type: typeof entry.type === 'string' && entry.type.trim() ? entry.type : 'Transacción',
        country: typeof entry.country === 'string' && entry.country.trim() ? entry.country : 'HN',
        city: typeof entry.city === 'string' ? entry.city : '',
        device: typeof entry.device === 'string' && entry.device.trim() ? entry.device : 'Desconocido',
        status: typeof entry.status === 'string' && entry.status.trim() ? entry.status : 'Procesada',
        user: typeof entry.user === 'string' && entry.user.trim() ? entry.user : 'Usuario',
        riskLevel: ['Bajo', 'Medio', 'Alto', 'Crítico'].includes(entry.riskLevel) ? entry.riskLevel : 'Bajo',
        isSuspicious: Boolean(entry.isSuspicious),
        score: Number.isFinite(Number(entry.score)) ? Number(entry.score) : 0,
        rulesActivated: Array.isArray(entry.rulesActivated) ? entry.rulesActivated : [],
        explanation: typeof entry.explanation === 'string' ? entry.explanation : 'Sin explicación',
        recommendations: Array.isArray(entry.recommendations) ? entry.recommendations : []
      }));
  }

  function isCardFormComplete(card) {
    return getMissingCardFields(card).length === 0;
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

  function normalizeCardStatus(status) {
    const value = String(status || '').trim();
    if (!value) return 'Pendiente';
    return value;
  }

  function validateTransactionAmount(value) {
    const trimmedValue = String(value ?? '').trim();
    if (trimmedValue === '') {
      return { valid: false, message: 'Debe ingresar un monto para realizar la transacción.', amount: null };
    }

    const amount = Number(trimmedValue);
    if (!Number.isFinite(amount) || amount <= 0) {
      return { valid: false, message: 'Debe ingresar un monto válido mayor a cero.', amount: null };
    }

    return { valid: true, message: '', amount };
  }

  function isCardActiveStatus(status) {
    const normalizedStatus = normalizeCardStatus(status);
    return normalizedStatus === 'Activa' || normalizedStatus === 'Completada';
  }

  function isCardBlockedStatus(status) {
    const normalizedStatus = normalizeCardStatus(status);
    return normalizedStatus === 'Bloqueada' || normalizedStatus === 'Pendiente' || !isCardActiveStatus(normalizedStatus);
  }

  function buildTransactionAnalyticsSummary(analysisTransactions = [], bankingTransactions = []) {
    const approvedCount = bankingTransactions.filter((tx) => String(tx.status || '').trim() === 'Aprobado').length;
    const deniedCount = bankingTransactions.filter((tx) => String(tx.status || '').trim() === 'Denegado').length;
    const suspiciousCount = analysisTransactions.filter((tx) => tx.isSuspicious && tx.riskLevel !== 'Crítico').length;
    const fraudCount = analysisTransactions.filter((tx) => tx.riskLevel === 'Crítico').length;

    return {
      approvedCount,
      deniedCount,
      suspiciousCount,
      fraudCount,
      totalCount: approvedCount + deniedCount + suspiciousCount + fraudCount
    };
  }

  function isCardTransactionAllowed(status, biometricValidated = false) {
    return isCardActiveStatus(status) && Boolean(biometricValidated);
  }

  const api = {
    luhnCheck,
    isExpiryFuture,
    isCvvValid,
    getMissingCardFields,
    normalizeAnalyticsTransactions,
    isCardFormComplete,
    generateInitialAvailableAmount,
    getActiveCardBalance,
    normalizeCardStatus,
    validateTransactionAmount,
    buildTransactionAnalyticsSummary,
    isCardActiveStatus,
    isCardBlockedStatus,
    isCardTransactionAllowed
  };

  root.cardUtils = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
