import { getInsetRingOverrides } from "./getInsetRingOverrides";

/**
 * Whether `baseUtility` is an `inset-ring*` width utility (not arbitrary `[...]`).
 *
 * @param baseUtility - Base utility only.
 * @returns `true` when {@link getInsetRingOverrides} is non-empty.
 *
 * @example matchInsetRing("inset-ring-2") => true
 */
export function matchInsetRing(baseUtility: string): boolean {
	if (baseUtility.includes("[")) {
		return false;
	}
	return getInsetRingOverrides(baseUtility).length > 0;
}
