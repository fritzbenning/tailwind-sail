import * as vscode from "vscode";

/**
 * Reads `tailwind-sail.showSidebarRightBorder` (default `false`).
 */
export function readSidebarBorderSettings(): boolean {
	return vscode.workspace
		.getConfiguration("tailwind-sail")
		.get<boolean>("showSidebarRightBorder", false);
}
