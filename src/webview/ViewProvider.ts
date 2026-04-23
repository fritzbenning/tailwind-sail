import * as vscode from "vscode";
import { addClassToString } from "../editor/edits/addClassToString";
import { removeClassFromString } from "../editor/edits/removeClassFromString";
import { updateString } from "../editor/edits/updateString";
import type { StringHighlighterHandle } from "../editor/highlight/registerStringHighlighter";
import type { SailEditorSnapshot } from "../editor/types";
import { readUpdateDebounceMs } from "../editor/utils/scheduleUpdate";
import { isThemeFile } from "../theme/check/isThemeFile";
import { getVariableDefinitions } from "../theme/extract/getVariableDefinitions";
import { openVariableDefinition } from "./actions/openVariableDefinition";
import { getWebviewContent } from "./getWebviewContent";
import { getWebviewSettings } from "./getWebviewSettings";
import { readLayoutSettings } from "./settings/readLayoutSettings";
import { readPaddingTopSettings } from "./settings/readPaddingTopSettings";
import { readSidebarBorderSettings } from "./settings/readSidebarBorderSettings";
import { readUtilityPreviewSettings } from "./settings/readUtilityPreviewSettings";
import { buildViewModal } from "./viewModal/buildViewModal";

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
	private variableScanTimer?: ReturnType<typeof setTimeout>;
	private variableScanDisposable?: vscode.Disposable;

	constructor(
		private readonly extensionUri: vscode.Uri,
		private readonly extensionContext: vscode.ExtensionContext,
	) {
		extensionContext.subscriptions.push(
			new vscode.Disposable(() => {
				this.messageSubscription?.dispose();
				this.variableScanDisposable?.dispose();
				if (this.variableScanTimer !== undefined) {
					clearTimeout(this.variableScanTimer);
				}
			}),
			vscode.workspace.onDidChangeConfiguration((e) => {
				if (e.affectsConfiguration("tailwind-sail")) {
					this.postWebviewSettings();
					if (
						e.affectsConfiguration("tailwind-sail.variables") ||
						e.affectsConfiguration("tailwind-sail.showUtilityPreview") ||
						e.affectsConfiguration("tailwind-sail.updateDebounceMs")
					) {
						this.scheduleVariableScan();
					}
				}
			}),
		);

		this.variableScanDisposable = vscode.Disposable.from(
			vscode.workspace.onDidSaveTextDocument((doc) => {
				if (!isThemeFile(doc.uri)) {
					return;
				}
				this.scheduleVariableScan();
			}),
			vscode.workspace.onDidChangeTextDocument((e) => {
				if (!isThemeFile(e.document.uri)) {
					return;
				}
				this.scheduleVariableScan();
			}),
		);
		extensionContext.subscriptions.push(this.variableScanDisposable);
	}

	private buildWebviewSettings() {
		return getWebviewSettings(
			readLayoutSettings(),
			readPaddingTopSettings(),
			readSidebarBorderSettings(),
			readUtilityPreviewSettings(),
		);
	}

	private postWebviewSettings(): void {
		if (!this.view) {
			return;
		}
		const settings = this.buildWebviewSettings();
		void this.view.webview.postMessage({
			type: "tailwind-sail-shell",
			sidebarPaddingXPx: settings.sidebarPaddingXPx,
			sidebarPaddingTopPx: settings.sidebarPaddingTopPx,
			showSidebarRightBorder: settings.showSidebarRightBorder,
			showUtilityPreview: settings.showUtilityPreview,
		});
	}

	/**
	 * Debounced workspace scan for CSS custom properties (uses `tailwind-sail.updateDebounceMs`).
	 */
	private scheduleVariableScan(): void {
		if (this.variableScanTimer !== undefined) {
			clearTimeout(this.variableScanTimer);
		}
		const ms = readUpdateDebounceMs();
		this.variableScanTimer = setTimeout(() => {
			this.variableScanTimer = undefined;
			void this.postVariablesScan();
		}, ms);
	}

	private async postVariablesScan(): Promise<void> {
		if (!this.view) {
			return;
		}
		try {
			const variables = await getVariableDefinitions();
			void this.view.webview.postMessage({
				type: "tailwind-sail-variables",
				variables,
			});
		} catch {
			void this.view.webview.postMessage({
				type: "tailwind-sail-variables",
				variables: [],
			});
		}
	}

	public isViewVisible(): boolean {
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

		const settings = this.buildWebviewSettings();
		webview.html = getWebviewContent(webview, this.extensionUri, settings);
		void webview.postMessage({
			type: "tailwind-sail-update",
			model: buildViewModal(this.lastSnapshot),
		});
		void webview.postMessage({
			type: "tailwind-sail-shell",
			sidebarPaddingXPx: settings.sidebarPaddingXPx,
			sidebarPaddingTopPx: settings.sidebarPaddingTopPx,
			showSidebarRightBorder: settings.showSidebarRightBorder,
			showUtilityPreview: settings.showUtilityPreview,
		});

		void this.postVariablesScan();

		this.messageSubscription?.dispose();
		this.messageSubscription = webview.onDidReceiveMessage(
			(message: {
				type?: string;
				tokenIndex?: number;
				newValue?: string;
				className?: string;
				uri?: string;
				line?: number;
			}) => {
				if (message.type === "tailwind-sail-open-css-variable") {
					if (
						typeof message.uri !== "string" ||
						typeof message.line !== "number"
					) {
						return;
					}
					void openVariableDefinition(message.uri, message.line);
					return;
				}

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
		const model = buildViewModal(snapshot);
		void this.view.webview.postMessage({
			type: "tailwind-sail-update",
			model,
		});
	}
}
