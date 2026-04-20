import { BORDER_NON_COLOR, TEXT_NON_COLOR } from "./constants";
import { isBgNonColorRest } from "./isBgNonColorRest";
import { stripBorderEdgePrefix } from "./stripBorderEdgePrefix";

/**
 * For a known color-related utility prefix, return the substring that describes the solid color
 *
 * for mapping to `bg-{tail}`, or `null` when the tail is not a color (e.g. `text-center`).
 *
 * @param prefix — First segment of the base utility (`text`, `bg`, `border`, …).
 * @param rest — Everything after the first `-` in the base utility.
 * @returns The color tail to reuse under `bg-`, or `null`.
 *
 * @example getColorTailForSolidBg("text", "red-500") => "red-500"
 *
 * @example getColorTailForSolidBg("text", "center") => null
 * @example getColorTailForSolidBg("border", "t-red-500") => "red-500"
 *
 * @example getColorTailForSolidBg("fill", "emerald-400") => "emerald-400"
 */
export function getColorTailForSolidBg(
	prefix: string,
	rest: string,
): string | null {
	if (prefix === "bg") {
		if (isBgNonColorRest(rest)) {
			return null;
		}
		return rest;
	}

	if (prefix === "text") {
		const head = rest.split("/")[0]?.split("-")[0] ?? "";
		if (TEXT_NON_COLOR.has(head)) {
			return null;
		}
		return rest;
	}

	if (prefix === "border" || prefix === "ring" || prefix === "outline") {
		const colorRest = stripBorderEdgePrefix(rest);
		const head = colorRest.split("/")[0]?.split("-")[0] ?? "";
		if (BORDER_NON_COLOR.has(head)) {
			return null;
		}
		return colorRest;
	}

	if (
		prefix === "decoration" ||
		prefix === "accent" ||
		prefix === "caret" ||
		prefix === "placeholder" ||
		prefix === "fill" ||
		prefix === "stroke"
	) {
		return rest;
	}

	return null;
}
