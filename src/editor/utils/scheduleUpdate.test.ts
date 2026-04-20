import * as assert from "assert";
import { scheduleUpdate } from "./scheduleUpdate";

suite("scheduleUpdate", () => {
	test("invokes onFire after debounce (0ms)", async () => {
		const debounceTimer: {
			current: ReturnType<typeof setTimeout> | undefined;
		} = { current: undefined };
		let fires = 0;
		scheduleUpdate({
			debounceTimer,
			onFire: () => {
				fires++;
			},
			debounceMs: 0,
		});
		await new Promise<void>((resolve) => setTimeout(resolve, 30));
		assert.strictEqual(fires, 1);
		assert.strictEqual(debounceTimer.current, undefined);
	});

	test("resets the timer when called again before firing", async () => {
		const debounceTimer: {
			current: ReturnType<typeof setTimeout> | undefined;
		} = { current: undefined };
		let fires = 0;
		const run = () =>
			scheduleUpdate({
				debounceTimer,
				onFire: () => {
					fires++;
				},
				debounceMs: 40,
			});
		run();
		run();
		await new Promise<void>((resolve) => setTimeout(resolve, 120));
		assert.strictEqual(fires, 1);
	});
});
