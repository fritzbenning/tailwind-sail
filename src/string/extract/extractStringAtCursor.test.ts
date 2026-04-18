import * as assert from 'assert';
import * as vscode from 'vscode';
import { extractStringAtCursor } from './extractStringAtCursor';

suite('extractStringAtCursor', () => {
	test('matches extractStringAtOffset via document positions', async () => {
		const text = 'const x = "flex gap-2";';
		const doc = await vscode.workspace.openTextDocument({ content: text, language: 'typescript' });
		const g = text.indexOf('g');
		const r = extractStringAtCursor(doc, doc.positionAt(g));
		assert.ok(r);
		assert.strictEqual(r!.rawContent, 'flex gap-2');
		const open = text.indexOf('"');
		const close = text.lastIndexOf('"') + 1;
		assert.ok(r!.range.isEqual(new vscode.Range(doc.positionAt(open), doc.positionAt(close))));
	});

	test('returns undefined when cursor outside any string', async () => {
		const text = 'const x = "a";';
		const doc = await vscode.workspace.openTextDocument({ content: text, language: 'typescript' });
		assert.strictEqual(extractStringAtCursor(doc, doc.positionAt(0)), undefined);
	});
});
