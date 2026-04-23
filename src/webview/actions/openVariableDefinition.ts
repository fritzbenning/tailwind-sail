import * as vscode from "vscode";

/**
 * Opens a workspace file and moves the cursor to the given 1-based line (column 0).
 *
 * @param uriString - `file://` URI from the CSS variable scan.
 * @param oneBasedLine - Line number as shown in editors (1-based).
 */
export async function openVariableDefinition(
	uriString: string,
	oneBasedLine: number,
): Promise<void> {
	const uri = vscode.Uri.parse(uriString);
	const lineIndex = Math.max(0, Math.floor(oneBasedLine) - 1);
	try {
		const doc = await vscode.workspace.openTextDocument(uri);
		const pos = new vscode.Position(lineIndex, 0);
		await vscode.window.showTextDocument(doc, {
			selection: new vscode.Range(pos, pos),
			preview: false,
		});
	} catch {
		await vscode.window.showWarningMessage(
			"Tailwind Sail: could not open this file.",
		);
	}
}
