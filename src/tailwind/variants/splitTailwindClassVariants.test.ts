import * as assert from 'assert';
import { splitTailwindClassVariants } from './splitTailwindClassVariants';

suite('splitTailwindClassVariants', () => {
	test('plain utility', () => {
		const r = splitTailwindClassVariants('flex');
		assert.deepStrictEqual(r.modifiers, []);
		assert.strictEqual(r.utility, 'flex');
	});

	test('stacked variants', () => {
		const r = splitTailwindClassVariants('dark:md:hover:bg-red-500');
		assert.deepStrictEqual(r.modifiers, ['dark:', 'md:', 'hover:']);
		assert.strictEqual(r.utility, 'bg-red-500');
	});

	test('container query prefix', () => {
		const r = splitTailwindClassVariants('@md:flex');
		assert.deepStrictEqual(r.modifiers, ['@md:']);
		assert.strictEqual(r.utility, 'flex');
	});

	test('ignores colon inside arbitrary brackets', () => {
		const r = splitTailwindClassVariants('bg-[url(https://example.com/x)]');
		assert.deepStrictEqual(r.modifiers, []);
		assert.strictEqual(r.utility, 'bg-[url(https://example.com/x)]');
	});

	test('arbitrary variant then utility', () => {
		const r = splitTailwindClassVariants('[&_svg]:size-4');
		assert.deepStrictEqual(r.modifiers, ['[&_svg]:']);
		assert.strictEqual(r.utility, 'size-4');
	});
});
