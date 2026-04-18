import * as assert from 'assert';
import { isTailwindClass } from './isTailwindClass';

suite('isTailwindClass', () => {
	test('common utilities', () => {
		assert.strictEqual(isTailwindClass('flex'), true);
		assert.strictEqual(isTailwindClass('text-sm'), true);
		assert.strictEqual(isTailwindClass('hover:text-sm'), true);
		assert.strictEqual(isTailwindClass('!flex'), true);
		assert.strictEqual(isTailwindClass('bg-[#0a0]'), true);
	});

	test('unlikely tokens', () => {
		assert.strictEqual(isTailwindClass('hello-world'), false);
		assert.strictEqual(isTailwindClass('foo'), false);
	});
});
