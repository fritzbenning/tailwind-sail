import * as vscode from 'vscode';
import type { ExtractedString } from '../types';
import { extractStringAtOffset } from './extractStringAtOffset';

/**
 * Given the active editor cursor (primary selection anchor), finds whether that offset lies
 * inside a JavaScript/TypeScript-style string literal and returns the literal’s full text
 * and document range.
 *
 * ## How this works (pragmatic lexer)
 * This module walks the file from the top with a small tokenizer that understands:
 * - Line comments and block comments (strings inside comments are ignored as “code strings”)
 * - Double-quoted, single-quoted, and backtick template literals with common escapes
 * - Template interpolations (`${ ... }`) — expression bodies are scanned separately for nested strings
 *
 * For template literals, **only the static (text) spans** between `${...}` chunks count as
 * “inside the string literal” for Tailwind class extraction. If the cursor is inside a
 * `${ ... }` expression, we recurse into expression mode; a nested `"foo"` is treated as a
 * real string literal (cursor inside `"foo"` counts).
 *
 * ## Limitations (replace with AST later)
 * - Not a full JS/TS parser: regex literals vs division, JSX, type assertions, and other
 *   edge cases can confuse the scan.
 * - Other languages are only partially approximated if they happen to resemble JS strings.
 * - A tree-sitter or TypeScript AST walk would be the robust long-term replacement; this
 *   structure isolates that future swap to this module’s public API.
 *
 * @param document - Active VS Code document whose text is scanned
 * @param position - Cursor position (primary selection anchor)
 * @returns {@link ExtractedString} with `range` covering the full literal including delimiters, or `undefined`
 *
 * @example
 * // Document text: `const x = "flex gap-2";` and cursor on `g`
 * // Same inner fields as {@link extractStringAtOffset}, but `range` uses `document.positionAt`:
 * // → {
 * //   rawContent: 'flex gap-2',
 * //   range: Range spanning offsets 10–21 (opening quote through closing quote),
 * //   rawToDocSegments: [{ rawStart: 0, rawEnd: 10, docStart: 11, docEnd: 21 }],
 * // }
 */
export function extractStringAtCursor(document: vscode.TextDocument, position: vscode.Position): ExtractedString | undefined {
	const offset = document.offsetAt(position);
	const text = document.getText();
	const inner = extractStringAtOffset(text, offset);
	if (!inner) {
		return undefined;
	}
	return {
		rawContent: inner.rawContent,
		range: new vscode.Range(document.positionAt(inner.startOffset), document.positionAt(inner.endOffset)),
		rawToDocSegments: inner.rawToDocSegments,
	};
}
