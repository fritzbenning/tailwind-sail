import * as vscode from "vscode";

export function onSelectionChange(
	editor: vscode.TextEditor,
	scheduleUpdate: () => void,
): void {
	if (editor === vscode.window.activeTextEditor) {
		scheduleUpdate();
	}
}
