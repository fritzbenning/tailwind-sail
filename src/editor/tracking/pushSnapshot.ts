import * as vscode from "vscode";
import { findTailwindStringAtCursor } from "../../string/extract/findTailwindStringAtCursor";
import { findTailwindApplyAtCursor } from "../../styles/apply/findTailwindApplyAtCursor";
import { ViewProvider } from "../../webview/ViewProvider";
import type { SailEditorSnapshot } from "../types";

/**
 * Recomputes the Sail snapshot from the active editor, updates the sidebar webview, and runs `refreshHighlights` so decorations match.
 *
 * With no active editor, sends an empty snapshot so the UI clears.
 *
 * @param viewProvider - Sidebar host to `update` with the new snapshot.
 * @param refreshHighlights - Invoked after every `update` with the same snapshot (e.g. `stringHighlighter.refresh`).
 * @returns Nothing.
 *
 * @example pushSnapshot(viewProvider, (s) => stringHighlighter.refresh(s)) => void
 */
export function pushSnapshot(
	viewProvider: ViewProvider,
	refreshHighlights: (snapshot: SailEditorSnapshot) => void,
): void {
	const publishSnapshot = (snapshot: SailEditorSnapshot) => {
		viewProvider.update(snapshot);
		refreshHighlights(snapshot);
	};

	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		publishSnapshot({ context: { kind: "none" } });
		return;
	}

	const position = editor.selection.active;
	const document = editor.document;

	const stringResult = findTailwindStringAtCursor(document, position);

	if (stringResult) {
		publishSnapshot({
			context: { kind: "string", ...stringResult },
		});

		return;
	}

	const applyResult = findTailwindApplyAtCursor(document, position);

	if (applyResult) {
		publishSnapshot({
			context: { kind: "apply", ...applyResult },
		});

		return;
	}

	publishSnapshot({ context: { kind: "none" } });
}
