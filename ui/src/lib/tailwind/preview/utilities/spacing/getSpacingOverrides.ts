import { findSpacingValue } from "./findSpacingValue";

/**
 * Candidate `--spacing-*` variable names for workspace preview.
 *
 * @param baseUtility - Base utility only.
 * @returns `["--spacing-{key}"]` or an empty array.
 *
 * @example getSpacingOverrides("p-4") => ["--spacing-4"]
 */
export function getSpacingOverrides(baseUtility: string): readonly string[] {
	const rest = findSpacingValue(baseUtility);

	if (rest === undefined) {
		return [];
	}

	return [`--spacing-${rest}`];
}
