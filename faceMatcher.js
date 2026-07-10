/**
 * faceMatcher.js — Motor de comparación de firmas biométricas (simulado)
 * 
 * Para un proyecto académico, este módulo simula verificación facial
 * usando propiedades estadísticas de imágenes base64 capturadas por webcam.
 * 
 * En producción se usaría face-api.js, AWS Rekognition, o similar.
 */

/**
 * Construye una firma compacta a partir de una imagen base64.
 * Usa múltiples métricas para mayor robustez ante variaciones de luz/ruido.
 */
function buildFaceSignature(imageData) {
  const base = String(imageData || '');
  const isImage = /^data:image\//i.test(base);
  const hasBase64 = base.includes('base64');
  const length = base.length;

  // Extraer la parte de datos (después de la coma)
  const commaIdx = base.indexOf(',');
  const dataStr = commaIdx >= 0 ? base.substring(commaIdx + 1) : base;
  const dataLen = dataStr.length;

  if (dataLen === 0) {
    return { length: 0, hash1: 0, hash2: 0, hash3: 0, hash4: 0, prefixScore: 0, dataScore: 0 };
  }

  // Múltiples checksums con diferentes pasos para mayor robustez
  // (menos sensibles a pequeñas variaciones píxel a píxel)
  let hash1 = 0, hash2 = 0, hash3 = 0, hash4 = 0;
  const step = Math.max(1, Math.floor(dataLen / 200)); // muestrear hasta 200 puntos

  for (let i = 0; i < dataLen; i += step) {
    const code = dataStr.charCodeAt(i);
    hash1 = (hash1 + code * 31) % 1000000;
    hash2 = (hash2 + code * 37) % 1000000;
    hash3 = (hash3 * 13 + code) % 999983;
    hash4 = (hash4 + code) % 1000007;
  }

  // Muestras de posición fija (inicio, cuarto, medio, tres-cuartos, fin)
  const q1Idx = Math.floor(dataLen * 0.25);
  const q2Idx = Math.floor(dataLen * 0.50);
  const q3Idx = Math.floor(dataLen * 0.75);
  const sample1 = dataStr.charCodeAt(0) || 0;
  const sample2 = dataStr.charCodeAt(q1Idx) || 0;
  const sample3 = dataStr.charCodeAt(q2Idx) || 0;
  const sample4 = dataStr.charCodeAt(q3Idx) || 0;
  const sample5 = dataStr.charCodeAt(dataLen - 1) || 0;

  return {
    length,
    dataLen,
    hash1,
    hash2,
    hash3,
    hash4,
    sample1,
    sample2,
    sample3,
    sample4,
    sample5,
    prefixScore: (isImage ? 1 : 0),
    dataScore: (hasBase64 ? 1 : 0),
  };
}

/**
 * Calcula la similitud entre dos firmas (valor entre 0 y 1).
 * 
 * Diseñado para ser tolerante a variaciones naturales de webcam:
 * - Pequeños cambios de luz o posición deben dar alta similitud
 * - Imágenes negras (sin cámara) vs reales deben dar baja similitud
 */
function calculateFaceSimilarity(a, b) {
  if (!a || !b) return 0;

  // Si alguna imagen no tiene datos reales (imagen negra/vacía), falla
  if (a.dataLen === 0 || b.dataLen === 0) return 0;

  // Penalizar si no son imágenes reales
  const formatScore = (a.prefixScore && b.prefixScore ? 1 : 0.3) *
                      (a.dataScore && b.dataScore ? 1 : 0.3);
  if (formatScore < 0.5) return 0.1;

  // Similitud de longitud (imágenes de la misma cámara tienen tamaños similares)
  const lenDiff = Math.abs(a.dataLen - b.dataLen);
  const lenBase = Math.max(a.dataLen, b.dataLen, 1);
  const lenSimilarity = 1 - Math.min(1, lenDiff / lenBase);

  // Similitud de hashes (comparación normalizada)
  const hashSim1 = 1 - Math.min(1, Math.abs(a.hash1 - b.hash1) / 1000000);
  const hashSim2 = 1 - Math.min(1, Math.abs(a.hash2 - b.hash2) / 1000000);
  const hashSim3 = 1 - Math.min(1, Math.abs(a.hash3 - b.hash3) / 999983);
  const hashSim4 = 1 - Math.min(1, Math.abs(a.hash4 - b.hash4) / 1000007);
  const avgHashSim = (hashSim1 + hashSim2 + hashSim3 + hashSim4) / 4;

  // Similitud de muestras posicionales
  const sampleSim = (
    (1 - Math.abs(a.sample1 - b.sample1) / 255) +
    (1 - Math.abs(a.sample2 - b.sample2) / 255) +
    (1 - Math.abs(a.sample3 - b.sample3) / 255) +
    (1 - Math.abs(a.sample4 - b.sample4) / 255) +
    (1 - Math.abs(a.sample5 - b.sample5) / 255)
  ) / 5;

  // Ponderación final
  // - lenSimilarity: peso alto porque webcams del mismo usuario tienen resolución consistente
  // - avgHashSim: peso medio (más variante por compresión JPEG dinámica)
  // - sampleSim: peso bajo (muy sensible a ruido)
  const similarity = (
    lenSimilarity * 0.50 +
    avgHashSim    * 0.35 +
    sampleSim     * 0.15
  );

  return Math.max(0, Math.min(1, similarity));
}

module.exports = {
  buildFaceSignature,
  calculateFaceSimilarity,
};
