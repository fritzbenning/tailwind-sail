import type { PreviewDefaultContext } from "../../types";
import { DEFAULT_PX, SCALE_PX } from "./constants";
import { getRoundedOverrides } from "./getRoundedOverrides";
import { roundedRadiusKey } from "./helpers/roundedRadiusKey";

/**
 * Default px label for `rounded*` from the radius scale.
 *
 * @param baseUtility - Base utility only.
 * @param _ctx - Reserved for future theme context.
 * @returns `Npx` from the default scale, or `undefined`.
 *
 * @example getRoundedDefault("rounded-md", { spacingBasePx: 4 }) => "6px"
 */
export function getRoundedDefault(
	baseUtility: string,
	_ctx: PreviewDefaultContext,
): string | undefined {
	if (getRoundedOverrides(baseUtility).length === 0) {
		return undefined;
	}

	const key = roundedRadiusKey(baseUtility);

	if (!key) {
		return undefined;
	}

	if (key === "DEFAULT") {
		return `${DEFAULT_PX}px`;
	}

	const px = SCALE_PX[key];

	if (px === undefined) {
		return undefined;
	}

	return `${px}px`;
}
