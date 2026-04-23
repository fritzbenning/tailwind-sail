import { SPACING_UTILITIES } from "./constants";

/**
 * Returns the spacing scale key after the longest matching utility prefix.
 *
 * @param baseUtility - Base utility only (e.g. `p-4`, `gap-px`).
 * @returns The suffix key, or `undefined` for bare prefixes (`p`) or non-matches.
 *
 * @example getSpacingValue("p-4") => "4"
 */
export function getSpacingValue(baseUtility: string): string | undefined {
	const sorted = [...SPACING_UTILITIES].sort((a, b) => b.length - a.length);

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
