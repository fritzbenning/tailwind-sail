import * as assert from 'assert';
import type { FilterDimensionId } from '../variants';
import { getVariantLabel } from './getVariantLabel';

suite('getVariantLabel', () => {
	test('returns UI labels for known dimensions', () => {
		assert.strictEqual(getVariantLabel('breakpoints'), 'Breakpoints');
		assert.strictEqual(getVariantLabel('form'), 'Forms');
		assert.strictEqual(getVariantLabel('pseudo'), 'Pseudo-elements');
	});

	test('falls back to the id when unknown', () => {
		assert.strictEqual(getVariantLabel('not-a-real-id' as FilterDimensionId), 'not-a-real-id');
	});
});
