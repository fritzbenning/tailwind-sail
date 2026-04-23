/**
 * Candidate `--ring-offset*` names for numeric `ring-offset-{n}` utilities.
 *
 * @param baseUtility - Base utility only.
 * @returns Two hyphenated candidates per step, or empty when not a numeric offset.
 *
 * @example getRingOffsetOverrides("ring-offset-4") => ["--ring-offset-width-4", "--ring-offset-4"]
 */
export function getRingOffsetOverrides(baseUtility: string): readonly string[] {
	if (!baseUtility.startsWith("ring-offset-")) {
		return [];
	}
	const rest = baseUtility.slice("ring-offset-".length);
	if (!rest || !/^\d+$/.test(rest)) {
		return [];
	}
	return [`--ring-offset-width-${rest}`, `--ring-offset-${rest}`];
}
