import * as vscode from "vscode";
import { findTailwindStringAtCursor } from "../../string/extract/findTailwindStringAtCursor";
import { rawSpanToDocOffsets } from "../../string/utils/rawSpanToDocOffsets";
import { removeRange } from "./removeRange";

/**
 * Removes the class token at `tokenIndex` in the active string literal.
 *
 * @param editor - Active text editor.
 * @param tokenIndex - Index in the parsed class list.
 * @returns Whether the document edit applied.
 *
 * @example await removeClassFromString(editor, 0) => true
 */
export async function removeClassFromString(
	editor: vscode.TextEditor,
	tokenIndex: number,
): Promise<boolean> {
	const stringResult = findTailwindStringAtCursor(
		editor.document,
		editor.selection.active,
	);

	if (!stringResult) {
		return false;
	}
	const spanInRaw = removeRange(stringResult.classes, tokenIndex);

	if (!spanInRaw) {
		return false;
	}

	const span = rawSpanToDocOffsets(
		stringResult.rawToDocSegments,
		spanInRaw.startInRaw,
		spanInRaw.endInRaw,
	);

	if (!span) {
		return false;
	}

	const doc = editor.document;
	const range = new vscode.Range(
		doc.positionAt(span.docStart),
		doc.positionAt(span.docEnd),
	);

	return editor.edit((b) => b.replace(range, ""));
}
