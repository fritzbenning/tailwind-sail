import * as vscode from "vscode";
import { ViewProvider } from "../../webview/ViewProvider";
import type { StringHighlighterHandle } from "../highlight/registerStringHighlighter";
import { refreshNow as runImmediateRefresh } from "../utils/refreshNow";
import { scheduleUpdate } from "../utils/scheduleUpdate";
import { onDocumentChange } from "./onDocumentChange";
import { onSelectionChange } from "./onSelectionChange";
import { pushSnapshot } from "./pushSnapshot";

/**
 * Subscription bundle for editor-driven Sail updates.
 *
 * @property refreshNow - Runs an immediate snapshot (Tailwind Sail: Refresh).
 */
export interface EditorTrackerHandle {
	refreshNow: () => void;
}

/**
 * Debounced editor, selection, and document listeners feeding the webview snapshot (primary caret only).
 *
 * @param viewProvider - Webview bridge.
 * @param stringHighlighter - Highlight refresh target.
 * @param context - Extension context for subscriptions.
 * @returns Handle with debounced and immediate refresh entry points.
 *
 * @example registerEditorTracker(provider, highlighter, context).refreshNow() — fires immediate snapshot.
 */
export function registerEditorTracker(
	viewProvider: ViewProvider,
	stringHighlighter: StringHighlighterHandle,
	context: vscode.ExtensionContext,
): EditorTrackerHandle {
	const debounceTimer: { current: ReturnType<typeof setTimeout> | undefined } =
		{
			current: undefined,
		};

	const runSchedule = () =>
		scheduleUpdate({
			debounceTimer,
			onFire: () => pushSnapshot(viewProvider, stringHighlighter),
		});

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(() => runSchedule()),
		vscode.window.onDidChangeTextEditorSelection((e) =>
			onSelectionChange(e.textEditor, runSchedule),
		),
		vscode.workspace.onDidChangeTextDocument((e) =>
			onDocumentChange(e, runSchedule),
		),
		vscode.workspace.onDidChangeConfiguration((e) => {
			if (
				e.affectsConfiguration("tailwind-sail.updateDebounceMs") ||
				e.affectsConfiguration("tailwind-sail.highlightActiveString")
			) {
				runSchedule();
			}
		}),
	);
	runSchedule();

	return {
		refreshNow: () =>
			runImmediateRefresh({
				debounceTimer,
				onFire: () => pushSnapshot(viewProvider, stringHighlighter),
			}),
	};
}
