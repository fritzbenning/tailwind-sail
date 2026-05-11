import * as assert from "assert";
import * as vscode from "vscode";
import { findTailwindApplyAtCursor } from "../../styles/apply/findTailwindApplyAtCursor";
import { addClassToApply } from "./addClassToApply";

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

suite("addClassToApply", () => {
	test("returns false for empty or whitespace class name", async () => {
		const css = ".x { @apply flex; }";
		const editor = await editorWithCursor(css, css.indexOf("flex"), "css");
		const result = findTailwindApplyAtCursor(
			editor.document,
			editor.selection.active,
		);
		assert.ok(result);
		assert.strictEqual(
			await addClassToApply(editor, result!.insertDocOffset, ""),
			false,
		);
		assert.strictEqual(
			await addClassToApply(editor, result!.insertDocOffset, "   "),
			false,
		);
		assert.strictEqual(
			await addClassToApply(editor, result!.insertDocOffset, "a b"),
			false,
		);
	});

	test("returns false when insert offset is undefined", async () => {
		const css = "const x = 1;";
		const editor = await editorWithCursor(css, 0, "typescript");
		assert.strictEqual(await addClassToApply(editor, undefined, "flex"), false);
	});

	test("appends a class before the closing semicolon", async () => {
		const css = ".x { @apply flex; }";
		const editor = await editorWithCursor(css, css.indexOf("flex"), "css");
		const result = findTailwindApplyAtCursor(
			editor.document,
			editor.selection.active,
		);
		assert.ok(result);
		const ok = await addClassToApply(editor, result!.insertDocOffset, "gap-2");
		assert.strictEqual(ok, true);
		assert.strictEqual(editor.document.getText(), ".x { @apply flex gap-2; }");
	});
});
