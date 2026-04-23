import { getRingOverrides } from "./getRingOverrides";

/**
 * Whether `baseUtility` is a `ring*` width utility (not `ring-offset`, not arbitrary `[...]`).
 *
 * @param baseUtility - Base utility only.
 * @returns `true` when {@link getRingOverrides} is non-empty.
 *
 * @example matchRing("ring-2") => true
 */
export function matchRing(baseUtility: string): boolean {
	if (baseUtility.includes("[")) {
		return false;
	}
	return getRingOverrides(baseUtility).length > 0;
}
