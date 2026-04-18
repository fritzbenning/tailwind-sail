import * as vscode from "vscode";
import { extractStringAtCursor } from "../../string/extract/extractStringAtCursor";
import { parseTailwindClasses } from "../../tailwind/parse/parseTailwindClasses";
import { SailTailwindViewProvider } from "../../webview/SailTailwindViewProvider";
import type { StringHighlighterHandle } from "../highlight/registerStringHighlighter";
import { SailEditorSnapshot } from "../types";

export function pushSnapshot(
	viewProvider: SailTailwindViewProvider,
	stringHighlighter: StringHighlighterHandle,
): void {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		const empty: SailEditorSnapshot = {
			extracted: undefined,
			parsed: undefined,
		};
		viewProvider.update(empty);
		stringHighlighter.refresh(empty);
		return;
	}

	const position = editor.selection.active;
	const extracted = extractStringAtCursor(editor.document, position);
	const parsed = extracted
		? parseTailwindClasses(extracted.rawContent)
		: undefined;
	const snapshot: SailEditorSnapshot = { extracted, parsed };

	viewProvider.update(snapshot);
	stringHighlighter.refresh(snapshot);
}
