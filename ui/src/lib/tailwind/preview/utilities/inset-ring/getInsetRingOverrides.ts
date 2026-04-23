import { isPaletteTail } from "../../values/color/isPaletteTail";

/**
 * Candidate `--inset-ring-width*` names for `inset-ring*` width utilities (skips colors).
 *
 * @param baseUtility - Base utility only.
 * @returns Ordered `--*` names, or empty when not an inset-ring width utility.
 *
 * @example getInsetRingOverrides("inset-ring-2") => ["--inset-ring-width-2"]
 */
export function getInsetRingOverrides(baseUtility: string): readonly string[] {
	if (baseUtility === "inset-ring") {
		return [
			"--default-inset-ring-width",
			"--inset-ring-width-DEFAULT",
			"--inset-ring-width",
		];
	}

	if (!baseUtility.startsWith("inset-ring-")) {
		return [];
	}
	const rest = baseUtility.slice("inset-ring-".length);

	if (!rest) {
		return [];
	}

	if (isPaletteTail(rest)) {
		return [];
	}

	if (/^\d+$/.test(rest)) {
		return [`--inset-ring-width-${rest}`];
	}

	return [];
}
