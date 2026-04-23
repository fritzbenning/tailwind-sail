import type { PreviewDefaultContext } from "../../types";
import { DEFAULT_PX, WIDTH_PX } from "../ring/constants";
import { getInsetRingOverrides } from "./getInsetRingOverrides";

/**
 * Default px label for `inset-ring*` width utilities.
 *
 * @param baseUtility - Base utility only.
 * @param _ctx - Reserved for future theme context.
 * @returns `Npx` from the default scale, or `undefined`.
 *
 * @example getInsetRingDefault("inset-ring-2", { spacingBasePx: 4 }) => "2px"
 */
export function getInsetRingDefault(
	baseUtility: string,
	_ctx: PreviewDefaultContext,
): string | undefined {
	if (getInsetRingOverrides(baseUtility).length === 0) {
		return undefined;
	}
	if (baseUtility === "inset-ring") {
		return `${DEFAULT_PX}px`;
	}
	const rest = baseUtility.slice("inset-ring-".length);
	if (/^\d+$/.test(rest)) {
		const px = WIDTH_PX[rest];
		if (px === undefined) {
			return undefined;
		}
		return `${px}px`;
	}
	return undefined;
}
