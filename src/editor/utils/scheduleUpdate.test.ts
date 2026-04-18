import * as assert from 'assert';
import * as vscode from 'vscode';
import { scheduleUpdate } from './scheduleUpdate';

suite('scheduleUpdate', () => {
	let previousMs: number | undefined;

	suiteSetup(async () => {
		previousMs = vscode.workspace.getConfiguration('sail').get<number>('updateDebounceMs');
		await vscode.workspace.getConfiguration('sail').update('updateDebounceMs', 0, vscode.ConfigurationTarget.Global);
	});

	suiteTeardown(async () => {
		if (previousMs !== undefined) {
			await vscode.workspace
				.getConfiguration('sail')
				.update('updateDebounceMs', previousMs, vscode.ConfigurationTarget.Global);
		}
	});

	test('invokes onFire after debounce (0ms)', async () => {
		const debounceTimer: { current: ReturnType<typeof setTimeout> | undefined } = { current: undefined };
		let fires = 0;
		scheduleUpdate({
			debounceTimer,
			onFire: () => {
				fires++;
			},
		});
		await new Promise<void>((resolve) => setTimeout(resolve, 30));
		assert.strictEqual(fires, 1);
		assert.strictEqual(debounceTimer.current, undefined);
	});

	test('resets the timer when called again before firing', async () => {
		await vscode.workspace.getConfiguration('sail').update('updateDebounceMs', 40, vscode.ConfigurationTarget.Global);
		try {
			const debounceTimer: { current: ReturnType<typeof setTimeout> | undefined } = { current: undefined };
			let fires = 0;
			const run = () =>
				scheduleUpdate({
					debounceTimer,
					onFire: () => {
						fires++;
					},
				});
			run();
			run();
			await new Promise<void>((resolve) => setTimeout(resolve, 120));
			assert.strictEqual(fires, 1);
		} finally {
			await vscode.workspace.getConfiguration('sail').update('updateDebounceMs', 0, vscode.ConfigurationTarget.Global);
		}
	});
});
