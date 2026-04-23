import { BG_NON_COLOR } from "./constants";

/**
 * Whether a `bg-*` tail can represent a solid color (not layout, gradient, etc.).
 *
 * @param rest - Part after `bg-` in the base utility.
 * @returns `true` when the tail is not excluded as non-color.
 *
 * @example isColorTail("red-500") => true
 * @example isColorTail("cover") => false
 * @example isColorTail("gradient-to-r") => false
 */
export function isColorTail(rest: string): boolean {
	if (rest.startsWith("gradient-")) {
		return false;
	}

	const head = rest.split("/")[0]?.split("-")[0] ?? "";

	return !BG_NON_COLOR.has(head);
}
