import * as vscode from "vscode";

import type { TailwindApplyAtCaretScope } from "./types";

/**
 * Writes **`tailwind-sail.applyAtCaretScope`** using the **global (user)** configuration target so the picker choice applies across workspaces.
 *
 * @param scope - Sidebar merge mode for `@apply`; matches the quick-pick payloads from `tailwind-sail.setApplyScope` flows.
 * @returns Nothing.
 *
 * @example persistApplyAtCaretScope("wholeRule"); readTailwindApplyScope() => "wholeRule"
 */
export async function persistApplyAtCaretScope(
	scope: TailwindApplyAtCaretScope,
): Promise<void> {
	await vscode.workspace
		.getConfiguration("tailwind-sail")
		.update("applyAtCaretScope", scope, vscode.ConfigurationTarget.Global);
}
