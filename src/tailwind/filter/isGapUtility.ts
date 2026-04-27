/**
 * Gaps are listed under both flex and grid in the Tailwind docs; classification picks one category
 * (see `UTILITY_CATEGORIES`). The utility chip filter uses this so `gap-*` is visible for either flex or grid.
 */
export function isGapUtility(normalizedBaseUtility: string): boolean {
	return (
		normalizedBaseUtility.startsWith("gap-") ||
		normalizedBaseUtility.startsWith("gap-x-") ||
		normalizedBaseUtility.startsWith("gap-y-")
	);
}
