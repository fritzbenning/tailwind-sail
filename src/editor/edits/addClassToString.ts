import * as vscode from "vscode";
import { findTailwindStringAtCursor } from "../../string/extract/findTailwindStringAtCursor";
import { rawSpanToDocOffsets } from "../../string/utils/rawSpanToDocOffsets";

/**
 * Appends a class token to the active string literal (or replaces whitespace when there are no tokens).
 *
 * @param editor - Active text editor.
 * @param newClass - Single class token (no whitespace).
 * @returns Whether the document edit applied.
 *
 * @example await addClassToString(editor, "p-4") => true
 */
export async function addClassToString(
	editor: vscode.TextEditor,
	newClass: string,
): Promise<boolean> {
	const trimmed = newClass.trim();

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
	const raw = stringResult.rawContent;
	const classes = stringResult.classes;

	let startInRaw: number;
	let endInRaw: number;
	let insertText: string;

	if (classes.length === 0) {
		startInRaw = 0;
		endInRaw = raw.length;
		insertText = trimmed;
	} else {
		const last = classes[classes.length - 1];
		let pos = last.endInRaw;
		while (pos < raw.length && /\s/.test(raw.charAt(pos))) {
			pos++;
		}
		startInRaw = pos > last.endInRaw ? pos : last.endInRaw;
		insertText = pos > last.endInRaw ? trimmed : ` ${trimmed}`;
		endInRaw = pos > last.endInRaw ? pos : last.endInRaw;
	}

	const span = rawSpanToDocOffsets(
		stringResult.rawToDocSegments,
		startInRaw,
		endInRaw,
	);

	if (!span) {
		return false;
	}

	const doc = editor.document;
	const range = new vscode.Range(
		doc.positionAt(span.docStart),
		doc.positionAt(span.docEnd),
	);

	return editor.edit((b) => b.replace(range, insertText));
}
