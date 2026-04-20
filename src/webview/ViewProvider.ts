import * as vscode from "vscode";
import { addClassToString } from "../editor/edits/addClassToString";
import { removeClassFromString } from "../editor/edits/removeClassFromString";
import { updateString } from "../editor/edits/updateString";
import type { StringHighlighterHandle } from "../editor/highlight/registerStringHighlighter";
import type { SailEditorSnapshot } from "../editor/types";
import { getWebviewContent } from "./getWebviewContent";
import {
	readTailwindSailLayout,
	readTailwindSailPaddingTop,
	readTailwindSailShowSidebarRightBorder,
} from "./readTailwindSailLayout";
import { buildSailWebviewViewModel } from "./webviewModal";
import { webviewShellForLayout } from "./webviewShell";

export class ViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewId = "tailwind-sail.sidebar";

	private view?: vscode.WebviewView;
	private lastSnapshot: SailEditorSnapshot = {
		extracted: undefined,
		parsed: undefined,
	};
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
			vscode.workspace.onDidChangeConfiguration((e) => {
				if (e.affectsConfiguration("tailwind-sail")) {
					this.postWebviewShell();
				}
			}),
		);
	}

	private buildWebviewShell() {
		return webviewShellForLayout(
			readTailwindSailLayout(),
			readTailwindSailPaddingTop(),
			readTailwindSailShowSidebarRightBorder(),
		);
	}

	private postWebviewShell(): void {
		if (!this.view) {
			return;
		}
		const shell = this.buildWebviewShell();
		void this.view.webview.postMessage({
			type: "tailwind-sail-shell",
			sidebarPaddingXPx: shell.sidebarPaddingXPx,
			sidebarPaddingTopPx: shell.sidebarPaddingTopPx,
			showSidebarRightBorder: shell.showSidebarRightBorder,
		});
	}

	public isTailwindSailViewVisible(): boolean {
		return this.view?.visible ?? false;
	}

	public setStringHighlighter(highlighter: StringHighlighterHandle): void {
		this.stringHighlighter = highlighter;
	}

	public resolveWebviewView(webviewView: vscode.WebviewView): void {
		this.view = webviewView;
		const { webview } = webviewView;

		webview.options = {
			enableScripts: true,
		};

		const shell = this.buildWebviewShell();
		webview.html = getWebviewContent(webview, this.extensionUri, shell);
		void webview.postMessage({
			type: "tailwind-sail-update",
			model: buildSailWebviewViewModel(this.lastSnapshot),
		});
		void webview.postMessage({
			type: "tailwind-sail-shell",
			sidebarPaddingXPx: shell.sidebarPaddingXPx,
			sidebarPaddingTopPx: shell.sidebarPaddingTopPx,
			showSidebarRightBorder: shell.showSidebarRightBorder,
		});

		this.messageSubscription?.dispose();
		this.messageSubscription = webview.onDidReceiveMessage(
			(message: {
				type?: string;
				tokenIndex?: number;
				newValue?: string;
				className?: string;
			}) => {
				const editor = vscode.window.activeTextEditor;
				if (!editor) {
					return;
				}
				if (message.type === "tailwind-sail-remove-class") {
					if (typeof message.tokenIndex !== "number") {
						return;
					}
					void removeClassFromString(editor, message.tokenIndex);
					return;
				}
				if (message.type === "tailwind-sail-add-class") {
					if (typeof message.className !== "string") {
						return;
					}
					void addClassToString(editor, message.className);
					return;
				}
				if (message.type !== "tailwind-sail-edit-class") {
					return;
				}
				if (
					typeof message.tokenIndex !== "number" ||
					typeof message.newValue !== "string"
				) {
					return;
				}
				void updateString(editor, message.tokenIndex, message.newValue);
			},
		);

		this.highlightVisibilityDisposable?.dispose();
		if (this.stringHighlighter) {
			const highlighter = this.stringHighlighter;
			this.highlightVisibilityDisposable = webviewView.onDidChangeVisibility(
				() => {
					highlighter.refresh(this.lastSnapshot);
				},
			);
			this.extensionContext.subscriptions.push(
				this.highlightVisibilityDisposable,
			);
		}
	}

	public update(snapshot: SailEditorSnapshot): void {
		this.lastSnapshot = snapshot;
		if (!this.view) {
			return;
		}
		const model = buildSailWebviewViewModel(snapshot);
		void this.view.webview.postMessage({
			type: "tailwind-sail-update",
			model,
		});
	}
}
