import * as vscode from "vscode";

import type { TailwindApplyAtCaretScope } from "./types";

/**
 * Reads **`tailwind-sail.applyAtCaretScope`** (defaults to merging every `@apply` in the rule).
 *
 * @returns `"atCaretDirective"` when the workspace setting requests a single enclosing `@apply`; otherwise `"wholeRule"`.
 *
 * @example readTailwindApplyScope() => "wholeRule"
 */
export function readTailwindApplyScope(): TailwindApplyAtCaretScope {
	const raw = vscode.workspace
		.getConfiguration("tailwind-sail")
		.get<string>("applyAtCaretScope", "wholeRule");
	return raw === "atCaretDirective" ? "atCaretDirective" : "wholeRule";
}
