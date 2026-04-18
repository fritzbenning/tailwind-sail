import * as assert from "assert";
import { isThemeSegment } from "./isThemeSegment";

suite("isThemeSegment", () => {
	test("matches dark, light, and theme-…", () => {
		assert.strictEqual(isThemeSegment("dark"), true);
		assert.strictEqual(isThemeSegment("LIGHT"), true);
		assert.strictEqual(isThemeSegment("theme-midnight"), true);
	});

	test("rejects non-theme segments", () => {
		assert.strictEqual(isThemeSegment("md"), false);
	});
});
