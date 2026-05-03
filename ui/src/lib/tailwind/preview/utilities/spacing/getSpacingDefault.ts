import type { PreviewDefaultContext } from "../../types";
import { convertScaleToPxLabel } from "../../values/number/convertScaleToPxLabel";
import { findSpacingValue } from "./findSpacingValue";

/**
 * Default px label for spacing utilities from the numeric scale.
 *
 * @param u - Base utility only.
 * @param ctx - Includes `spacingBasePx` from theme `--spacing`.
 * @returns A string such as `16px`, or `undefined` when not a spacing utility.
 *
 * @example getSpacingDefault("p-4", { spacingBasePx: 4 }) => "16px"
 */
export function getSpacingDefault(
	u: string,
	ctx: PreviewDefaultContext,
): string | undefined {
	const key = findSpacingValue(u);

	if (!key) {
		return undefined;
	}

	return convertScaleToPxLabel(key, ctx.spacingBasePx);
}
