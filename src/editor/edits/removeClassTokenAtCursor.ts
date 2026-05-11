import type * as vscode from "vscode";
import type { SailEditorSnapshot } from "../types";
import { removeClassFromApply } from "./removeClassFromApply";
import { removeClassFromString } from "./removeClassFromString";

/**
 * Deletes one utility token from the open document using the last Sail snapshot (`@apply` or string literal).
 * In `@apply` mode, adjacent whitespace between utilities in the same parameter list is removed with the token (no lone gap left).
 *
 * @param editor - Active editor.
 * @param lastSnapshot - Latest Sail snapshot.
 * @param tokenIndex - Index in `classes`.
 * @returns Whether an edit was applied.
 *
 * @example await removeClassTokenAtCursor(editor, applyModeSnapshot, 0) => true when the first merged token is removed
 * @example await removeClassTokenAtCursor(editor, snapshot, 99) => false when `tokenIndex` is out of range
 */
export async function removeClassTokenAtCursor(
	editor: vscode.TextEditor,
	lastSnapshot: SailEditorSnapshot,
	tokenIndex: number,
): Promise<boolean> {
	const { context } = lastSnapshot;

	if (context.kind === "apply") {
		return removeClassFromApply(editor, context.tokenDocSpans, tokenIndex);
	}

	return removeClassFromString(editor, tokenIndex);
}
