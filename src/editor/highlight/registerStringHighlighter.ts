import * as vscode from "vscode";
import type { SailEditorSnapshot } from "../types";
import { getFocusClassRange } from "./getFocusClassRange";
import { getSnapshotFocusFingerprint } from "./getSnapshotFocusFingerprint";

export type StringHighlighterHandle = {
	refresh(snapshot: SailEditorSnapshot): void;
	setFocusedClassToken(tokenIndex: number | undefined): void;
};

/**
 * Underlines the active `class` string or `@apply` directives when the Sail view is visible; clears stale decorations on other editors.
 *
 * Optionally highlights the class token matching the focused sidebar row (`setFocusedClassToken`).
 *
 * @param context - Extension context for `createTextEditorDecorationType` disposal.
 * @param isViewVisible - Predicate gating the highlight.
 * @returns Handle with `refresh(snapshot)` to update decorations and `setFocusedClassToken` for row focus.
 *
 * @example registerStringHighlighter(context, () => true).refresh(snapshot) => void
 */
export function registerStringHighlighter(
	context: vscode.ExtensionContext,
	isViewVisible: () => boolean,
): StringHighlighterHandle {
	const stringDecorationType = vscode.window.createTextEditorDecorationType({
		rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
		textDecoration: "underline",
	});

	const focusedClassDecorationType =
		vscode.window.createTextEditorDecorationType({
			rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
			backgroundColor: new vscode.ThemeColor("editor.wordHighlightBackground"),
		});
	context.subscriptions.push(stringDecorationType, focusedClassDecorationType);

	let lastSnapshot: SailEditorSnapshot = { context: { kind: "none" } };
	let focusedTokenIndex: number | undefined;
	let focusFingerprintWhenFocused: string | undefined;

	function clearAllDecorations(): void {
		for (const editor of vscode.window.visibleTextEditors) {
			editor.setDecorations(stringDecorationType, []);
			editor.setDecorations(focusedClassDecorationType, []);
		}
	}

	function paintFocusedClass(): void {
		for (const editor of vscode.window.visibleTextEditors) {
			editor.setDecorations(focusedClassDecorationType, []);
		}

		if (!isViewVisible()) {
			return;
		}

		const editor = vscode.window.activeTextEditor;
		if (!editor || focusedTokenIndex === undefined) {
			return;
		}

		const range = getFocusClassRange(
			lastSnapshot,
			focusedTokenIndex,
			editor.document,
		);
		if (!range) {
			return;
		}

		editor.setDecorations(focusedClassDecorationType, [range]);
	}

	function refresh(snapshot: SailEditorSnapshot): void {
		lastSnapshot = snapshot;

		const editor = vscode.window.activeTextEditor;
		if (
			focusedTokenIndex !== undefined &&
			focusFingerprintWhenFocused !== undefined &&
			editor
		) {
			const fp = getSnapshotFocusFingerprint(
				snapshot,
				editor.document.uri.toString(),
			);
			if (fp !== focusFingerprintWhenFocused) {
				focusedTokenIndex = undefined;
				focusFingerprintWhenFocused = undefined;
			}
		}

		clearAllDecorations();

		const enabled = vscode.workspace
			.getConfiguration("tailwind-sail")
			.get<boolean>("highlightActiveString", true);
		if (!enabled) {
			return;
		}

		if (!isViewVisible()) {
			return;
		}

		const activeEditor = vscode.window.activeTextEditor;

		if (!activeEditor) {
			return;
		}

		const { context: snapCtx } = snapshot;

		if (snapCtx.kind === "none") {
			paintFocusedClass();
			return;
		}

		if (snapCtx.kind === "apply") {
			if (snapCtx.applyHighlightRanges.length > 0) {
				activeEditor.setDecorations(
					stringDecorationType,
					Array.from(snapCtx.applyHighlightRanges),
				);
			}
			paintFocusedClass();
			return;
		}

		const { document } = activeEditor;

		const { rawToDocSegments } = snapCtx;

		const ranges: vscode.Range[] = [];

		for (const seg of rawToDocSegments) {
			const start = document.positionAt(seg.docStart);
			const end = document.positionAt(seg.docEnd);
			if (!start.isEqual(end)) {
				ranges.push(new vscode.Range(start, end));
			}
		}

		activeEditor.setDecorations(stringDecorationType, ranges);
		paintFocusedClass();
	}

	function setFocusedClassToken(tokenIndex: number | undefined): void {
		if (tokenIndex === undefined) {
			focusedTokenIndex = undefined;
			focusFingerprintWhenFocused = undefined;
			paintFocusedClass();
			return;
		}

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			focusedTokenIndex = undefined;
			focusFingerprintWhenFocused = undefined;
			paintFocusedClass();
			return;
		}

		focusedTokenIndex = tokenIndex;
		focusFingerprintWhenFocused = getSnapshotFocusFingerprint(
			lastSnapshot,
			editor.document.uri.toString(),
		);
		paintFocusedClass();
	}

	return { refresh, setFocusedClassToken };
}
