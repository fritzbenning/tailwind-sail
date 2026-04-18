import * as vscode from "vscode";
import { extractStringAtCursor } from "../../string/extract/extractStringAtCursor";
import { rawSpanToDocOffsets } from "../../string/utils/rawSpanToDocOffsets";
import { parseTailwindClasses } from "../../tailwind/parse/parseTailwindClasses";

/**
 * Replaces the token at `tokenIndex` in the string under the primary cursor with `newValue`.
 * Returns whether an edit was applied.
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
