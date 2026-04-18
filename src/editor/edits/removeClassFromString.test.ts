import * as assert from "assert";
import * as vscode from "vscode";
import { removeClassFromString } from "./removeClassFromString";

async function editorWithCursor(
	content: string,
	offset: number,
): Promise<vscode.TextEditor> {
	const doc = await vscode.workspace.openTextDocument({
		content,
		language: "typescript",
	});
	const editor = await vscode.window.showTextDocument(doc);
	const pos = doc.positionAt(offset);
	editor.selection = new vscode.Selection(pos, pos);
	return editor;
}

suite("removeClassFromString", () => {
	test("returns false when token index is invalid", async () => {
		const text = 'const x = "flex";';
		const editor = await editorWithCursor(text, text.indexOf("f"));
		assert.strictEqual(await removeClassFromString(editor, 1), false);
	});

	test("returns false when cursor is not inside a string", async () => {
		const text = 'const x = "flex gap-2";';
		const editor = await editorWithCursor(text, 0);
		assert.strictEqual(await removeClassFromString(editor, 0), false);
	});

	test("removes the first class token", async () => {
		const text = 'const x = "flex gap-2";';
		const editor = await editorWithCursor(text, text.indexOf("f"));
		const ok = await removeClassFromString(editor, 0);
		assert.strictEqual(ok, true);
		assert.strictEqual(editor.document.getText(), 'const x = "gap-2";');
	});

	test("removes the last class token", async () => {
		const text = 'const x = "flex gap-2";';
		const editor = await editorWithCursor(text, text.indexOf("f"));
		const ok = await removeClassFromString(editor, 1);
		assert.strictEqual(ok, true);
		assert.strictEqual(editor.document.getText(), 'const x = "flex";');
	});
});
