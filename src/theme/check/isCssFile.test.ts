import * as assert from "assert";
import { isCssFile } from "./isCssFile";

suite("isCssFile", () => {
	test("returns true for `.css` paths", () => {
		assert.strictEqual(isCssFile("src/theme.css"), true);
		assert.strictEqual(isCssFile("/abs/path/to/file.CSS"), true);
	});

	test("returns false for other extensions", () => {
		assert.strictEqual(isCssFile("theme.pcss"), false);
		assert.strictEqual(isCssFile("styles.scss"), false);
		assert.strictEqual(isCssFile("readme.md"), false);
		assert.strictEqual(isCssFile("noext"), false);
	});
});
