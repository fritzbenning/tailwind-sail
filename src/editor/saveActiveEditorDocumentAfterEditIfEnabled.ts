import type * as vscode from "vscode";
import { readSaveDocumentAfterEdit } from "../webview/settings/readSaveDocumentAfterEdit";

/**
 * Saves `editor.document` when `tailwind-sail.saveDocumentAfterEdit` is enabled.
 *
 * Used after successful Sail-driven mutations (add/remove class, stepped scale, committed token input).
 * Live token typing stays unsaved until the user blurs the input or triggers an explicit save elsewhere.
 *
 * @param editor - Active text editor whose document should be persisted.
 *
 * @example await saveActiveEditorDocumentAfterEditIfEnabled(editor) // no-op when setting is off
 */
export async function saveActiveEditorDocumentAfterEditIfEnabled(
	editor: vscode.TextEditor,
): Promise<void> {
	if (!readSaveDocumentAfterEdit()) {
		return;
	}
	await editor.document.save();
}
