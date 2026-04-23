import { borderWidthScaleKey } from "./helpers/borderWidthScaleKey";

/**
 * Whether `baseUtility` is a `border*` width utility for the preview registry (not arbitrary `[...]`).
 *
 * @param baseUtility - Base utility only.
 * @returns `true` when {@link borderWidthScaleKey} resolves a key.
 *
 * @example matchBorderWidth("border-2") => true
 */
export function matchBorderWidth(baseUtility: string): boolean {
	if (baseUtility.includes("[")) {
		return false;
	}

	return borderWidthScaleKey(baseUtility) !== undefined;
}
