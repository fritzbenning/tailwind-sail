import * as vscode from "vscode";
import type { SailEditorSnapshot } from "../types";

export type HighlightActiveStringHandle = {
	refresh(snapshot: SailEditorSnapshot): void;
};

/**
 * Underlines the string literal Sail is currently analyzing so it stays visually linked to the
 * sidebar. Clears the same decoration on all visible editors first so inactive splits do not keep
 * a stale highlight when focus moves.
 *
 * Underlines apply only while the Sail sidebar webview is visible (see `isSailViewVisible`).
 */
export function registerHighlightActiveString(
	context: vscode.ExtensionContext,
	isSailViewVisible: () => boolean,
): HighlightActiveStringHandle {
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
			.getConfiguration("sail")
			.get<boolean>("highlightActiveString", true);
		if (!enabled) {
			return;
		}

		if (!isSailViewVisible()) {
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
