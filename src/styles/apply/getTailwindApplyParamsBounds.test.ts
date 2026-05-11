import * as assert from "assert";
import type { AtRule } from "postcss";
import { parseStyleContent } from "../parse/parseStyleContent";
import { getTailwindApplyParamsBounds } from "./getTailwindApplyParamsBounds";

function findApplyNode(css: string): AtRule {
	const root = parseStyleContent(css, false);
	assert.ok(root);
	let found: AtRule | undefined;
	root!.walkAtRules("apply", (ar) => {
		found = ar;
	});
	assert.ok(found);
	return found!;
}

suite("getTailwindApplyParamsBounds", () => {
	test("returns trimmed span excluding semicolon", () => {
		const css = ".x { @apply flex gap-2; }";
		const atRule = findApplyNode(css);
		assert.deepStrictEqual(getTailwindApplyParamsBounds(atRule, css), {
			start: css.indexOf("flex"),
			end: css.indexOf(";"),
		});
	});

	test("handles leading newline before utilities", () => {
		const css = `.x {\n  @apply\n    flex\n    gap-2;\n}`;
		const atRule = findApplyNode(css);
		const bounds = getTailwindApplyParamsBounds(atRule, css);
		assert.ok(bounds);
		assert.strictEqual(
			css.slice(bounds!.start, bounds!.end).trim(),
			"flex\n    gap-2",
		);
	});

	test("returns undefined when source offsets are missing", () => {
		const css = ".x { @apply flex; }";
		const atRule = findApplyNode(css);
		atRule.source = undefined;
		assert.strictEqual(getTailwindApplyParamsBounds(atRule, css), undefined);
	});

	test("returns undefined when slice lacks @apply", () => {
		const css = ".x { @apply flex; }";
		const atRule = findApplyNode(css);
		assert.strictEqual(getTailwindApplyParamsBounds(atRule, ""), undefined);
	});
});
