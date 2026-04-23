import { PALETTE, SHADE } from "./constants";

/**
 * Whether `rest` is a default palette name plus numeric shade (`/` opacity ignored).
 *
 * @param rest - Color tail such as `red-500` or `slate-900/50`.
 * @returns `true` when both palette and shade keys match the built-in sets.
 *
 * @example isPaletteShade("red-500") => true
 * @example isPaletteShade("red-500/80") => true
 * @example isPaletteShade("red") => false
 * @example isPaletteShade("foo-500") => false
 */
export function isPaletteShade(rest: string): boolean {
	const head = rest.split("/")[0] ?? "";
	const [c, s] = head.split("-");

	return Boolean(c && s && PALETTE.has(c) && SHADE.has(s));
}
