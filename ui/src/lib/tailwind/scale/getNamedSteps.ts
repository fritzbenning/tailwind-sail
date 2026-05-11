import {
	GENERAL_NAMED_STEPS,
	ROUNDED_NAMED_STEPS,
	TYPOGRAPHY_NAMED_STEPS,
} from "./constants";
import { getRoundedScaleTail } from "./getRoundedScaleTail";

/**
 * Returns the ordered **named step** list for a base utility (`text-*` typography scale vs global `rounded-*` vs general breakpoint-style keywords), or reports that stepping does not apply.
 *
 * @param utilityWithoutImportant - Utility string without a leading important `!` (e.g. `text-sm`, `max-w-md`).
 * @returns The keyword sequence in ascending order, or `null` when the utility uses arbitrary values `[...]` or cannot be classified.
 *
 * @example getNamedSteps("text-sm") => typography steps including `"base"`
 * @example getNamedSteps("rounded-md") => global border-radius steps including `""` for bare `rounded`
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

	if (getRoundedScaleTail(utilityWithoutImportant)) {
		return ROUNDED_NAMED_STEPS;
	}

	return GENERAL_NAMED_STEPS;
}
