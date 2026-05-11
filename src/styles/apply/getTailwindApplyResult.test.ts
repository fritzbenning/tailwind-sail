import * as assert from "assert";
import type { AtRule, Rule } from "postcss";
import { parseStyleContent } from "../parse/parseStyleContent";
import { getTailwindApplyResult } from "./getTailwindApplyResult";
import { listTailwindApplyAtRules } from "./listTailwindApplyAtRules";

suite("getTailwindApplyResult", () => {
	test("merges utilities from multiple @apply directives", () => {
		const css = ".btn {\n  @apply flex gap-2;\n  @apply underline;\n}";
		const root = parseStyleContent(css, false);
		assert.ok(root);
		const rule = root!.first!;
		assert.strictEqual(rule.type, "rule");
		const applies = listTailwindApplyAtRules(rule as Rule);
		const result = getTailwindApplyResult(css, 0, applies);
		assert.strictEqual(result.isTailwind, true);
		assert.deepStrictEqual(
			result.classes.map((c) => c.name),
			["flex", "gap-2", "underline"],
		);
		assert.strictEqual(result.tokenDocSpans.length, 3);
		assert.strictEqual(css.charAt(result.insertDocOffset!), ";");
	});

	test("skips embedded @apply keywords in params", () => {
		const css = ".x { @apply @apply flex gap-2; }";
		const root = parseStyleContent(css, false);
		assert.ok(root);
		const rule = root!.first!;
		assert.strictEqual(rule.type, "rule");
		const applies = listTailwindApplyAtRules(rule as Rule);
		const result = getTailwindApplyResult(css, 0, applies);
		assert.deepStrictEqual(
			result.classes.map((c) => c.name),
			["flex", "gap-2"],
		);
	});

	test("maps doc offsets when styleContent is embedded", () => {
		const prefix = "<style>";
		const cssBody = ".x { @apply block; }";
		const full = `${prefix}${cssBody}</style>`;
		const offset = prefix.length;
		const root = parseStyleContent(cssBody, false);
		assert.ok(root);
		const rule = root!.first!;
		assert.strictEqual(rule.type, "rule");
		const applies = listTailwindApplyAtRules(rule as Rule);
		const result = getTailwindApplyResult(cssBody, offset, applies);
		assert.strictEqual(result.classes[0]!.name, "block");
		assert.strictEqual(
			result.tokenDocSpans[0]!.docStart,
			full.indexOf("block"),
		);
		assert.strictEqual(
			result.tokenDocSpans[0]!.docEnd,
			full.indexOf("block") + "block".length,
		);
		assert.strictEqual(full.charAt(result.insertDocOffset!), ";");
	});

	test("empty applies yields no classes and undefined insertion point", () => {
		const result = getTailwindApplyResult(".x {}", 0, []);
		assert.strictEqual(result.isTailwind, false);
		assert.deepStrictEqual(result.classes, []);
		assert.strictEqual(result.insertDocOffset, undefined);
	});

	test("when last @apply lacks resolvable bounds insertion omits offset", () => {
		const css = ".x { @apply flex; }";
		const root = parseStyleContent(css, false);
		assert.ok(root);
		const rule = root!.first!;
		const applies = [...listTailwindApplyAtRules(rule as Rule)] as AtRule[];
		assert.strictEqual(applies.length, 1);
		applies[0]!.source = undefined;
		const result = getTailwindApplyResult(css, 0, applies);
		assert.strictEqual(result.classes.length, 0);
		assert.strictEqual(result.insertDocOffset, undefined);
	});
});
