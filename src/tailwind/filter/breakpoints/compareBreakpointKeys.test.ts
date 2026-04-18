import * as assert from 'assert';
import { compareBreakpointKeys } from './compareBreakpointKeys';

suite('compareBreakpointKeys', () => {
	test('sorts by responsive scale (md before lg)', () => {
		assert.ok(compareBreakpointKeys('md', 'lg') < 0);
		assert.ok(compareBreakpointKeys('lg', 'md') > 0);
		assert.strictEqual(compareBreakpointKeys('sm', 'sm'), 0);
	});

	test('orders max- before bare before min- at same scale', () => {
		assert.ok(compareBreakpointKeys('max-md', 'md') < 0);
		assert.ok(compareBreakpointKeys('md', 'min-md') < 0);
	});

	test('uses localeCompare with numeric option for tie-break', () => {
		assert.ok(compareBreakpointKeys('min-[10px]', 'min-[2px]') > 0);
	});
});
