import { ScanResult } from "../../types";
import { finalizeQuoted } from "../finalizeQuoted";

/**
 * Scans a single-quoted literal from `openIdx`; returns `extracted` when `offset` is inside.
 *
 * @param text - Full source.
 * @param openIdx - Index of the opening `'`.
 * @param offset - Cursor index.
 * @returns End index with optional `extracted`.
 *
 * @example trySingleQuote("x = 'ab';", 4, 6).end => 8
 * @example trySingleQuote("x = 'ab", 4, 5).end => 7
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
