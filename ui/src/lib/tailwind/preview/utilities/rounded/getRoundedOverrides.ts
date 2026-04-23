import { roundedRadiusKey } from "./helpers/roundedRadiusKey";

/**
 * Candidate `--radius*` variable names for workspace preview of `rounded*`.
 *
 * @param baseUtility - Base utility only.
 * @returns Ordered `--*` names, or empty when not a radius utility.
 *
 * @example getRoundedOverrides("rounded-lg") => ["--radius-lg"]
 * @example getRoundedOverrides("rounded") => ["--radius", "--radius-DEFAULT", "--radius-sm"]
 */
export function getRoundedOverrides(baseUtility: string): readonly string[] {
	const key = roundedRadiusKey(baseUtility);
	if (!key) {
		return [];
	}
	if (key === "DEFAULT") {
		return ["--radius", "--radius-DEFAULT", "--radius-sm"];
	}
	return [`--radius-${key}`];
}
