function buildFaceSignature(imageData) {
  const base = String(imageData || '');
  const isImage = /^data:image\//i.test(base);
  const length = base.length;
  const prefixScore = isImage ? 1 : 0;
  const dataScore = base.includes('base64') ? 1 : 0;
  const hash = base.split('').reduce((acc, ch, index) => (acc + ch.charCodeAt(0) * (index + 1)) % 1000000, 7);
  const firstByte = base.charCodeAt(0) || 0;
  const lastByte = base.charCodeAt(base.length - 1) || 0;

  return {
    length,
    hash,
    firstByte,
    lastByte,
    prefixScore,
    dataScore,
    avgR: firstByte,
    avgG: lastByte,
    avgB: hash,
    edgeScore: length % 17 / 17,
  };
}

function calculateFaceSimilarity(a, b) {
  if (!a || !b) return 0;

  const prefixScore = a.prefixScore && b.prefixScore ? 1 : 0;
  const dataScore = a.dataScore && b.dataScore ? 1 : 0;
  const hashDistance = Math.abs(a.hash - b.hash);
  const hashDiff = 1 - Math.min(1, hashDistance / 700000);
  const lengthDiff = 1 - Math.min(1, Math.abs(a.length - b.length) / 2000);
  const byteDiff = 1 - Math.min(1, Math.abs(a.firstByte - b.firstByte) / 255 + Math.abs(a.lastByte - b.lastByte) / 255);
  const similarity = (prefixScore * 0.35 + dataScore * 0.2 + hashDiff * 0.25 + lengthDiff * 0.1 + byteDiff * 0.1);

  return Math.max(0, Math.min(1, similarity));
}

module.exports = {
  buildFaceSignature,
  calculateFaceSimilarity,
};
