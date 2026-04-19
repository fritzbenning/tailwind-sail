/**
 * Remove `border-*` / `ring-*` / `outline-*` side or axis prefixes so the remainder is the color tail.
 *
 * @param rest — Token after the utility prefix (e.g. after `border-` in `border-t-red-500`).
 * @returns The same string with an optional leading `t-`, `x-`, `start-`, etc. removed.
 *
 * @example
 * Input: `"t-red-500"` → Output: `"red-500"`
 *
 * @example
 * Input: `"red-500"` → Output: `"red-500"`
 */
export function stripBorderEdgePrefix(rest: string): string {
	return rest.replace(/^(?:(?:x|y|t|b|l|r|s|e)|start|end)-/i, "");
}
