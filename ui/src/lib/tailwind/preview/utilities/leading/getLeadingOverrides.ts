import { findClassValue } from "../../../class/findClassValue";

/**
 * Candidate `--leading-*` variable names for workspace preview.
 *
 * @param baseUtility - Base utility only.
 * @returns `["--leading-{key}"]` or an empty array.
 *
 * @example getLeadingOverrides("leading-snug") => ["--leading-snug"]
 */
export function getLeadingOverrides(baseUtility: string): readonly string[] {
	const rest = findClassValue(baseUtility, "leading-");
	return rest ? [`--leading-${rest}`] : [];
}
