import { skipBlockComment } from "../scan/skipBlockComment";
import { skipLineComment } from "../scan/skipLineComment";
import type { ScanResult } from "../types";
import { tryDoubleQuote } from "./tryDoubleQuote";
import { trySingleQuote } from "./trySingleQuote";
import { tryTemplateLiteral } from "./tryTemplateLiteral";

/**
 * Parses a `${ ... }` expression body: `braceOpenIdx` is the index of `{` in `${`. Consumes until the
 * matching `}` for that interpolation, respecting nested `{}` only outside strings and comments.
 * If a nested string contains `offset`, returns that nested {@link ScanResult.extracted} instead of
 * finishing the block.
 *
 * @param text - Full source text
 * @param braceOpenIdx - Index of `{` immediately after `$`
 * @param offset - Cursor/index for nested string extraction
 * @returns End index after the closing `}` (or EOF), or early `extracted` if a nested literal matched
 *
 * @example
 * // Cursor inside a nested string in the interpolation (braceOpenIdx is the `{` after `$`)
 * tryExpressionBlock('\`x ${ "ab" } y\`', 4, 8);
 * // → { end: 10, extracted: { rawContent: 'ab', startOffset: 6, endOffset: 10, ... } }
 *
 * @example
 * // Cursor only in the expression, not in a nested string
 * tryExpressionBlock('\`x ${ foo } y\`', 4, 8);
 * // → { end: 11 }  // end after `}`; no `extracted`
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
