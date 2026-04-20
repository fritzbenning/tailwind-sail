import assert from "node:assert";
import { prepareTailwindClassForFilter } from "./prepareTailwindClassForFilter";

suite("prepareTailwindClassForFilter", () => {
	test("splits variants and normalizes utility", () => {
		const r = prepareTailwindClassForFilter("dark:md:!Flex");
		assert.deepStrictEqual(r.modifiers, ["dark:", "md:"]);
		assert.strictEqual(r.utilityNormalized, "flex");
	});

	test("empty token", () => {
		const r = prepareTailwindClassForFilter("   ");
		assert.deepStrictEqual(r.modifiers, []);
		assert.strictEqual(r.utilityNormalized, "");
	});
});
