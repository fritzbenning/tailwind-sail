import * as assert from "assert";
import { sortStateChipKeys } from "./sortStateChipKeys";

suite("sortStateChipKeys", () => {
	test("places idle first then locale order", () => {
		assert.deepStrictEqual(sortStateChipKeys(["hover", "idle", "focus"]), [
			"idle",
			"focus",
			"hover",
		]);
	});

	test("omits idle when not present", () => {
		assert.deepStrictEqual(sortStateChipKeys(["group-hover", "hover"]), [
			"group-hover",
			"hover",
		]);
	});
});
