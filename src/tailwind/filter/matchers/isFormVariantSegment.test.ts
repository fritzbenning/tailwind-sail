import * as assert from 'assert';
import { isFormVariantSegment } from './isFormVariantSegment';

suite('isFormVariantSegment', () => {
	test('matches known form pseudo-classes', () => {
		assert.strictEqual(isFormVariantSegment('disabled'), true);
		assert.strictEqual(isFormVariantSegment('CHECKED'), true);
	});

	test('rejects interaction state variants', () => {
		assert.strictEqual(isFormVariantSegment('hover'), false);
	});
});
