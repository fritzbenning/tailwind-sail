import { GENERAL_NAMED_STEPS, TYPOGRAPHY_NAMED_STEPS } from "./constants";

/**
 * Returns the ordered **named step** list for a base utility (`text-*` typography scale vs general breakpoint-style keywords), or reports that stepping does not apply.
 *
 * @param utilityWithoutImportant - Utility string without a leading important `!` (e.g. `text-sm`, `max-w-md`).
 * @returns The keyword sequence in ascending order, or `null` when the utility uses arbitrary values `[...]` or cannot be classified.
 *
 * @example getNamedSteps("text-sm") => typography steps including `"base"`
 * @example getNamedSteps("max-w-md") => general named steps
 */
export function getNamedSteps(
	utilityWithoutImportant: string,
): readonly string[] | null {
	if (utilityWithoutImportant.includes("[")) {
		return null;
	}

	if (utilityWithoutImportant.startsWith("text-")) {
		return TYPOGRAPHY_NAMED_STEPS;
	}

	return GENERAL_NAMED_STEPS;
}
