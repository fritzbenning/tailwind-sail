import { scanTopLevelCode } from "../scan/scanTopLevelCode";
import type { ExtractedStringOffsets } from "../types";

/**
 * Returns the JS/TS string literal (double, single, or template static regions) that contains
 * `offset`, or `undefined` if the index is outside any such literal or out of bounds. Same lexer
 * rules as {@link extractStringAtCursor}, without a VS Code document.
 *
 * @param text - Full source string
 * @param offset - 0-based character index of the simulated cursor
 * @returns Offsets and `rawContent` / `rawToDocSegments`, or `undefined`
 *
 * @example
 * extractStringAtOffset('const x = "flex gap-2";', 15);
 * // → {
 * //   rawContent: 'flex gap-2',
 * //   startOffset: 10,
 * //   endOffset: 22,
 * //   rawToDocSegments: [{ rawStart: 0, rawEnd: 10, docStart: 11, docEnd: 21 }],
 * // }
 *
 * @example
 * extractStringAtOffset('const x = "flex";', 0);
 * // → undefined  // cursor on `const`, not inside the string
 *
 * @example
 * extractStringAtOffset('const x = "flex";', 99);
 * // → undefined  // offset past end of text
 */
export function extractStringAtOffset(
	text: string,
	offset: number,
): ExtractedStringOffsets | undefined {
	if (offset < 0 || offset > text.length) {
		return undefined;
	}
	if (offset === text.length) {
		return undefined;
	}
	return scanTopLevelCode(text, offset);
}
