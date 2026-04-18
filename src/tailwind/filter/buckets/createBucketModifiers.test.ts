import * as assert from 'assert';
import { getVariantBuckets } from './getVariantBuckets';
import { createBucketModifiers } from './createBucketModifiers';

suite('createBucketModifiers', () => {
	test('matches getVariantBuckets for the same modifiers', () => {
		const mods = ['dark:', 'md:', 'hover:', 'md:'] as const;
		assert.deepStrictEqual(createBucketModifiers(mods), getVariantBuckets(mods));
	});
});
