import { PALETTE, SHADE } from "./constants";

/**
 * Whether `rest` is a default Tailwind palette color plus numeric shade (opacity suffix ignored).
 *
 * @param rest — Color tail such as `red-500` or `slate-900/50` (only the part before `/` is considered).
 * @returns `true` if both name and shade match built-in palette keys.
 *
 * @example isPaletteShade("red-500") => true
 *
 * @example isPaletteShade("red-500/80") => true
 * @example isPaletteShade("red") => false
 *
 * @example isPaletteShade("foo-500") => false
 */
export function isPaletteShade(rest: string): boolean {
	const head = rest.split("/")[0] ?? "";
	const [c, s] = head.split("-");
	return Boolean(c && s && PALETTE.has(c) && SHADE.has(s));
}
