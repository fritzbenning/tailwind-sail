import * as assert from 'assert';
import { classifyVariantModifier } from './classifyVariantModifier';

suite('classifyVariantModifier', () => {
	test('treats segments with or without trailing colon the same', () => {
		assert.deepStrictEqual(classifyVariantModifier('md'), classifyVariantModifier('md:'));
		assert.deepStrictEqual(classifyVariantModifier('md'), {
			dimension: 'breakpoints',
			key: 'md',
			label: 'md',
		});
	});

	test('maps breakpoints before the misc fallback', () => {
		assert.deepStrictEqual(classifyVariantModifier('lg:'), {
			dimension: 'breakpoints',
			key: 'lg',
			label: 'lg',
		});
	});

	test('maps container queries (segment starting with @)', () => {
		assert.deepStrictEqual(classifyVariantModifier('@md'), {
			dimension: 'container',
			key: '@md',
			label: '@md',
		});
	});

	test('maps theme variants', () => {
		assert.deepStrictEqual(classifyVariantModifier('dark:'), {
			dimension: 'theme',
			key: 'dark',
			label: 'dark',
		});
	});

	test('maps interaction state variants', () => {
		assert.deepStrictEqual(classifyVariantModifier('hover'), {
			dimension: 'state',
			key: 'hover',
			label: 'hover',
		});
		assert.deepStrictEqual(classifyVariantModifier('group-hover:'), {
			dimension: 'state',
			key: 'group-hover',
			label: 'group-hover',
		});
	});

	test('maps structural variants before pseudo-elements', () => {
		assert.deepStrictEqual(classifyVariantModifier('first:'), {
			dimension: 'structural',
			key: 'first',
			label: 'first',
		});
	});

	test('maps pseudo-element variants', () => {
		assert.deepStrictEqual(classifyVariantModifier('before'), {
			dimension: 'pseudo',
			key: 'before',
			label: 'before',
		});
	});

	test('maps arbitrary variant segments to other', () => {
		assert.deepStrictEqual(classifyVariantModifier('[&_svg]:'), {
			dimension: 'other',
			key: '[&_svg]',
			label: '[&_svg]',
		});
	});

	test('falls back to misc when no earlier dimension matches', () => {
		assert.deepStrictEqual(classifyVariantModifier('some-custom-plugin-variant'), {
			dimension: 'misc',
			key: 'some-custom-plugin-variant',
			label: 'some-custom-plugin-variant',
		});
	});

	test('preserves original segment casing in key and label', () => {
		assert.deepStrictEqual(classifyVariantModifier('MD:'), {
			dimension: 'breakpoints',
			key: 'MD',
			label: 'MD',
		});
	});
});
