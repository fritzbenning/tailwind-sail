import * as assert from "assert";
import { addThemeFile } from "./addThemeFile";

suite("addThemeFile", () => {
	test("appends a new path", () => {
		const next = addThemeFile([], "src/a.css");
		assert.deepStrictEqual(next, ["src/a.css"]);
	});

	test("does not duplicate normalized-equal paths", () => {
		const next = addThemeFile(["src/a.css"], "./src/a.css");
		assert.deepStrictEqual(next, ["src/a.css"]);
	});

	test("ignores empty entry", () => {
		const next = addThemeFile(["x.css"], "  ");
		assert.deepStrictEqual(next, ["x.css"]);
	});
});
