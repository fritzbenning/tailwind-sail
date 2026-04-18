import * as assert from "assert";
import { sortThemeChipKeys } from "./sortThemeChipKeys";

suite("sortThemeChipKeys", () => {
	test("orders light then dark then remaining keys sorted", () => {
		assert.deepStrictEqual(
			sortThemeChipKeys(["dark", "light", "theme-midnight"]),
			["light", "dark", "theme-midnight"],
		);
	});

	test("includes only present theme keys", () => {
		assert.deepStrictEqual(sortThemeChipKeys(["theme-a", "theme-b"]), [
			"theme-a",
			"theme-b",
		]);
		assert.deepStrictEqual(sortThemeChipKeys(["dark"]), ["dark"]);
	});
});
