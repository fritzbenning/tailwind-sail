import type { ExtractedStringOffsets, ScanResult } from "../types";

/**
 * Completes a quoted literal: returns `extracted` when `offset` is inside `(open, close]` (VS Code caret rules), else `{ end }` only.
 *
 * @param text - Full source.
 * @param openIdx - Index of the opening quote.
 * @param closeIdx - Index of the closing quote.
 * @param offset - Cursor index being tested.
 * @returns Scan result with optional `extracted` offsets.
 *
 * @example finalizeQuoted('x="ab";', 2, 5, 4).end => 6
 */
export function finalizeQuoted(
	text: string,
	openIdx: number,
	closeIdx: number,
	offset: number,
): ScanResult {
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
				{
					rawStart: 0,
					rawEnd: rawContent.length,
					docStart: openIdx + 1,
					docEnd: closeIdx,
				},
			],
		},
	};
}
