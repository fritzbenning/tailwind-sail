import * as assert from 'assert';
import { isPseudoSegment } from './isPseudoSegment';

suite('isPseudoSegment', () => {
	test('matches pseudo-element names', () => {
		assert.strictEqual(isPseudoSegment('before'), true);
		assert.strictEqual(isPseudoSegment('AFTER'), true);
	});

	test('does not match structural pseudos', () => {
		assert.strictEqual(isPseudoSegment('first'), false);
	});
});
