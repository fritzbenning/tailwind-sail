import * as vscode from "vscode";
import { findTokenRemovalRange } from "../../styles/ast/findTokenRemovalRange";
import type { ApplyTokenDocSpan } from "../types";

/**
 * Deletes one utility from merged `@apply` parameters for the active rule, trimming adjacent whitespace so no lone gap remains.
 *
 * @param editor - Active editor.
 * @param tokenDocSpans - Per-token document spans from the apply snapshot; `undefined` or an out-of-range index skips the edit.
 * @param tokenIndex - Index in `classes` / `tokenDocSpans`.
 * @returns Whether an edit was applied.
 *
 * @example await removeClassFromApply(editor, spans, 0) => true when the first merged token and its trailing gap are removed
 * @example await removeClassFromApply(editor, undefined, 0) => false
 */
export async function removeClassFromApply(
	editor: vscode.TextEditor,
	tokenDocSpans: readonly ApplyTokenDocSpan[] | undefined,
	tokenIndex: number,
): Promise<boolean> {
	if (
		tokenDocSpans === undefined ||
		tokenIndex < 0 ||
		tokenIndex >= tokenDocSpans.length
	) {
		return false;
	}

	const doc = editor.document;
	const documentContent = doc.getText();
	const removalRange = findTokenRemovalRange(
		documentContent,
		tokenDocSpans,
		tokenIndex,
	);

	if (!removalRange) {
		return false;
	}

	const range = new vscode.Range(
		doc.positionAt(removalRange.docStart),
		doc.positionAt(removalRange.docEnd),
	);

	return editor.edit((b) => b.replace(range, ""));
}
