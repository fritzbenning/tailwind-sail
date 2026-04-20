import { getArbitraryBgClass } from "./getArbitraryBgClass";
import { getArbitraryColorFromBracketUtility } from "./getArbitraryColorFromBracketUtility";
import { getBaseUtility } from "./getBaseUtility";
import { getColorTailForSolidBg } from "./getColorTailForSolidBg";
import { isPaletteShade } from "./isPaletteShade";
import { isSpecial } from "./isSpecial";

/**
 * Descriptor for a solid preview swatch: a single Tailwind `bg-*` class (palette or arbitrary).
 *
 * @property className - One `bg-*` utility for the swatch.
 *
 * @example { className: "bg-red-500" }
 */
export type TailwindBackgroundClass = {
	className: string;
};

/**
 * Detect Tailwind color utilities and derive the matching `bg-*` class for a solid preview
 *
 * (variants stripped). Non-`bg` utilities map to the equivalent `bg-{color}` class.
 *
 * @param className - Full class string as authored (may include variants and `!`).
 * @returns `{ className }` with one `bg-*` utility, or `null` if not a supported solid color.
 *
 * @example getTailwindBackgroundColorClass("text-red-500") => { className: "bg-red-500" }
 * @example getTailwindBackgroundColorClass("md:hover:border-blue-600") => { className: "bg-blue-600" }
 * @example getTailwindBackgroundColorClass("text-[#f97316]") => { className: "bg-[#f97316]" }
 * @example getTailwindBackgroundColorClass("text-center") => null
 */
export function getTailwindBackgroundColorClass(
	className: string,
): TailwindBackgroundClass | null {
	const base = getBaseUtility(className);
	if (!base) {
		return null;
	}

	const arb = getArbitraryColorFromBracketUtility(base);
	if (arb) {
		return {
			className: getArbitraryBgClass(arb),
		};
	}

	const dash = base.indexOf("-");
	if (dash === -1) {
		return null;
	}
	const prefix = base.slice(0, dash);
	const rest = base.slice(dash + 1);
	if (!rest) {
		return null;
	}

	const tail = getColorTailForSolidBg(prefix, rest);
	if (tail === null) {
		return null;
	}

	if (!isPaletteShade(tail) && !isSpecial(tail)) {
		return null;
	}

	return {
		className: `bg-${tail}`,
	};
}
