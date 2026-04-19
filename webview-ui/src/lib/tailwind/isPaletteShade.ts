import { PALETTE, SHADE } from "./constants";

/**
 * Whether `rest` is a default Tailwind palette color plus numeric shade (opacity suffix ignored).
 *
 * @param rest — Color tail such as `red-500` or `slate-900/50` (only the part before `/` is considered).
 * @returns `true` if both name and shade match built-in palette keys.
 *
 * @example
 * Input: `"red-500"` → Output: `true`
 *
 * @example
 * Input: `"red-500/80"` → Output: `true` (shade still `500`)
 *
 * @example
 * Input: `"red"` → Output: `false`
 *
 * @example
 * Input: `"foo-500"` → Output: `false` (unknown palette name)
 */
export function isPaletteShade(rest: string): boolean {
	const head = rest.split("/")[0] ?? "";
	const [c, s] = head.split("-");
	return Boolean(c && s && PALETTE.has(c) && SHADE.has(s));
}
