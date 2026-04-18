import * as assert from "assert";
import { createBucketModifiers } from "./createBucketModifiers";
import { getVariantBuckets } from "./getVariantBuckets";

suite("createBucketModifiers", () => {
	test("matches getVariantBuckets for the same modifiers", () => {
		const mods = ["dark:", "md:", "hover:", "md:"] as const;
		assert.deepStrictEqual(
			createBucketModifiers(mods),
			getVariantBuckets(mods),
		);
	});
});
