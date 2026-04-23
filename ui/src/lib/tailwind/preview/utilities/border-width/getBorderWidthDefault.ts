import type { PreviewDefaultContext } from "../../types";
import { borderWidthScaleKey } from "./helpers/borderWidthScaleKey";

/**
 * Default px label for `border*` width utilities from the default scale.
 *
 * @param baseUtility - Base utility only.
 * @param _ctx - Reserved for future theme context.
 * @returns `1px` for default width, `Npx` for numeric utilities, or `undefined`.
 *
 * @example getBorderWidthDefault("border-t-2", { spacingBasePx: 4 }) => "2px"
 */
export function getBorderWidthDefault(
	baseUtility: string,
	_ctx: PreviewDefaultContext,
): string | undefined {
	const key = borderWidthScaleKey(baseUtility);

	if (key === undefined) {
		return undefined;
	}

	if (key === "DEFAULT") {
		return "1px";
	}

	return `${key}px`;
}
