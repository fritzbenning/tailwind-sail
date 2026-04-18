import * as assert from "assert";
import { getBreakpointScaleIndex } from "./getBreakpointScaleIndex";

suite("getBreakpointScaleIndex", () => {
	test("returns index in the default scale (case-insensitive)", () => {
		assert.strictEqual(getBreakpointScaleIndex("xs"), 0);
		assert.strictEqual(getBreakpointScaleIndex("MD"), 2);
		assert.strictEqual(getBreakpointScaleIndex("screen"), 11);
	});

	test("returns -1 for unknown names", () => {
		assert.strictEqual(getBreakpointScaleIndex("unknown"), -1);
		assert.strictEqual(getBreakpointScaleIndex(""), -1);
	});
});
