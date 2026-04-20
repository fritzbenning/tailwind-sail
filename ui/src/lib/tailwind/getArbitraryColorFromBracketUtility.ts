import { getArbitraryColorValue } from "./getArbitraryColorValue";

/**
 * If `base` contains a Tailwind arbitrary value segment `-[{…}]`, read the bracketed
 *
 * substring as a CSS color when possible.
 *
 * @param base — The utility segment after variants (e.g. `text-[#f00]`), without leading `!`.
 * @returns The inner color string, or `null` if there is no `-[`…`]` color.
 *
 * @example getArbitraryColorFromBracketUtility("text-[#f97316]") => "#f97316"
 *
 * @example getArbitraryColorFromBracketUtility("bg-red-500") => null
 */
export function getArbitraryColorFromBracketUtility(
	base: string,
): string | null {
	const idx = base.indexOf("-[");
	if (idx === -1) {
		return null;
	}
	const bracket = base.slice(idx + 1);
	if (!bracket.startsWith("[") || !bracket.endsWith("]")) {
		return null;
	}
	return getArbitraryColorValue(bracket);
}
