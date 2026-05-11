import type * as vscode from "vscode";

/**
 * Maps a slice of merged `rawContent` to document offsets for edits.
 *
 * @property rawStart - Inclusive start in logical `rawContent`.
 *
 * @property rawEnd - Exclusive end in logical `rawContent`.
 * @property docStart - Inclusive document offset.
 *
 * @property docEnd - Exclusive document offset.
 * @example { rawStart: 0, rawEnd: 4, docStart: 11, docEnd: 15 }
 */
export interface RawToDocSegment {
	readonly rawStart: number;
	readonly rawEnd: number;
	readonly docStart: number;
	readonly docEnd: number;
}

/**
 * String at the cursor: `range` includes delimiters; `rawContent` excludes them.
 *
 * @property rawContent - Inside the quotes, escapes applied as in source.
 *
 * @property range - Full literal in the document.
 * @property rawToDocSegments - Maps `rawContent` indices to file offsets.
 *
 * @example See tests for `findTailwindStringAtCursor` (includes `classes` and `isTailwind`).
 */
export interface ExtractedString {
	readonly rawContent: string;
	readonly range: vscode.Range;
	readonly rawToDocSegments: readonly RawToDocSegment[];
}

/**
 * Offset-based extraction result (same logical content as {@link ExtractedString}).
 *
 * @property rawContent - Logical string content.
 *
 * @property startOffset - Document offset of opening delimiter.
 * @property endOffset - Document offset after closing delimiter.
 *
 * @property rawToDocSegments - Maps `rawContent` indices to file offsets.
 * @example { rawContent: "p-4", startOffset: 10, endOffset: 16, rawToDocSegments: [] }
 */
export interface ExtractedStringOffsets {
	readonly rawContent: string;
	readonly startOffset: number;
	readonly endOffset: number;
	readonly rawToDocSegments: readonly RawToDocSegment[];
}

/**
 * Lexer step: advance to `end`; optional `extracted` when the cursor matched inside.
 *
 * @property end - Exclusive index after the consumed construct.
 *
 * @property extracted - Present when `offset` was inside the literal.
 * @example { end: 8, extracted: { rawContent: "ab", startOffset: 4, endOffset: 8, rawToDocSegments: [] } }
 */
export interface ScanResult {
	readonly end: number;
	readonly extracted?: ExtractedStringOffsets;
}
