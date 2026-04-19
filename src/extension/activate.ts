/**
 * Sail — activation entrypoint.
 *
 * - Registers the sidebar {@link ViewProvider}.
 * - Registers {@link registerEditorTracker} to follow the active editor + primary cursor.
 * - Wires the “Sail: Refresh” and “Sail: Show Sidebar” commands (see `package.json`).
 *
 * **Where the sidebar shows up:** Secondary Side Bar (right) → “Sail” webview view, so the Explorer can stay in the primary side bar.
 */
import * as vscode from "vscode";
import { registerStringHighlighter } from "../editor/highlight/registerStringHighlighter";
import { registerEditorTracker } from "../editor/tracking/registerEditorTracker";
import { ViewProvider } from "../webview/ViewProvider";

export function activate(context: vscode.ExtensionContext): void {
	const viewProvider = new ViewProvider(context.extensionUri, context);
	const stringHighlighter = registerStringHighlighter(context, () =>
		viewProvider.isSailViewVisible(),
	);
	viewProvider.setStringHighlighter(stringHighlighter);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			ViewProvider.viewId,
			viewProvider,
			{
				webviewOptions: {
					retainContextWhenHidden: true,
				},
			},
		),
	);

	const tracker = registerEditorTracker(
		viewProvider,
		stringHighlighter,
		context,
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("sail.showSidebar", async () => {
			try {
				await vscode.commands.executeCommand(
					"workbench.action.focusAuxiliaryBar",
				);
				await vscode.commands.executeCommand("workbench.view.extension.sail");
			} catch (err) {
				const msg = err instanceof Error ? err.message : String(err);
				await vscode.window.showErrorMessage(
					`Sail: could not focus the Sail sidebar (${msg}).`,
				);
			}
		}),
		vscode.commands.registerCommand("sail.refresh", () => {
			tracker.refreshNow();
		}),
	);
}
