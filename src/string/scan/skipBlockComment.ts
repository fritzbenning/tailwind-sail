/**
 * Skips a C-style block comment starting at `start` (the `/` before the `*`); returns `text.length` if the close delimiter is missing.
 *
 * @param text - Full source.
 * @param start - Index of the opening `/`.
 * @returns Index immediately after the closing delimiter, or `text.length` if unterminated.
 *
 * @example skipBlockComment("\u002f* x *\u002f", 0) => 7
 */
export function skipBlockComment(text: string, start: number): number {
	let i = start + 2;
	while (i + 1 < text.length) {
		if (text[i] === "*" && text[i + 1] === "/") {
			return i + 2;
		}
		i++;
	}
	return text.length;
}
