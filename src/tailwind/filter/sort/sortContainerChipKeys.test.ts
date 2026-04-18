import * as assert from "assert";
import { sortContainerChipKeys } from "./sortContainerChipKeys";

suite("sortContainerChipKeys", () => {
	test("places base first then locale order", () => {
		assert.deepStrictEqual(sortContainerChipKeys(["@md", "base"]), [
			"base",
			"@md",
		]);
	});

	test("sorts remaining keys when base is absent", () => {
		assert.deepStrictEqual(sortContainerChipKeys(["@lg", "@md"]), [
			"@lg",
			"@md",
		]);
	});
});
