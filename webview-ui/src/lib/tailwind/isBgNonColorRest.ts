import { BG_NON_COLOR } from "./constants";

/**
 * Whether the `bg-*` tail is a non-color concern (sizing, repeat, gradient, etc.).
 *
 * @param rest — Part after `bg-` in the base utility (e.g. `cover`, `red-500`, `gradient-to-r`).
 * @returns `true` if this tail should not be treated as a solid color.
 *
 * @example
 * Input: `"cover"` → Output: `true`
 *
 * @example
 * Input: `"gradient-to-r"` → Output: `true`
 *
 * @example
 * Input: `"red-500"` → Output: `false`
 */
export function isBgNonColorRest(rest: string): boolean {
	const head = rest.split("/")[0]?.split("-")[0] ?? "";
	if (rest.startsWith("gradient-")) {
		return true;
	}

	return BG_NON_COLOR.has(head);
}
