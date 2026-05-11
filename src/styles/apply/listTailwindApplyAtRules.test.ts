import * as assert from "assert";
import type { Rule } from "postcss";
import { parseStyleContent } from "../parse/parseStyleContent";
import { listTailwindApplyAtRules } from "./listTailwindApplyAtRules";

function firstRule(
	root: NonNullable<ReturnType<typeof parseStyleContent>>,
): Rule {
	const node = root.first;
	assert.strictEqual(node?.type, "rule");
	return node as Rule;
}

suite("listTailwindApplyAtRules", () => {
	test("collects direct @apply children in source order", () => {
		const root = parseStyleContent(
			".x {\n  @apply flex;\n  color: red;\n  @apply gap-2;\n}",
			false,
		);
		assert.ok(root);
		const applies = listTailwindApplyAtRules(firstRule(root!));
		assert.strictEqual(applies.length, 2);
		assert.strictEqual(applies[0]!.params.trim(), "flex");
		assert.strictEqual(applies[1]!.params.trim(), "gap-2");
	});

	test("matches Apply case-insensitively", () => {
		const root = parseStyleContent(".x {\n  @Apply flex;\n}", false);
		assert.ok(root);
		assert.strictEqual(listTailwindApplyAtRules(firstRule(root!)).length, 1);
	});

	test("does not traverse nested rules", () => {
		const root = parseStyleContent(
			".outer {\n  @apply flex;\n  .inner {\n    @apply block;\n  }\n}",
			false,
		);
		assert.ok(root);
		const outer = firstRule(root!);
		assert.strictEqual(listTailwindApplyAtRules(outer).length, 1);
		assert.strictEqual(
			listTailwindApplyAtRules(outer)[0]!.params.trim(),
			"flex",
		);
	});

	test("returns empty array when there are no @apply rules", () => {
		const root = parseStyleContent(".x { color: red; }", false);
		assert.ok(root);
		assert.deepStrictEqual(listTailwindApplyAtRules(firstRule(root!)), []);
	});
});
