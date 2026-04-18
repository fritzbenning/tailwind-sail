import * as assert from "assert";
import { findLastVariantSegment } from "./findLastVariantSegment";

suite("findLastVariantSegment", () => {
	test("returns full token when no colon", () => {
		assert.strictEqual(findLastVariantSegment("flex"), "flex");
	});

	test("returns segment after last colon", () => {
		assert.strictEqual(findLastVariantSegment("hover:flex"), "flex");
		assert.strictEqual(findLastVariantSegment("dark:md:text-sm"), "text-sm");
	});

	test("trailing colon returns full token", () => {
		assert.strictEqual(findLastVariantSegment("hover:"), "hover:");
	});
});
