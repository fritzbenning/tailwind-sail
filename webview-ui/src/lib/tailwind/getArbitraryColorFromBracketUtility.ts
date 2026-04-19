import { getArbitraryColorValue } from "./getArbitraryColorValue";

/**
 * If `base` contains a Tailwind arbitrary value segment `-[{…}]`, read the bracketed
 * substring as a CSS color when possible.
 *
 * @param base — The utility segment after variants (e.g. `text-[#f00]`), without leading `!`.
 * @returns The inner color string, or `null` if there is no `-[`…`]` color.
 *
 * @example
 * Input: `"text-[#f97316]"` → Output: `"#f97316"`
 *
 * @example
 * Input: `"bg-red-500"` → Output: `null` (no arbitrary bracket segment)
 */
export function getArbitraryColorFromBracketUtility(base: string): string | null {
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
