import { getRingOffsetOverrides } from "./getRingOffsetOverrides";

/**
 * Whether `baseUtility` is a `ring-offset*` utility (not arbitrary `[...]`).
 *
 * @param baseUtility - Base utility only.
 * @returns `true` when {@link getRingOffsetOverrides} is non-empty.
 *
 * @example matchRingOffset("ring-offset-4") => true
 */
export function matchRingOffset(baseUtility: string): boolean {
	if (baseUtility.includes("[")) {
		return false;
	}
	return getRingOffsetOverrides(baseUtility).length > 0;
}
