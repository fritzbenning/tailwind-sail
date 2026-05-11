import * as assert from "assert";
import * as vscode from "vscode";
import { findTailwindApplyAtCursor } from "../../styles/apply/findTailwindApplyAtCursor";
import { removeClassFromApply } from "./removeClassFromApply";

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

suite("removeClassFromApply", () => {
	test("returns false when spans are undefined", async () => {
		const css = ".x { @apply flex; }";
		const editor = await editorWithCursor(css, css.indexOf("flex"), "css");
		assert.strictEqual(await removeClassFromApply(editor, undefined, 0), false);
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
			await removeClassFromApply(editor, result!.tokenDocSpans, 99),
			false,
		);
	});

	test("removes the first merged token and its trailing gap", async () => {
		const css = ".x { @apply flex gap-2; }";
		const editor = await editorWithCursor(css, css.indexOf("flex"), "css");
		const result = findTailwindApplyAtCursor(
			editor.document,
			editor.selection.active,
		);
		assert.ok(result);
		const ok = await removeClassFromApply(editor, result!.tokenDocSpans, 0);
		assert.strictEqual(ok, true);
		assert.strictEqual(editor.document.getText(), ".x { @apply gap-2; }");
	});
});
