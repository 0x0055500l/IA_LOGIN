function buildFaceSignature(imageData) {
  const base = String(imageData || '');
  const chars = Array.from(base);
  const values = chars.map((ch) => ch.charCodeAt(0));
  const hash = chars.reduce((acc, ch, index) => ((acc + ch.charCodeAt(0)) * (index + 1)) % 1000000, 7);
  const firstByte = values[0] || 0;
  const lastByte = values[values.length - 1] || 0;

  return {
    length: base.length,
    hash,
    firstByte,
    lastByte,
    avgR: firstByte,
    avgG: lastByte,
    avgB: hash,
    edgeScore: base.length % 17 / 17,
  };
}

function calculateFaceSimilarity(a, b) {
  if (!a || !b) return 0;

  const hashDistance = Math.abs(a.hash - b.hash);
  const hashDiff = 1 - Math.min(1, hashDistance / 500000);
  const lengthDiff = 1 - Math.min(1, Math.abs(a.length - b.length) / 1000);
  const byteDiff = 1 - Math.min(1, Math.abs(a.firstByte - b.firstByte) / 255 + Math.abs(a.lastByte - b.lastByte) / 255);
  const similarity = (hashDiff * 0.7 + lengthDiff * 0.2 + byteDiff * 0.1);

  return Math.max(0, Math.min(1, similarity));
}

module.exports = {
  buildFaceSignature,
  calculateFaceSimilarity,
};
