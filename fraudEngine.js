(function (global) {
  'use strict';

  const RULES = [
    {
      id: 'R_FRAUD_01',
      name: 'Monto inusual',
      nameEn: 'Unusual amount',
      description: 'El monto supera el umbral de riesgo y es significativamente mayor que el promedio histórico.',
      descriptionEn: 'The amount exceeds the risk threshold and is significantly higher than the historical average.',
      score: 35,
      condition: (ctx) => ctx.amount > 3000
    },
    {
      id: 'R_FRAUD_02',
      name: 'Transferencias repetidas',
      nameEn: 'Repeated transfers',
      description: 'Se realizan varias transferencias en poco tiempo, lo que sugiere actividad automatizada o de fraude.',
      descriptionEn: 'Several transfers are made in a short time, suggesting automated or fraudulent activity.',
      score: 25,
      condition: (ctx) => ctx.repeatedTransfers >= 3 || ctx.timeWindowMinutes <= 2
    },
    {
      id: 'R_FRAUD_03',
      name: 'IP geográficamente distinta',
      nameEn: 'Geographically different IP',
      description: 'La IP o la ubicación actual difieren del patrón normal del cliente.',
      descriptionEn: 'The current IP or location differs from the customer’s normal pattern.',
      score: 25,
      condition: (ctx) => ctx.country && ctx.usualCountry && ctx.country !== ctx.usualCountry
    },
    {
      id: 'R_FRAUD_04',
      name: 'Dispositivo nuevo',
      nameEn: 'New device',
      description: 'El dispositivo usado no coincide con el historial de confianza del usuario.',
      descriptionEn: 'The device used does not match the user’s trusted device history.',
      score: 20,
      condition: (ctx) => ctx.device === 'unknown-device' || ctx.deviceChanged
    },
    {
      id: 'R_FRAUD_05',
      name: 'Múltiples intentos fallidos',
      nameEn: 'Multiple failed attempts',
      description: 'Existen varios intentos fallidos recientes o intentos recurrentes de acceso.',
      descriptionEn: 'There are several recent failed attempts or repeated access attempts.',
      score: 20,
      condition: (ctx) => (ctx.failedAttempts || 0) >= 3
    },
    {
      id: 'R_FRAUD_06',
      name: 'Cuenta nueva con alto movimiento',
      nameEn: 'New account with high movement',
      description: 'Una cuenta nueva realiza movimientos inusuales de dinero.',
      descriptionEn: 'A newly created account is moving unusually large amounts of money.',
      score: 25,
      condition: (ctx) => ctx.newAccount && ctx.amount > 2000
    },
    {
      id: 'R_FRAUD_07',
      name: 'Destino sospechoso',
      nameEn: 'Suspicious destination',
      description: 'El destinatario o la cuenta de destino coincide con una lista sospechosa.',
      descriptionEn: 'The recipient or destination account matches a suspicious list.',
      score: 30,
      condition: (ctx) => ctx.suspiciousDestination
    },
    {
      id: 'R_FRAUD_08',
      name: 'Cambio de IP',
      nameEn: 'IP changed',
      description: 'La dirección IP cambió rápidamente en comparación con el comportamiento histórico.',
      descriptionEn: 'The IP address changed quickly compared to historical behavior.',
      score: 20,
      condition: (ctx) => ctx.ipChanged
    },
    {
      id: 'R_FRAUD_09',
      name: 'Ubicaciones inusuales',
      nameEn: 'Unusual locations',
      description: 'La operación ocurre desde ubicaciones distintas a las habituales.',
      descriptionEn: 'The operation occurs from locations different from the usual ones.',
      score: 15,
      condition: (ctx) => Array.isArray(ctx.previousLocations) && ctx.previousLocations.length > 1
    },
    {
      id: 'R_FRAUD_10',
      name: 'Monto superior al promedio',
      nameEn: 'Above historical average',
      description: 'El importe es muy superior al promedio histórico del cliente.',
      descriptionEn: 'The amount is far above the customer’s historical average.',
      score: 20,
      condition: (ctx) => typeof ctx.historyAvg === 'number' && ctx.amount > ctx.historyAvg * 2.5
    }
  ];

  function evaluateTransactionRules(context) {
    const ctx = {
      amount: Number(context.amount || 0),
      country: context.country || '',
      usualCountry: context.usualCountry || '',
      device: context.device || 'unknown-device',
      deviceChanged: Boolean(context.deviceChanged),
      repeatedTransfers: Number(context.repeatedTransfers || 0),
      historyAvg: Number(context.historyAvg || 0),
      newAccount: Boolean(context.newAccount),
      suspiciousDestination: Boolean(context.suspiciousDestination),
      timeWindowMinutes: Number(context.timeWindowMinutes || 0),
      ipChanged: Boolean(context.ipChanged),
      previousLocations: Array.isArray(context.previousLocations) ? context.previousLocations : [],
      failedAttempts: Number(context.failedAttempts || 0)
    };

    const activatedRules = RULES.filter((rule) => rule.condition(ctx));
    const score = activatedRules.reduce((sum, rule) => sum + rule.score, 0);

    let riskLevel = 'Bajo';
    if (score >= 120 || activatedRules.length >= 8) riskLevel = 'Crítico';
    else if (score >= 70 || activatedRules.length >= 3) riskLevel = 'Alto';
    else if (score >= 35) riskLevel = 'Medio';

    const isSuspicious = riskLevel !== 'Bajo' || activatedRules.length > 0;
    const activatedNames = activatedRules.map((rule) => rule.name).join(', ');
    const explanation = riskLevel === 'Crítico'
      ? `Riesgo crítico: se activaron reglas como ${activatedNames}. La operación presenta un patrón de fraude muy probable.`
      : riskLevel === 'Alto'
        ? `Riesgo alto: se detectaron señales de fraude (${activatedNames}) y la transacción debe bloquearse o revisarse.`
        : riskLevel === 'Medio'
          ? `Riesgo medio: se identificaron indicios de anomalía (${activatedNames}) y requieren revisión.`
          : 'Riesgo bajo: el patrón es coherente con el historial del cliente.';
    const recommendations = riskLevel === 'Crítico'
      ? [
          'Bloquee la tarjeta y cancele la operación inmediatamente.',
          'Solicite validación biométrica o Face ID antes de cualquier autorización adicional.',
          'Revise el destino, la IP y el dispositivo para confirmar el origen del movimiento.'
        ]
      : riskLevel === 'Alto'
        ? [
            'Bloquee temporalmente la tarjeta para evitar nuevas operaciones.',
            'Valide la identidad del usuario con Face ID o un canal alternativo.',
            'Revise manualmente el historial de movimientos recientes.'
          ]
        : riskLevel === 'Medio'
          ? [
              'Mantenga la transacción en revisión y monitoree la actividad de la cuenta.',
              'Confirme si el dispositivo y la ubicación son habituales para el titular.',
              'Solicite verificación adicional si la operación continúa.'
            ]
          : [
              'Permita la operación y continúe con el monitoreo estándar.',
              'Mantenga el análisis de comportamiento en modo seguimiento.'
            ];

    return {
      riskLevel,
      isSuspicious,
      score,
      rulesActivated: activatedRules,
      explanation,
      explanationEn: riskLevel === 'Crítico'
        ? `Critical risk: rules such as ${activatedRules.map((rule) => rule.nameEn).join(', ')} were triggered. The operation shows a highly probable fraud pattern.`
        : riskLevel === 'Alto'
          ? `High risk: fraud signals (${activatedRules.map((rule) => rule.nameEn).join(', ')}) were detected and the transaction should be blocked or reviewed.`
          : riskLevel === 'Medio'
            ? `Medium risk: anomaly indicators (${activatedRules.map((rule) => rule.nameEn).join(', ')}) were identified and require review.`
            : 'Low risk: the pattern is consistent with the customer’s history.',
      recommendations,
      recommendationsEn: riskLevel === 'Crítico'
        ? [
            'Block the card and cancel the operation immediately.',
            'Request biometric or Face ID validation before any additional authorization.',
            'Review the destination, IP, and device to confirm the origin of the movement.'
          ]
        : riskLevel === 'Alto'
          ? [
              'Temporarily block the card to prevent new operations.',
              'Validate the user identity with Face ID or an alternate channel.',
              'Manually review the recent transaction history.'
            ]
          : riskLevel === 'Medio'
            ? [
                'Keep the transaction under review and monitor account activity.',
                'Confirm whether the device and location are usual for the account holder.',
                'Request additional verification if the operation continues.'
              ]
            : [
                'Allow the operation and continue standard monitoring.',
                'Keep behavior analysis in follow-up mode.'
              ]
    };
  }

  global.evaluateTransactionRules = evaluateTransactionRules;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { evaluateTransactionRules };
  }
})(typeof window !== 'undefined' ? window : globalThis);
