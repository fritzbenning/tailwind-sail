import { getSpacingValue } from "./getSpacingValue";

/**
 * Whether `baseUtility` is a built-in spacing utility with a scale suffix (not arbitrary `[...]`).
 *
 * @param baseUtility - Base utility only (no variants).
 * @returns `true` when a spacing key exists after the prefix.
 *
 * @example matchSpacing("p-4") => true
 */
export function matchSpacing(baseUtility: string): boolean {
	if (baseUtility.includes("[") || baseUtility.includes("]")) {
		return false;
	}

	return getSpacingValue(baseUtility) !== undefined;
}
