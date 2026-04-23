import { borderWidthScaleKey } from "./helpers/borderWidthScaleKey";

/**
 * Candidate `--border-width*` names for workspace preview (skips colors and non-width tails).
 *
 * @param baseUtility - Base utility only.
 * @returns Ordered `--*` names, or empty when not a border-width utility.
 *
 * @example getBorderWidthOverrides("border-2") => ["--border-width-2"]
 * @example getBorderWidthOverrides("border") => ["--default-border-width", "--border-width-DEFAULT", "--border-width"]
 * @example getBorderWidthOverrides("border-red-500") => []
 */
export function getBorderWidthOverrides(
	baseUtility: string,
): readonly string[] {
	const key = borderWidthScaleKey(baseUtility);

	if (key === undefined) {
		return [];
	}

	if (key === "DEFAULT") {
		return [
			"--default-border-width",
			"--border-width-DEFAULT",
			"--border-width",
		];
	}

	return [`--border-width-${key}`];
}
