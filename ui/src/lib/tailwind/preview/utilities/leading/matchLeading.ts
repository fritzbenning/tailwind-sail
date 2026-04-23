import { getClassValue } from "../../../class/getClassValue";

/**
 * Whether `baseUtility` is a `leading-*` utility (not arbitrary `[...]`).
 *
 * @param baseUtility - Base utility only.
 * @returns `true` when a single-segment value exists after `leading-`.
 *
 * @example matchLeading("leading-tight") => true
 */
export function matchLeading(baseUtility: string): boolean {
	return (
		!baseUtility.includes("[") &&
		!baseUtility.includes("]") &&
		getClassValue(baseUtility, "leading-") !== undefined
	);
}
