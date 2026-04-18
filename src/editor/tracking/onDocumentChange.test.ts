import * as assert from 'assert';
import * as vscode from 'vscode';
import { onDocumentChange } from './onDocumentChange';

suite('onDocumentChange', () => {
	test('calls schedule when the changed document is the active editor document', async () => {
		const doc = await vscode.workspace.openTextDocument({ content: 'a', language: 'typescript' });
		await vscode.window.showTextDocument(doc);
		let calls = 0;
		onDocumentChange({ document: doc } as vscode.TextDocumentChangeEvent, () => {
			calls++;
		});
		assert.strictEqual(calls, 1);
	});

	test('does not schedule when the changed document is not active', async () => {
		const activeDoc = await vscode.workspace.openTextDocument({ content: 'a', language: 'typescript' });
		const otherDoc = await vscode.workspace.openTextDocument({ content: 'b', language: 'typescript' });
		await vscode.window.showTextDocument(activeDoc);
		let calls = 0;
		onDocumentChange({ document: otherDoc } as vscode.TextDocumentChangeEvent, () => {
			calls++;
		});
		assert.strictEqual(calls, 0);
	});
});
