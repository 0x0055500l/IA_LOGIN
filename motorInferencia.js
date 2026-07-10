(function () {
  function evaluarReglas(contexto) {
    const reglas = window.BASE_CONOCIMIENTO || [];
    const activadas = [];

    const intentos = Number(contexto.intentosFallidos || 0);
    const dispositivoRegistrado = Boolean(contexto.dispositivoRegistrado);
    const credencialesValidas = Boolean(contexto.credencialesValidas);
    const requiereOtp = Boolean(contexto.requiereOtp);
    const idioma = contexto.language || 'es';

    reglas.forEach((regla) => {
      let cumple = false;

      switch (regla.id) {
        case "R1":
          cumple = credencialesValidas;
          break;
        case "R2":
          cumple = contexto.contrasenaIncorrecta;
          break;
        case "R3":
          cumple = intentos >= 3 && intentos < 5;
          break;
        case "R4":
          cumple = intentos >= 5;
          break;
        case "R5":
          cumple = dispositivoRegistrado && credencialesValidas;
          break;
        case "R6":
          cumple = !dispositivoRegistrado && credencialesValidas;
          break;
        case "R7":
          cumple = Boolean(contexto.dobleFactorHabilitado) && credencialesValidas;
          break;
        case "R8":
          cumple = Boolean(contexto.modoEstricto) && (!dispositivoRegistrado || intentos > 0) && credencialesValidas;
          break;
        default:
          cumple = false;
      }

      if (cumple) {
        activadas.push(regla);
      }
    });

    // If strict mode is triggered (R8), it takes precedence for risk and decision
    const riesgo = determinarRiesgo(activadas, contexto);
    const decision = tomarDecision(activadas, riesgo, requiereOtp || activadas.some(r => r.id === 'R7'));
    const explicacion = construirExplicacion(activadas, riesgo, decision, idioma);

    return {
      reglasActivadas: activadas,
      nivelRiesgo: riesgo,
      decision,
      explicacion,
      requiereOtp: requiereOtp || activadas.some(r => r.id === 'R7'),
    };
  }

  function determinarRiesgo(activadas, contexto) {
    const ids = activadas.map((r) => r.id);

    if (ids.includes("R4") || ids.includes("R8")) {
      return "Alto";
    }

    if (ids.includes("R3") || ids.includes("R6")) {
      return "Medio";
    }

    if (ids.includes("R5") || ids.includes("R7")) {
      return "Bajo";
    }

    if (contexto.credencialesValidas) {
      return "Bajo";
    }

    return "Medio";
  }

  function tomarDecision(activadas, riesgo, requiereOtp) {
    const ids = activadas.map((r) => r.id);

    if (ids.includes("R4") || ids.includes("R8")) {
      return "Acceso denegado";
    }

    if (ids.includes("R3")) {
      return "Acceso temporalmente bloqueado";
    }

    if (requiereOtp) {
      return "Pendiente de autenticación adicional";
    }

    if (ids.includes("R1") && ids.includes("R5")) {
      return "Acceso permitido";
    }

    if (ids.includes("R1")) {
      return "Acceso permitido con revisión";
    }

    return "Acceso denegado";
  }

  function construirExplicacion(activadas, riesgo, decision, idioma) {
    const ids = activadas.map((r) => r.id);
    const isEn = idioma === 'en';

    if (!activadas.length) {
      return isEn
        ? "No specific rule was triggered. The system maintains a neutral evaluation."
        : "No se activó ninguna regla específica. El sistema mantiene una evaluación neutral.";
    }

    const ruleExplanation = isEn ? activadas[0].explicacionEn : activadas[0].explicacion;
    const ruleLabel = isEn ? "Rules triggered" : "Reglas activadas";
    const riskLabel = isEn ? "Risk level" : "Nivel de riesgo";
    const decisionLabel = isEn ? "Decision" : "Decisión";

    // Translate risk level for English output
    let riskStr = riesgo;
    if (isEn) {
      if (riesgo === 'Alto') riskStr = 'High';
      else if (riesgo === 'Medio') riskStr = 'Medium';
      else if (riesgo === 'Bajo') riskStr = 'Low';
    }

    // Translate decision for English output
    let decisionStr = decision;
    if (isEn) {
      if (decision === 'Acceso permitido') decisionStr = 'Access allowed';
      else if (decision === 'Acceso permitido con revisión') decisionStr = 'Access allowed with review';
      else if (decision === 'Pendiente de autenticación adicional') decisionStr = 'Pending additional authentication';
      else if (decision === 'Acceso temporalmente bloqueado') decisionStr = 'Access temporarily blocked';
      else if (decision === 'Acceso denegado') decisionStr = 'Access denied';
    }

    return `${ruleLabel}: ${ids.join(isEn ? " and " : " y ")}. ${riskLabel}: ${riskStr}. ${decisionLabel}: ${decisionStr}. ${ruleExplanation}`;
  }

  window.evaluarReglas = evaluarReglas;
})();
