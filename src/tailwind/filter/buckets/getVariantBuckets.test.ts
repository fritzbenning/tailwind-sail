import * as assert from "assert";
import { getVariantBuckets } from "./getVariantBuckets";

suite("getVariantBuckets", () => {
	test("deduplicates modifiers and groups by dimension", () => {
		const b = getVariantBuckets(["dark:", "md:", "hover:", "md:", "dark:"]);
		assert.deepStrictEqual(b.theme, ["dark"]);
		assert.deepStrictEqual(b.breakpoints, ["md"]);
		assert.deepStrictEqual(b.state, ["hover"]);
	});

	test("sorts breakpoints with compareBreakpointKeys", () => {
		const b = getVariantBuckets(["lg:", "sm:", "md:"]);
		assert.deepStrictEqual(b.breakpoints, ["sm", "md", "lg"]);
	});

	test("sorts non-breakpoint dimensions lexicographically (numeric)", () => {
		const b = getVariantBuckets(["focus:", "hover:"]);
		assert.deepStrictEqual(b.state, ["focus", "hover"]);
	});

	test("leaves unused dimensions empty", () => {
		const b = getVariantBuckets(["hover:"]);
		assert.deepStrictEqual(b.breakpoints, []);
		assert.deepStrictEqual(b.theme, []);
	});
});
