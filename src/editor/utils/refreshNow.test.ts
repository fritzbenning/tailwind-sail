import * as assert from 'assert';
import { refreshNow } from './refreshNow';

suite('refreshNow', () => {
	test('invokes onFire immediately when no timer is pending', () => {
		const debounceTimer: { current: ReturnType<typeof setTimeout> | undefined } = { current: undefined };
		let fires = 0;
		refreshNow({
			debounceTimer,
			onFire: () => {
				fires++;
			},
		});
		assert.strictEqual(fires, 1);
		assert.strictEqual(debounceTimer.current, undefined);
	});

	test('clears a pending timer then invokes onFire once', () => {
		const debounceTimer: { current: ReturnType<typeof setTimeout> | undefined } = {
			current: setTimeout(() => assert.fail('pending timer should have been cleared'), 5000),
		};
		let fires = 0;
		refreshNow({
			debounceTimer,
			onFire: () => {
				fires++;
			},
		});
		assert.strictEqual(fires, 1);
		assert.strictEqual(debounceTimer.current, undefined);
	});
});
