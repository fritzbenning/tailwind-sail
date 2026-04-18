import * as assert from "assert";
import { isBreakpointSegment } from "./isBreakpointSegment";

suite("isBreakpointSegment", () => {
	test("recognizes named breakpoints", () => {
		assert.strictEqual(isBreakpointSegment("md"), true);
		assert.strictEqual(isBreakpointSegment("2xl"), true);
		assert.strictEqual(isBreakpointSegment("MD"), true);
	});

	test("recognizes min-/max- with scale names or arbitrary brackets", () => {
		assert.strictEqual(isBreakpointSegment("min-md"), true);
		assert.strictEqual(isBreakpointSegment("max-lg"), true);
		assert.strictEqual(isBreakpointSegment("min-[500px]"), true);
		assert.strictEqual(isBreakpointSegment("max-[100vh]"), true);
	});

	test("rejects non-breakpoint segments", () => {
		assert.strictEqual(isBreakpointSegment("hover"), false);
		assert.strictEqual(isBreakpointSegment("dark"), false);
	});

	test("rejects incomplete min-/max-", () => {
		assert.strictEqual(isBreakpointSegment("min-"), false);
		assert.strictEqual(isBreakpointSegment("max-"), false);
	});
});
