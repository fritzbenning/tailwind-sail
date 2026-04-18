import * as assert from 'assert';
import { getVariantBuckets } from '../buckets/getVariantBuckets';
import { hasDarkTheme } from './hasDarkTheme';

suite('hasDarkTheme', () => {
	test('is true when theme bucket includes dark', () => {
		assert.strictEqual(hasDarkTheme(getVariantBuckets(['dark:'])), true);
		assert.strictEqual(hasDarkTheme(getVariantBuckets(['light:', 'dark:'])), true);
	});

	test('is false without dark', () => {
		assert.strictEqual(hasDarkTheme(getVariantBuckets(['light:'])), false);
		assert.strictEqual(hasDarkTheme(getVariantBuckets([])), false);
	});
});
