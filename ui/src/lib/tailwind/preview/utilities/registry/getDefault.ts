import type { PreviewDefaultContext, PreviewOptions } from "../../types";
import { DEFAULT_SPACING } from "../spacing/constants";
import { PREVIEW_REGISTRY } from "./registry";

/**
 * Default-theme preview label when workspace tokens do not apply (no DOM reads).
 *
 * @param baseUtility - Base utility only (no variants).
 * @param options - Optional `spacingBasePx` aligned with theme `--spacing`.
 * @returns A string such as `16px`, or `undefined` when unknown.
 *
 * @example getDefault("p-4") => "16px"
 */
export function getDefault(
	baseUtility: string,
	options?: PreviewOptions,
): string | undefined {
	const spacingBasePx = options?.spacingBasePx ?? DEFAULT_SPACING;
	const ctx: PreviewDefaultContext = { spacingBasePx };

	for (const step of PREVIEW_REGISTRY) {
		if (!step.match(baseUtility)) {
			continue;
		}
		const v = step.default(baseUtility, ctx);
		if (v !== undefined) {
			return v;
		}
	}
	return undefined;
}
