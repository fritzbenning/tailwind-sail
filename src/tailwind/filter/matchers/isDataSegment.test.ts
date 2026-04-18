import * as assert from 'assert';
import { isDataSegment } from './isDataSegment';

suite('isDataSegment', () => {
	test('matches data- prefixes case-insensitively', () => {
		assert.strictEqual(isDataSegment('data-state'), true);
		assert.strictEqual(isDataSegment('DATA-OPEN'), true);
	});

	test('rejects non-data segments', () => {
		assert.strictEqual(isDataSegment('hover'), false);
	});
});
