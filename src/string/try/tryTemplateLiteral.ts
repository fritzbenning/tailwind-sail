import type { ExtractedStringOffsets, ScanResult } from '../types';
import { tryExpressionBlock } from './tryExpressionBlock';

/**
 * Scans a template literal starting at `openIdx` (the opening `` ` ``). Handles escapes,
 * `${ ... }` interpolations (via {@link tryExpressionBlock}), and nested template literals.
 * Returns `extracted` only when `offset` falls in a **static** (non-interpolation) span; if the
 * cursor is inside an interpolation without a nested string match, scanning continues without extraction.
 *
 * @param text - Full source text
 * @param openIdx - Index of the opening backtick
 * @param offset - Cursor/index to test
 * @returns End index after the literal (or after EOF), optionally with merged static `rawContent` and segments
 *
 * @example
 * // Cursor in static text → `rawContent` concatenates spans around `${...}`
 * tryTemplateLiteral('const c = `w-full ${x}grid`;', 10, 11);
 * // → {
 * //   end: 28,
 * //   extracted: {
 * //     rawContent: 'w-full grid',
 * //     startOffset: 10,
 * //     endOffset: 28,
 * //     rawToDocSegments: [
 * //       { rawStart: 0, rawEnd: 7, docStart: 11, docEnd: 19 },
 * //       { rawStart: 7, rawEnd: 11, docStart: 23, docEnd: 27 },
 * //     ],
 * //   },
 * // }
 *
 * @example
 * // Cursor only in `${` expression, no nested string → no `extracted`
 * tryTemplateLiteral('const c = `a ${foo} b`;', 10, 14);
 * // → { end: 24 } // end after closing backtick; `extracted` omitted
 */
export function tryTemplateLiteral(text: string, openIdx: number, offset: number): ScanResult {
	let i = openIdx + 1;
	const staticRanges: Array<{ start: number; end: number }> = [];
	let staticStart = openIdx + 1;

	while (i < text.length) {
		const c = text[i];
		if (c === '\\') {
			i += 2;
			continue;
		}
		if (c === '$' && text[i + 1] === '{') {
			staticRanges.push({ start: staticStart, end: i });
			const braceOpenIdx = i + 1;
			const sub = tryExpressionBlock(text, braceOpenIdx, offset);
			if (sub.extracted) {
				return { end: sub.end, extracted: sub.extracted };
			}
			i = sub.end;
			staticStart = i;
			continue;
		}
		if (c === '`') {
			const closeIdx = i;
			staticRanges.push({ start: staticStart, end: closeIdx });
			const rawContent = staticRanges.map((r) => text.slice(r.start, r.end)).join('');
			let rawAcc = 0;
			const rawToDocSegments = staticRanges.map((r) => {
				const piece = text.slice(r.start, r.end);
				const seg = {
					rawStart: rawAcc,
					rawEnd: rawAcc + piece.length,
					docStart: r.start,
					docEnd: r.end,
				};
				rawAcc += piece.length;
				return seg;
			});
			const insideStatic = staticRanges.some((r) => offset >= r.start && offset <= r.end);
			if (insideStatic) {
				const extracted: ExtractedStringOffsets = {
					rawContent,
					startOffset: openIdx,
					endOffset: closeIdx + 1,
					rawToDocSegments,
				};
				return {
					end: closeIdx + 1,
					extracted,
				};
			}
			return { end: closeIdx + 1 };
		}
		i++;
	}
	return { end: text.length };
}
