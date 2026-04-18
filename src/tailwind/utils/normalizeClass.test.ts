import * as assert from "assert";
import { normalizeClass } from "./normalizeClass";

suite("canonicalTailwindUtilityForMatch", () => {
	test("trims, strips important, lowercases, drops leading minus/underscore", () => {
		assert.strictEqual(normalizeClass("!Text-SM"), "text-sm");
		assert.strictEqual(normalizeClass("  -mx-4 "), "mx-4");
	});

	test("empty after trim becomes empty string", () => {
		assert.strictEqual(normalizeClass("   "), "");
	});
});
