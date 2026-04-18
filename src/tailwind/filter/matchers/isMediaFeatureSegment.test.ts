import * as assert from 'assert';
import { isMediaFeatureSegment } from './isMediaFeatureSegment';

suite('isMediaFeatureSegment', () => {
	test('matches exact media feature tokens', () => {
		assert.strictEqual(isMediaFeatureSegment('print'), true);
		assert.strictEqual(isMediaFeatureSegment('MOTION-REDUCE'), true);
	});

	test('matches any-pointer- / any-hover prefixes', () => {
		assert.strictEqual(isMediaFeatureSegment('any-pointer-coarse'), true);
		assert.strictEqual(isMediaFeatureSegment('any-hover-none'), true);
	});

	test('rejects breakpoints', () => {
		assert.strictEqual(isMediaFeatureSegment('md'), false);
	});
});
