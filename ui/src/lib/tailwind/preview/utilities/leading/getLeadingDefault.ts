import { getClassValue } from "../../../class/getClassValue";
import type { PreviewDefaultContext } from "../../types";
import { convertScaleToPxLabel } from "../../values/number/convertScaleToPxLabel";
import { LEADING_PRESETS } from "./constants";

/**
 * Default label for `leading-*` (keyword, unitless, or spacing-scale px).
 *
 * @param baseUtility - Base utility only.
 * @param ctx - Includes `spacingBasePx` for numeric keys.
 * @returns A relative number string or `Npx`, or `undefined`.
 *
 * @example getLeadingDefault("leading-tight", { spacingBasePx: 4 }) => "1.25"
 */
export function getLeadingDefault(
	baseUtility: string,
	ctx: PreviewDefaultContext,
): string | undefined {
	const rest = getClassValue(baseUtility, "leading-");

	if (rest === undefined) {
		return undefined;
	}

	const relative = LEADING_PRESETS[rest];

	if (relative !== undefined) {
		return relative;
	}

	return convertScaleToPxLabel(rest, ctx.spacingBasePx);
}
