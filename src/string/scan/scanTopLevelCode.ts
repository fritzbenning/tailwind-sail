import type { ExtractedStringOffsets } from "../types";
import { tryDoubleQuote } from "../utils/try/tryDoubleQuote";
import { trySingleQuote } from "../utils/try/trySingleQuote";
import { tryTemplateLiteral } from "../utils/try/tryTemplateLiteral";
import { skipBlockComment } from "./skipBlockComment";
import { skipLineComment } from "./skipLineComment";

/**
 * Scans top-level code (skipping comments) and returns the first string literal that contains `offset`.
 *
 * @param text - Full source text.
 * @param offset - Cursor index to resolve.
 * @returns Extracted string offsets, or `undefined` if none match.
 *
 * @example scanTopLevelCode('const y = "yes";', 15)?.rawContent => "yes"
 */
export function scanTopLevelCode(
	text: string,
	offset: number,
): ExtractedStringOffsets | undefined {
	let i = 0;
	while (i < text.length) {
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
				return r.extracted;
			}
			i = r.end;
			continue;
		}
		if (c === "'") {
			const r = trySingleQuote(text, i, offset);
			if (r.extracted) {
				return r.extracted;
			}
			i = r.end;
			continue;
		}
		if (c === "`") {
			const r = tryTemplateLiteral(text, i, offset);
			if (r.extracted) {
				return r.extracted;
			}
			i = r.end;
			continue;
		}
		i++;
	}
	return undefined;
}
