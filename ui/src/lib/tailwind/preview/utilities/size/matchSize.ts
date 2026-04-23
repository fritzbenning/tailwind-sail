import { getSizeValue } from "./getSizeValue";

/**
 * Whether `baseUtility` is a built-in size utility with a suffix (not arbitrary `[...]`).
 *
 * @param baseUtility - Base utility only.
 * @returns `true` when a size key exists after the prefix.
 *
 * @example matchSize("w-8") => true
 */
export function matchSize(baseUtility: string): boolean {
	if (baseUtility.includes("[") || baseUtility.includes("]")) {
		return false;
	}

	return getSizeValue(baseUtility) !== undefined;
}
