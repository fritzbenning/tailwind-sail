/**
 * Remove `border-*` / `ring-*` / `outline-*` side or axis prefixes so the remainder is the color tail.
 *
 * @param rest — Token after the utility prefix (e.g. after `border-` in `border-t-red-500`).
 * @returns The same string with an optional leading `t-`, `x-`, `start-`, etc. removed.
 *
 * @example stripBorderEdgePrefix("t-red-500") => "red-500"
 *
 * @example stripBorderEdgePrefix("red-500") => "red-500"
 */
export function stripBorderEdgePrefix(rest: string): string {
	return rest.replace(/^(?:(?:x|y|t|b|l|r|s|e)|start|end)-/i, "");
}
