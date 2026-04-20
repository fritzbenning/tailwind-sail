import * as vscode from "vscode";
import { extractStringAtCursor } from "../../string/extract/extractStringAtCursor";
import { rawSpanToDocOffsets } from "../../string/utils/rawSpanToDocOffsets";
import { parseTailwindClasses } from "../../tailwind/parse/parseTailwindClasses";
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
	const extracted = extractStringAtCursor(
		editor.document,
		editor.selection.active,
	);
	if (!extracted) {
		return false;
	}
	const parsed = parseTailwindClasses(extracted.rawContent);
	const spanInRaw = removeRange(parsed.classes, tokenIndex);
	if (!spanInRaw) {
		return false;
	}
	const span = rawSpanToDocOffsets(
		extracted.rawToDocSegments,
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
