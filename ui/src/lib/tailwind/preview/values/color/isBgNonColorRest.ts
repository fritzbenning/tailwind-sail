import { BG_NON_COLOR } from "./constants";

/**
 * Whether the `bg-*` tail is not a solid theme color (gradient, sizing, repeat, etc.).
 *
 * @param rest - Part after `bg-` in the base utility.
 * @returns `true` when the tail should not be treated as a solid color.
 *
 * @example isBgNonColorRest("cover") => true
 * @example isBgNonColorRest("gradient-to-r") => true
 * @example isBgNonColorRest("red-500") => false
 */
export function isBgNonColorRest(rest: string): boolean {
	const head = rest.split("/")[0]?.split("-")[0] ?? "";
	if (rest.startsWith("gradient-")) {
		return true;
	}

	return BG_NON_COLOR.has(head);
}
