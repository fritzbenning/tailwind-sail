import { skipBlockComment } from "../../scan/skipBlockComment";
import { skipLineComment } from "../../scan/skipLineComment";
import { ScanResult } from "../../types";
import { tryDoubleQuote } from "./tryDoubleQuote";
import { trySingleQuote } from "./trySingleQuote";
import { tryTemplateLiteral } from "./tryTemplateLiteral";

/**
 * Scans `${...}` from the `{` index; returns nested string `extracted` when `offset` hits a nested literal, else ends at the matching `}`.
 *
 * @param text - Full source.
 * @param braceOpenIdx - Index of `{` after `$`.
 * @param offset - Cursor index.
 * @returns Scan end, optionally with nested `extracted`.
 *
 * @example tryExpressionBlock("`x ${ \"ab\" } y`", 4, 8).extracted?.rawContent => "ab"
 * @example tryExpressionBlock("`x ${ foo } y`", 4, 8).end => 11
 */
export function tryExpressionBlock(
	text: string,
	braceOpenIdx: number,
	offset: number,
): ScanResult {
	let i = braceOpenIdx + 1;
	let depth = 1;

	while (i < text.length && depth > 0) {
		const c = text[i];
		if (c === "/" && text[i + 1] === "/") {
			i = skipLineComment(text, i);
			continue;
		}
		if (c === "/" && text[i + 1] === "*") {
			i = skipBlockComment(text, i);
			continue;
		}
		if (c === '"') {
			const r = tryDoubleQuote(text, i, offset);
			if (r.extracted) {
				return { end: r.end, extracted: r.extracted };
			}
			i = r.end;
			continue;
		}
		if (c === "'") {
			const r = trySingleQuote(text, i, offset);
			if (r.extracted) {
				return { end: r.end, extracted: r.extracted };
			}
			i = r.end;
			continue;
		}
		if (c === "`") {
			const r = tryTemplateLiteral(text, i, offset);
			if (r.extracted) {
				return { end: r.end, extracted: r.extracted };
			}
			i = r.end;
			continue;
		}
		if (c === "{") {
			depth++;
			i++;
			continue;
		}
		if (c === "}") {
			depth--;
			if (depth === 0) {
				return { end: i + 1 };
			}
			i++;
			continue;
		}
		i++;
	}
	return { end: text.length };
}
