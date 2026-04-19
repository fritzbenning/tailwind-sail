import { getArbitraryBgClass } from "./getArbitraryBgClass";
import { getArbitraryColorFromBracketUtility } from "./getArbitraryColorFromBracketUtility";
import { getBaseUtility } from "./getBaseUtility";
import { getColorTailForSolidBg } from "./getColorTailForSolidBg";
import { isPaletteShade } from "./isPaletteShade";
import { isSpecial } from "./isSpecial";

/**
 * Descriptor for a solid preview swatch: a single Tailwind `bg-*` class (palette or arbitrary).
 *
 * @example
 * `{ className: "bg-red-500" }`
 */
export type TailwindBackgroundClass = {
	className: string;
};

/**
 * Detect Tailwind color utilities and derive the matching `bg-*` class for a solid preview
 * (variants stripped). Non-`bg` utilities map to the equivalent `bg-{color}` class.
 *
 * @param className — Full class string as authored (may include variants and `!`).
 * @returns `{ className }` with one `bg-*` utility, or `null` if the class is not a supported solid color.
 *
 * @example
 * Input: `"text-red-500"` → Output: `{ className: "bg-red-500" }`
 *
 * @example
 * Input: `"md:hover:border-blue-600"` → Output: `{ className: "bg-blue-600" }`
 *
 * @example
 * Input: `"text-[#f97316]"` → Output: `{ className: "bg-[#f97316]" }`
 *
 * @example
 * Input: `"text-center"` → Output: `null`
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
