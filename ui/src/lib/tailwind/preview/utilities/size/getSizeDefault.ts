import type { PreviewDefaultContext } from "../../types";
import { convertScaleToPxLabel } from "../../values/number/convertScaleToPxLabel";
import { normalizeRawToPxLabel } from "../../values/number/normalizeRawToPxLabel";
import { MAX_WIDTHS, MAX_WIDTHS_SCREEN } from "./constants";
import { findSizeValue } from "./findSizeValue";

/**
 * Default preview label for `w-*`, `max-w-*`, and related size utilities.
 *
 * @param u - Base utility only.
 * @param ctx - Includes `spacingBasePx` for scale-based widths.
 * @returns A normalized length label, or `undefined` when not applicable.
 *
 * @example getSizeDefault("w-4", { spacingBasePx: 4 }) => "16px"
 */
export function getSizeDefault(
	u: string,
	ctx: PreviewDefaultContext,
): string | undefined {
	const sizeKey = findSizeValue(u);

	if (!sizeKey) {
		return undefined;
	}

	if (u.startsWith("max-w-")) {
		const rest = sizeKey;
		if (rest.startsWith("screen-")) {
			const bp = rest.slice("screen-".length);
			const px = MAX_WIDTHS_SCREEN[bp];
			if (px === undefined) {
				return undefined;
			}
			return normalizeRawToPxLabel(`${px}px`);
		}
		const namedRem = MAX_WIDTHS[rest];
		if (namedRem !== undefined) {
			return normalizeRawToPxLabel(`${namedRem}rem`);
		}
		const spacing = convertScaleToPxLabel(rest, ctx.spacingBasePx);
		return spacing === undefined ? undefined : normalizeRawToPxLabel(spacing);
	}

	return convertScaleToPxLabel(sizeKey, ctx.spacingBasePx);
}
