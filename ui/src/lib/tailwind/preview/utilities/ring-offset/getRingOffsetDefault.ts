import type { PreviewDefaultContext } from "../../types";
import { SCALE_PX } from "./constants";
import { getRingOffsetOverrides } from "./getRingOffsetOverrides";

/**
 * Default px label for numeric `ring-offset-*` utilities.
 *
 * @param baseUtility - Base utility only.
 * @param _ctx - Reserved for future theme context.
 * @returns `Npx` from the default scale, or `undefined`.
 *
 * @example getRingOffsetDefault("ring-offset-2", { spacingBasePx: 4 }) => "2px"
 */
export function getRingOffsetDefault(
	baseUtility: string,
	_ctx: PreviewDefaultContext,
): string | undefined {
	if (getRingOffsetOverrides(baseUtility).length === 0) {
		return undefined;
	}
	const rest = baseUtility.slice("ring-offset-".length);
	const px = SCALE_PX[rest];
	if (px === undefined) {
		return undefined;
	}
	return `${px}px`;
}
