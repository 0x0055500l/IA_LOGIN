(function () {
  function evaluarReglas(contexto) {
    const reglas = window.BASE_CONOCIMIENTO || [];
    const activadas = [];

    const intentos = Number(contexto.intentosFallidos || 0);
    const dispositivoRegistrado = Boolean(contexto.dispositivoRegistrado);
    const credencialesValidas = Boolean(contexto.credencialesValidas);
    const requiereOtp = Boolean(contexto.requiereOtp);
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
        default:
          cumple = false;
      }

      if (cumple) {
        activadas.push(regla);
      }
    });

    const riesgo = determinarRiesgo(activadas, contexto);
    const decision = tomarDecision(activadas, riesgo, requiereOtp);
    const explicacion = construirExplicacion(activadas, riesgo, decision);

    return {
      reglasActivadas: activadas,
      nivelRiesgo: riesgo,
      decision,
      explicacion,
      requiereOtp,
    };
  }

  function determinarRiesgo(activadas, contexto) {
    const ids = activadas.map((r) => r.id);

    if (ids.includes("R4")) {
      return "Alto";
    }

    if (ids.includes("R3")) {
      return "Medio";
    }

    if (ids.includes("R6")) {
      return "Medio";
    }

    if (ids.includes("R5")) {
      return "Bajo";
    }

    if (contexto.credencialesValidas) {
      return "Bajo";
    }

    return "Medio";
  }

  function tomarDecision(activadas, riesgo, requiereOtp) {
    const ids = activadas.map((r) => r.id);

    if (ids.includes("R4")) {
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

  function construirExplicacion(activadas, riesgo, decision) {
    const ids = activadas.map((r) => r.id);
    const nombreReglas = ids.join(" y ");

    if (!activadas.length) {
      return "No se activó ninguna regla específica. El sistema mantiene una evaluación neutral.";
    }

    return `Reglas activadas: ${nombreReglas}. Nivel de riesgo: ${riesgo}. Decisión: ${decision}. ${activadas[0].explicacion}`;
  }

  window.evaluarReglas = evaluarReglas;
})();
