import type { ScanResult } from "../types";
import { finalizeQuoted } from "../utils/finalizeQuoted";

/**
 * Consumes a single-quoted string literal starting at `openIdx` (the opening `'`), honoring `\\` escapes
 * and stopping on an unescaped newline (invalid literal). Behavior mirrors {@link tryDoubleQuote}
 * but uses `'` as the delimiter.
 *
 * @param text - Full source text
 * @param openIdx - Index of the opening `'`
 * @param offset - Cursor/index for extraction vs scan-only result
 * @returns End index after the literal (or at error/EOF position), optionally with `extracted`
 *
 * @example
 * trySingleQuote("x = 'ab';", 4, 6);
 * // → { end: 8, extracted: { rawContent: 'ab', startOffset: 4, endOffset: 8, ... } }
 *
 * @example
 * trySingleQuote("x = 'ab", 4, 5);
 * // → { end: 7 }  // EOF before closing quote; no `extracted`
 */
export function trySingleQuote(
	text: string,
	openIdx: number,
	offset: number,
): ScanResult {
	let i = openIdx + 1;
	while (i < text.length) {
		const c = text[i];
		if (c === "\\") {
			i += 2;
			continue;
		}
		if (c === "'") {
			return finalizeQuoted(text, openIdx, i, offset);
		}
		if (c === "\n" || c === "\r") {
			return { end: i };
		}
		i++;
	}
	return { end: text.length };
}
