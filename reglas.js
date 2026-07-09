const BASE_CONOCIMIENTO = [
  {
    id: 'R1',
    nombre: 'Acceso permitido',
    condicion: 'El usuario introduce correctamente el correo electrónico y la contraseña',
    accion: 'Permitir el acceso al Sistema Experto',
    tipo: 'autenticacion',
    prioridad: 1,
    explicacion: 'Si las credenciales ingresadas son válidas, el sistema autoriza el acceso.'
  },
  {
    id: 'R2',
    nombre: 'Intento fallido',
    condicion: 'La contraseña es incorrecta',
    accion: 'Aumentar el contador de intentos fallidos',
    tipo: 'seguridad',
    prioridad: 2,
    explicacion: 'Cada contraseña incorrecta incrementa la señal de riesgo de autenticación.'
  },
  {
    id: 'R3',
    nombre: 'Bloqueo temporal',
    condicion: 'Existen tres intentos fallidos consecutivos',
    accion: 'Bloquear temporalmente la cuenta durante 15 minutos',
    tipo: 'seguridad',
    prioridad: 3,
    explicacion: 'Tras tres intentos fallidos, la cuenta entra en un bloqueo temporal para protegerla.'
  },
  {
    id: 'R4',
    nombre: 'Bloqueo total',
    condicion: 'Existen cinco intentos fallidos consecutivos',
    accion: 'Bloquear completamente la cuenta hasta que sea habilitada por un administrador',
    tipo: 'seguridad',
    prioridad: 4,
    explicacion: 'Cinco intentos fallidos consecutivos indican un riesgo alto y requieren bloqueo total.'
  },
  {
    id: 'R5',
    nombre: 'Dispositivo reconocido',
    condicion: 'El usuario inicia sesión desde un dispositivo previamente registrado',
    accion: 'Disminuir el nivel de riesgo',
    tipo: 'contexto',
    prioridad: 5,
    explicacion: 'Un dispositivo conocido reduce la probabilidad de actividad fraudulenta.'
  },
  {
    id: 'R6',
    nombre: 'Dispositivo desconocido',
    condicion: 'El usuario inicia sesión desde un dispositivo desconocido',
    accion: 'Solicitar una autenticación adicional antes de permitir el acceso al sistema',
    tipo: 'contexto',
    prioridad: 6,
    explicacion: 'Un dispositivo nuevo exige una verificación extra para proteger la cuenta.'
  }
];

window.BASE_CONOCIMIENTO = BASE_CONOCIMIENTO;
