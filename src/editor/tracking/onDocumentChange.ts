import * as vscode from 'vscode';

export function onDocumentChange(event: vscode.TextDocumentChangeEvent, scheduleUpdate: () => void): void {
	const active = vscode.window.activeTextEditor;
	if (active && event.document === active.document) {
		scheduleUpdate();
	}
}
