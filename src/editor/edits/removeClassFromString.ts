import * as vscode from 'vscode';
import { rawSpanToDocOffsets } from '../../string/utils/rawSpanToDocOffsets';
import { parseTailwindClasses } from '../../tailwind/parse/parseTailwindClasses';
import { extractStringAtCursor } from '../../string/extract/extractStringAtCursor';
import { removeRange } from './removeRange';

/**
 * Deletes the token at `tokenIndex` in the string under the primary cursor.
 * Returns whether an edit was applied.
 */
export async function removeClassFromString(editor: vscode.TextEditor, tokenIndex: number): Promise<boolean> {
	const extracted = extractStringAtCursor(editor.document, editor.selection.active);
	if (!extracted) {
		return false;
	}
	const parsed = parseTailwindClasses(extracted.rawContent);
	const spanInRaw = removeRange(parsed.classes, tokenIndex);
	if (!spanInRaw) {
		return false;
	}
	const span = rawSpanToDocOffsets(extracted.rawToDocSegments, spanInRaw.startInRaw, spanInRaw.endInRaw);
	if (!span) {
		return false;
	}
	const doc = editor.document;
	const range = new vscode.Range(doc.positionAt(span.docStart), doc.positionAt(span.docEnd));
	return editor.edit((b) => b.replace(range, ''));
}
