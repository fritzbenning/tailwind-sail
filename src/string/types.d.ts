import type * as vscode from "vscode";

/**
 * Maps a contiguous slice of the logical `rawContent` string (concatenated static template spans)
 * to a contiguous range in the source document. Used to apply edits to individual class tokens.
 *
 * @example
 * // For `const x = "flex gap-2";`, `rawContent` is `flex gap-2` and one segment covers all of it:
 * { rawStart: 0, rawEnd: 10, docStart: 11, docEnd: 21 }
 */
export interface RawToDocSegment {
	readonly rawStart: number;
	readonly rawEnd: number;
	readonly docStart: number;
	readonly docEnd: number;
}

/**
 * Result of locating a string literal at the active cursor.
 * `range` spans the full literal in the document, including opening/closing delimiters.
 *
 * @example
 * // Cursor inside the quotes in `const x = "flex gap-2";`
 * // → rawContent: `flex gap-2`, range includes both ASCII quote delimiters, segments map `rawContent` into the file
 */
export interface ExtractedString {
	readonly rawContent: string;
	readonly range: vscode.Range;
	readonly rawToDocSegments: readonly RawToDocSegment[];
}

/**
 * Internal shape while scanning by offset (0-based indices into the document string).
 *
 * @example
 * // Same logical content as {@link ExtractedString} for `const x = "flex gap-2";` at cursor on `g`:
 * // { rawContent: 'flex gap-2', startOffset: 10, endOffset: 22, rawToDocSegments: [...] }
 */
export interface ExtractedStringOffsets {
	readonly rawContent: string;
	readonly startOffset: number;
	readonly endOffset: number;
	readonly rawToDocSegments: readonly RawToDocSegment[];
}

/**
 * Result of consuming one syntactic construct during the string lexer (quoted literal, template, or `${}` block).
 *
 * @example
 * // After a double-quoted literal with cursor inside: `end` is past the closing `"`, `extracted` present
 * // → { end: 22, extracted: { rawContent: 'flex gap-2', startOffset: 10, endOffset: 22, ... } }
 *
 * @example
 * // After scanning a literal with cursor outside: only `end` advances the outer scan
 * // → { end: 22 }
 */
export interface ScanResult {
	/** Index immediately after the consumed construct (exclusive). */
	readonly end: number;
	readonly extracted?: ExtractedStringOffsets;
}
