import * as assert from "assert";
import * as vscode from "vscode";
import { findTailwindApplyAtCursor } from "../../styles/apply/findTailwindApplyAtCursor";
import { updateClassInApply } from "./updateClassInApply";

async function editorWithCursor(
	content: string,
	offset: number,
	language: string,
): Promise<vscode.TextEditor> {
	const doc = await vscode.workspace.openTextDocument({
		content,
		language,
	});
	const editor = await vscode.window.showTextDocument(doc);
	const pos = doc.positionAt(offset);
	editor.selection = new vscode.Selection(pos, pos);
	return editor;
}

suite("updateClassInApply", () => {
	test("returns false for empty or whitespace replacement", async () => {
		const css = ".x { @apply flex; }";
		const editor = await editorWithCursor(css, css.indexOf("flex"), "css");
		const result = findTailwindApplyAtCursor(
			editor.document,
			editor.selection.active,
		);
		assert.ok(result);
		assert.strictEqual(
			await updateClassInApply(editor, result!.tokenDocSpans, 0, ""),
			false,
		);
		assert.strictEqual(
			await updateClassInApply(editor, result!.tokenDocSpans, 0, "  "),
			false,
		);
		assert.strictEqual(
			await updateClassInApply(editor, result!.tokenDocSpans, 0, "a b"),
			false,
		);
	});

	test("returns false when spans are undefined", async () => {
		const css = ".x { @apply flex; }";
		const editor = await editorWithCursor(css, css.indexOf("flex"), "css");
		assert.strictEqual(
			await updateClassInApply(editor, undefined, 0, "grid"),
			false,
		);
	});

	test("returns false when token index is out of range", async () => {
		const css = ".x { @apply flex; }";
		const editor = await editorWithCursor(css, css.indexOf("flex"), "css");
		const result = findTailwindApplyAtCursor(
			editor.document,
			editor.selection.active,
		);
		assert.ok(result);
		assert.strictEqual(
			await updateClassInApply(editor, result!.tokenDocSpans, 99, "grid"),
			false,
		);
	});

	test("replaces the first token in place", async () => {
		const css = ".x { @apply flex gap-2; }";
		const editor = await editorWithCursor(css, css.indexOf("flex"), "css");
		const result = findTailwindApplyAtCursor(
			editor.document,
			editor.selection.active,
		);
		assert.ok(result);
		const ok = await updateClassInApply(
			editor,
			result!.tokenDocSpans,
			0,
			"grid",
		);
		assert.strictEqual(ok, true);
		assert.strictEqual(editor.document.getText(), ".x { @apply grid gap-2; }");
	});
});
