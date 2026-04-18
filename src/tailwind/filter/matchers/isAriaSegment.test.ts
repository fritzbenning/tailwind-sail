import * as assert from 'assert';
import { isAriaSegment } from './isAriaSegment';

suite('isAriaSegment', () => {
	test('matches aria- prefixes case-insensitively', () => {
		assert.strictEqual(isAriaSegment('aria-expanded'), true);
		assert.strictEqual(isAriaSegment('ARIA-HIDDEN'), true);
	});

	test('rejects non-aria segments', () => {
		assert.strictEqual(isAriaSegment('dark'), false);
		assert.strictEqual(isAriaSegment('data-ui'), false);
	});
});
