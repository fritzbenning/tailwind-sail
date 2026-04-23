import { getRoundedOverrides } from "./getRoundedOverrides";

/**
 * Whether `baseUtility` is a `rounded*` utility with workspace candidates (not arbitrary `[...]`).
 *
 * @param baseUtility - Base utility only.
 * @returns `true` when {@link getRoundedOverrides} is non-empty.
 *
 * @example matchRounded("rounded-lg") => true
 */
export function matchRounded(baseUtility: string): boolean {
	if (baseUtility.includes("[")) {
		return false;
	}
	return getRoundedOverrides(baseUtility).length > 0;
}
