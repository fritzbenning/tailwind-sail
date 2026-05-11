import type * as vscode from "vscode";
import type { SailEditorSnapshot } from "../types";
import { updateClassInApply } from "./updateClassInApply";
import { updateClassInString } from "./updateClassInString";

/**
 * Replaces one utility token using the stylesheet `@apply` spans from `lastSnapshot`, otherwise the literal at the caret.
 *
 * @param editor - Active editor.
 * @param lastSnapshot - Latest Sail snapshot (`tokenDocSpans` when `context.kind` is `apply`).
 * @param tokenIndex - Index in `classes`.
 * @param newValue - Single replacement token (no whitespace).
 * @returns Whether an edit was applied.
 *
 * @example await updateClassTokenAtCursor(editor, applyModeSnapshot, 0, "grid") => true when the range is replaced
 * @example await updateClassTokenAtCursor(editor, snapshot, 0, "a b") => false
 */
export async function updateClassTokenAtCursor(
	editor: vscode.TextEditor,
	lastSnapshot: SailEditorSnapshot,
	tokenIndex: number,
	newValue: string,
): Promise<boolean> {
	const { context } = lastSnapshot;

	if (context.kind === "apply") {
		return updateClassInApply(
			editor,
			context.tokenDocSpans,
			tokenIndex,
			newValue,
		);
	}

	return updateClassInString(editor, tokenIndex, newValue);
}
