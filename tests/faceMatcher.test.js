const test = require('node:test');
const assert = require('node:assert/strict');
const { buildFaceSignature, calculateFaceSimilarity } = require('../faceMatcher');

test('buildFaceSignature produces a stable signature from an image', () => {
  const signature = buildFaceSignature('data:image/png;base64,abc123');
  assert.ok(signature);
  assert.equal(typeof signature.avgR, 'number');
  assert.equal(typeof signature.edgeScore, 'number');
});

test('calculateFaceSimilarity recognizes very similar signatures', () => {
  const a = buildFaceSignature('data:image/png;base64,abc123');
  const b = buildFaceSignature('data:image/png;base64,abc123');
  const similarity = calculateFaceSimilarity(a, b);
  assert.ok(similarity >= 0.95);
});

test('calculateFaceSimilarity rejects clearly different signatures', () => {
  const a = buildFaceSignature('data:image/png;base64,abc123');
  const b = buildFaceSignature('data:image/png;base64,xyz999');
  const similarity = calculateFaceSimilarity(a, b);
  assert.ok(similarity < 0.8);
});
