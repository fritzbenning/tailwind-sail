import * as vscode from "vscode";
import { registerStringHighlighter } from "./editor/highlight/registerStringHighlighter";
import { registerEditorTracker } from "./editor/tracking/registerEditorTracker";
import { executeSetApplyAtCaretScope } from "./styles/apply/executeSetApplyAtCaretScope";
import { executeAddThemeFile } from "./theme/commands/executeAddThemeFile";
import { executeRemoveThemeFile } from "./theme/commands/executeRemoveThemeFile";
import { readSidebarBorderSettings } from "./webview/settings/readSidebarBorderSettings";
import type { SidebarLayout } from "./webview/types";
import { ViewProvider } from "./webview/ViewProvider";

type LayoutQuickPickItem = vscode.QuickPickItem & {
	layout: SidebarLayout;
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
		viewProvider.isViewVisible(),
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
		vscode.commands.registerCommand(
			"tailwind-sail.toggleSidebarRightBorder",
			async () => {
				const config = vscode.workspace.getConfiguration("tailwind-sail");
				const next = !readSidebarBorderSettings();
				await config.update(
					"showSidebarRightBorder",
					next,
					vscode.ConfigurationTarget.Global,
				);
			},
		),
		vscode.commands.registerCommand(
			"tailwind-sail.setApplyAtCaretScope",
			executeSetApplyAtCaretScope,
		),
		vscode.commands.registerCommand(
			"tailwind-sail.addThemeFile",
			executeAddThemeFile,
		),
		vscode.commands.registerCommand(
			"tailwind-sail.removeThemeFile",
			executeRemoveThemeFile,
		),
	);
}

export function deactivate(): void {}
