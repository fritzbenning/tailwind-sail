import { findClassValue } from "../../../class/findClassValue";

/**
 * Candidate `--text-*` variable names for workspace preview.
 *
 * @param baseUtility - Base utility only.
 * @returns `["--text-{key}"]` or an empty array.
 *
 * @example getTextOverrides("text-sm") => ["--text-sm"]
 */
export function getTextOverrides(baseUtility: string): readonly string[] {
	const rest = findClassValue(baseUtility, "text-");
	return rest ? [`--text-${rest}`] : [];
}
