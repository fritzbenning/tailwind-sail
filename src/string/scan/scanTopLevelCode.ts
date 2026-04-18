import type { ExtractedStringOffsets } from '../types';
import { skipBlockComment } from './skipBlockComment';
import { skipLineComment } from './skipLineComment';
import { tryDoubleQuote } from '../try/tryDoubleQuote';
import { trySingleQuote } from '../try/trySingleQuote';
import { tryTemplateLiteral } from '../try/tryTemplateLiteral';

/**
 * Walks `text` from the start, skipping line/block comments, and tries each string literal
 * (`"`, `'`, `` ` ``). Returns the first literal for which `offset` is inside the extracted
 * content (per {@link tryDoubleQuote}, {@link trySingleQuote}, {@link tryTemplateLiteral}).
 *
 * @param text - Full source text
 * @param offset - Cursor/index that must fall inside a literal’s extractable region
 * @returns Extracted offsets or `undefined` if no matching literal appears before EOF
 *
 * @example
 * // Finds the string containing the cursor even when earlier code exists
 * const src = 'const x = 1;\nconst y = "hi";';
 * scanTopLevelCode(src, src.indexOf('i'));
 * // → { rawContent: 'hi', startOffset: 23, endOffset: 27, rawToDocSegments: [...] }
 *
 * @example
 * // Strings inside comments are ignored
 * const src2 = '// const fake = "nope"\nconst y = "yes";';
 * scanTopLevelCode(src2, src2.indexOf('yes'));
 * // → { rawContent: 'yes', ... }  // not the commented-out "nope"
 */
export function scanTopLevelCode(text: string, offset: number): ExtractedStringOffsets | undefined {
	let i = 0;
	while (i < text.length) {
		const c = text[i];
		if (c === '/' && text[i + 1] === '/') {
			i = skipLineComment(text, i);
			continue;
		}
		if (c === '/' && text[i + 1] === '*') {
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
		if (c === '`') {
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
