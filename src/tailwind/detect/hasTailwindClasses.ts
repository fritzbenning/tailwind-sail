import { isTailwindClass } from "./isTailwindClass";

/**
 * Whether any whitespace-separated token passes {@link isTailwindClass}.
 *
 * @param input - Class attribute text or substring.
 * @returns `true` if at least one token looks Tailwind-like.
 *
 * @example hasTailwindClasses("font-mono unknown") => true
 */
export function hasTailwindClasses(input: string): boolean {
	for (const raw of input.trim().split(/\s+/)) {
		if (!raw) {
			continue;
		}
		if (isTailwindClass(raw)) {
			return true;
		}
	}
	return false;
}
