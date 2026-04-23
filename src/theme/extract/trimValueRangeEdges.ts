/**
 * Narrows `[start, end)` to the first and last non-whitespace code units (for editor selection).
 */
export function trimValueRangeEdges(
	fullText: string,
	start: number,
	end: number,
): { start: number; end: number } {
	let s = start;
	while (s < end && /\s/.test(fullText[s]!)) {
		s++;
	}
	let e = end;
	while (e > s && /\s/.test(fullText[e - 1]!)) {
		e--;
	}
	return { start: s, end: e };
}
