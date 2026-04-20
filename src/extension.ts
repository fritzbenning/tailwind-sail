import * as vscode from "vscode";
import { registerStringHighlighter } from "./editor/highlight/registerStringHighlighter";
import { registerEditorTracker } from "./editor/tracking/registerEditorTracker";
import { ViewProvider } from "./webview/ViewProvider";

export function activate(context: vscode.ExtensionContext): void {
	const viewProvider = new ViewProvider(context.extensionUri, context);
	const stringHighlighter = registerStringHighlighter(context, () =>
		viewProvider.isTailwindSailViewVisible(),
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
		vscode.commands.registerCommand("tailwind-sail.showSidebar", async () => {
			try {
				await vscode.commands.executeCommand(
					"workbench.action.focusAuxiliaryBar",
				);
				await vscode.commands.executeCommand(
					"workbench.view.extension.tailwind-sail",
				);
			} catch (err) {
				const msg = err instanceof Error ? err.message : String(err);
				await vscode.window.showErrorMessage(
					`Tailwind Sail: could not focus the Tailwind Sail sidebar (${msg}).`,
				);
			}
		}),
		vscode.commands.registerCommand("tailwind-sail.refresh", () => {
			tracker.refreshNow();
		}),
	);
}

export function deactivate(): void {}
