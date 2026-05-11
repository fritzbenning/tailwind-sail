import * as vscode from "vscode";
import type { ApplyTokenDocSpan } from "../types";

/**
 * Replaces one utility token inside merged `@apply` parameters using snapshot spans (exact token range only; no whitespace rebalancing).
 *
 * @param editor - Active editor.
 * @param tokenDocSpans - Per-token document spans from the apply snapshot; `undefined` or an out-of-range index skips the edit.
 * @param tokenIndex - Index in `classes` / `tokenDocSpans`.
 * @param newValue - Replacement token (no whitespace; trimmed before insert).
 * @returns Whether an edit was applied.
 *
 * @example await updateClassInApply(editor, spans, 0, "grid") => true when `flex` becomes `grid` inside `@apply`
 * @example await updateClassInApply(editor, spans, 0, "a b") => false
 */
export async function updateClassInApply(
	editor: vscode.TextEditor,
	tokenDocSpans: readonly ApplyTokenDocSpan[] | undefined,
	tokenIndex: number,
	newValue: string,
): Promise<boolean> {
	const trimmed = newValue.trim();

	if (trimmed.length === 0 || /\s/.test(trimmed)) {
		return false;
	}

	if (
		tokenDocSpans === undefined ||
		tokenIndex < 0 ||
		tokenIndex >= tokenDocSpans.length
	) {
		return false;
	}

	const { docStart, docEnd } = tokenDocSpans[tokenIndex]!;

	const doc = editor.document;

	const range = new vscode.Range(
		doc.positionAt(docStart),
		doc.positionAt(docEnd),
	);

	return editor.edit((b) => b.replace(range, trimmed));
}
