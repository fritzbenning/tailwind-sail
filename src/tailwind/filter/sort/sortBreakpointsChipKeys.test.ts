import * as assert from 'assert';
import { sortBreakpointsChipKeys } from './sortBreakpointsChipKeys';

suite('sortBreakpointsChipKeys', () => {
	test('places base first then responsive order', () => {
		assert.deepStrictEqual(sortBreakpointsChipKeys(['md', 'base', 'sm']), ['base', 'sm', 'md']);
	});

	test('omits base when not present', () => {
		assert.deepStrictEqual(sortBreakpointsChipKeys(['lg', 'md']), ['md', 'lg']);
	});
});
