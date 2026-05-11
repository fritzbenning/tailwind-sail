import * as vscode from "vscode";
import type { SailEditorSnapshot } from "../types";

export type StringHighlighterHandle = {
	refresh(snapshot: SailEditorSnapshot): void;
};

/**
 * Underlines the active `class` string or `@apply` directives when the Sail view is visible; clears stale decorations on other editors.
 *
 * @param context - Extension context for `createTextEditorDecorationType` disposal.
 * @param isViewVisible - Predicate gating the highlight.
 * @returns Handle with `refresh(snapshot)` to update decorations.
 *
 * @example registerStringHighlighter(context, () => true).refresh(snapshot) => void
 */
export function registerStringHighlighter(
	context: vscode.ExtensionContext,
	isViewVisible: () => boolean,
): StringHighlighterHandle {
	const decorationType = vscode.window.createTextEditorDecorationType({
		rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
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

		if (!isViewVisible()) {
			return;
		}

		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		const { context: snapCtx } = snapshot;

		if (snapCtx.kind === "none") {
			return;
		}

		if (snapCtx.kind === "apply") {
			if (snapCtx.applyHighlightRanges.length === 0) {
				return;
			}

			editor.setDecorations(
				decorationType,
				Array.from(snapCtx.applyHighlightRanges),
			);
			return;
		}

		const { document } = editor;

		const { rawToDocSegments } = snapCtx;

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
