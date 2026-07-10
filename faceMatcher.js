/**
 * faceMatcher.js — Simulador de verificación biométrica facial
 *
 * ENFOQUE ACADÉMICO:
 * Este módulo simula un sistema de reconocimiento facial para un proyecto
 * universitario. En producción real se usaría face-api.js, AWS Rekognition,
 * Azure Face API, o similar con embeddings faciales reales.
 *
 * LÓGICA DE SIMULACIÓN:
 * - Se verifica que la imagen provenga de una cámara real (no esté vacía/negra)
 * - La "similitud" se calcula como indicador de calidad de imagen, no como
 *   comparación real de características faciales
 * - Si la imagen tiene suficiente información (tamaño mínimo real de webcam),
 *   se considera que el rostro es válido
 */

const MIN_REAL_IMAGE_SIZE = 5000;   // Mínimo de chars base64 para imagen real de cámara
const MIN_DATA_ENTROPY   = 20;      // Mínimo de caracteres únicos distintos (imagen no vacía)

/**
 * Construye una firma biométrica simulada a partir de datos de imagen base64.
 * @param {string} imageData - Data URL de la imagen (data:image/png;base64,...)
 * @returns {Object} Firma con propiedades estadísticas de la imagen
 */
function buildFaceSignature(imageData) {
  const base = String(imageData || '');

  const isValidFormat = /^data:image\//i.test(base) && base.includes('base64,');

  // Extraer la parte de datos (después de la coma)
  const commaIdx = base.indexOf(',');
  const dataStr = commaIdx >= 0 ? base.substring(commaIdx + 1) : '';
  const dataLen = dataStr.length;

  // Calcular diversidad de caracteres (entropía básica) — imagen negra tiene ~5 chars únicos
  const uniqueChars = new Set(dataStr.substring(0, Math.min(dataLen, 500))).size;

  // Muestras de posición distribuidas uniformemente
  const samples = [];
  for (let i = 0; i < 8; i++) {
    const idx = Math.floor((dataLen * i) / 8);
    samples.push(dataStr.charCodeAt(idx) || 0);
  }

  return {
    isValidFormat,
    dataLen,
    uniqueChars,
    samples,
    // Indicador: ¿es una imagen real de cámara?
    isRealCameraImage: isValidFormat && dataLen >= MIN_REAL_IMAGE_SIZE && uniqueChars >= MIN_DATA_ENTROPY,
  };
}

/**
 * Calcula la "similitud" entre dos firmas biométricas (simulación académica).
 *
 * Para un proyecto académico:
 * - Si ambas imágenes son de cámara real → alta similitud (usuario auténtico)
 * - Si alguna imagen es vacía/negra → similitud baja (sin cámara)
 *
 * @param {Object} a - Firma registrada
 * @param {Object} b - Firma capturada ahora
 * @returns {number} Similitud entre 0 y 1
 */
function calculateFaceSimilarity(a, b) {
  if (!a || !b) return 0;

  // Si ninguna imagen es real de cámara, similitud 0
  if (!a.isRealCameraImage && !b.isRealCameraImage) return 0;

  // Si solo una es real, similitud baja
  if (!a.isRealCameraImage || !b.isRealCameraImage) return 0.15;

  // Ambas son imágenes reales de cámara
  // Calcular similitud de tamaño (cámara del mismo usuario → tamaños similares)
  const lenDiff = Math.abs(a.dataLen - b.dataLen);
  const lenBase = Math.max(a.dataLen, b.dataLen, 1);
  const lenSimilarity = 1 - Math.min(1, (lenDiff / lenBase) * 3); // margen del 33%

  // Similitud de muestras posicionales (captura ~60-80% de similitud natural entre frames)
  let sampleDiffSum = 0;
  const sampleCount = Math.min(a.samples.length, b.samples.length);
  for (let i = 0; i < sampleCount; i++) {
    sampleDiffSum += Math.abs(a.samples[i] - b.samples[i]);
  }
  const avgSampleDiff = sampleCount > 0 ? sampleDiffSum / sampleCount : 255;
  const sampleSimilarity = 1 - Math.min(1, avgSampleDiff / 128); // normalizado a 128

  // Similitud de entropía (ambas capturas reales tienen entropía similar)
  const entropyDiff = Math.abs(a.uniqueChars - b.uniqueChars);
  const entropySimilarity = 1 - Math.min(1, entropyDiff / 30);

  // Ponderación: el factor más importante es que ambas sean imágenes reales
  // La similitud base por ser ambas reales ya es alta (0.70)
  const similarity = 0.70 + (
    lenSimilarity    * 0.15 +
    sampleSimilarity * 0.10 +
    entropySimilarity * 0.05
  );

  return Math.max(0, Math.min(1, similarity));
}

module.exports = {
  buildFaceSignature,
  calculateFaceSimilarity,
};
