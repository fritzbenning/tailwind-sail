import * as vscode from "vscode";

/**
 * Reads `tailwind-sail.showUtilityPreview` (default `true`).
 */
export function readUtilityPreviewSettings(): boolean {
	return vscode.workspace
		.getConfiguration("tailwind-sail")
		.get<boolean>("showUtilityPreview", true);
}
