import * as assert from "assert";
import { getBreakpointSortTuple } from "./getBreakpointSortTuple";

suite("getBreakpointSortTuple", () => {
	test("orders max- before bare before min- for known scale names", () => {
		const maxMd = getBreakpointSortTuple("max-md");
		const md = getBreakpointSortTuple("md");
		const minMd = getBreakpointSortTuple("min-md");
		assert.strictEqual(maxMd[0], 0);
		assert.strictEqual(md[0], 0);
		assert.strictEqual(minMd[0], 0);
		assert.strictEqual(maxMd[2], 0);
		assert.strictEqual(md[2], 1);
		assert.strictEqual(minMd[2], 2);
		assert.ok(maxMd[1] === md[1] && md[1] === minMd[1]);
	});

	test("treats arbitrary min-[…] / max-[…] as tier 1", () => {
		assert.deepStrictEqual(getBreakpointSortTuple("min-[500px]"), [
			1,
			0,
			0,
			"min-[500px]",
		]);
		assert.deepStrictEqual(getBreakpointSortTuple("max-[100vh]"), [
			1,
			0,
			0,
			"max-[100vh]",
		]);
	});

	test("falls back to catch-all tier for unknown keys", () => {
		assert.deepStrictEqual(getBreakpointSortTuple("custom-bp"), [
			2,
			0,
			0,
			"custom-bp",
		]);
	});

	test("preserves original casing in tie-break string", () => {
		const t = getBreakpointSortTuple("LG");
		assert.strictEqual(t[3], "LG");
	});
});
