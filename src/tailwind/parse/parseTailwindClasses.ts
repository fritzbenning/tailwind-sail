import { hasTailwindClasses } from "../detect/hasTailwindClasses";
import type { ParsedTailwindClass, ParsedTailwindResult } from "./types";

/**
 * Tokenizes a class string on whitespace with half-open `[startInRaw, endInRaw)` spans and a {@link ParsedTailwindResult.isTailwind} hint.
 *
 * @param input - Raw `class` value (no surrounding quotes).
 * @returns Parsed tokens and Tailwind-like flag.
 *
 * @example parseTailwindClasses("  p-4   m-2 ").classes.length => 2
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

	const isTailwind = hasTailwindClasses(input);

	return {
		classes,
		isTailwind,
	};
}
