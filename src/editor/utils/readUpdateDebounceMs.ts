import * as vscode from "vscode";

export function readUpdateDebounceMs(): number {
	const ms = vscode.workspace
		.getConfiguration("tailwind-sail")
		.get<number>("updateDebounceMs", 150);
	return Math.max(0, ms);
}
