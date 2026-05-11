import * as vscode from "vscode";

/**
 * Reads `tailwind-sail.saveDocumentAfterEdit` (default `false`).
 *
 * @returns Whether the host should save the active editor document after discrete Sail-driven edits when those edits succeed.
 */
export function readSaveDocumentAfterEdit(): boolean {
	return vscode.workspace
		.getConfiguration("tailwind-sail")
		.get<boolean>("saveDocumentAfterEdit", false);
}
