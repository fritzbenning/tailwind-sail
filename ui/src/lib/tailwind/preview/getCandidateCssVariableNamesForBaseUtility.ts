import { getRadiusBorderRingThemeVariableCandidates } from "./getRadiusBorderRingThemeVariableCandidates";

const SPACING_PREFIXES: readonly string[] = [
	"space-x",
	"space-y",
	"gap-x",
	"gap-y",
	"px",
	"py",
	"pt",
	"pb",
	"pl",
	"pr",
	"mx",
	"my",
	"mt",
	"mb",
	"ml",
	"mr",
	"p",
	"m",
	"gap",
];

/**
 * Maps a simple spacing-related base utility to Tailwind v4-style theme variable names
 * to try against injected `--workspace-*` values (e.g. `p-4` → `--spacing-4`).
 *
 * @param baseUtility - e.g. `p-4`, `gap-x-6` (not arbitrary).
 * @returns Candidate `--*` names, most likely first.
 */
export function getCandidateCssVariableNamesForBaseUtility(
	baseUtility: string,
): readonly string[] {
	if (baseUtility.includes("[")) {
		return [];
	}

	const sorted = [...SPACING_PREFIXES].sort((a, b) => b.length - a.length);
	for (const prefix of sorted) {
		if (baseUtility === prefix) {
			return [];
		}
		if (!baseUtility.startsWith(`${prefix}-`)) {
			continue;
		}
		const rest = baseUtility.slice(prefix.length + 1);
		if (!rest) {
			return [];
		}
		return [`--spacing-${rest}`];
	}

	if (baseUtility.startsWith("text-")) {
		const rest = baseUtility.slice("text-".length);
		if (rest && !rest.includes("-")) {
			return [`--text-${rest}`];
		}
	}

	if (baseUtility.startsWith("leading-")) {
		const rest = baseUtility.slice("leading-".length);
		if (rest && !rest.includes("-")) {
			return [`--leading-${rest}`];
		}
	}

	const radiusBorderRing =
		getRadiusBorderRingThemeVariableCandidates(baseUtility);
	if (radiusBorderRing.length > 0) {
		return radiusBorderRing;
	}

	return [];
}
