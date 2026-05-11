import * as vscode from "vscode";

/**
 * Inserts a single utility at the snapshot `insertDocOffset` (end of the last `@apply` parameter run in the rule).
 *
 * @param editor - Active editor.
 * @param insertDocOffset - Absolute document offset from the apply stylesheet snapshot; `undefined` skips the edit.
 * @param rawClassName - User-entered token (single logical utility; no whitespace).
 * @returns Whether an edit was applied.
 *
 * @example await addClassToApply(editor, offsetAfterFlex, "gap-2") => true when `@apply flex;` becomes `@apply flex gap-2;`
 * @example await addClassToApply(editor, undefined, "p-4") => false
 */
export async function addClassToApply(
	editor: vscode.TextEditor,
	insertDocOffset: number | undefined,
	rawClassName: string,
): Promise<boolean> {
	if (insertDocOffset === undefined) {
		return false;
	}

	const trimmed = rawClassName.trim();
	if (trimmed.length === 0 || /\s/.test(trimmed)) {
		return false;
	}

	const doc = editor.document;
	const full = doc.getText();
	const safeInsert = Math.min(Math.max(0, insertDocOffset), full.length);
	const before = safeInsert > 0 ? full.charAt(safeInsert - 1) : "";
	const needsSpace = before.length > 0 && !/\s/.test(before);
	const insertText = `${needsSpace ? " " : ""}${trimmed}`;
	const pos = doc.positionAt(safeInsert);

	return editor.edit((b) => b.insert(pos, insertText));
}
