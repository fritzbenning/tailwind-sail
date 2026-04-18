import type * as vscode from 'vscode';

export function getCspSource(webview: vscode.Webview | undefined): string {
	return webview?.cspSource ?? '';
}
