import { stripDirectionalPrefix } from "../../../class/stripDirectionalPrefix";
import { BORDER_NON_COLOR, TEXT_NON_COLOR } from "./constants";
import { isColorTail } from "./isColorTail";

/**
 * Returns the color tail for `bg-{tail}` preview mapping, or `null` for non-color utilities.
 *
 * @param prefix - First segment of the base utility (`text`, `bg`, `border`, …).
 * @param tail - Everything after the first `-` in the base utility.
 * @returns The substring to place after `bg-`, or `null`.
 *
 * @example getColorTail("text", "red-500") => "red-500"
 * @example getColorTail("text", "center") => null
 * @example getColorTail("border", "t-red-500") => "red-500"
 */
export function getColorTail(prefix: string, tail: string): string | null {
	if (prefix === "bg") {
		if (isColorTail(tail)) {
			return tail;
		}
		return null;
	}

	if (prefix === "text") {
		const head = tail.split("/")[0]?.split("-")[0] ?? "";
		if (TEXT_NON_COLOR.has(head)) {
			return null;
		}
		return tail;
	}

	if (prefix === "border" || prefix === "ring" || prefix === "outline") {
		const colorRest = stripDirectionalPrefix(tail);
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
		return tail;
	}

	return null;
}
