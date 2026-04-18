/**
 * Advances past a `//` line comment starting at `start`. Stops at `\n`, `\r`, or EOF without
 * consuming the newline (so the caller continues scanning from the line break).
 *
 * @param text - Full source text
 * @param start - Index of `//`
 * @returns Index of the newline that terminated the comment, or `text.length` if none
 *
 * @example
 * skipLineComment('a // hi\nb', 2);
 * // → 7  // index of `\n` before `b`
 *
 * @example
 * skipLineComment('a // eof', 2);
 * // → 8  // `text.length` (no newline)
 */
export function skipLineComment(text: string, start: number): number {
	let i = start + 2;
	while (i < text.length) {
		const c = text[i];
		if (c === "\n" || c === "\r") {
			return i;
		}
		i++;
	}
	return text.length;
}
