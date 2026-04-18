/**
 * Parses Tailwind `class` attribute text: whitespace-separated tokens with source spans, plus
 * {@link ParsedTailwindResult.looksLikeTailwind | looksLikeTailwind} from prefix heuristics (not
 * validation against a project config). Shared by editor and webview code.
 */

import { containTailwindClasses } from '../detect/containTailwindClasses';
import type { ParsedTailwindClass, ParsedTailwindResult } from './types';

/**
 * Splits on whitespace into class tokens and records each token’s half-open span `[startInRaw, endInRaw)` in `input`.
 *
 * @param input - Raw `class` string (content only; no surrounding quotes).
 * @returns {@link ParsedTailwindResult} with every non-empty token and a coarse Tailwind-like hint.
 *
 * @example
 * ```ts
 * parseTailwindClasses('  p-4   m-2 ')
 * // {
 * //   classes: [
 * //     { name: 'p-4', startInRaw: 2, endInRaw: 5 },
 * //     { name: 'm-2', startInRaw: 8, endInRaw: 11 },
 * //   ],
 * //   looksLikeTailwind: true,
 * // }
 * ```
 */
export function parseTailwindClasses(input: string): ParsedTailwindResult {
	const classes: ParsedTailwindClass[] = [];
	let i = 0;
	const n = input.length;

	while (i < n) {
		while (i < n && /\s/.test(input.charAt(i))) {
			i++;
		}
		if (i >= n) {
			break;
		}
		const startInRaw = i;
		while (i < n && !/\s/.test(input.charAt(i))) {
			i++;
		}
		const endInRaw = i;
		const name = input.slice(startInRaw, endInRaw);
		classes.push({ name, startInRaw, endInRaw } satisfies ParsedTailwindClass);
	}
	const looksLikeTailwind = containTailwindClasses(input);

	return {
		classes,
		looksLikeTailwind,
	};
}
