import * as assert from 'assert';
import { normalizeClass } from '../../utils/normalizeClass';
import { classifyTailwindUtility } from './classifyTailwindUtility';

suite('classifyTailwindUtility', () => {
	test('classifies typography, text, and decoration utilities', () => {
		assert.strictEqual(classifyTailwindUtility('text-sm'), 'text');
		assert.strictEqual(classifyTailwindUtility('text-center'), 'text');
		assert.strictEqual(classifyTailwindUtility('font-bold'), 'text');
		assert.strictEqual(classifyTailwindUtility('leading-6'), 'text');
		assert.strictEqual(classifyTailwindUtility('tracking-wide'), 'text');
		assert.strictEqual(classifyTailwindUtility('underline'), 'text');
		assert.strictEqual(classifyTailwindUtility('decoration-dotted'), 'text');
	});

	test('classifies layout utilities', () => {
		assert.strictEqual(classifyTailwindUtility('flex'), 'flex');
		assert.strictEqual(classifyTailwindUtility('inline-flex'), 'flex');
		assert.strictEqual(classifyTailwindUtility('justify-center'), 'flex');
		assert.strictEqual(classifyTailwindUtility('gap-4'), 'flex');
		assert.strictEqual(classifyTailwindUtility('grid'), 'grid');
		assert.strictEqual(classifyTailwindUtility('col-span-2'), 'grid');
		assert.strictEqual(classifyTailwindUtility('w-full'), 'size');
		assert.strictEqual(classifyTailwindUtility('p-4'), 'box');
		assert.strictEqual(classifyTailwindUtility('border-t'), 'border');
		assert.strictEqual(classifyTailwindUtility('rounded-lg'), 'rounded');
		assert.strictEqual(classifyTailwindUtility('ring-2'), 'border');
		assert.strictEqual(classifyTailwindUtility('bg-red-500'), 'background');
		assert.strictEqual(classifyTailwindUtility('from-blue-400'), 'background');
	});

	test('classifies positioning and stacking utilities', () => {
		assert.strictEqual(classifyTailwindUtility('relative'), 'position');
		assert.strictEqual(classifyTailwindUtility('sticky'), 'position');
		assert.strictEqual(classifyTailwindUtility('absolute'), 'position');
		assert.strictEqual(classifyTailwindUtility('fixed'), 'position');
		assert.strictEqual(classifyTailwindUtility('static'), 'position');
		assert.strictEqual(classifyTailwindUtility('top-4'), 'position');
		assert.strictEqual(classifyTailwindUtility('left-0'), 'position');
		assert.strictEqual(classifyTailwindUtility('inset-0'), 'position');
		assert.strictEqual(classifyTailwindUtility('inset-x-4'), 'position');
		assert.strictEqual(classifyTailwindUtility('start-2'), 'position');
		assert.strictEqual(classifyTailwindUtility('z-10'), 'position');
		assert.strictEqual(classifyTailwindUtility('isolate'), 'position');
	});

	test('classifies width, height, size, and aspect as size (not box)', () => {
		assert.strictEqual(classifyTailwindUtility('min-w-0'), 'size');
		assert.strictEqual(classifyTailwindUtility('max-w-prose'), 'size');
		assert.strictEqual(classifyTailwindUtility('max-h-screen'), 'size');
		assert.strictEqual(classifyTailwindUtility('h-dvh'), 'size');
		assert.strictEqual(classifyTailwindUtility('size-full'), 'size');
		assert.strictEqual(classifyTailwindUtility('aspect-video'), 'size');
	});

	test('classifies border and background separately from box', () => {
		assert.strictEqual(classifyTailwindUtility('divide-y'), 'box');
		assert.strictEqual(classifyTailwindUtility('mix-blend-multiply'), 'background');
	});

	test('classifies behavior (interaction, outline, scroll-snap)', () => {
		assert.strictEqual(classifyTailwindUtility('cursor-pointer'), 'behavior');
		assert.strictEqual(classifyTailwindUtility('select-none'), 'behavior');
		assert.strictEqual(classifyTailwindUtility('pointer-events-none'), 'behavior');
		assert.strictEqual(classifyTailwindUtility('touch-none'), 'behavior');
		assert.strictEqual(classifyTailwindUtility('outline-none'), 'behavior');
		assert.strictEqual(classifyTailwindUtility('outline-2'), 'behavior');
		assert.strictEqual(classifyTailwindUtility('outline-offset-2'), 'behavior');
		assert.strictEqual(classifyTailwindUtility('highlight-outline-2'), 'behavior');
		assert.strictEqual(classifyTailwindUtility('focus-none'), 'behavior');
		assert.strictEqual(classifyTailwindUtility('resize-y'), 'behavior');
		assert.strictEqual(classifyTailwindUtility('snap-start'), 'behavior');
	});

	test('classifies motion and shadow', () => {
		assert.strictEqual(classifyTailwindUtility('transition'), 'motion');
		assert.strictEqual(classifyTailwindUtility('duration-200'), 'motion');
		assert.strictEqual(classifyTailwindUtility('shadow-md'), 'shadow');
		assert.strictEqual(classifyTailwindUtility('drop-shadow-lg'), 'shadow');
	});

	test('classifies filter and backdrop utilities', () => {
		assert.strictEqual(classifyTailwindUtility('brightness-75'), 'filter');
		assert.strictEqual(classifyTailwindUtility('blur-sm'), 'filter');
		assert.strictEqual(classifyTailwindUtility('backdrop-blur-md'), 'filter');
		assert.strictEqual(classifyTailwindUtility('filter-none'), 'filter');
	});

	test('classifies transform utilities', () => {
		assert.strictEqual(classifyTailwindUtility('translate-x-4'), 'transform');
		assert.strictEqual(classifyTailwindUtility('scale-95'), 'transform');
		assert.strictEqual(classifyTailwindUtility('rotate-3'), 'transform');
		assert.strictEqual(classifyTailwindUtility('skew-x-6'), 'transform');
		assert.strictEqual(classifyTailwindUtility('origin-center'), 'transform');
	});

	test('matches like the webview after canonical prep', () => {
		const c = (raw: string) => classifyTailwindUtility(normalizeClass(raw));
		assert.strictEqual(c('!flex'), 'flex');
		assert.strictEqual(c('-mx-4'), 'box');
		assert.strictEqual(c('!Text-SM'), 'text');
	});

	test('falls back to others', () => {
		assert.strictEqual(classifyTailwindUtility('some-unknown-plugin-foo'), 'others');
		assert.strictEqual(classifyTailwindUtility(''), 'others');
	});
});
