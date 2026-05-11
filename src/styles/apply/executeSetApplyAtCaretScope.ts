import * as vscode from "vscode";

import { persistApplyAtCaretScope } from "./persistApplyAtCaretScope";
import type { TailwindApplyAtCaretScope } from "./types";

type ApplyScopeQuickPickItem = vscode.QuickPickItem & {
	scope: TailwindApplyAtCaretScope;
};

const SCOPE_OPTIONS: ApplyScopeQuickPickItem[] = [
	{
		label: "Complete rule",
		description: "Combine every `@apply` in the enclosing rule block",
		scope: "wholeRule",
	},
	{
		label: "Selected line only",
		description: "Uses only the `@apply` classes from the selected line",
		scope: "atCaretDirective",
	},
];

/**
 * Shows a quick pick and writes **`tailwind-sail.applyAtCaretScope`** to **user** (global) settings.
 *
 * @returns Nothing; no-op when the user dismisses the picker.
 *
 * @example executeSetApplyAtCaretScope() — after picking “Active @apply only”, Sail scopes the sidebar to a single directive.
 */
export async function executeSetApplyAtCaretScope(): Promise<void> {
	const choice = await vscode.window.showQuickPick(SCOPE_OPTIONS, {
		title: "Tailwind Sail: @apply scope",
		placeHolder: "Resolve @apply at the caret using…",
	});

	if (!choice) {
		return;
	}

	await persistApplyAtCaretScope(choice.scope);
}
