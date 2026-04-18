import * as assert from 'assert';
import { VARIANT_IDS } from './variants';
import { getActiveVariantClasses, type VariantFilterEff } from './getActiveVariantClasses';

function emptyEff(): VariantFilterEff {
	const o = {} as VariantFilterEff;
	for (const id of VARIANT_IDS) {
		o[id] = 'all';
	}
	return o;
}

suite('getActiveVariantClasses', () => {
	test('orders theme before state (dark + hover → dark:hover:)', () => {
		const eff = emptyEff();
		eff.theme = 'dark';
		eff.state = 'hover';
		const prefix = getActiveVariantClasses(new Set(['theme', 'state']), eff);
		assert.strictEqual(prefix, 'dark:hover:');
	});

	test('theme light chip is ignored (light + hover → hover:)', () => {
		const eff = emptyEff();
		eff.theme = 'light';
		eff.state = 'hover';
		assert.strictEqual(getActiveVariantClasses(new Set(['theme', 'state']), eff), 'hover:');
	});

	test('skips synthetic chips that are not literal class prefixes', () => {
		const eff = emptyEff();
		eff.state = 'idle';
		eff.breakpoints = 'base';
		eff.container = 'base';
		eff.theme = 'light';
		assert.strictEqual(
			getActiveVariantClasses(new Set(['state', 'breakpoints', 'container', 'theme']), eff),
			'',
		);
	});

	test('omits dimensions without a filter row', () => {
		const eff = emptyEff();
		eff.theme = 'dark';
		assert.strictEqual(getActiveVariantClasses(new Set(['state']), eff), '');
	});

	test('includes breakpoint and arbitrary-style keys with colons', () => {
		const eff = emptyEff();
		eff.breakpoints = 'md';
		eff.other = '[&_svg]';
		const prefix = getActiveVariantClasses(new Set(['breakpoints', 'other']), eff);
		assert.strictEqual(prefix, 'md:[&_svg]:');
	});
});
