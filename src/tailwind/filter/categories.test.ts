import * as assert from 'assert';
import { classifyTailwindUtility } from './classify/classifyTailwindUtility';
import { UTILITY_CATEGORIES } from './categories';

suite('UTILITY_CATEGORIES', () => {
	test('ends with others as the catch-all', () => {
		const last = UTILITY_CATEGORIES[UTILITY_CATEGORIES.length - 1];
		assert.strictEqual(last.id, 'others');
		assert.deepStrictEqual(last.prefixes, []);
	});

	test('first matching prefix wins (longer prefixes respected via sort)', () => {
		assert.strictEqual(classifyTailwindUtility('inline-flex'), 'flex');
		assert.strictEqual(classifyTailwindUtility('flex'), 'flex');
	});
});
