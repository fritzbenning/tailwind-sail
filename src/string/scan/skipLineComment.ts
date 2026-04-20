/**
 * Skips a `//` comment from the first `/`; leaves the line terminator unconsumed.
 *
 * @param text - Full source.
 * @param start - Index of the first `/` of `//`.
 * @returns Index of the newline ending the comment, or `text.length` if none.
 *
 * @example skipLineComment("a // hi\nb", 2) => 7
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
