import * as assert from "assert";
import { normalizeThemePath } from "./normalizeThemePath";

suite("normalizeThemePath", () => {
	test("trims whitespace", () => {
		assert.strictEqual(normalizeThemePath("  src/a.css  "), "src/a.css");
	});

	test("strips leading ./", () => {
		assert.strictEqual(normalizeThemePath("./src/a.css"), "src/a.css");
	});

	test("flips backslashes", () => {
		assert.strictEqual(
			normalizeThemePath("src\\app\\globals.css"),
			"src/app/globals.css",
		);
	});

	test("collapses duplicate slashes", () => {
		assert.strictEqual(normalizeThemePath("src//x//y.css"), "src/x/y.css");
	});

	test("returns empty for blank input", () => {
		assert.strictEqual(normalizeThemePath(""), "");
		assert.strictEqual(normalizeThemePath("   "), "");
	});
});
