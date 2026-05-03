import { findClassValue } from "../../../class/findClassValue";

/**
 * Whether `baseUtility` is a `text-*` scale utility (not arbitrary `[...]`).
 *
 * @param baseUtility - Base utility only.
 * @returns `true` when a single-segment value exists after `text-`.
 *
 * @example matchText("text-sm") => true
 */
export function matchText(baseUtility: string): boolean {
	return (
		!baseUtility.includes("[") &&
		!baseUtility.includes("]") &&
		findClassValue(baseUtility, "text-") !== undefined
	);
}
