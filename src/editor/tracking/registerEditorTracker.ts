import * as vscode from "vscode";
import { SailTailwindViewProvider } from "../../webview/SailTailwindViewProvider";
import type { StringHighlighterHandle } from "../highlight/registerStringHighlighter";
import { refreshNow as runImmediateRefresh } from "../utils/refreshNow";
import { scheduleUpdate } from "../utils/scheduleUpdate";
import { onDocumentChange } from "./onDocumentChange";
import { onSelectionChange } from "./onSelectionChange";
import { pushSnapshot } from "./pushSnapshot";

export interface EditorTrackerHandle {
	/** Forces an immediate refresh (used by the “Sail: Refresh” command). */
	refreshNow: () => void;
}

/**
 * Subscribes to editor/selection/document updates, debounces work, and pushes snapshots to the
 * webview. Uses the **primary** selection’s active position (not the selection range extent).
 */
export function registerEditorTracker(
	viewProvider: SailTailwindViewProvider,
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
				e.affectsConfiguration("sail.updateDebounceMs") ||
				e.affectsConfiguration("sail.highlightActiveString")
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
