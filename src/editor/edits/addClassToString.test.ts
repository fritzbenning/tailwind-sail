import * as assert from 'assert';
import * as vscode from 'vscode';
import { addClassToString } from './addClassToString';

async function editorWithCursor(content: string, offset: number): Promise<vscode.TextEditor> {
	const doc = await vscode.workspace.openTextDocument({ content, language: 'typescript' });
	const editor = await vscode.window.showTextDocument(doc);
	const pos = doc.positionAt(offset);
	editor.selection = new vscode.Selection(pos, pos);
	return editor;
}

suite('addClassToString', () => {
	test('returns false for empty or whitespace class name', async () => {
		const text = 'const x = "flex";';
		const editor = await editorWithCursor(text, text.indexOf('f'));
		assert.strictEqual(await addClassToString(editor, ''), false);
		assert.strictEqual(await addClassToString(editor, '   '), false);
		assert.strictEqual(await addClassToString(editor, 'a b'), false);
	});

	test('returns false when cursor is not inside a string', async () => {
		const text = 'const x = "flex";';
		const editor = await editorWithCursor(text, 0);
		assert.strictEqual(await addClassToString(editor, 'gap-2'), false);
	});

	test('appends a class after the last token', async () => {
		const text = 'const x = "flex";';
		const editor = await editorWithCursor(text, text.indexOf('f'));
		const ok = await addClassToString(editor, 'gap-2');
		assert.strictEqual(ok, true);
		assert.strictEqual(editor.document.getText(), 'const x = "flex gap-2";');
	});

	test('replaces whitespace-only content with the new class', async () => {
		const text = 'const x = "   ";';
		const editor = await editorWithCursor(text, text.indexOf('"') + 1);
		const ok = await addClassToString(editor, 'flex');
		assert.strictEqual(ok, true);
		assert.strictEqual(editor.document.getText(), 'const x = "flex";');
	});
});
