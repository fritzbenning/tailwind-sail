import { normalizeClass } from "../utils/normalizeClass";
import { splitTailwindClassVariants } from "./splitTailwindClassVariants";

/**
 * Variant stack plus {@link normalizeClass | normalized} utility for classification.
 *
 * @param fullClass - Full class string from the editor or list.
 * @returns Modifiers list and normalized utility segment.
 *
 * @example prepareTailwindClassForFilter(" hover:p-4 ").utilityNormalized => "p-4"
 */
export function prepareTailwindClassForFilter(fullClass: string): {
	modifiers: string[];
	utilityNormalized: string;
} {
	const { modifiers, utility } = splitTailwindClassVariants(fullClass);
	return {
		modifiers,
		utilityNormalized: normalizeClass(utility),
	};
}
