/**
 * Advances past a block comment that starts with slash-star at `start`. `start` must be the index
 * of the first `/`. If the closing star-slash pair is never found, returns `text.length`.
 *
 * @param text - Full source text
 * @param start - Index where the block comment begins (`/` of slash-star)
 * @returns Index immediately after the closing delimiter, or `text.length` if unterminated
 *
 * @example
 * const text = 'before /' + '* note *' + '/ after';
 * skipBlockComment(text, 7);
 * // → 17  // index of the space before `after`
 *
 * @example
 * const open = '/*' + ' unfinished';
 * skipBlockComment(open, 0);
 * // → 13  // `text.length` when there is no closing delimiter
 */
export function skipBlockComment(text: string, start: number): number {
	let i = start + 2;
	while (i + 1 < text.length) {
		if (text[i] === '*' && text[i + 1] === '/') {
			return i + 2;
		}
		i++;
	}
	return text.length;
}
