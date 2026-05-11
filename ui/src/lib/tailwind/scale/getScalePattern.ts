import { escapeRegExp } from "../../regex/escapeRegExp";

/**
 * Returns a regex that matches `-{token}` at the end of a utility, preferring longer tokens first (`2xl` before `xl`).
 *
 * @param steps - Ordered keyword steps (e.g. Tailwind **breakpoints** / named size tails).
 * @returns Pattern with capture group 1 = matched token (no leading hyphen).
 *
 * @example getScalePattern(["xl","2xl"]).exec("max-w-2xl")?.[1] => "2xl"
 */
export function getScalePattern(steps: readonly string[]): RegExp {
	const sorted = [...steps].sort((a, b) => b.length - a.length);
	const inner = sorted.map(escapeRegExp).join("|");

	return new RegExp(`-(${inner})$`);
}
