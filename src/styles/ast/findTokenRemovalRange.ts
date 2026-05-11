import type { ApplyTokenDocSpan } from "../../editor/types";

/**
 * Widens a token’s document half-open range so removal also deletes the adjacent gap (whitespace) between utilities in `@apply` parameters.
 *
 * @param fullText - Full document text (same coordinate system as `docStart` / `docEnd`).
 * @param spans - Per-token spans for the active rule’s merged list.
 * @param tokenIndex - Index of the token being removed.
 * @returns Expanded `[docStart, docEnd)` (may equal the original when there is no adjacent gap), or `undefined` when `tokenIndex` has no span.
 *
 * @example findTokenRemovalRange("flex gap-2", [{ docStart: 0, docEnd: 4 }, { docStart: 5, docEnd: 10 }], 1) => { docStart: 4, docEnd: 10 }
 */
export function findTokenRemovalRange(
	fullText: string,
	spans: readonly ApplyTokenDocSpan[],
	tokenIndex: number,
): { docStart: number; docEnd: number } | undefined {
	const span = spans[tokenIndex];

	if (!span) {
		return undefined;
	}

	let { docStart: start, docEnd: end } = span;

	while (end < fullText.length && /\s/.test(fullText.charAt(end))) {
		end++;
	}

	if (end === span.docEnd && tokenIndex > 0) {
		const prevEnd = spans[tokenIndex - 1]!.docEnd;
		while (start > prevEnd && /\s/.test(fullText.charAt(start - 1))) {
			start--;
		}
	}

	return { docStart: start, docEnd: end };
}
