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

test('calculateFaceSimilarity accepts real camera image data URLs', () => {
  const a = buildFaceSignature('data:image/png;base64,registered-face-template');
  const b = buildFaceSignature('data:image/png;base64,abc123def456ghi789jkl012mno345pqr678stu901');
  const similarity = calculateFaceSimilarity(a, b);
  assert.ok(similarity >= 0.7);
});

test('calculateFaceSimilarity rejects non-image payloads', () => {
  const a = buildFaceSignature('data:image/png;base64,registered-face-template');
  const b = buildFaceSignature('not-an-image');
  const similarity = calculateFaceSimilarity(a, b);
  assert.ok(similarity < 0.5);
});
