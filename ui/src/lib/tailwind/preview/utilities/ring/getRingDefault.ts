import type { PreviewDefaultContext } from "../../types";
import { DEFAULT_PX, WIDTH_PX } from "./constants";
import { getRingOverrides } from "./getRingOverrides";

/**
 * Default px label for `ring*` width utilities.
 *
 * @param baseUtility - Base utility only.
 * @param _ctx - Reserved for future theme context.
 * @returns `Npx` from the default scale, or `undefined`.
 *
 * @example getRingDefault("ring-4", { spacingBasePx: 4 }) => "4px"
 */
export function getRingDefault(
	baseUtility: string,
	_ctx: PreviewDefaultContext,
): string | undefined {
	if (getRingOverrides(baseUtility).length === 0) {
		return undefined;
	}
	if (baseUtility === "ring") {
		return `${DEFAULT_PX}px`;
	}
	const rest = baseUtility.slice("ring-".length);
	if (/^\d+$/.test(rest)) {
		const px = WIDTH_PX[rest];
		if (px === undefined) {
			return undefined;
		}
		return `${px}px`;
	}
	return undefined;
}
