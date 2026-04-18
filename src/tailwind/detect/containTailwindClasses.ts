import { isTailwindClass } from './isTailwindClass';

/**
 * True if any whitespace-separated token looks Tailwind-ish.
 */
export function containTailwindClasses(input: string): boolean {
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
