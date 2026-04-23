import { SIZE_UTILITIES } from "./constants";

/**
 * Returns the size scale key after the longest matching utility prefix.
 *
 * @param baseUtility - Base utility only (e.g. `w-64`, `max-w-sm`).
 * @returns The suffix key, or `undefined` for bare prefixes or non-matches.
 *
 * @example getSizeValue("w-64") => "64"
 */
export function getSizeValue(baseUtility: string): string | undefined {
	const sorted = [...SIZE_UTILITIES].sort((a, b) => b.length - a.length);

	for (const prefix of sorted) {
		if (baseUtility === prefix) {
			return undefined;
		}
		if (!baseUtility.startsWith(`${prefix}-`)) {
			continue;
		}
		return baseUtility.slice(prefix.length + 1);
	}

	return undefined;
}
