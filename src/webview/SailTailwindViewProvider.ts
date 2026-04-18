import * as vscode from 'vscode';
import { addClassToString } from '../editor/edits/addClassToString';
import { updateString } from '../editor/edits/updateString';
import { removeClassFromString } from '../editor/edits/removeClassFromString';
import { getWebviewContent } from './getWebviewContent';
import { buildSailWebviewViewModel } from './sailWebviewModel';
import type { SailEditorSnapshot } from '../editor/types';
import type { StringHighlighterHandle } from '../editor/highlight/registerStringHighlighter';

/**
 * Sidebar WebviewView hosted in the **secondary** side bar under the “Sail” container.
 *
 * Where to look in the UI:
 * - **Secondary Side Bar** (right): the “Sail” view shows live Tailwind info for the string under the cursor.
 * - Use **View → Appearance → Secondary Side Bar** (or the layout control) if the right bar is hidden.
 *
 * This is intentionally a Webview**View** (sidebar) rather than a Webview panel (editor tab).
 */
export class SailTailwindViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewId = 'sail.sidebar';

	private view?: vscode.WebviewView;
	private lastSnapshot: SailEditorSnapshot = { extracted: undefined, parsed: undefined };
	private messageSubscription?: vscode.Disposable;
	private highlightVisibilityDisposable?: vscode.Disposable;
	private stringHighlighter?: StringHighlighterHandle;

	constructor(
		private readonly extensionUri: vscode.Uri,
		private readonly extensionContext: vscode.ExtensionContext,
	) {
		extensionContext.subscriptions.push(
			new vscode.Disposable(() => {
				this.messageSubscription?.dispose();
			}),
		);
	}

	/** Whether the Sail webview is currently shown (sidebar view visible, not only registered). */
	public isSailViewVisible(): boolean {
		return this.view?.visible ?? false;
	}

	/** Wired from activation after `registerStringHighlighter` (avoids circular wiring). */
	public setStringHighlighter(highlighter: StringHighlighterHandle): void {
		this.stringHighlighter = highlighter;
	}

	public resolveWebviewView(webviewView: vscode.WebviewView): void {
		this.view = webviewView;
		const { webview } = webviewView;

		webview.options = {
			enableScripts: true,
		};

		webview.html = getWebviewContent(webview, this.extensionUri);
		void webview.postMessage({
			type: 'sailUpdate',
			model: buildSailWebviewViewModel(this.lastSnapshot),
		});

		this.messageSubscription?.dispose();
		this.messageSubscription = webview.onDidReceiveMessage(
			(message: { type?: string; tokenIndex?: number; newValue?: string; className?: string }) => {
				const editor = vscode.window.activeTextEditor;
				if (!editor) {
					return;
				}
				if (message.type === 'sailRemoveClass') {
					if (typeof message.tokenIndex !== 'number') {
						return;
					}
					void removeClassFromString(editor, message.tokenIndex);
					return;
				}
				if (message.type === 'sailAddClass') {
					if (typeof message.className !== 'string') {
						return;
					}
					void addClassToString(editor, message.className);
					return;
				}
				if (message.type !== 'sailEditClass') {
					return;
				}
				if (typeof message.tokenIndex !== 'number' || typeof message.newValue !== 'string') {
					return;
				}
				void updateString(editor, message.tokenIndex, message.newValue);
			},
		);

		this.highlightVisibilityDisposable?.dispose();
		if (this.stringHighlighter) {
			const highlighter = this.stringHighlighter;
			this.highlightVisibilityDisposable = webviewView.onDidChangeVisibility(() => {
				highlighter.refresh(this.lastSnapshot);
			});
			this.extensionContext.subscriptions.push(this.highlightVisibilityDisposable);
		}
	}

	public update(snapshot: SailEditorSnapshot): void {
		this.lastSnapshot = snapshot;
		if (!this.view) {
			return;
		}
		const model = buildSailWebviewViewModel(snapshot);
		void this.view.webview.postMessage({ type: 'sailUpdate', model });
	}
}
