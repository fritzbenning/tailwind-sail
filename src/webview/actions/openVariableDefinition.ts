import * as vscode from "vscode";

export type VariableValueRange = {
	readonly start: number;
	readonly end: number;
};

/**
 * Opens a workspace file and selects the variable value when offsets are provided;
 * otherwise places the cursor at column 0 on the given line.
 *
 * @param uriString - `file://` URI from the CSS variable scan.
 * @param oneBasedLine - Line number as shown in editors (1-based).
 * @param valueRange - UTF-16 offsets in the scanned file (see {@link VariableDefinitionLocation}).
 */
export async function openVariableDefinition(
	uriString: string,
	oneBasedLine: number,
	valueRange?: VariableValueRange,
): Promise<void> {
	const uri = vscode.Uri.parse(uriString);
	const lineIndex = Math.max(0, Math.floor(oneBasedLine) - 1);
	try {
		const doc = await vscode.workspace.openTextDocument(uri);
		const docLen = doc.getText().length;
		let selection: vscode.Range;
		if (
			valueRange !== undefined &&
			valueRange.start >= 0 &&
			valueRange.end >= valueRange.start &&
			valueRange.end <= docLen
		) {
			const a = doc.positionAt(valueRange.start);
			const b = doc.positionAt(valueRange.end);
			selection = new vscode.Range(a, b);
		} else {
			const pos = new vscode.Position(lineIndex, 0);
			selection = new vscode.Range(pos, pos);
		}
		await vscode.window.showTextDocument(doc, {
			selection,
			preview: false,
		});
	} catch {
		await vscode.window.showWarningMessage(
			"Tailwind Sail: could not open this file.",
		);
	}
}
