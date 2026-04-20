import * as vscode from "vscode";
import { registerStringHighlighter } from "./editor/highlight/registerStringHighlighter";
import { registerEditorTracker } from "./editor/tracking/registerEditorTracker";
import { ViewProvider } from "./webview/ViewProvider";
import type { TailwindSailLayout } from "./webview/webviewShell";

type LayoutQuickPickItem = vscode.QuickPickItem & {
	layout: TailwindSailLayout;
};

const LAYOUT_HORIZONTAL_ITEMS: LayoutQuickPickItem[] = [
	{
		label: "Loose",
		description: "Roomier horizontal inset",
		layout: "loose",
	},
	{
		label: "Compact",
		description: "Tighter horizontal inset",
		layout: "compact",
	},
];

const LAYOUT_PADDING_TOP_ITEMS: LayoutQuickPickItem[] = [
	{
		label: "Loose",
		description: "Roomier top padding",
		layout: "loose",
	},
	{
		label: "Compact",
		description: "Tighter top padding",
		layout: "compact",
	},
];

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
		vscode.commands.registerCommand("tailwind-sail.setLayout", async () => {
			const choice = await vscode.window.showQuickPick(
				LAYOUT_HORIZONTAL_ITEMS,
				{
					title: "Tailwind Sail: horizontal padding",
					placeHolder: "Choose horizontal inset for the sidebar",
				},
			);
			if (!choice) {
				return;
			}
			await vscode.workspace
				.getConfiguration("tailwind-sail")
				.update("layout", choice.layout, vscode.ConfigurationTarget.Global);
		}),
		vscode.commands.registerCommand("tailwind-sail.setPaddingTop", async () => {
			const choice = await vscode.window.showQuickPick(
				LAYOUT_PADDING_TOP_ITEMS,
				{
					title: "Tailwind Sail: top padding",
					placeHolder: "Choose top padding for the sidebar",
				},
			);
			if (!choice) {
				return;
			}
			await vscode.workspace
				.getConfiguration("tailwind-sail")
				.update("paddingTop", choice.layout, vscode.ConfigurationTarget.Global);
		}),
	);
}

export function deactivate(): void {}
