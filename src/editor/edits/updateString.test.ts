import * as assert from "assert";
import * as vscode from "vscode";
import { updateString } from "./updateString";

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

suite("updateString", () => {
	test("returns false for empty or invalid replacement", async () => {
		const text = 'const x = "flex gap-2";';
		const editor = await editorWithCursor(text, text.indexOf("f"));
		assert.strictEqual(await updateString(editor, 0, ""), false);
		assert.strictEqual(await updateString(editor, 0, "a b"), false);
	});

	test("returns false when token index is out of range", async () => {
		const text = 'const x = "flex";';
		const editor = await editorWithCursor(text, text.indexOf("f"));
		assert.strictEqual(await updateString(editor, 3, "grid"), false);
	});

	test("returns false when cursor is not inside a string", async () => {
		const text = 'const x = "flex gap-2";';
		const editor = await editorWithCursor(text, 0);
		assert.strictEqual(await updateString(editor, 0, "grid"), false);
	});

	test("replaces the token at the given index", async () => {
		const text = 'const x = "flex gap-2";';
		const editor = await editorWithCursor(text, text.indexOf("f"));
		const ok = await updateString(editor, 0, "grid");
		assert.strictEqual(ok, true);
		assert.strictEqual(editor.document.getText(), 'const x = "grid gap-2";');
	});
});
