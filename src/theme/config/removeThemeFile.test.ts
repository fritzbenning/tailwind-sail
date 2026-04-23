import * as assert from "assert";
import { removeThemeFile } from "./removeThemeFile";

suite("removeThemeFile", () => {
	test("removes a matching path", () => {
		const next = removeThemeFile(["src/a.css", "b.css"], "./src/a.css");
		assert.deepStrictEqual(next, ["b.css"]);
	});

	test("returns the same logical list when nothing matches", () => {
		const next = removeThemeFile(["a.css"], "b.css");
		assert.deepStrictEqual(next, ["a.css"]);
	});

	test("ignores empty entry", () => {
		const next = removeThemeFile(["x.css"], "  ");
		assert.deepStrictEqual(next, ["x.css"]);
	});
});
