import * as vscode from "vscode";
import type { ExtractedString } from "../types";
import { extractStringAtOffset } from "./extractStringAtOffset";

/**
 * Lexes the document from the top (comments skipped; template static spans and nested strings in `${}` supported) and returns the string at the cursor, or `undefined`. Heuristic lexer, not a full JS/TS parse.
 *
 * @param document - Active editor document.
 * @param position - Primary selection position.
 * @returns Extracted string with VS Code `Range`, or `undefined`.
 *
 * @example extractStringAtOffset('x = "ab";', 6)?.rawContent => "ab" (same lexer as cursor API).
 */
export function extractStringAtCursor(
	document: vscode.TextDocument,
	position: vscode.Position,
): ExtractedString | undefined {
	const offset = document.offsetAt(position);
	const text = document.getText();
	const inner = extractStringAtOffset(text, offset);
	if (!inner) {
		return undefined;
	}
	return {
		rawContent: inner.rawContent,
		range: new vscode.Range(
			document.positionAt(inner.startOffset),
			document.positionAt(inner.endOffset),
		),
		rawToDocSegments: inner.rawToDocSegments,
	};
}
