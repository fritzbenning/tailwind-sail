import * as vscode from "vscode";
import { extractStringAtCursor } from "../../string/extract/extractStringAtCursor";
import { rawSpanToDocOffsets } from "../../string/utils/rawSpanToDocOffsets";
import { parseTailwindClasses } from "../../tailwind/parse/parseTailwindClasses";

/**
 * Replaces the class token at `tokenIndex` in the active string literal.
 *
 * @param editor - Active text editor.
 * @param tokenIndex - Index in the parsed class list.
 * @param newValue - Replacement token (no whitespace).
 * @returns Whether the document edit applied.
 *
 * @example await updateString(editor, 0, "m-auto") => true
 */
export async function updateString(
	editor: vscode.TextEditor,
	tokenIndex: number,
	newValue: string,
): Promise<boolean> {
	const trimmed = newValue.trim();
	if (trimmed.length === 0 || /\s/.test(trimmed)) {
		return false;
	}
	const extracted = extractStringAtCursor(
		editor.document,
		editor.selection.active,
	);
	if (!extracted) {
		return false;
	}
	const parsed = parseTailwindClasses(extracted.rawContent);
	const c = parsed.classes[tokenIndex];
	if (!c) {
		return false;
	}
	const span = rawSpanToDocOffsets(
		extracted.rawToDocSegments,
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
