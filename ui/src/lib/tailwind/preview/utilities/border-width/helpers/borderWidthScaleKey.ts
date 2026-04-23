import { firstSegment } from "../../../helpers/firstSegment";
import { BORDER_NON_COLOR } from "../../../values/color/constants";
import { isPaletteTail } from "../../../values/color/isPaletteTail";
import { BORDER_EDGE_ONLY, BORDER_EDGE_PREFIXES } from "../constant";

/**
 * Resolves a `border*` width utility to a theme scale key for preview.
 *
 * @param baseUtility - Base utility only (e.g. `border`, `border-t-2`).
 * @returns `"DEFAULT"`, a numeric string key, or `undefined` for colors and non-width tails.
 *
 * @example borderWidthScaleKey("border-2") => "2"
 */
export function borderWidthScaleKey(baseUtility: string): string | undefined {
	if (baseUtility === "border") {
		return "DEFAULT";
	}

	if (!baseUtility.startsWith("border-")) {
		return undefined;
	}
	const rest = baseUtility.slice("border-".length);

	if (!rest) {
		return undefined;
	}

	if (BORDER_NON_COLOR.has(rest) || BORDER_NON_COLOR.has(firstSegment(rest))) {
		return undefined;
	}

	if (firstSegment(rest) === "spacing") {
		return undefined;
	}

	if (isPaletteTail(rest)) {
		return undefined;
	}

	if (BORDER_EDGE_ONLY.has(baseUtility)) {
		return "DEFAULT";
	}

	const sorted = [...BORDER_EDGE_PREFIXES].sort((a, b) => b.length - a.length);

	for (const prefix of sorted) {
		if (!baseUtility.startsWith(prefix)) {
			continue;
		}
		const tail = baseUtility.slice(prefix.length);
		if (!tail) {
			return undefined;
		}
		if (/^\d+$/.test(tail)) {
			return tail;
		}
		if (isPaletteTail(tail)) {
			return undefined;
		}
		return undefined;
	}

	if (/^\d+$/.test(rest)) {
		return rest;
	}

	return undefined;
}
