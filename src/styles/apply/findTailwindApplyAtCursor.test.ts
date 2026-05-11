import * as assert from "assert";
import * as vscode from "vscode";
import { parseStyleContent } from "../parse/parseStyleContent";
import { descendToInnermostRule } from "../rules/descendToInnermostRule";
import { findTailwindApplyAtCursor } from "./findTailwindApplyAtCursor";
import { listTailwindApplyAtRules } from "./listTailwindApplyAtRules";
import { mergeApplyAtRuleParams } from "./mergeApplyAtRuleParams";

suite("@apply extraction helpers", () => {
	test("descendToInnermostRule nests into &:hover SCSS blocks", () => {
		const scss =
			".btn { @apply m-2; &:hover { @apply bg-white; }\n &__x { padding: 0; } }\n";
		const root = parseStyleContent(scss, true);
		assert.ok(root);
		const hoverOffset = scss.indexOf("bg-white");
		const hoverRule = descendToInnermostRule(root!, hoverOffset);
		assert.ok(hoverRule?.selector.includes("hover"));
		const hoverApplies = listTailwindApplyAtRules(hoverRule!);
		assert.strictEqual(hoverApplies.length, 1);
		assert.strictEqual(mergeApplyAtRuleParams(hoverApplies).trim(), "bg-white");

		const outerOffset = scss.indexOf("m-2");
		const outerRule = descendToInnermostRule(root!, outerOffset);
		assert.strictEqual(listTailwindApplyAtRules(outerRule!).length, 1);
		assert.strictEqual(
			mergeApplyAtRuleParams(listTailwindApplyAtRules(outerRule!)),
			"m-2",
		);
	});

	test("merges multi-line single @apply and multiple directives", async () => {
		const css = `.btn {\n  @apply flex\n    gap-2\n    text-sm;\n  @apply underline;\n}\n`;
		const doc = await vscode.workspace.openTextDocument({
			language: "css",
			content: css,
		});
		const pos = doc.positionAt(css.indexOf("gap"));
		const result = findTailwindApplyAtCursor(doc, pos);
		assert.ok(result);
		assert.strictEqual(result!.isTailwind, true);
		const names = result!.classes.map((c) => c.name);
		assert.deepStrictEqual(names, ["flex", "gap-2", "text-sm", "underline"]);
		assert.strictEqual(result!.applyHighlightRanges.length, 2);
		assert.strictEqual(result!.tokenDocSpans.length, names.length);
		for (let i = 0; i < names.length; i++) {
			const sp = result!.tokenDocSpans[i]!;
			const got = doc.getText(
				new vscode.Range(
					doc.positionAt(sp.docStart),
					doc.positionAt(sp.docEnd),
				),
			);
			assert.strictEqual(got, names[i]);
		}
		assert.strictEqual(doc.getText().charAt(result!.insertDocOffset!), ";");
	});

	test("atCaretDirective merges only the @apply that contains the caret", async () => {
		const css = `.btn {\n  @apply flex;\n  @apply underline;\n}\n`;
		const doc = await vscode.workspace.openTextDocument({
			language: "css",
			content: css,
		});
		const inFirst = findTailwindApplyAtCursor(
			doc,
			doc.positionAt(css.indexOf("flex")),
			{ scope: "atCaretDirective" },
		);
		assert.ok(inFirst);
		assert.deepStrictEqual(
			inFirst!.classes.map((c) => c.name),
			["flex"],
		);
		assert.strictEqual(inFirst!.applyHighlightRanges.length, 1);

		const inSecond = findTailwindApplyAtCursor(
			doc,
			doc.positionAt(css.indexOf("underline")),
			{ scope: "atCaretDirective" },
		);
		assert.ok(inSecond);
		assert.deepStrictEqual(
			inSecond!.classes.map((c) => c.name),
			["underline"],
		);
		assert.strictEqual(inSecond!.applyHighlightRanges.length, 1);
	});

	test("wholeRule passed explicitly still merges every sibling @apply", async () => {
		const css = `.btn {\n  @apply flex;\n  @apply underline;\n}\n`;
		const doc = await vscode.workspace.openTextDocument({
			language: "css",
			content: css,
		});
		const result = findTailwindApplyAtCursor(
			doc,
			doc.positionAt(css.indexOf("flex")),
			{ scope: "wholeRule" },
		);
		assert.ok(result);
		assert.deepStrictEqual(
			result!.classes.map((c) => c.name),
			["flex", "underline"],
		);
		assert.strictEqual(result!.applyHighlightRanges.length, 2);
	});

	test("omits embedded @apply keywords from parameter token list", async () => {
		const css = `.x { @apply @apply flex gap-2; }\n`;
		const doc = await vscode.workspace.openTextDocument({
			language: "css",
			content: css,
		});
		const pos = doc.positionAt(css.indexOf("flex"));
		const result = findTailwindApplyAtCursor(doc, pos);
		assert.ok(result);
		const names = result!.classes.map((c) => c.name);
		assert.deepStrictEqual(names, ["flex", "gap-2"]);
		assert.ok(!names.some((n) => /^@apply$/i.test(n)));
	});
});
