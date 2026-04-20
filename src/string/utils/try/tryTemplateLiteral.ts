import { ExtractedStringOffsets, ScanResult } from "../../types";
import { tryExpressionBlock } from "./tryExpressionBlock";

/**
 * Scans a template literal from `openIdx`; yields `extracted` only for static spans (not raw `${...}` unless a nested string matches).
 *
 * @param text - Full source.
 * @param openIdx - Index of the opening backtick.
 * @param offset - Cursor index.
 * @returns End index with optional merged `extracted`.
 *
 * @example tryTemplateLiteral('const c = `w-full ${x}grid`;', 10, 11).extracted?.rawContent => "w-full grid"
 */
export function tryTemplateLiteral(
	text: string,
	openIdx: number,
	offset: number,
): ScanResult {
	let i = openIdx + 1;
	const staticRanges: Array<{ start: number; end: number }> = [];
	let staticStart = openIdx + 1;

	while (i < text.length) {
		const c = text[i];
		if (c === "\\") {
			i += 2;
			continue;
		}
		if (c === "$" && text[i + 1] === "{") {
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
		if (c === "`") {
			const closeIdx = i;
			staticRanges.push({ start: staticStart, end: closeIdx });
			const rawContent = staticRanges
				.map((r) => text.slice(r.start, r.end))
				.join("");
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
			const insideStatic = staticRanges.some(
				(r) => offset >= r.start && offset <= r.end,
			);
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
