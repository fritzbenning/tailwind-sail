import * as vscode from "vscode";
import type { SailEditorSnapshot } from "../types";

export type StringHighlighterHandle = {
	refresh(snapshot: SailEditorSnapshot): void;
};

/**
 * Underlines the analyzed string literal when the Sail view is visible; clears stale decorations on other editors.
 *
 * @param context - Extension context for `createTextEditorDecorationType` disposal.
 * @param isTailwindSailViewVisible - Predicate gating the highlight.
 * @returns Handle with `refresh(snapshot)` to update decorations.
 *
 * @example registerStringHighlighter(context, () => true).refresh(snapshot) — void; updates underlines.
 */
export function registerStringHighlighter(
	context: vscode.ExtensionContext,
	isTailwindSailViewVisible: () => boolean,
): StringHighlighterHandle {
	const decorationType = vscode.window.createTextEditorDecorationType({
		rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
		// Underline only; omit `color` so editor/syntax colors stay unchanged.
		textDecoration: "underline",
	});
	context.subscriptions.push(decorationType);

	function refresh(snapshot: SailEditorSnapshot): void {
		for (const editor of vscode.window.visibleTextEditors) {
			editor.setDecorations(decorationType, []);
		}

		const enabled = vscode.workspace
			.getConfiguration("tailwind-sail")
			.get<boolean>("highlightActiveString", true);
		if (!enabled) {
			return;
		}

		if (!isTailwindSailViewVisible()) {
			return;
		}

		const editor = vscode.window.activeTextEditor;
		if (!editor || !snapshot.extracted) {
			return;
		}

		const { document } = editor;
		const { rawToDocSegments } = snapshot.extracted;
		const ranges: vscode.Range[] = [];
		for (const seg of rawToDocSegments) {
			const start = document.positionAt(seg.docStart);
			const end = document.positionAt(seg.docEnd);
			if (!start.isEqual(end)) {
				ranges.push(new vscode.Range(start, end));
			}
		}
		editor.setDecorations(decorationType, ranges);
	}

	return { refresh };
}
