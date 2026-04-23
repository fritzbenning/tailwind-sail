import { isPaletteTail } from "../../values/color/isPaletteTail";

/**
 * Candidate `--ring-width*` names for `ring*` width utilities (excludes `ring-offset-*` and colors).
 *
 * @param baseUtility - Base utility only.
 * @returns Ordered `--*` names, or empty when not a ring-width utility.
 *
 * @example getRingOverrides("ring-2") => ["--ring-width-2"]
 */
export function getRingOverrides(baseUtility: string): readonly string[] {
	if (baseUtility === "ring") {
		return ["--default-ring-width", "--ring-width-DEFAULT", "--ring-width"];
	}
	if (!baseUtility.startsWith("ring-")) {
		return [];
	}
	const rest = baseUtility.slice("ring-".length);
	if (!rest) {
		return [];
	}
	if (rest.startsWith("offset-")) {
		return [];
	}
	if (isPaletteTail(rest)) {
		return [];
	}
	if (/^\d+$/.test(rest)) {
		return [`--ring-width-${rest}`];
	}
	return [];
}
