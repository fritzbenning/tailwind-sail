import * as assert from "assert";
import type { AtRule, Rule } from "postcss";
import { parseStyleContent } from "../parse/parseStyleContent";
import { mergeApplyAtRuleParams } from "./mergeApplyAtRuleParams";

function firstRule(
	root: NonNullable<ReturnType<typeof parseStyleContent>>,
): Rule {
	const node = root.first;
	assert.strictEqual(node?.type, "rule");
	return node as Rule;
}

suite("mergeApplyAtRuleParams", () => {
	test("joins sibling @apply params with spaces", () => {
		const root = parseStyleContent(
			".x {\n  @apply flex;\n  @apply text-sm;\n}",
			false,
		);
		assert.ok(root);
		const applies = firstRule(root!)
			.nodes!.filter(
				(n): n is AtRule => n.type === "atrule" && n.name === "apply",
			)
			.slice();
		assert.strictEqual(mergeApplyAtRuleParams(applies), "flex text-sm");
	});

	test("filters empty params", () => {
		const root = parseStyleContent(
			".x {\n  @apply;\n  @apply block;\n}",
			false,
		);
		assert.ok(root);
		const applies = firstRule(root!)
			.nodes!.filter(
				(n): n is AtRule => n.type === "atrule" && n.name === "apply",
			)
			.slice();
		assert.strictEqual(mergeApplyAtRuleParams(applies), "block");
	});

	test("returns empty string for empty array", () => {
		assert.strictEqual(mergeApplyAtRuleParams([]), "");
	});
});
