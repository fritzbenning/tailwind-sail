import * as vscode from "vscode";
import { getCspSource } from "./getCspSource";
import type { WebviewShell } from "./webviewShell";

export function getWebviewContent(
	webview: vscode.Webview,
	extensionUri: vscode.Uri,
	shell: WebviewShell,
): string {
	const cspSource = getCspSource(webview);
	const scriptUri = webview.asWebviewUri(
		vscode.Uri.joinPath(extensionUri, "dist", "ui", "index.js"),
	);
	const styleUri = webview.asWebviewUri(
		vscode.Uri.joinPath(extensionUri, "dist", "ui", "index.css"),
	);
	const csp = [
		`default-src 'none'`,
		`style-src ${cspSource}`,
		`script-src ${cspSource}`,
	].join("; ");

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="Content-Security-Policy" content="${csp}" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Tailwind Sail</title>
	<link rel="stylesheet" href="${styleUri}" />
	<style>:root { --sidebarPaddingX: ${shell.sidebarPaddingXPx}px; --sidebarPaddingTop: ${shell.sidebarPaddingTopPx}px; }</style>
</head>
<body>
	<div id="tailwind-sail-ui"></div>
	<script type="module" src="${scriptUri}"></script>
</body>
</html>`;
}
