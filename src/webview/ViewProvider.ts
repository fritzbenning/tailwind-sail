import * as vscode from "vscode";
import { addClassAtCursor } from "../editor/edits/addClassAtCursor";
import { removeClassTokenAtCursor } from "../editor/edits/removeClassTokenAtCursor";
import { updateClassTokenAtCursor } from "../editor/edits/updateClassTokenAtCursor";
import type { StringHighlighterHandle } from "../editor/highlight/registerStringHighlighter";
import { saveActiveEditorDocumentAfterEditIfEnabled } from "../editor/saveActiveEditorDocumentAfterEditIfEnabled";
import type { SailEditorSnapshot } from "../editor/types";
import { readUpdateDebounceMs } from "../editor/utils/readUpdateDebounceMs";
import { isThemeFile } from "../theme/check/isThemeFile";
import { executeAddThemeFile } from "../theme/commands/executeAddThemeFile";
import { getThemeFileScanInfo } from "../theme/config/getThemeFileScanInfo";
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
		context: { kind: "none" },
	};
	private messageSubscription?: vscode.Disposable;
	private highlightVisibilityDisposable?: vscode.Disposable;
	private stringHighlighter?: StringHighlighterHandle;
	private variableScanTimer?: ReturnType<typeof setTimeout>;
	private variableScanDisposable?: vscode.Disposable;
	private rowFocusClearTimer?: ReturnType<typeof setTimeout>;

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

				if (this.rowFocusClearTimer) {
					clearTimeout(this.rowFocusClearTimer);
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

	private handleClassRowFocus(tokenIndex: number | undefined): void {
		if (this.rowFocusClearTimer !== undefined) {
			clearTimeout(this.rowFocusClearTimer);
			this.rowFocusClearTimer = undefined;
		}

		if (tokenIndex === undefined) {
			this.rowFocusClearTimer = setTimeout(() => {
				this.stringHighlighter?.setFocusedClassToken(undefined);
				this.rowFocusClearTimer = undefined;
			}, 0);
			return;
		}

		this.stringHighlighter?.setFocusedClassToken(tokenIndex);
	}

	private async postVariablesScan(): Promise<void> {
		if (!this.view) {
			return;
		}
		const themeFileScan = getThemeFileScanInfo();
		try {
			const variables = await getVariableDefinitions();
			void this.view.webview.postMessage({
				type: "tailwind-sail-variables",
				variables,
				themeFileScan,
			});
		} catch {
			void this.view.webview.postMessage({
				type: "tailwind-sail-variables",
				variables: [],
				themeFileScan,
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
				requestSaveAfterEdit?: boolean;
				uri?: string;
				line?: number;
				valueStartOffset?: number;
				valueEndOffset?: number;
			}) => {
				if (message.type === "tailwind-sail-open-theme-file-settings") {
					void vscode.commands.executeCommand(
						"workbench.action.openSettings",
						"tailwind-sail.variables.sourceFiles",
					);
					return;
				}
				if (message.type === "tailwind-sail-add-theme-file") {
					void executeAddThemeFile();
					return;
				}
				if (message.type === "tailwind-sail-class-row-focus") {
					this.handleClassRowFocus(
						typeof message.tokenIndex === "number"
							? message.tokenIndex
							: undefined,
					);
					return;
				}
				if (message.type === "tailwind-sail-open-css-variable") {
					if (
						typeof message.uri !== "string" ||
						typeof message.line !== "number"
					) {
						return;
					}
					const range =
						typeof message.valueStartOffset === "number" &&
						typeof message.valueEndOffset === "number"
							? {
									start: message.valueStartOffset,
									end: message.valueEndOffset,
								}
							: undefined;
					void openVariableDefinition(message.uri, message.line, range);
					return;
				}

				const editor = vscode.window.activeTextEditor;
				if (!editor) {
					return;
				}
				if (message.type === "tailwind-sail-save-after-edit-if-enabled") {
					void saveActiveEditorDocumentAfterEditIfEnabled(editor);
					return;
				}
				if (message.type === "tailwind-sail-remove-class") {
					if (typeof message.tokenIndex !== "number") {
						return;
					}
					const tokenIndex = message.tokenIndex;
					void (async () => {
						const applied = await removeClassTokenAtCursor(
							editor,
							this.lastSnapshot,
							tokenIndex,
						);
						if (applied) {
							await saveActiveEditorDocumentAfterEditIfEnabled(editor);
						}
					})();
					return;
				}
				if (message.type === "tailwind-sail-add-class") {
					if (typeof message.className !== "string") {
						return;
					}
					const className = message.className;
					void (async () => {
						const applied = await addClassAtCursor(
							editor,
							this.lastSnapshot,
							className,
						);
						if (applied) {
							await saveActiveEditorDocumentAfterEditIfEnabled(editor);
						}
					})();
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
				const tokenIndexForEdit = message.tokenIndex;
				const newValueForEdit = message.newValue;
				const requestSaveAfterEdit = message.requestSaveAfterEdit === true;
				void (async () => {
					const applied = await updateClassTokenAtCursor(
						editor,
						this.lastSnapshot,
						tokenIndexForEdit,
						newValueForEdit,
					);
					if (applied && requestSaveAfterEdit) {
						await saveActiveEditorDocumentAfterEditIfEnabled(editor);
					}
				})();
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
