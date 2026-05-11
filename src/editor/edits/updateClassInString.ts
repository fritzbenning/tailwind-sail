import * as vscode from "vscode";
import { findTailwindStringAtCursor } from "../../string/extract/findTailwindStringAtCursor";
import { rawSpanToDocOffsets } from "../../string/utils/rawSpanToDocOffsets";

/**
 * Replaces the class token at `tokenIndex` in the active string literal.
 *
 * @param editor - Active text editor.
 * @param tokenIndex - Index in the parsed class list.
 * @param newValue - Replacement token (no whitespace).
 * @returns Whether the document edit applied.
 *
 * @example await updateClassInString(editor, 0, "m-auto") => true
 */
export async function updateClassInString(
	editor: vscode.TextEditor,
	tokenIndex: number,
	newValue: string,
): Promise<boolean> {
	const trimmed = newValue.trim();

	if (trimmed.length === 0 || /\s/.test(trimmed)) {
		return false;
	}

	const stringResult = findTailwindStringAtCursor(
		editor.document,
		editor.selection.active,
	);

	if (!stringResult) {
		return false;
	}

	const c = stringResult.classes[tokenIndex];

	if (!c) {
		return false;
	}

	const span = rawSpanToDocOffsets(
		stringResult.rawToDocSegments,
		c.startInRaw,
		c.endInRaw,
	);

	if (!span) {
		return false;
	}

	const doc = editor.document;

	const range = new vscode.Range(
		doc.positionAt(span.docStart),
		doc.positionAt(span.docEnd),
	);

	return editor.edit((b) => b.replace(range, trimmed));
}
