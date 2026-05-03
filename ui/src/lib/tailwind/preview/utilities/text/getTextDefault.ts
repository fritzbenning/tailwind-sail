import { findClassValue } from "../../../class/findClassValue";
import type { PreviewDefaultContext } from "../../types";
import { TEXT_SIZES } from "./constants";

/**
 * Default px label for `text-*` from the type scale.
 *
 * @param baseUtility - Base utility only.
 * @param _context - Reserved for future theme context.
 * @returns Rounded `px` from `rem`, or `undefined` for unknown keys.
 *
 * @example getTextDefault("text-sm", { spacingBasePx: 4 }) => "14px"
 */
export function getTextDefault(
	baseUtility: string,
	_context: PreviewDefaultContext,
): string | undefined {
	const rest = findClassValue(baseUtility, "text-");
	if (rest === undefined) {
		return undefined;
	}

	const rem = TEXT_SIZES[rest];

	if (rem === undefined) {
		return undefined;
	}
	return `${Math.round(rem * 16)}px`;
}
