import * as assert from 'assert';
import * as vscode from 'vscode';
import type { StringHighlighterHandle } from '../highlight/registerStringHighlighter';
import type { SailEditorSnapshot } from '../types';
import type { SailTailwindViewProvider } from '../../webview/SailTailwindViewProvider';
import { pushSnapshot } from './pushSnapshot';

suite('pushSnapshot', () => {
	test('pushes empty snapshot when there is no active editor', async () => {
		await vscode.commands.executeCommand('workbench.action.closeAllEditors');

		let viewSnap: SailEditorSnapshot | undefined;
		let highSnap: SailEditorSnapshot | undefined;
		const viewProvider = {
			update(snapshot: SailEditorSnapshot) {
				viewSnap = snapshot;
			},
		} as unknown as SailTailwindViewProvider;
		const stringHighlighter: StringHighlighterHandle = {
			refresh(snapshot: SailEditorSnapshot) {
				highSnap = snapshot;
			},
		};

		pushSnapshot(viewProvider, stringHighlighter);

		assert.deepStrictEqual(viewSnap, { extracted: undefined, parsed: undefined });
		assert.deepStrictEqual(highSnap, { extracted: undefined, parsed: undefined });
	});

	test('pushes extracted and parsed snapshot when cursor is inside a class string', async () => {
		const text = 'const x = "flex gap-2";';
		const doc = await vscode.workspace.openTextDocument({ content: text, language: 'typescript' });
		const editor = await vscode.window.showTextDocument(doc);
		const pos = doc.positionAt(text.indexOf('f'));
		editor.selection = new vscode.Selection(pos, pos);

		let viewSnap: SailEditorSnapshot | undefined;
		let highSnap: SailEditorSnapshot | undefined;
		const viewProvider = {
			update(snapshot: SailEditorSnapshot) {
				viewSnap = snapshot;
			},
		} as unknown as SailTailwindViewProvider;
		const stringHighlighter: StringHighlighterHandle = {
			refresh(snapshot: SailEditorSnapshot) {
				highSnap = snapshot;
			},
		};

		pushSnapshot(viewProvider, stringHighlighter);

		assert.ok(viewSnap?.extracted);
		assert.strictEqual(viewSnap.extracted?.rawContent, 'flex gap-2');
		assert.ok(viewSnap?.parsed);
		assert.strictEqual(viewSnap?.parsed?.looksLikeTailwind, true);
		assert.deepStrictEqual(highSnap, viewSnap);
	});
});
