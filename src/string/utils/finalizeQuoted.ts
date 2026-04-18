import type { ExtractedStringOffsets, ScanResult } from '../types';

/**
 * Builds a {@link ScanResult} for a fully scanned single- or double-quoted string when the closing
 * delimiter is known. If `offset` lies inside the literal (including immediately before the
 * closing quote, matching VS Code caret semantics), returns `extracted` with `rawContent` and
 * segment mapping; otherwise returns only `end` so scanning can continue.
 *
 * @param text - Full source text
 * @param openIdx - Index of the opening `"` or `'`
 * @param closeIdx - Index of the closing quote (not included in `rawContent`)
 * @param offset - Cursor/index to test for “inside the literal”
 * @returns Scan result ending at `closeIdx + 1`, optionally with extracted offsets
 *
 * @example
 * // Cursor inside the string → includes `extracted` with content between quotes
 * finalizeQuoted('const x = "flex gap-2";', 10, 21, 15);
 * // → {
 * //   end: 22,
 * //   extracted: {
 * //     rawContent: 'flex gap-2',
 * //     startOffset: 10,
 * //     endOffset: 22,
 * //     rawToDocSegments: [{ rawStart: 0, rawEnd: 10, docStart: 11, docEnd: 21 }],
 * //   },
 * // }
 *
 * @example
 * // Cursor before the opening quote → not inside; only advances past the literal
 * finalizeQuoted('const x = "flex";', 10, 15, 5);
 * // → { end: 16 }
 */
export function finalizeQuoted(text: string, openIdx: number, closeIdx: number, offset: number): ScanResult {
	// VS Code: caret before the closing `"` uses `offset === closeIdx`.
	const inside = offset > openIdx && offset <= closeIdx;
	if (!inside) {
		return { end: closeIdx + 1 };
	}
	const rawContent = text.slice(openIdx + 1, closeIdx);
	return {
		end: closeIdx + 1,
		extracted: {
			rawContent,
			startOffset: openIdx,
			endOffset: closeIdx + 1,
			rawToDocSegments: [
				{ rawStart: 0, rawEnd: rawContent.length, docStart: openIdx + 1, docEnd: closeIdx },
			],
		},
	};
}
