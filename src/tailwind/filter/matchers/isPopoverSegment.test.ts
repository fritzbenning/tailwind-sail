import * as assert from 'assert';
import { isPopoverSegment } from './isPopoverSegment';

suite('isPopoverSegment', () => {
	test('matches open and close', () => {
		assert.strictEqual(isPopoverSegment('open'), true);
		assert.strictEqual(isPopoverSegment('CLOSE'), true);
	});

	test('rejects other segments', () => {
		assert.strictEqual(isPopoverSegment('hover'), false);
	});
});
