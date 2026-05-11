import * as vscode from "vscode";
import type { SailEditorSnapshot } from "../types";
import { addClassToApply } from "./addClassToApply";
import { addClassToString } from "./addClassToString";

/**
 * Appends a single utility to the active context: last `@apply` in stylesheet mode, or the class string at the caret.
 *
 * @param editor - Active editor.
 * @param lastSnapshot - Latest Sail snapshot (stylesheet insert uses `insertDocOffset` on `apply` context).
 * @param rawClassName - User-entered token (may include variant prefixes; single logical token per `addClassToString` rules).
 * @returns Whether an edit was applied.
 *
 * @example await addClassAtCursor(editor, applyContextSnapshot, "gap-2") => true when insert succeeds
 * @example await addClassAtCursor(editor, snapshot, "  ") => false
 */
export async function addClassAtCursor(
	editor: vscode.TextEditor,
	lastSnapshot: SailEditorSnapshot,
	rawClassName: string,
): Promise<boolean> {
	const trimmed = rawClassName.trim();

	if (trimmed.length === 0 || /\s/.test(trimmed)) {
		return false;
	}

	const { context } = lastSnapshot;

	if (context.kind === "apply" && context.insertDocOffset !== undefined) {
		return addClassToApply(editor, context.insertDocOffset, rawClassName);
	}

	return addClassToString(editor, rawClassName);
}
