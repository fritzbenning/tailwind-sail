import * as assert from "assert";
import { isTailwindApplyDirective } from "./isTailwindApplyDirective";

suite("isTailwindApplyDirective", () => {
	test("matches @apply case-insensitively", () => {
		assert.strictEqual(isTailwindApplyDirective("@apply"), true);
		assert.strictEqual(isTailwindApplyDirective("@Apply"), true);
		assert.strictEqual(isTailwindApplyDirective(" @apply "), true);
	});

	test("rejects utilities and other at-rules", () => {
		assert.strictEqual(isTailwindApplyDirective("flex"), false);
		assert.strictEqual(isTailwindApplyDirective("@layer"), false);
		assert.strictEqual(isTailwindApplyDirective("@apply-flex"), false);
	});
});
