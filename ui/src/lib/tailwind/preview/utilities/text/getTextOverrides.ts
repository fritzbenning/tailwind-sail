import { getClassValue } from "../../../class/getClassValue";

/**
 * Candidate `--text-*` variable names for workspace preview.
 *
 * @param baseUtility - Base utility only.
 * @returns `["--text-{key}"]` or an empty array.
 *
 * @example getTextOverrides("text-sm") => ["--text-sm"]
 */
export function getTextOverrides(baseUtility: string): readonly string[] {
	const rest = getClassValue(baseUtility, "text-");
	return rest ? [`--text-${rest}`] : [];
}
